/**
 * Nome do arquivo: delele-client.js
 * Data de criação: 20/05/2024
 * Autor: Matheus França
 * Matrícula: 01589182
 *
 * Descrição:
 * Este arquivo é responsavel por fazer o DELETE do Cliente no Supabase
 * Este script é parte o curso de ADS.
 */

import { supabase } from "@/services/supabase";

export default async function deleteClients(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(401).json({ message: "Digite um ID!" });
  }

  const { data, error } = await supabase
    .from("clients")
    .delete()
    .eq("id_client", id);

  return res.status(200).json({ message: `O ID ${id} foi deletado com sucesso!` });
}
