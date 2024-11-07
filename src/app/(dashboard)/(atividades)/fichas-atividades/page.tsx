"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState, useEffect } from "react";

export default function Page() {
  const [atividades, setAtividades] = useState<{ tags: string[] }[]>([]);
  const [tags, setTags] = useState<{ titulo: string; id: number }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const atividadesFiltradas = atividades.filter((atv) =>
    selectedTags.length > 0
      ? selectedTags.some((tag) => atv?.tags?.includes(tag))
      : true
  );

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
    <>
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
      <div className="flex gap-2 flex-col">
        {atividadesFiltradas.length ? (
          atividadesFiltradas.map((atv) => (
            <span key={atv?.id}>{atv?.titulo}</span>
          ))
        ) : (
          <span>Não encontramos atividades com estes filtros.</span>
        )}
      </div>
    </>
  );
}
