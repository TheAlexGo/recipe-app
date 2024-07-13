const isAsyncFn = <T extends object>(asyncFn: T): boolean =>
  asyncFn.constructor.name === 'AsyncFunction';

export function catchError<T extends object>(
  target: T,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  function prepareError(e: Error) {
    const oldMessage = e.message;
    const newMessage = `[${target.constructor.name}] ${propertyKey}(): ${oldMessage}`;
    e.stack = e.stack?.replace(oldMessage, newMessage);
    e.message = e.message.replace(oldMessage, newMessage);
  }

  const method = descriptor.value;

  if (isAsyncFn(descriptor.value)) {
    // eslint-disable-next-line no-param-reassign,func-names,@typescript-eslint/no-explicit-any
    descriptor.value = async function (...args: any) {
      try {
        return await method.apply(this, args);
      } catch (error) {
        prepareError(error as Error);
        throw error;
      }
    };
  } else {
    // eslint-disable-next-line no-param-reassign,func-names,@typescript-eslint/no-explicit-any
    descriptor.value = function (...args: any) {
      try {
        return method.apply(this, args);
      } catch (error) {
        prepareError(error as Error);
        throw error;
      }
    };
  }

  return descriptor;
}
