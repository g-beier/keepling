"use client";

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
import FormNovaAtividade from "./nova-atividade-form";

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
        <FormNovaAtividade />
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
                  <div className="p-2 border rounded-sm bg-info">
                    <span className="font-semibold">{atv?.titulo}</span>
                  </div>
                </DialogTrigger>
                <DialogPortal>
                  <DialogOverlay />
                  <DialogContent className="">
                    <DialogHeader>
                      <DialogTitle>{atv.titulo}</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        {atv.resumo}
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <p>{atv.descricao}</p>
                      <div className="inline-flex gap-2 flex-wrap mt-4">
                        {atv.tags &&
                          atv.tags.map((tagId) => (
                            <span
                              key={tagId}
                              className="inline-block px-2 py-0.5 bg-primary rounded-sm text-primary-foreground"
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
