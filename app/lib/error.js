class Err extends Error {
  constructor ({
    message,
    code = 500,
    context = '',
  }) {
    super(message);
    this.code = code;
    this.context = context;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errHandler = (err, next, context = 'No context provided') => {
  if (err instanceof Err) return next(err);
  return next(new Err({
    message: err,
    code: 500,
    context,
  }));
};

export { Err, errHandler };

