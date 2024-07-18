import { supabase } from "@/utils/supabaseClient";

export default async function handler(req, res) {
  console.log(req.method)
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('shop_details')
      .select('*');
      console.log(data);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }
  
  res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}