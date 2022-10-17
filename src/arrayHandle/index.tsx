/**
 *@author maoyungui
 *
 * @param {any[]} arr  需要去重的数组
 * @param {string} name 需要针对哪个字段进行去重
 * @return {*} 去重后的数组
 * !数组格式必须为  [{},{},{}]
 */
const uniqueBy = (arr: any[], name: string) => {
  let obj: any = {};
  arr = arr.reduce((prevArr, item) => {
    obj[item[name]] ? '' : (obj[item[name]] = true && prevArr.push(item));
    return prevArr;
  }, []);
  return arr;
};

/**
 *
 *
 * @param {any[]} arr 需要去重的数组
 * @return {*} 去重后的数组
 * !数组格式类似为  ['1','2','2','3']
 */
const unique = (arr: any[]) => {
  return [...new Set(arr)];
};

const List = {
  /**
   *@author maoyungui
   *
   * @param {any[]} arr  需要去重的数组
   * @param {string} name 需要针对哪个字段进行去重
   * @return {*} 去重后的数组
   * !数组格式必须为  [{},{},{}]
   */
  unique: function (arr: any[], name: string) {
    let obj: any = {};
    arr = arr.reduce((prevArr, item) => {
      obj[item[name]] ? '' : (obj[item[name]] = true && prevArr.push(item));
      return prevArr;
    }, []);
    return arr;
  },
  /**
   **寻找对象数组中，满足key值等于value的元素  只返回第一个
   *
   * @param {any[]} arr 需要查询的数组
   * @param {*} value  需要匹配的value值
   * @param {string} key 需要匹配的key值
   * @return {*} 返回满足匹配条件的key所在的对象
   */
  find: function (arr: any[], value: any, key = 'id') {
    if (arr && Array.isArray(arr) && arr.length) {
      let findItem = undefined;
      for (let item of arr) {
        if (item[key] === value) {
          findItem = item;
          break;
        }
      }
      return findItem;
    } else {
      return undefined;
    }
  },
  /**
   **寻找对象数组中，是否存在key值 == value的元素
   *
   * @param {any[]} arr 需要查询的数组
   * @param {*} value  需要匹配的value值
   * @param {string} key 需要匹配的key值
   * @return {*} 返回true or false
   */
  exist: function (arr: any[], value: any, key = 'id') {
    if (arr && Array.isArray(arr) && arr.length) {
      let exist = false;
      for (let item of arr) {
        if (item[key] === value) {
          exist = true;
          break;
        }
      }
      return exist;
    } else {
      return false;
    }
  },
  //写在数组的原型链上就不用定义arr 了 直接可以通过this获取到
  forEach: (fn: any, arr: any, key: string) => {
    if (typeof fn !== 'function') {
      throw new TypeError(`${fn} is not a function`);
    }
    for (var i = 0; i < arr.length; i++) {
      fn(arr[i][key], i, arr);
    }
  },
};
export { uniqueBy, unique, List };
