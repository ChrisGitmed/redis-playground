const asCallback = (promise) => promise
  .then((data) => [null, data])
  .catch((err) => [err]);

export { asCallback };

