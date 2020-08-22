import { HttpProblemDetailFactory } from '../src';

describe('given HttpProblemDetailsFactory', () => {
  describe('when trying to get not exist type', () => {
    it('throw an Error', () => {
      const factory = new HttpProblemDetailFactory();
      expect(() => factory.get('nonExistedType')).toThrowError();
    });
  });

  describe('when trying to get existed type', () => {
    it('return instance of the problem based on the definition', () => {
      const factory = new HttpProblemDetailFactory();
      const type = 'https://example.com/probs/out-of-credit';
      factory.addDefinition({
        status: 403,
        type,
        title: 'You do not have enough credit.',
      });
      const problem = factory.get(type);
      expect(problem.type).toEqual(type);
    });
  });
});
