import { supabase } from "@/utils/supabaseClient";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('shop')
      .select(`
        shop_id,
        shop_name,
        shop_owner!inner (
          shop_id,
          first_name,
          last_name
        ),
        category (
          category_name
        ),
        shop_address!inner (
          shop_id,
          street_address,
          city,
          state,
          zip_code
        )
      `)
      .eq('shop_id', id)
      .single();
    if (error) {
      console.error('Error fetching shop details:', error);
      return res.status(500).json({ error: error.message });
    }
  
    if (!data) {
      return res.status(404).json({ error: 'Shop not found' });
    }
  
    // Process the data
    let owner = data.shop_owner.find(o => o.shop_id == data.shop_id);
    let address = data.shop_address.find(o => o.shop_id == data.shop_id);
    const processedData = {
      shop_id: data.shop_id,
      shop_name: data.shop_name,
      shop_owner: `${owner.first_name} ${owner.last_name}`.trim(),
      category: data.category ? data.category.category_name : 'Unknown',
      shop_address: `${address.street_address} ${address.city}, ${address.state} ${address.zip_code}`.trim()
    };
  
    return res.status(200).json(processedData);
  }

  if (req.method === "PUT") {
    console.log(req.body);
    const { shop_name, category_id } = req.body;

    const { data, error } = await supabase
      .from("shop")
      .update({ shop_name, category_id })
      .eq("shop_id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  if (req.method === "DELETE") {
    const { data, error } = await supabase
      .from("shop")
      .delete()
      .eq("shop_id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
