import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;
  message = 'The requested resource was not found';
  constructor() {
    super('The resource was not found, route not found');

    // Only because we are extending a built in class.
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
