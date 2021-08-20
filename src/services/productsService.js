import client from './client';

const getAllProducts = async () => {
  const products = await client().get('/products/');
  return products.data;
};

export default { getAllProducts };
