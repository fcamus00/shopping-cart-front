import React from 'react';
import discountsService from '../../services/discountsService';
import cartService from '../../services/cartService';
import CartProduct from '../../components/CartProduct';
import './index.scss';

function ShoppingCart() {
  const [discounts, setDiscounts] = React.useState(null);
  const [cart, setCart] = React.useState(null);
  const [subTotal, setSubTotal] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  const [currentDiscount, setCurrentDiscount] = React.useState(null);
  const [greaterDiscount, setGreaterDiscount] = React.useState({
    brand: '',
    discount: 0,
    threshold: 0,
    reached: 1,
  });

  React.useEffect(() => {
    async function fetchData() {
      const cartData = await cartService.getCart();
      const discounts = await discountsService.getAllDiscounts();
      setDiscounts(discounts);
      setCart(cartData);
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    if (cart) {
      let currentTotal = 0;
      cart.products.forEach((product) => {
        currentTotal += product.price;
      });
      setSubTotal(currentTotal);
    }
  });

  React.useEffect(() => {
    if (currentDiscount) {
      setTotal(subTotal - currentDiscount.discount);
    } else {
      setTotal(subTotal);
    }
  });

  React.useEffect(() => {
    if (cart && discounts && total) {
      const brands = cart.products.reduce((acc, product) => {
        const findBrand = acc.findIndex(obj => obj.brand === product.brand);
        if (findBrand > -1) {
          acc[findBrand].total += product.price;
        } else {
          acc.push({
            brand: product.brand,
            total: product.price,
          });
        }
        return acc;
      }, []);
      discounts.forEach((discount) => {
        const findBrand = brands.findIndex(obj => obj.brand === discount.brand);
        if (findBrand > -1) {
          if (greaterDiscount.discount < discount.discount) {
            setGreaterDiscount({
              brand: discount.brand,
              discount: discount.discount,
              threshold: discount.threshold,
              reached: discount.threshold - brands[findBrand].total,
            });
          } if (brands[findBrand].total >= discount.threshold) {
            setCurrentDiscount({
              discount: discount.discount,
              threshold: discount.threshold,
              brand: discount.brand,
            });
          }
        }
      });
    }
  }, [cart, discounts, total, greaterDiscount.discount]);

  React.useEffect(() => {
    if (currentDiscount) {
      if (currentDiscount.brand === greaterDiscount.brand) {
        setGreaterDiscount({...greaterDiscount, reached: 0});
      }
    }
  }, [currentDiscount && greaterDiscount.brand]);

  return (
    <div className="cart-container">
      {cart ? cart.products.map((product) => (
        <CartProduct key={product.id} product={product} />
      )) : null}
      <div className="cart-total">
        {
          greaterDiscount.reached > 0 ?
          <div className="discount-message">
            <p>Agrega ${greaterDiscount.reached} más en productos {greaterDiscount.brand} y aprovecha un descuento total de ${greaterDiscount.discount} en tu compra!</p>
          </div> : null
        }
        <div className="subtotal">
          <p><span className="subtotal-text">Subtotal de productos:</span> <span className="subtotal-price">${subTotal}</span></p>
        </div>
        {
          currentDiscount ?
          <div className="discount">
            <p><span className="discount-text">Descuento por marca:</span> <span className="discount-price">${currentDiscount.discount}</span></p>
            <p>Se aplicó un descuento de ${currentDiscount.discount} por haber comprado al menos ${currentDiscount.threshold} en productos {currentDiscount.brand}!</p>
          </div> : null
        }
        <div className="total">
          <p><span className="total-text">Total a pagar:</span> <span className="total-price">${total}</span></p>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
