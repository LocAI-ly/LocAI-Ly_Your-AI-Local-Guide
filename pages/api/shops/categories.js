import { supabase } from "@/utils/supabaseClient";

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        // Fetch categories from the database
        const { data, error } = await supabase.from('category').select('*');
        if (error) throw error;
  
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }