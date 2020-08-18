import { HttpProblemDetailsDefinition } from './httpProblemDetailsDefinition';

const invalidDetailName = ['type', 'status', 'title'];

export class HttpProblemDetails {
  public readonly type: string;
  public readonly title: string;
  public readonly status: number;
  private additionalDetails: Map<string, any>;

  constructor({ type, title, status }: HttpProblemDetailsDefinition) {
    this.type = type;
    this.title = title;
    this.status = status;
    this.additionalDetails = new Map<string, any>();
  }

  public addAdditionalDetail(key: string, value: any) {
    if (invalidDetailName.includes(key)) {
      throw new Error(`${key} is forbidden details name`);
    }
    if (value) {
      this.additionalDetails.set(key, value);
    }
  }

  toJson(): Record<string, any> {
    const additionalDetails: Record<string, any> = {};
    this.additionalDetails.forEach((value, key) => {
      additionalDetails[key] = value;
    });
    return {
      ...additionalDetails,
      status: this.status,
      title: this.title,
      type: this.type,
    };
  }
}
