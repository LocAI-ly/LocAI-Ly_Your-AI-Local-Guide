// pages/shops/[id]/edit.js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getShopById, updateShopById } from '../../../utils/shopService';

export default function EditShop() {
  const router = useRouter();
  const { id } = router.query;
  const [shop, setShop] = useState({ shop_name: '', shop_address: '', category: '', shop_owner: '' });

  useEffect(() => {
    const fetchShop = async () => {
      const data = await getShopById(id);
      setShop(data);
    };

    if (id) {
      fetchShop();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShop({ ...shop, [name]: value });
  };

  const handleSave = async () => {
    await updateShopById(id, shop);
    router.push(`/shops/${id}`);
  };

  if (!shop) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Shop</h1>
      <form>
        <label>shop_name:</label>
        <input type="text" name="name" value={shop.shop_name} onChange={handleInputChange} />
        
        <label>shop_address:</label>
        <input type="text" name="address_id" value={shop.shop_address} onChange={handleInputChange} />
        
        <label>category:</label>
        <input type="text" name="category_id" value={shop.category} onChange={handleInputChange} />

        <label>shop_owner:</label>
        <input type="text" name="owner_id" value={shop.shop_owner} onChange={handleInputChange} />
        
        <button type="button" onClick={handleSave}>Save Changes</button>
      </form>
    </div>
  );
}
