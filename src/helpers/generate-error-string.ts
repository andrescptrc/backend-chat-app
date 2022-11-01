import { ValidationError } from 'joi';

const generateErrorString = (errors: ValidationError) => {
  const errorsArr = errors.details.map(detail => detail.message);
  return errorsArr;
};

export default generateErrorString;
