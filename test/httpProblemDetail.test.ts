import { HttpProblemDetail } from '../src';
import Joi from '@hapi/joi';

const testProblemDetailDefition = {
  status: 403,
  title: 'You do not have enough credit.',
  type: 'https://example.com/probs/out-of-credit',
};

describe('given HttpProblemDetail', () => {
  describe('when adding additional details', () => {
    let problem: HttpProblemDetail;
    beforeEach(() => {
      problem = new HttpProblemDetail(testProblemDetailDefition);
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

  describe("when doesn't provide type but pass title", () => {
    let problem: HttpProblemDetail;
    beforeEach(() => {
      problem = new HttpProblemDetail({
        status: 403,
        title: 'You do not have enough credit.',
      });
    });

    it('set type as about:blank', () => {
      expect(problem.type).toEqual('about:blank');
    });

    it('use passed title', () => {
      expect(problem.title).toEqual('You do not have enough credit.');
    });
  });

  describe("when doesn't provide type and title", () => {
    it('define title based on the status', () => {
      const problem = new HttpProblemDetail({
        status: 403,
      });
      expect(problem.title).toEqual('Forbidden');
    });

    it('throw an error when use http status code not defined in RFC1945, RFC2616, RFC2518, RFC6585 or RFC7538', () => {
      expect(() => {
        new HttpProblemDetail({
          status: -1,
        });
      }).toThrowError();
    });
  });

  describe("when doesn't pass title", () => {
    it('leave title undefined', () => {
      const problem = new HttpProblemDetail({
        status: 403,
        type: 'https://example.com/probs/out-of-credit',
      });
      expect(problem.title).toEqual(undefined);
    });
  });
});
