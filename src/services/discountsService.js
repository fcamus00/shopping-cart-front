import client from './client';

const getAllDiscounts = async () => {
  const discounts = await client().get('/discounts/');
  return discounts.data;
};

export default { getAllDiscounts };
