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

import { methodDelete } from "@/services/repository";

export default async function deleteClients(req, res) {
  const { id } = req.query;
  await methodDelete({ table: "clients", column_string: "id_client", id });
  if (!id) {
    return res.status(401).json({ message: "Digite um ID!" });
  }

  return res
    .status(200)
    .json({ message: `O ID ${id} foi deletado com sucesso!` });
}
