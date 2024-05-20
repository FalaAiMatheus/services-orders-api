/**
 * Nome do arquivo: supabase.js
 * Data de criação: 20/05/2024
 * Autor: Matheus França
 * Matrícula: 01589182
 *
 * Descrição:
 * Este arquivo é responsavel por fazer o DELETE do Serviço no Supabase
 * Este script é parte o curso de ADS.
 */

import { supabase } from "@/services/supabase";

export default async function deleteServiceOrder(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(401).json({ message: "Digite um ID!" });
  }

  const { data, error } = await supabase
    .from("services_orders")
    .delete()
    .eq("id_order", id);

  if (error) {
    res.status(500).json({ message: "A error its occurred" });
  }

  return res
    .status(200)
    .json({ message: "Ordem de serviço deletada com sucesso!" });
}
