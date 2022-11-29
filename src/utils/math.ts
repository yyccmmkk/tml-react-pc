export default class MathBase {
  // 加法
  add(...list: any[]) {
    return list.reduce(MathBase._add);
  }

  // 减法
  subtract(...list: any[]) {
    return list.reduce(MathBase._subtract);
  }

  // 乘法
  multiply(...list: any[]) {
    return list.reduce(MathBase._multiply);
  }

  // 除法
  divide(...list: any[]) {
    return list.reduce(MathBase._divide);
  }

  // 加法
  static _add(n: number | string, m: number | string) {
    const { F, S, T, l1, l2 } = MathBase.getInteger(n, m);
    return (
      (F[0] * T +
        (F[1] * T) / Math.pow(10, l1) +
        S[0] * T +
        (S[1] * T) / Math.pow(10, l2)) /
      T
    );
  }

  // 减法
  static _subtract(n: number | string, m: number | string) {
    const { F, S, T, l1, l2 } = MathBase.getInteger(n, m);
    return (
      (F[0] * T +
        (F[1] * T) / Math.pow(10, l1) -
        S[0] * T -
        (S[1] * T) / Math.pow(10, l2)) /
      T
    );
  }

  // 乘法
  static _multiply(n: number | string, m: number | string) {
    const { F, S, T, l1, l2 } = MathBase.getInteger(n, m);
    return (
      ((F[0] * T + (F[1] * T) / Math.pow(10, l1)) *
        (S[0] * T + (S[1] * T) / Math.pow(10, l2))) /
      T /
      T
    );
  }

  // 除法
  static _divide(n: number | string, m: number | string) {
    const { F, S, T, l1, l2 } = MathBase.getInteger(n, m);
    return (
      (F[0] * T + (F[1] * T) / Math.pow(10, l1)) /
      (S[0] * T + (S[1] * T) / Math.pow(10, l2))
    );
  }

  static numToString(tempArray: any) {
    if (typeof tempArray === 'number') {
      return tempArray.toString();
    }
    return '0';
  }

  static handleNum(n: any) {
    n = n.toString();
    const temp = n.split('.');
    temp.push(temp[1]?.length);
    if (+n < 0) {
      temp[1] = -temp[1];
    }
    return temp;
  }

  static getInteger(n: number | string, m: number | string) {
    n = typeof n === 'string' ? n : MathBase.numToString(n);
    m = typeof m === 'string' ? m : MathBase.numToString(m);
    const F = n.indexOf('.') !== -1 ? MathBase.handleNum(n) : [n, 0, 0],
      S = m.indexOf('.') !== -1 ? MathBase.handleNum(m) : [m, 0, 0],
      l1 = F[2],
      l2 = S[2],
      L = Math.max(l1, l2),
      T = Math.pow(10, L);
    return {
      F,
      S,
      T,
      l1,
      l2,
    };
  }
}

const instance = new MathBase();
const { add, subtract, multiply, divide } = instance;
export { add, subtract, multiply, divide };
