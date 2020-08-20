import { HttpProblemDetailsDefinition } from './httpProblemDetailsDefinition';

const forbiddenDetailNames = ['type', 'status', 'title'];

type URI = string;
type HttpStatus = number;

export class HttpProblemDetail {
  public readonly type: URI;
  public readonly title: string;
  public readonly status: HttpStatus;
  private additionalDetails: Record<string, any>;

  constructor({ type, title, status }: HttpProblemDetailsDefinition) {
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
