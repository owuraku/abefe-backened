import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getManager } from 'typeorm';

export enum searchTerms {
  like = 'like',
  exact = 'exact',
}

export interface RecordExistsData {
  tableName: string;
  columnToSearch?: string;
  excludeSoftDeleted?: boolean;
  connectionName?: string;
}

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistsInDatabase implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const connection = getManager();
    const data: RecordExistsData = args.constraints[0];
    return connection
      .query(
        `SELECT * from ${data.tableName} WHERE ${
          data.columnToSearch || 'id'
        } = $1 ${
          data.excludeSoftDeleted ? 'AND deleted_at is null' : ''
        }  limit 1`,
        [value],
      )
      .then((result) => {
        if (result[0]) {
          return true;
        }
        return false;
      });
    // return UserRepository.findOneByName(userName).then((user) => {
    //   if (user) return false;
    //   return true;
    // });
  }
}

export function _IsExistingInDatabase(
  values: RecordExistsData,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `${propertyName} doesn't exists in database`,
      },
      constraints: [values],
      validator: ExistsInDatabase,
    });
  };
}
