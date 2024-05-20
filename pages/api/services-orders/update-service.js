/**
 * Nome do arquivo: supabase.js
 * Data de criação: 20/05/2024
 * Autor: Matheus França
 * Matrícula: 01589182
 *
 * Descrição:
 * Este arquivo é responsavel por fazer o PUT do Serviço no Supabase
 * Este script é parte o curso de ADS.
 */

import { supabase } from "@/services/supabase";

export default async function createServiceOrder(req, res) {
  const { id } = req.query;
  const {
    id_client,
    order_date,
    service_description,
    estimated_cost,
    relevant_notes,
    status,
    final_cost,
  } = req.body;
  const { data, error } = await supabase
    .from("services_orders")
    .update({
      id_client,
      order_date,
      service_description,
      estimated_cost,
      relevant_notes,
      status,
      final_cost,
    })
    .eq("id_order", id);

  if (error) {
    res.status(500).json({ message: "A error its occurred" });
  }

  return res
    .status(201)
    .json({ message: "Ordem de serviço atualizada com sucesso!" });
}
