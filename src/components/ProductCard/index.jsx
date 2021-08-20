import React from 'react';
import cartService from '../../services/cartService';

import './index.scss';

function ProductCard(props) {

  const addProduct = async (product) => {
    const cart = {
      id: 1,
      products: [],
    };
    cart.products.push(product);
    await cartService.saveCart(cart);
  };

  return (
    <div className="product-card">
      <div className="card-top">
        <div className="product-img">
          <img 
            src={`https://${props.product.image}`}
            alt={`${props.product.brand} ${props.product.description}`}
            width="256"
            height="256"
          />
        </div>
      </div>
      <div className="card-bottom">
        <div className="product-title">
          <p><span>{props.product.brand} </span>{props.product.description}</p>
        </div>
        <div className="product-price"><p>{props.product.price}</p></div>
        <div>
          <button className="add-btn" onClick={() => addProduct(props.product)}>Agregar</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
