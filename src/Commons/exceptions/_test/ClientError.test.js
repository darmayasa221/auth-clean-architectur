const ClientError = require('../ClientError');

describe('A ClinetError Exception', () => {
  it('should throw error when directly use it', () => {
    expect(() => new ClientError('')).toThrowError('can\'t instantiate abstract class');
  });
});
