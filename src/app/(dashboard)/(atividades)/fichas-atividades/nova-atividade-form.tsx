"use client";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const formSchema = z.object({
  titulo: z
    .string()
    .min(6, { message: "Utilize um nome maior para sua atividade" })
    .max(50, { message: "Este nome é muito longo" }),
  tags: z.array(z.string()).min(1, { message: "Selecione ao menos uma tag" }),
  resumo: z
    .string()
    .min(1, { message: "Preencha o resumo da atividade" })
    .max(40, { message: "Escreva apenas um resumo da atividade" }),
  descricao: z
    .string()
    .min(20, { message: "Descreva a atividade de forma completa" }),
});

type Tag = {
  id: string;
  titulo: string;
};

export default function FormNovaAtividade() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function fetchTags() {
      await fetch("/api/v1/tags?tipo=todos")
        .then((response) => response.json())
        .then((data) => setTags(data));
    }

    fetchTags();
  }, []);

  const novaAtividadeForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      resumo: "",
      descricao: "",
      tags: [],
    },
    resetOptions: {
      keepErrors: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch("api/v1/activity_management", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) =>
        toast({
          title: data.titulo,
          description: `Sua atividade foi criada com sucesso.`,
        })
      )
      .catch((err) => console.log(err))
      .finally(() => {
        setOpen(false);
        novaAtividadeForm.reset();
      });
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        novaAtividadeForm.clearErrors();
      }}
    >
      <SheetTrigger asChild>
        <Button>Nova Atividade</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll w-full sm:max-w-lg">
        <Form {...novaAtividadeForm}>
          <form onSubmit={novaAtividadeForm.handleSubmit(onSubmit)}>
            <SheetHeader>
              <SheetTitle>Nova Atividade</SheetTitle>
            </SheetHeader>
            <div className="space-y-8 mt-8">
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
            </div>
            <SheetFooter className="mt-4 sm:justify-between">
              <Button
                type="reset"
                variant="outline"
                className="hover:bg-destructive hover:text-destructive-foreground border-destructive text-destructive-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  novaAtividadeForm.reset();
                }}
              >
                Limpar campos
              </Button>
              <Button
                type="submit"
                disabled={!novaAtividadeForm.getValues().titulo}
              >
                Enviar
              </Button>
            </SheetFooter>
            <Toaster />
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
