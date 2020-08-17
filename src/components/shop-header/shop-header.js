/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import './shop-header.css';

const ShopHeader = ({ numItems, total }) => {
  return (
    <header className="shop-header row">
      <Link to="./">
        <div className="logo text-dark" href="#">ReStore</div>
      </Link>
      <Link to="./cart" className="shopping-cart">
        <i className="cart-icon fa fa-shopping-cart" />
        {numItems} items (${total})
      </Link>
    </header>
  );
};

export default ShopHeader;
