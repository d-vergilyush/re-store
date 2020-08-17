const booksLoaded = (newBooks) => ({
  type: "BOOKS_LOADED",
  payload: newBooks
});

const booksRequested = () => ({
  type: "BOOKS_REQUESTED",
});

const booksFetchError = (error) => ({
  type: "BOOKS_FETCH_ERROR",
  payload: error
});

export {
  booksLoaded,
  booksRequested,
  booksFetchError
};
