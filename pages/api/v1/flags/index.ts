import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import database from '../../../../infra/database.json';

function getFlags(tipo: string) {
  const tags = database[0].atividade.tags;
  return tags.filter((flag) => flag.tipo === tipo);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { tipo } = req.query;

  if (!tipo) {
    return res.status(400).json({ error: 'Flag query parameter is required' });
  }
  
  try {
    const flags = getFlags(tipo as string);
    return res.status(200).json({ flags });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error'});
  }
}