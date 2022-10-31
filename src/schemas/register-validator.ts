import schemaValidator from '@helpers/schema-validator';
import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(24).required().messages({
    'string.base': 'The name must be a string.',
    'string.min': 'The name must have at least 3 characters at minimum.',
    'string.max': 'The name must have 24 characters at maximun.',
    'any.required': 'The name is required.'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'The email must be a string.',
    'string.empty': 'the email must not be empty.',
    'string.email': 'The email is not valid.',
    'any.required': 'The email is required.'
  }),
  password: Joi.string().min(8).max(16).required().messages({
    'string.base': 'The password must be a string.',
    'string.empty': 'the password must not be empty.',
    'string.min': 'The password must have at least 8 characters.',
    'string.max': 'The password must not exceed the 16 characters.',
    'any.required': 'The password is required.'
  }),
  phone_number: Joi.string().min(8).max(16).messages({
    'string.base': 'The phone_number must be a string.',
    'string.empty': 'the phone_number must not be empty.',
    'string.min': 'The phone_number must have at least 8 characters.',
    'string.max': 'The phone_number must not exceed the 16 characters.'
  })
});

const validateRegister = schemaValidator(registerSchema);

export default validateRegister;
