/**
 * Nome do arquivo: update-client.js
 * Data de criação: 20/05/2024
 * Autor: Matheus França
 * Matrícula: 01589182
 *
 * Descrição:
 * Este arquivo é responsavel por fazer o PUT do Cliente no Supabase
 * Este script é parte o curso de ADS.
 */

import { methodUpdate } from "@/services/repository";

export default async function updateClients(req, res) {
  const { id } = req.query;
  const { name, address, telephone, email } = req.body;
  const { data, error } = await methodUpdate({
    table: "clients",
    body: { name, address, telephone, email },
    column_string: "id_client",
    id,
  });

  if (error) {
    res.status(500).json({ message: `A error its occurred: ${error.message}` });
  }

  return res
    .status(200)
    .json({ message: "Cliente foi atualizado com sucesso!" });
}
