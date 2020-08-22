/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './shop-header.css';

const ShopHeader = ({ numItems, total }) => {
  const label = numItems === 1 ? 'item' : 'items';
  
  return (
    <header className="shop-header row">
      <Link to="./">
        <div className="logo text-dark" href="#">ReStore</div>
      </Link>
      <Link to="./cart" className="shopping-cart">
        <i className="cart-icon fa fa-shopping-cart" />
        {numItems} {label} (${total})
      </Link>
    </header>
  );
};

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal } }) => ({
  numItems: cartItems.length,
  total: orderTotal
});

export default connect(mapStateToProps)(ShopHeader);
