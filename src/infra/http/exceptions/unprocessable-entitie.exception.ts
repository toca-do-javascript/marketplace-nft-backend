import HttpException from './http.exception';

export default class UnprocessableEntitieException extends HttpException {
  constructor(message: string | object) {
    super(message, 422);
  }
}
