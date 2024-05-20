/**
 * Nome do arquivo: supabase.js
 * Data de criação: 20/05/2024
 * Autor: Matheus França
 * Matrícula: 01589182
 *
 * Descrição:
 * Este arquivo é responsavel por fazer o PUT do Cliente no Supabase
 * Este script é parte o curso de ADS.
 */

import { supabase } from "@/services/supabase";

export default async function updateClient(req, res) {
  const { id } = req.query;
  const { name, address, telephone, email } = req.body;
  const { data, error } = await supabase
    .from("clients")
    .update({ name, address, telephone, email })
    .eq("id_client", id);

  if (error) {
    res.status(500).json({ message: `A error its occurred: ${error.message}` });
  }

  if (error.code == "22P02") {
    res.status(401).json({ message: `A error its occurred: ${error.message}` });
  }

  return res
    .status(201)
    .json({ message: "Cliente foi atualizado com sucesso!" });
}