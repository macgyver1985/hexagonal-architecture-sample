declare global {
  interface ObjectConstructor {
    overridePropertiesOf<T>(
      fromObject: RecursivePartial<T>,
      toObject: T
    ): T
  }
}

Object.overridePropertiesOf = <T>(
  fromObject: RecursivePartial<T>,
  toObject: T
): T => {
  const newToObject = Object.assign({}, { ...toObject });

  for (const iterator of Object.entries(fromObject)) {
    if (iterator[1] && !Array.isArray(iterator[1]) && typeof (iterator[1]) === 'object') {
      newToObject[iterator[0]] = Object.overridePropertiesOf(iterator[1], newToObject[iterator[0]])
    } else {
      newToObject[iterator[0]] = iterator[1];
    }
  }

  return newToObject;
};

export { };
