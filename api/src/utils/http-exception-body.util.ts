import { isArray, isObject } from 'lodash';

export const createHttpExceptionBody = (
  message: object | string,
  error?: string,
  statusCode?: number,
) => {
  if (!message) {
    return { statusCode, error };
  }
  return isObject(message) && isArray(message)
    ? message
    : { statusCode, error, message };
};
