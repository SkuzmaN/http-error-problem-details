import { HttpProblemDetailDefinition } from './httpProblemDetailDefinition';
import { URI, HttpStatusCode } from './types';

const forbiddenDetailNames = ['type', 'status', 'title'];

export class HttpProblemDetail {
  public readonly type: URI;
  public readonly title: string;
  public readonly status: HttpStatusCode;
  private additionalDetails: Record<string, any>;

  constructor({ type, title, status }: HttpProblemDetailDefinition) {
    this.type = type;
    this.title = title;
    this.status = status;
    this.additionalDetails = {};
  }

  public addAdditionalDetail(key: string, value: any) {
    if (forbiddenDetailNames.includes(key)) {
      throw new Error(`${key} is forbidden details name`);
    }
    if (value) {
      this.additionalDetails[key] = value;
    }
  }

  toJson(): Record<string, any> {
    return {
      ...this.additionalDetails,
      status: this.status,
      title: this.title,
      type: this.type,
    };
  }
}
