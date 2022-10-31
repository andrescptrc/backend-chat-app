import Joi from 'joi';

import schemaValidator from '@helpers/schema-validator';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'The email must be a string.',
    'string.empty': 'the email must not be empty.',
    'string.email': 'The email is not valid.',
    'any.required': 'The email is required.'
  }),
  password: Joi.string().min(8).max(16).required().messages({
    'string.base': 'The password must be a string.',
    'string.empty': 'the password must not be empty.',
    'string.min': 'The password must have at least 8 characters at minimum.',
    'string.max': 'The password must have 16 characters at maximun.',
    'any.required': 'The password is required.'
  })
});

const validateLogin = schemaValidator(loginSchema);

export default validateLogin;
