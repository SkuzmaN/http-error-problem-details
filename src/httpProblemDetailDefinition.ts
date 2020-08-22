import { URI, HttpStatusCode } from './types';

export interface HttpProblemDetailDefinition {
  type?: URI;
  title: string;
  status: HttpStatusCode;
}
