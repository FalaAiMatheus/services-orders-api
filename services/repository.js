import { supabase } from "./supabase";

export async function methodCreate({ table, body }) {
  const { data, error } = await supabase.from(table).insert(body);

  return {
    data,
    error,
  };
}

export async function methodUpdate({ table, body, column_string, id }) {
  const { data, error } = await supabase
    .from(table)
    .update(body)
    .eq(column_string, id);

  return {
    data,
    error,
  };
}

export async function methodAllGet({ table }) {
  const { data, error } = await supabase.from(table).select("*");

  return {
    data,
    error,
  };
}

export async function methodGet({ table, column_string, id }) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq(column_string, id);

  return {
    data,
    error,
  };
}

export async function methodDelete({ table, column_string, id }) {
  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq(column_string, id);

  return {
    data,
    error,
  };
}
