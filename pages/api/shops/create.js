import { supabase } from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { shop_name, category_id } = req.body;

  const { data, error } = await supabase
    .from('shop')
    .insert([{ shop_name, category_id }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
}