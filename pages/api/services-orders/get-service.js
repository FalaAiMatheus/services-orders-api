/**
 * Nome do arquivo: get-service.js
 * Data de criação: 20/05/2024
 * Autor: Matheus França
 * Matrícula: 01589182
 *
 * Descrição:
 * Este arquivo é responsavel por fazer o GET do Serviço no Supabase
 * Este script é parte o curso de ADS.
 */

import { methodAllGet, methodGet } from "@/services/repository";
import { supabase } from "@/services/supabase";

export default async function getServiceOrder(req, res) {
  const { id } = req.query;

  if (!id) {
    const { data, error } = await methodAllGet({ table: "services_orders" });

    return res.status(200).json(data);
  }

  const { data, error } = await methodGet({
    table: "services_orders",
    column_string: "id_order",
    id,
  })

  if (error) {
    res.status(500).json({ message: "A error its occurred" });
  }

  return res.status(200).json(data);
}
