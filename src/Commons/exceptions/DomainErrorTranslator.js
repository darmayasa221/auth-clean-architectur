const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('can\'t maked new user because not have needed property'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('can\'t maked user because not meet data type specification'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('can\'t maked user because length of the username is more than 50 character'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('can\'t maked user because contain dangerous character at username'),
  'LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('dont\'t be empty'),
  'LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('data of type is not a string'),
};

module.exports = DomainErrorTranslator;
