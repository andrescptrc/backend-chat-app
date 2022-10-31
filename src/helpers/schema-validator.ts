import { ObjectSchema } from 'joi';

const schemaValidator = (schema: ObjectSchema<any>) => (payload: unknown) =>
  schema.validate(payload, { abortEarly: false });

export default schemaValidator;
