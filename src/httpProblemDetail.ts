import { getStatusText } from 'http-status-codes';
import { HttpProblemDetailDefinition } from './httpProblemDetailDefinition';
import { URI, HttpStatusCode, Serializable } from './types';

const forbiddenDetailNames = ['type', 'status', 'title'];

const defaultType = 'about:blank';

export class HttpProblemDetail {
  public readonly type: URI;
  public readonly title?: string;
  public readonly status: HttpStatusCode;
  private readonly additionalDetails: Record<string, any>;

  constructor({
    type = defaultType,
    title,
    status,
  }: HttpProblemDetailDefinition) {
    this.type = type;
    this.status = status;
    this.additionalDetails = {};
    if (title) {
      this.title = title;
    } else if (type === defaultType) {
      this.title = getStatusText(status);
    } else {
      throw new Error(
        `You can only omit title when passing ${defaultType} type`
      );
    }
  }

  public addAdditionalDetail(key: string, value: Serializable) {
    if (forbiddenDetailNames.includes(key)) {
      throw new Error(`${key} is forbidden details name`);
    }
    if (value) {
      this.additionalDetails[key] = value;
    }
  }

  toPlainObject(): Record<string, Serializable> {
    return {
      ...this.additionalDetails,
      status: this.status,
      title: this.title || null,
      type: this.type,
    };
  }
}
