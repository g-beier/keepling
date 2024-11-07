"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

const novaAtividadeSchema = z.object({
  titulo: z
    .string()
    .min(6, { message: "Utilize um nome maior para sua atividade" })
    .max(50, { message: "Este nome é muito longo" }),
  tags: z.array(z.string()).min(1, { message: "Selecione ao menos uma tag" }),
  resumo: z.string().optional(),
  descricao: z.string(),
});

export default function Page() {
  const [atividades, setAtividades] = useState<
    {
      tags: string[];
      id: string;
      titulo: string;
      resumo: string;
      descricao: string;
    }[]
  >([]);

  const [tags, setTags] = useState<{ titulo: string; id: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const atividadesFiltradas = atividades.filter((atv) =>
    selectedTags.length > 0
      ? selectedTags.every((tag) => atv?.tags?.includes(tag))
      : true
  );

  const novaAtividadeForm = useForm<z.infer<typeof novaAtividadeSchema>>({
    resolver: zodResolver(novaAtividadeSchema),
    defaultValues: {
      titulo: "",
      resumo: "",
      descricao: "",
      tags: [],
    },
  });

  const handleSubmitNovaAtividade = (
    values: z.infer<typeof novaAtividadeSchema>
  ) => {
    fetch("api/v1/activity_management", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => setAtividades(data));
  };

  useEffect(() => {
    fetch("/api/v1/tags?tipo=todos")
      .then((response) => response.json())
      .then((data) => {
        setTags(data);
      })
      .catch((err) => console.error(err));

    fetch("/api/v1/activity_management")
      .then((response) => response.json())
      .then((data) => setAtividades(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div>Filtros</div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Nova Atividade</Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-2">
            <SheetHeader>
              <SheetTitle>Nova Atividade</SheetTitle>
              <SheetDescription>
                Compartilhe a sua sugestão de atividade com outros escotistas.
              </SheetDescription>
            </SheetHeader>
            <div className="flex-grow">
              <Form {...novaAtividadeForm}>
                <form
                  onSubmit={novaAtividadeForm.handleSubmit(
                    handleSubmitNovaAtividade
                  )}
                  className="space-y-8"
                >
                  <FormField
                    control={novaAtividadeForm.control}
                    name="titulo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={novaAtividadeForm.control}
                    name="resumo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resumo</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={novaAtividadeForm.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormDescription>
                          As tags ajudam outras pessoas a encontrar a sua
                          sugestão de atividade. Selecione todas as opções que
                          combinam com a sua atividade.
                        </FormDescription>
                        <FormControl>
                          <ToggleGroup
                            type="multiple"
                            className="flex-wrap"
                            {...field}
                            onValueChange={field.onChange}
                          >
                            {tags.map((tag) => (
                              <ToggleGroupItem
                                variant="outline"
                                value={tag?.id as unknown as string}
                                key={tag?.id}
                              >
                                {tag?.titulo}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={novaAtividadeForm.control}
                    name="descricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição da atividade</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Enviar</Button>
                </form>
              </Form>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="default" onClick={() => {}}>
                  Enviar
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <ToggleGroup
        type="multiple"
        className="flex-wrap my-2"
        value={selectedTags}
        onValueChange={setSelectedTags}
      >
        {tags.map((tag) => (
          <ToggleGroupItem
            variant="outline"
            value={tag?.id as unknown as string}
            key={tag?.id}
          >
            {tag?.titulo}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div>
        {atividadesFiltradas.length ? (
          <div className="grid grid-cols-4 gap-2 group">
            {atividadesFiltradas.map((atv) => (
              <Dialog key={atv?.id}>
                <DialogTrigger>
                  <div className="p-2 border rounded-sm bg-muted border-muted-foreground text-primary">
                    <span className="font-semibold">{atv?.titulo}</span>
                  </div>
                </DialogTrigger>
                <DialogPortal>
                  <DialogOverlay />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{atv.titulo}</DialogTitle>
                      <DialogDescription className="text-primary">
                        {atv.resumo}
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <p>{atv.descricao}</p>
                      <div className="inline-flex gap-2 flex-wrap">
                        {atv.tags &&
                          atv.tags.map((tagId) => (
                            <span
                              key={tagId}
                              className="inline-block px-2 py-0.5 bg-secondary-foreground rounded-sm text-secondary"
                            >
                              {tags?.find((t) => t.id === tagId)?.titulo}
                            </span>
                          ))}
                      </div>
                    </div>
                  </DialogContent>
                </DialogPortal>
              </Dialog>
            ))}
          </div>
        ) : (
          <span>Não encontramos atividades com estes filtros.</span>
        )}
      </div>
    </div>
  );
}
