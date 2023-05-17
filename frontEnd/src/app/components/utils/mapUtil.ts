export function arrayToMap(array: any[]): Map<any, any> {
  let result = new Map<any, any>();

  array.forEach((item) => {
    result.set(item.clave, item.valor);
  });
  return result;
}

export function mapToArray(map: Map<any, any>): any[] {
  let result: any[] = [];

  map.forEach((value, key) => {
    result.push({ clave: key, valor: value });
  });

  return result;
}
