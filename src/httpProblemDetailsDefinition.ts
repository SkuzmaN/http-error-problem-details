import { URI, HttpStatusCode } from './types';

export interface HttpProblemDetailsDefinition {
  type: URI;
  title: string;
  status: HttpStatusCode;
}
