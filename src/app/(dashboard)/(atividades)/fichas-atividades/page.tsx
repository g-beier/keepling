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
    { tags: string[]; id: string; titulo: string }[]
  >([]);
  const [tags, setTags] = useState<{ titulo: string; id: number }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const atividadesFiltradas = atividades.filter((atv) =>
    selectedTags.length > 0
      ? selectedTags.some((tag) => atv?.tags?.includes(tag))
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
    console.log(values);
  };

  useEffect(() => {
    fetch("/api/v1/activity_managament")
      .then((response) => response.json())
      .then((data) => {
        setTags(data[0].atividade.tags);
        setAtividades(data[0].atividade["todas-atividades"]);
      })
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
          atividadesFiltradas.map((atv) => (
            <span key={atv?.id}>{atv?.titulo}</span>
          ))
        ) : (
          <span>Não encontramos atividades com estes filtros.</span>
        )}
      </div>
    </div>
  );
}

/* <div>
<h1>Filtros</h1>

</div>
<div className="flex gap-2 flex-col">
<h1>Lista</h1>

*/
