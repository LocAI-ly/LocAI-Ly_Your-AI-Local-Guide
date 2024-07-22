import { supabase } from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { shop_details, owner_details, shop_address } = req.body;

    try {
      // Insert shop details and get the shop ID
      const { data: shopData, error: shopError } = await supabase
        .from("shop")
        .insert([
          {
            shop_name: shop_details.shop_name,
            category_id: shop_details.category,
            description: shop_details.description,
          },
        ])
        .select()
        .single();

      if (shopError) {
        console.error("Shop Insert Error:", shopError);
        return res.status(500).json({ success: false, error: shopError.message });
      }

      if (!shopData || !shopData.shop_id) {
        console.error("Shop Data Error: Shop ID is missing.");
        return res.status(500).json({ success: false, error: "Shop ID is missing in response." });
      }

      const shop_id = shopData.shop_id;
      console.log("Inserted shop_id:", shop_id);

      // Now that we have the shop_id, we can insert owner and address details

      // Insert owner details with the shop ID
      const { data: ownerData, error: ownerError } = await supabase
        .from("shop_owner")
        .insert([{ 
          first_name: owner_details.first_name, 
          last_name: owner_details.last_name, 
          shop_id: shop_id, 
          phone: owner_details.phone 
        }])
        .select()
        .single();

      if (ownerError) {
        console.error("Owner Insert Error:", ownerError);
        // Consider deleting the shop entry if owner insert fails
        return res.status(500).json({ success: false, error: ownerError.message });
      }

      // Insert address details with the shop ID
      const { data: addressData, error: addressError } = await supabase
        .from("shop_address")
        .insert([{
          street_address: shop_address.street_address, 
          city: shop_address.city, 
          state: shop_address.state, 
          zip_code: shop_address.zip_code, 
          shop_id: shop_id 
        }])
        .select()
        .single();

      if (addressError) {
        console.error("Address Insert Error:", addressError);
        // Consider deleting the shop and owner entries if address insert fails
        return res.status(500).json({ success: false, error: addressError.message });
      }

      res.status(200).json({
        success: true,
        data: { shop: shopData, owner: ownerData, address: addressData },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}