import React from 'react';
import { connect } from 'react-redux';
import { 
  bookAddedToCart,
  bookRemovedFromCart,
  allBooksRemovedFromCart 
} from '../../actions';

import './shopping-cart-table.css';

const ShoppingCartTable = ({
  items,
  total,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  const renderRow = (item, idx) => {
    const { id, title, quantity, total } = item;
    return (
      <tr key={id}>
        <td className="text-left">{idx + 1}</td>
        <td className="text-left">{title}</td>
        <td>{quantity}</td>
        <td>${total}</td>
        <td>
          <button
            onClick={() => onDelete(id)}
            className="btn btn-outline-danger btn-sm float-right"
          >
            <i className="fa fa-trash-o" />
          </button>
          <button
            onClick={() => onIncrease(id)}
            className="btn btn-outline-success btn-sm float-right"
          >
            <i className="fa fa-plus-circle" />
          </button>
          <button
            onClick={() => onDecrease(id)}
            className="btn btn-outline-warning btn-sm float-right"
          >
            <i className="fa fa-minus-circle" />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>

      <table className="table">
        <thead>
          <tr>
            <th className="text-left">#</th>
            <th className="text-left">Item</th>
            <th>Qty</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {items.map(renderRow)}
        </tbody>
      </table>

      <div className="total">Total payable: ${total}</div>
    </div>
  );
};

const mapStateToProps = ({ cartItems, orderTotal }) => ({
  items: cartItems,
  total: orderTotal
});

const mapDispatchToProps = {
  onIncrease: bookAddedToCart,
  onDecrease: bookRemovedFromCart,
  onDelete: allBooksRemovedFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
