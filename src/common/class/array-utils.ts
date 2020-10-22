export class ArrayUtils {
  static intersection(arrA: any[], arrB: any[]): any[] {
    return arrA.filter(x => arrB.includes(x));
  }

  static difference(arrA: any[], arrB: any[]): any[] {
    return arrA.filter(x => !arrB.includes(x));
  }
}
