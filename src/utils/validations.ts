import Joi from '@hapi/joi';

import { IValidations } from '..';

const theme = Joi
  .string()
  .valid('default', 'excel', 'ggplot2', 'quartz', 'vox', 'fivethirtyeight', 'dark', 'latimes', 'urbaninstitute')
  .default('default')
  .required()
  .description('Theme');

const width = Joi
  .number()
  .integer()
  .positive()
  .min(300)
  .max(2000)
  .default(400)
  .required()
  .description('Width');

const height = Joi
  .number()
  .integer()
  .positive()
  .min(300)
  .max(2000)
  .default(400)
  .required()
  .description('Height');

const padding = Joi
  .number()
  .integer()
  .min(0)
  .max(50)
  .default(5)
  .required()
  .description('Padding');

const title = Joi
  .string()
  .max(100)
  .trim()
  .default('Chart')
  .required()
  .description('Title');

function validate(value: string | number, schema: Joi.Schema) {
  try {
    Joi.assert(value, schema);
  } catch (e) {
    throw e;
  }
}

export const validations: IValidations = {
  schemas: {
    theme,
    width,
    height,
    padding,
    title
  },
  validate
};
