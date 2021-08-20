import client from './client';

const getCart = async () => {
  const cart = await client().get('/cart/');
  return cart.data[0];
};

const saveCart = async (body) => {
  const cart = await client().post('/cart/', body);
  return cart.data;
};

export default { getCart, saveCart };
