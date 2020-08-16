const compose = (...fns) => (comp) => {
  return fns.reduceRight(
    (wrapped, fn) => fn(wrapped), comp)
};

export default compose;
