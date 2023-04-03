import {
  Err,
} from '../lib/index.js';


class ErrorMiddleware {
  // VALIDATE
  static handleErr () {
    return async (err, req, res, next) => {
      if (res.headersSent) return next(err);

      // Known Error
      if (err instanceof Err) {
        console.log('|********************************|');
        console.log('  ::: ERR    : ', err.uuid);
        console.log('  ::: CODE   : ', err.code);
        console.log('  ::: CNTX   : ', err.context);
        console.log('  ::: PATH   : ', err.path);
        console.log('  ::: IP     : ', err.ip_address);
        console.log('  ::: U_AG   : ', err.user_agent);
        console.log('  ::: TIME   : ', err.request_time_stamp);
        console.log('  ::: MSG    : ', err.message);
        console.log('|********************************|');
        console.log('  ::: STK    : ', err.stack);
        console.log('|********************************|');
        console.log('');
        console.log('');

        return res.status(err.code).json({ message: err.message });
      }

      // Unknown error
      console.log('|********************************|');
      console.log('  ::: UNKNOWN ');
      console.log('  ::: CODE    : ', err.code);
      console.log('  ::: MSG     : ', err.message);
      console.log('|********************************|');
      console.log('');
      console.log('');

      return res.status(500).json({ message: `Unknown error occurred: ${err.message}` });
    };
  }
}


export { ErrorMiddleware };

