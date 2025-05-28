import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsValidStatus(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidStatus',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: number) {
          return (value === 0 && !Object.is(value, -0)) || value === 1;
        },
        defaultMessage() {
          return `Status must be either DISABLED (0) or ENABLED (1).`;
        },
      },
    });
  };
}
