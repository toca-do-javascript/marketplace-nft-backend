export default class HttpException extends Error {
  name: string;
  message: string;
  status: number;
  stack?: string | undefined;
  cause?: unknown;

  constructor(message: string | object, status: number, cause?: unknown) {
    super();

    this.name = 'HttpException';
    this.message = JSON.stringify(
      typeof message === 'string'
        ? {
          message,
          status,
        }
        : message
    );
    this.status = status;
    this.cause = cause;
  }
}
