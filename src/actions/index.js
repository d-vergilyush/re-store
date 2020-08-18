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

export {
  fetchBooks
};
