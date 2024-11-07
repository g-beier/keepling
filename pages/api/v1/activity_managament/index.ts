import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'infra/database.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    fs.readFile(filePath, 'utf8', (err, data) => {
      return res.status(200).json(JSON.parse(data));
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error'});
  }
}