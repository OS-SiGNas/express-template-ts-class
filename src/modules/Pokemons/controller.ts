import { RequestHandler } from "express";
import { getPokemonByName } from "./service";

export const getOne: RequestHandler = async (req, res) => {
  const { name } = req.params;
  try {
    const data = await getPokemonByName(name);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).send("Error finding pokemon");
  }
};
