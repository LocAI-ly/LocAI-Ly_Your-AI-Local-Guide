import { supabase } from "@/utils/supabaseClient";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('shop_details')
      .select('*')
      .eq('shop_id', id)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  if (req.method === 'PUT') {
    console.log(req.body);
    const { shop_name, category_id } = req.body;

    const { data, error } = await supabase
      .from('shop')
      .update({ shop_name, category_id })
      .eq('shop_id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  if (req.method === 'DELETE') {
    const { data, error } = await supabase
      .from('shop')
      .delete()
      .eq('shop_id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
