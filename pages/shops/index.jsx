import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getShops } from '../../utils/shopService';

export default function Shops() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    const data = await getShops();
    setShops(data);
  };

  return (
    <div>
      <h1>Shops</h1>
      <ul>
        {shops.map((shop) => (
          <li key={shop.shop_id}>
            <Link href={`/shops/${shop.shop_id}`}>
            <h1>{shop.shop_name}</h1>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
