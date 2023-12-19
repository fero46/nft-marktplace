export function deepCopy(object: any): any {
  return JSON.parse(JSON.stringify(object));
}

export function isBlockId(s: string): boolean {
  const regex = RegExp("0x[a-z,0-9]{40}");
  return regex.exec(s) ? true : false;
}

export const isEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export function partition(array: any[], isValid: Function): [any[], any[]] {
  return array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
}
