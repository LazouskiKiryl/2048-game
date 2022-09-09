function findIndexes<T>(array: Array<T>, callback: (item: T) => boolean): Array<number> {
  const result = [];

  for (let index = 0; index < array.length; index++) {
    if (callback(array[index])) {
      result.push(index);
    }
  }

  return result;
}

function fillToLength<T, U>(array: Array<T>, length: number, value: U): Array<T | U> {
  const copyArray: Array<T | U> = [...array];
  copyArray.length = length;
  return copyArray.fill(value, array.length);
}

export { findIndexes, fillToLength };
