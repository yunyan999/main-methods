import { create, all } from 'mathjs';
// 数值求和 ，并支持自定义精度，默认为2
export const forSum = (data: any, precision = 2) => {
  let allCost = undefined;
  // // 先判断是否有空值
  // for (const item of data) {
  //   if (item == undefined || item == null || item === '') {
  //     return undefined;
  //   }
  // }
  const newArray = data.map((currentValue: any) => {
    if (typeof currentValue == 'string') {
      return Number(currentValue);
    } else {
      return currentValue;
    }
  });
  if (newArray && Array.isArray(newArray) && newArray.length) {
    allCost = newArray.reduce((total, currentValue, currentIndex) => {
      if (currentValue == undefined) {
        return total;
      } else {
        if (total == undefined) {
          return currentValue;
        } else {
          return total + currentValue;
        }
      }
    });
  }
  if (typeof allCost == 'number') {
    return Number(allCost.toFixed(precision));
  } else {
    return undefined;
  }
};
//value 数值数组  precision：精度  fixedPercision:是否所有的数值都保留此精度数值
//保留固定精度使用inputNumber组件

export const forMultiplyBy = (value: any, precision = 2) => {
  let flag = false; //是否包含未定义的值
  let result = undefined; //保存的值最后返回精度
  for (let item of value) {
    if (item == undefined || item === '' || item == null) {
      flag = true;
    }
  }
  if (flag) {
    return undefined;
  } else {
    let newArray = value.map((currentValue: any) => {
      return Number(currentValue);
    });
    result = newArray.reduce(
      (total: any, currentValue: any, currentIndex: number) => {
        return total * currentValue;
      },
    );
    return Number(result.toFixed(precision));
  }
};
//用来存放数据处理的对象
//*推荐使用此对象方法，计算返回是number数值
/** @type {*} */
/** @type {*} */
const Math = {
  //求和的保留求和的值的最大精度，限制进行求和的精度
  sum: function (data: any[]) {
    let allCost = undefined;
    const math = create(all, { number: 'BigNumber', precision: 20 });
    const newArray = data.map((currentValue: any) => {
      if (typeof currentValue == 'string') {
        return Number(currentValue);
      } else {
        return currentValue;
      }
    });
    if (newArray && Array.isArray(newArray) && newArray.length) {
      allCost = newArray.reduce((total, currentValue, currentIndex) => {
        if (currentValue == undefined) {
          return total;
        } else {
          if (total == undefined) {
            return currentValue;
          } else {
            return math.add(
              math.bignumber(total),
              math.bignumber(currentValue),
            );
          }
        }
      });
    }
    if (allCost) {
      return Number(allCost.valueOf());
    } else {
      return undefined;
    }
  },
  //乘积需要指定精度
  product: function (value: any, percison = 2) {
    let flag = false; //是否包含未定义的值
    let result = undefined; //保存的值最后返回精度
    const math = create(all, { number: 'BigNumber', precision: 20 });
    for (let item of value) {
      if (item == undefined || item === '' || item == null) {
        flag = true;
      }
    }
    if (flag) {
      return undefined;
    } else {
      let newArray = value.map((currentValue: any) => {
        return Number(currentValue);
      });
      result = newArray.reduce((total: any, currentValue: any) => {
        return math.multiply(
          math.bignumber(total),
          math.bignumber(currentValue),
        );
      });
      if (result) {
        let value = math.round(result, percison);
        return Number(value.valueOf());
      } else {
        return undefined;
      }
    }
  },
};

export { Math };
