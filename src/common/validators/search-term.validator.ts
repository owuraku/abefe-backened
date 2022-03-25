import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export enum searchTerms {
  like = 'like',
  exact = 'exact',
}

export function _IsSearchTerm(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isSearchTerm',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: "Search term should be 'like' or 'exact'",
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value in searchTerms;
        },
      },
    });
  };
}
