/**
 * Nome do arquivo: supabase.js
 * Data de criação: 20/05/2024
 * Autor: Matheus França
 * Matrícula: 01589182
 *
 * Descrição:
 * Este arquivo é responsavel por fazer o POST do Serviço no Supabase
 * Este script é parte o curso de ADS.
 */

import { supabase } from "@/services/supabase";

export default async function createServiceOrder(req, res) {
  const {
    id_client,
    order_date,
    service_description,
    estimated_cost,
    relevant_notes,
  } = req.body;
  const { data, error } = await supabase.from("services_orders").insert({
    id_client,
    order_date,
    service_description,
    estimated_cost,
    relevant_notes,
  });

  if (error) {
    res.status(500).json({ message: "A error its occurred" });
  }

  return res
    .status(201)
    .json({ message: "Ordem de serviço criada com sucesso!" });
}
