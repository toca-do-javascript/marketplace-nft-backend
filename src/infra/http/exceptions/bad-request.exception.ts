import HttpException from './http.exception';

export default class BadRequestException extends HttpException {
  constructor(message: string | object) {
    super(message, 400);
  }
}
