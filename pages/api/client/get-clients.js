/**
 * Nome do arquivo: supabase.js
 * Data de criação: 20/05/2024
 * Autor: Matheus França
 * Matrícula: 01589182
 *
 * Descrição:
 * Este arquivo é responsavel por fazer o GET do Cliente no Supabase
 * Este script é parte o curso de ADS.
 */

import { supabase } from "@/services/supabase";

export default async function getClients(req, res) {
  const { id } = req.query;

  if (!id) {
    const { data, error } = await supabase.from("clients").select("*");

    return res.status(200).json(data);
  }

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id_client", id);

  if (data.length === 0) {
    return res.status(401).json({ message: "Id não existe" });
  }

  if (error) {
    res.status(500).json({ message: "A error its occurred" });
  }

  return res.status(200).json(data);
}
