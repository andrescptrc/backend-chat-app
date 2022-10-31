import { ValidationError } from 'joi';

export const generateResponseMiddleware = (
  data: unknown,
  errors: ValidationError | undefined
) => {
  if (!data && errors) {
    return {
      response: 'fail',
      data: {},
      errors: generateErrorString(errors)
    };
  }

  return {
    response: 'ok',
    data,
    errors: []
  };
};

export const generateResponseController = (
  data: unknown,
  errors: string[] | undefined
) => {
  if (!data && errors) {
    return {
      response: 'fail',
      data: {},
      errors
    };
  }

  return {
    response: 'ok',
    data,
    errors: []
  };
};

export const generateErrorString = (errors: ValidationError) => {
  const errorsArr = errors.details.map(detail => detail.message);
  return errorsArr;
};
