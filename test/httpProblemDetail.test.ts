import { HttpProblemDetail } from '../src';
import Joi from '@hapi/joi';

export const problemSchema = Joi.object({
  type: Joi.string().required(),
  title: Joi.string().required(),
  status: Joi.number().required(),
}).required();

describe('given HttpProblemDetail', () => {
  describe('when adding additional details', () => {
    let problem: HttpProblemDetail;
    beforeEach(() => {
      problem = new HttpProblemDetail({
        status: 403,
        title: 'You do not have enough credit.',
        type: 'https://example.com/probs/out-of-credit',
      });
    });

    it('throw an error when try to overrite status', () => {
      expect(() => problem.addAdditionalDetail('status', 250)).toThrowError();
    });

    it('throw an error when try to overrite type', () => {
      expect(() =>
        problem.addAdditionalDetail(
          'type',
          'https://example.com/probs/not-enough-minerals'
        )
      ).toThrowError();
    });

    it('throw an error when try to overrite title', () => {
      expect(() =>
        problem.addAdditionalDetail('title', 'Not enough minerals')
      ).toThrowError();
    });
  });

  describe('when parse to JSON', () => {
    let problem: HttpProblemDetail;
    beforeEach(() => {
      problem = new HttpProblemDetail({
        status: 403,
        title: 'You do not have enough credit.',
        type: 'https://example.com/probs/out-of-credit',
      });
    });

    it('return required params - type, title & status', () => {
      expect(() => {
        Joi.assert(problem.toJson(), problemSchema, {
          allowUnknown: true,
        });
      }).not.toThrow();
    });

    it('return additional passed params', () => {
      problem.addAdditionalDetail('lorem', 'ipsum');
      expect(problem.toJson().lorem).toEqual('ipsum');
    });

    it('ignore empty params', () => {
      problem.addAdditionalDetail('lorem', '');
      expect(problem.toJson().lorem).toBe(undefined);
    });
  });
});
