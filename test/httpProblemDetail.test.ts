import { HttpProblemDetail } from '../src';
import Joi from '@hapi/joi';

export const problemSchema = Joi.object({
  type: Joi.string(),
  title: Joi.string(),
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

  describe('when converting to plain object', () => {
    let problem: HttpProblemDetail;
    let problemSchema: Joi.ObjectSchema<any>;
    beforeEach(() => {
      problem = new HttpProblemDetail({
        status: 403,
        title: 'You do not have enough credit.',
        type: 'https://example.com/probs/out-of-credit',
      });
      problemSchema = Joi.object({
        type: Joi.string().required(),
        title: Joi.string().required(),
        status: Joi.number().required(),
      }).required();
    });

    it('return passed basic params', () => {
      expect(() => {
        Joi.assert(problem.toPlainObject(), problemSchema);
      }).not.toThrow();
    });

    it('return additional passed params', () => {
      const detailName = 'lorem';
      problem.addAdditionalDetail(detailName, 'ipsum');
      expect(() => {
        Joi.assert(
          problem.toPlainObject(),
          problemSchema.concat(
            Joi.object({
              [detailName]: Joi.string().required(),
            })
          )
        );
      }).not.toThrow();
    });

    it('ignore empty params', () => {
      const detailName = 'lorem';
      problem.addAdditionalDetail(detailName, '');
      expect(() => {
        Joi.assert(
          problem.toPlainObject(),
          problemSchema.concat(
            Joi.object({
              [detailName]: Joi.string().forbidden(),
            })
          )
        );
      }).not.toThrow();
    });
  });

  describe("when doesn't provide a type value", () => {
    it('should set type as about:blank', () => {
      const problem = new HttpProblemDetail({
        status: 403,
        title: 'You do not have enough credit.',
      });
      expect(problem.type).toEqual('about:blank');
    });
  });
});
