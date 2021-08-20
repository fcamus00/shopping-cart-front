import Products from './Products';
import ShoppingCart from './ShoppingCart';

const routes = [
  {
    name: 'Productos',
    path: '/',
    component: Products,
  },
  {
    name: 'Carrito',
    path: '/shopping-cart',
    component: ShoppingCart,
  },
];

export default routes;
