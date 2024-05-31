/**
 * Nome do arquivo: update-service.js
 * Data de criação: 20/05/2024
 * Autor: Matheus França
 * Matrícula: 01589182
 *
 * Descrição:
 * Este arquivo é responsavel por fazer o PUT do Serviço no Supabase
 * Este script é parte o curso de ADS.
 */

import { methodUpdate } from "@/services/repository";

export default async function updateServiceOrder(req, res) {
  const { id } = req.query;
  const {
    id_client,
    order_date,
    service_description,
    estimated_cost,
    relevant_notes,
    status,
    final_cost,
    name,
  } = req.body;
  const { data, error } = await methodUpdate({
    table: "services_orders",
    body: {
      id_client,
      order_date,
      service_description,
      estimated_cost,
      relevant_notes,
      status,
      name,
      final_cost,
    },
    column_string: "id_order",
    id,
  });

  if (error) {
    res.status(500).json({ message: "A error its occurred" });
  }

  return res
    .status(200)
    .json({ message: "Ordem de serviço atualizada com sucesso!" });
}
