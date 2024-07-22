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
    try {
      const { shop_id } = req.query;
      console.log(typeof(shop_id));
      console.log(req.body);
      const { shop_name, category, shop_address, shop_owner } = req.body;
      
      // Parse shop_address
      let shop_address_chunks = shop_address.split(',');
      let temp_street_address = shop_address_chunks[0] + ',' + shop_address_chunks[1].trim().split(' ')[0]; 
      let temp_city = shop_address_chunks[1].trim().split(' ')[1];
      let temp_state = shop_address_chunks[2].trim().split(' ')[0];
      let temp_zip_code = shop_address_chunks[2].trim().split(' ')[1];
      
      // Parse shop_owner
      let [temp_first_name, temp_last_name] = shop_owner.trim().split(' ');
  
      // Update shop
      const { data: shopData, error: shopError } = await supabase
        .from("shop")
        .update({ shop_name })
        .eq("shop_id", id)
        .select();
  
      if (shopError) throw shopError;
  
      // Update category
      const { data: categoryData, error: categoryError } = await supabase
        .from("category")
        .update({ category_name: category })
        .eq("category_id", shopData[0].category_id)
        .select();
  
      if (categoryError) throw categoryError;
  
      // Update shop_owner
      const { data: ownerData, error: ownerError } = await supabase
        .from("shop_owner")
        .update({ first_name: temp_first_name, last_name: temp_last_name })
        .eq("shop_id", id)
        .select();
  
      if (ownerError) throw ownerError;
  
      // Update shop_address
      const { data: addressData, error: addressError } = await supabase
        .from("shop_address")
        .update({
          street_address: temp_street_address,
          city: temp_city,
          state: temp_state,
          zip_code: temp_zip_code
        })
        .eq("shop_id", id)
        .select();
  
      if (addressError) throw addressError;
  
      // Fetch updated shop data
      const { data: updatedShop, error: fetchError } = await supabase
        .from("shop")
        .select(`
          shop_id,
          shop_name,
          shop_owner (
            first_name,
            last_name
          ),
          category (
            category_name
          ),
          shop_address (
            street_address,
            city,
            state,
            zip_code
          )
        `)
        .eq("shop_id", id)
        .single();
  
      if (fetchError) throw fetchError;
  
      return res.status(200).json(updatedShop);
    } catch (error) {
      console.error('Error updating shop:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {

    
    try {
      const {id} = req.query;
  
      // Delete shop_address
      const { error: addressError } = await supabase
        .from("shop_address")
        .delete()
        .eq("shop_id", id);
      if (addressError) throw addressError;
  
      // Delete shop_owner (but keep the user entry)
      const { error: ownerError } = await supabase
        .from("shop_owner")
        .delete()
        .eq("shop_id", id);
      if (ownerError) throw ownerError;
  
      // Delete shop
      const { error: shopError } = await supabase
        .from("shop")
        .delete()
        .eq("shop_id", id);
      if (shopError) throw shopError;
  
      return res.status(200).json({ message: "Shop and related records deleted successfully" });
    } catch (error) {
      console.error('Error deleting shop:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
