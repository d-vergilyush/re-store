const updateCartItems = (cartItems, item, idx) => {
  if (idx === -1) {
    return [
      ...cartItems,
      item
    ];
  }
  
  if (item.quantity === 0) {
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1)
    ];
  }

  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ];
};

const updateCartItem = (book, item, quantityDiff) => {

  if (item) {
    return {
      ...item,
      quantity: item.quantity + quantityDiff,
      total: item.total + quantityDiff*book.price
    }
  } 

  return {
    id: book.id,
    title: book.title,
    quantity: 1,
    total: book.price
  };
};

const updateOrderTotal = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.total,
    0
  )
};

const updateOrder = (state, bookId, quantityDiff) => {
  const { 
    bookList: { books },
    shoppingCart: { cartItems }
  } = state;
  
  const book = books.find(({id}) => id === bookId);
  const itemIndex = cartItems.findIndex(({id}) => id === bookId);
  const item = cartItems[itemIndex];
  const currentItem = updateCartItem(book, item, quantityDiff);
  const currentCartItems = updateCartItems(cartItems, currentItem, itemIndex);
  const orderTotal = updateOrderTotal(currentCartItems);
  
  return {
    cartItems: currentCartItems,
    orderTotal
  };
};

const updateShoppingCart = (state, action) => {
  if (state === undefined) {
    return {
      cartItems: [],
      orderTotal: 0
    };
  }

  switch (action.type) {
    case 'BOOKS_ADDED_TO_CART':
      return updateOrder(state, action.payload, 1);
      
    case 'BOOK_REMOVED_FROM_CART':
      return updateOrder(state, action.payload, -1);

    case 'ALL_BOOKS_REMOVED_FROM_CART':
      const { shoppingCart: { cartItems } } = state;
      const item = cartItems.find(({id}) => id === action.payload);
      return updateOrder(state, action.payload, -item.quantity);

    default:
      return state.shoppingCart;
  }
};

export default updateShoppingCart;
