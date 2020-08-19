const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 0
};

const updateCartItems = (cartItems, item, idx) => {
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

const updateCartItem = (book, item = {}) => {

  const {
    id = book.id,
    quantity = 0,
    title = book.title,
    total = 0 } = item;

  return {
    id,
    title,
    quantity: quantity + 1,
    total: total + book.price
  };
};

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
      const { cartItems, books } = state;
      const bookId = action.payload;
      const book = books.find(({id}) => id === bookId);
      const itemIndex = cartItems.findIndex(({id}) => id === bookId);
      const item = cartItems[itemIndex];
      const newItem = updateCartItem(book, item);
      
      return {
        ...state,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
      };

    default:
      return state;
  }
};

export default reducer;
