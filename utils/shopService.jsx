import axios from 'axios';

export const getShops = async () => {
  const res = await axios.get('/api/shops');
  // console.log(res.data);
  return res.data;
};

export const getShopById = async (id) => {
    
  const res = await axios.get(`/api/shops/${id}`);
  // console.log(res.data);
  return res.data;
};

export const createShop = async (shop) => {
  const res = await axios.post('/api/shops/create', shop);
  return res.data;
};

export const updateShopById = async (id, shop) => {
  const res = await axios.put(`/api/shops/${id}`, shop);
  return res.data;
};

export const deleteShopById = async (id) => {
  const res = await axios.delete(`/api/shops/${id}`);
  return res.data;
};
