// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = process.env.API_BACKEND_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const range = req.query.range || "hour";
  const response = await fetch(`${BASE_URL}/metrics/data?range=${range}`);
  const data = await response.json();
  res.status(200).json(data);
}
