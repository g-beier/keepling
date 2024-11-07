import { NextApiRequest, NextApiResponse } from "next";
import database from "../../../../infra/database.json";
const atividade = database[0].atividade["todas-atividades"];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      if (id) {
        const atividadePeloId = atividade.find((item) => item.id === id);
        if (atividadePeloId) {
          res.status(200).json(atividadePeloId);
        } else {
          res.status(404).json({ message: "Atividade não encontrada" });
        }
      } else {
        res.status(200).json(atividade);
      }
      break;

    case 'POST': // Todo - Controlar o conteúdo do body
      const novaAtividade = req.body;
      if (
        !req.body.titulo || 
        !req.body.tipo || 
        !req.body.descricao || 
        !req.body.tags || 
        !req.body.resumo
      ) {
        return res.status(400).json({ message: "Parâmetros faltantes" });
      }

      novaAtividade.id = (atividade.length + 1).toString();
      atividade.push(novaAtividade);
      res.status(201).json(novaAtividade);
      break;

    case 'PUT': // Todo - Controlar o conteúdo do body
      if (id) {
        const index = atividade.findIndex((item) => item.id === id);
        if (index !== -1) {
          atividade[index] = { ...atividade[index], ...req.body };
          res.status(200).json(atividade[index]);
        } else {
          res.status(404).json({ message: "Atividade não encontrada" });
        }
      } else {
        res.status(400).json({ message: "Parâmetro faltante: 'id'" });
      }
      break;

    case 'DELETE':
      if (id) {
        const index = atividade.findIndex((item) => item.id === id);
        if (index !== -1) {
          const deletedAtividade = atividade.splice(index, 1);
          res.status(200).json(deletedAtividade[0]);
        } else {
          res.status(404).json({ message: "Atividade não encontrada" });
        }
      } else {
        res.status(400).json({ message: "Parâmetro faltante: 'id'" });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}