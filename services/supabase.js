/**
 * Nome do arquivo: supabase.js
 * Data de criação: 20/05/2024
 * Autor: Matheus França
 * Matrícula: 01589182
 *
 * Descrição:
 * Este arquivo é responsavel por fazer a conexão do Supabase ao CRUD
 * Este script é parte o curso de ADS.
 */

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.DATABASE,
  process.env.PASSWORD
);
