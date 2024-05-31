/**
 * Nome do arquivo: create-client.js
 * Data de criação: 20/05/2024
 * Autor: Matheus França
 * Matrícula: 01589182
 *
 * Descrição:
 * Este arquivo é responsavel por fazer o POST do Cliente no Supabase
 * Este script é parte o curso de ADS.
 */

import { methodCreate } from "@/services/repository";

export default async function createClients(req, res) {
  const { name, address, telephone, email } = req.body;
  const { data, error } = await methodCreate({
    table: "clients",
    body: {
      name,
      address,
      telephone,
      email,
    },
  });

  if (error) {
    res.status(500).json({ message: "A error its occurred" });
  }

  return res.status(201).json({ message: "Cliente criado com sucesso" });
}
