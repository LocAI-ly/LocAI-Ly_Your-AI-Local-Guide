// pages/shops/[id]/edit.js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getShopById, updateShopById } from '../../../utils/shopService';

export default function EditShop() {
  const router = useRouter();
  const { id } = router.query;
  const [shopDetails, setShopDetails] = useState({
    shop_name: '',
    category: '',
    shop_address: '',
    shop_owner: ''
  });

  useEffect(() => {
    const fetchShop = async () => {
      const data = await getShopById(id);
      setShopDetails(data);
    };

    if (id) {
      fetchShop();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShopDetails({ ...shopDetails, [name]: value });
  };

  const handleSave = async () => {
    await updateShopById(id, shopDetails);
    router.push(`/shops/${id}`);
  };

  if (!shopDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>Shop Details</h1>
      <label htmlFor='shop_name'>Shop Name:</label>
      <input
        type="text"
        placeholder="Shop Name"
        value={shopDetails.shop_name}
        onChange={(e) => setShopDetails({ ...shopDetails, shop_name: e.target.value })}
      />
      <label htmlFor="Shop Category">Shop Category:</label>
      <input
        type="text"
        placeholder="Category"
        value={shopDetails.category}
        onChange={(e) => setShopDetails({ ...shopDetails, category: e.target.value })}
      />
      <label htmlFor="Shop Address"> Shop Address:</label>
      <input
        type="text"
        placeholder="Shop Address"
        value={shopDetails.shop_address}
        onChange={(e) => setShopDetails({ ...shopDetails, shop_address: e.target.value })}
      />
      <label htmlFor="Shop owner">Shop Owner:</label>
      <input
        type="text"
        placeholder="Shop Owner"
        value={shopDetails.shop_owner}
        onChange={(e) => setShopDetails({ ...shopDetails, shop_owner: e.target.value })}
      />
      <button onClick={handleSave}>save changes </button>
    </div>
  );
}
