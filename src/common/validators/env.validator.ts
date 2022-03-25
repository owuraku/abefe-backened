import * as Joi from '@hapi/joi';

export const ENV_FILE_VALIDATOR = Joi.object({
  DATABASE_NAME: Joi.required(),
  DATABASE_HOST: Joi.required(),
  DATABASE_USER: Joi.required(),
  DATABASE_PASSWORD: Joi.required(),
  DATABASE_TYPE: Joi.required(),
  DATABASE_PORT: Joi.required(),
  IGNORE_ENV: Joi.required(),
  ENV: Joi.required(),
});
