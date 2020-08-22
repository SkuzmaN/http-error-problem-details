import { HttpProblemDetail } from './httpProblemDetail';
import { HttpProblemDetailDefinition } from './httpProblemDetailDefinition';

export class HttpProblemDetailFactory {
  private schemas: Map<string, HttpProblemDetailDefinition> = new Map<
    string,
    HttpProblemDetailDefinition
  >();

  public addDefinition(data: HttpProblemDetailDefinition) {
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
