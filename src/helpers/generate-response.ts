import { ValidationError } from 'class-validator';

export const generateResponseMiddleware = (
  data: unknown,
  errors: ValidationError[] | undefined
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

export const generateErrorString = (errors: ValidationError[]) => {
  return errors.map(error => Object.values(error.constraints || {})).flat();
};
