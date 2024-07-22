import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getShopById, updateShopById, deleteShopById } from '../../../utils/shopService';
import Link from 'next/link';

export default function Shop() {
  const router = useRouter();
  const { id } = router.query;
  const [shop, setShop] = useState(null);
  const [shopDetails, setShopDetails] = useState({
    shop_name: '',
    category: '',
    shop_address: '',
    shop_owner: ''
  });

  useEffect(() => {
    if (id) {
      fetchShop();
    }
  }, [id]);

  const fetchShop = async () => {
    const data = await getShopById(id);
    setShop(data);
    setShopDetails({
      shop_name: data.shop_name,
      category: data.category,
      shop_address: data.shop_address,
      shop_owner: data.shop_owner
    });
  };

  const handleUpdate = async () => {
    await updateShopById(id, shopDetails);
    fetchShop();
    router.push('/shops');
  };

  const handleDelete = async () => {
    await deleteShopById(id);
    router.push('/shops');
  };

  if (!shop) return <div>Loading...</div>;

  return (
    <div>
      <h1>Shop Details</h1>
        <h2>{shop.shop_name}</h2>
        <h3>{shop.category}</h3>
        <h3>{shop.shop_address}</h3>
        <h3>{shop.shop_owner}</h3>
      <Link href={`/shops/${id}/edit`}>
        <button>Update Shop</button>
      </Link>
      <button onClick={handleDelete}>Delete Shop</button>
    </div>
  );
}
