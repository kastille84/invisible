
export function logTimeWeather(zipLocArray: string[]) {

}

export function isZip(inputStr: string): boolean {
  if (inputStr.length > 5) {
    return false;
  }

  const isZip = inputStr
    .split("")
    .every(str => {
      return !isNaN(parseInt(str));
    });

  return isZip;
}

