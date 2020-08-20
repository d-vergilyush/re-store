const booksLoaded = (newBooks) => ({
  type: "FETCH_BOOKS_REQUEST",
  payload: newBooks
});

const booksRequested = () => ({
  type: "FETCH_BOOKS_SUCCESS",
});

const booksFetchError = (error) => ({
  type: "FETCH_BOOKS_FAILURE",
  payload: error
});

const fetchBooks = (bookstoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookstoreService
    .getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksFetchError(err)));
}

const bookAddedToCart = (bookId) => ({
  type: "BOOKS_ADDED_TO_CART",
  payload: bookId
});

const bookRemovedFromCart = (bookId) => {
  return {
    type: 'BOOK_REMOVED_FROM_CART',
    payload: bookId
  };
};

const allBooksRemovedFromCart = (bookId) => {
  return {
    type: 'ALL_BOOKS_REMOVED_FROM_CART',
    payload: bookId
  };
};

export {
  fetchBooks,
  bookAddedToCart,
  bookRemovedFromCart,
  allBooksRemovedFromCart
};
