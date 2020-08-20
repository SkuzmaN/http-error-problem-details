import { HttpProblemDetailsDefinition } from './httpProblemDetailsDefinition';

const invalidDetailNames = ['type', 'status', 'title'];


export class HttpProblemDetail {
  public readonly type: string;
  public readonly title: string;
  public readonly status: number;
  private additionalDetails: Record<string, any>;

  constructor({ type, title, status }: HttpProblemDetailsDefinition) {
    this.type = type;
    this.title = title;
    this.status = status;
    this.additionalDetails = {}
  }

  public addAdditionalDetail(key: string, value: any) {
    if (invalidDetailNames.includes(key)) {
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
