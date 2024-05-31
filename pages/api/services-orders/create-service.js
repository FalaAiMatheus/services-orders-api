/**
 * Nome do arquivo: create-service.js
 * Data de criação: 20/05/2024
 * Autor: Matheus França
 * Matrícula: 01589182
 *
 * Descrição:
 * Este arquivo é responsavel por fazer o POST do Serviço no Supabase
 * Este script é parte o curso de ADS.
 */

import { statusTypes } from "@/services/enums/status";
import { methodCreate } from "@/services/repository";

export default async function createServiceOrder(req, res) {
  const {
    id_client,
    order_date,
    service_description,
    estimated_cost,
    relevant_notes,
    name,
  } = req.body;
  const { data, error } = await methodCreate({
    table: "services_orders",
    body: {
      id_client,
      order_date,
      service_description,
      estimated_cost,
      relevant_notes,
      name,
      status: statusTypes.Inicial,
    },
  });

  if (error) {
    res.status(500).json({ message: "A error its occurred" });
  }
  if (id_client) {
    res.status(401).json({ message: "Insira um cliente" });
  }

  return res
    .status(201)
    .json({ message: "Ordem de serviço criada com sucesso!" });
}
