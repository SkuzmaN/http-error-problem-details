import { HttpProblemDetail } from './httpProblemDetails';
import { HttpProblemDetailsDefinition } from './httpProblemDetailsDefinition';

export class HttpProblemDetailsFactory {
  private schemas: Map<string, HttpProblemDetailsDefinition> = new Map<
    string,
    HttpProblemDetailsDefinition
  >();

  public addDefinition(data: HttpProblemDetailsDefinition) {
    this.schemas.set(data.type, data);
    return this;
  }

  get(type: string): HttpProblemDetail {
    const data = this.schemas.get(type);
    if (!data) {
      throw new Error(`Can't find ${type} schema`);
    }
    return new HttpProblemDetail(data);
  }
}
