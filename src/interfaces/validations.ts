import { Schema } from '@hapi/joi';

/** Validations for chart related parameters, e.g. common options. */
export interface IValidations {

  /** Joi schemas. */
  readonly schemas: {

    /** Joi schema. */
    readonly [key: string]: Schema;
  };

  /**
   * Validates the given value by the passend Joi schema. Throws an error if validation fails.
   * @param value Value.
   * @param schema Joi schema.
   * @throws Throws a ValidationError if validation failed.
   */
  validate(value: string | number, schema: Schema);
}
