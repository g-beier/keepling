import { NextApiRequest, NextApiResponse } from "next";
import database from "../../../../infra/database.json";

function getTags(tipo: string) {
  const tags = database[0].atividade.tags;

  if (tipo === "todos") return tags;

  return tags.filter((tag: any) => tag.tipo === tipo);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { tipo } = req.query;

  if (!tipo) {
    return res.status(400).json({ error: "Missing query parameter: 'tipo'" });
  }

  try {
    const tags = getTags(tipo as string);
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
