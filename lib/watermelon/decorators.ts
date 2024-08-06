import {field} from '@nozbe/watermelondb/decorators';
import {v4 as uuidv4} from 'uuid';

export function number(columnName: string) {
  return field(columnName);
}

export function uuid(columnName: string) {
  return function (target: any, propertyKey: string) {
    field(columnName)(target, propertyKey);

    const originalSetup = target.constructor.prototype._setupColumn;

    target.constructor.prototype._setupColumn = function () {
      if (this[columnName] === undefined) {
        this[columnName] = uuidv4();
      }
      return originalSetup.call(this);
    };
  };
}
