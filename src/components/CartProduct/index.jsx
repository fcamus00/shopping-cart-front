import React from 'react';
import cartService from '../../services/cartService';

import './index.scss';

function CartProduct(props) {
  const removeProduct = async (prod) => {
    const cart = await cartService.getCart();
    const findProduct = cart.products.findIndex(product => product._id === prod._id);
    cart.products.splice(findProduct, 1);
    cart.isDelete = true;
    await cartService.saveCart(cart);
    window.location.reload();
  };

  return (
    <div className="cart-product">
      <div className="product-img">
        <img 
          src={`https://${props.product.image}`}
          alt={`${props.product.brand} ${props.product.description}`}
          width="128"
          height="128"
        />
      </div>
      <div className="product-info">
        <span>{props.product.brand}</span>
        <p>{props.product.description}</p>
      </div>
      <div className="product-price">
        <p>${props.product.price}</p>
        <button onClick={() => removeProduct(props.product)}>Eliminar</button>
      </div>
    </div>
  );
}

export default CartProduct;
