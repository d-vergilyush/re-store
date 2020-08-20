const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 0
};

const updateCartItems = (cartItems, item, idx) => {
  if (item.quantity === 0) {
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1)
    ];
  }

  if (idx === -1) {
    return [
      ...cartItems,
      item
    ];
  }

  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ];
};

const updateCartItem = (book, item, quantityDiff) => {

  if(item) {
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

const updateOrder = (state, bookId, quantityDiff) => {
  const { cartItems, books } = state;
  
  const book = books.find(({id}) => id === bookId);
  const itemIndex = cartItems.findIndex(({id}) => id === bookId);
  const item = cartItems[itemIndex];
  const newItem = updateCartItem(book, item, quantityDiff);
  
  return {
    ...state,
    cartItems: updateCartItems(cartItems, newItem, itemIndex)
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_SUCCESS":
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      };

    case "FETCH_BOOKS_REQUEST":
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };

    case "FETCH_BOOKS_FAILURE":
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      };

    case "BOOKS_ADDED_TO_CART":
      return updateOrder(state, action.payload, 1);
      
    case "BOOK_REMOVED_FROM_CART":
      return updateOrder(state, action.payload, -1);

    case 'ALL_BOOKS_REMOVED_FROM_CART':
      const item = state.cartItems.find(({id}) => id === action.payload);
      return updateOrder(state, action.payload, -item.quantity);

    default:
      return state;
  }
};

export default reducer;
