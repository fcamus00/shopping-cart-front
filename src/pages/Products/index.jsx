import React from 'react';
import productsService from '../../services/productsService';
import ProductCard from '../../components/ProductCard';
import './index.scss';

function Products() {
  const [products, setProducts] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const productsData = await productsService.getAllProducts();
      setProducts(productsData);
    };
    fetchData();
  }, []);

  return (
    <div className="products-container">
      {products ? products.map((product) => (
        <ProductCard key={product.id} product={product} />
      )) : null}
    </div>
  );
}

export default Products;
