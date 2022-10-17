/**
 * *
 * @author maoyungui
 * @description 主要存放关于表单查询，新建，编辑回显等处理的逻辑
 *
 */
// 表单处理函数
import moment from 'moment';
// image 可以传数组的序列化字符串或者数组 ,数组对象包含两个属性，第一个属性名必须为id,第二个默认name ,叫其他任意名字也可以
export const handleStringToPicture = (image: any) => {
  let data = undefined;
  if (!image) {
    return undefined;
  }
  if (Array.isArray(image) && image.length == 0) {
    return undefined;
  }
  if (image && Array.isArray(image)) {
    data = image;
  } else {
    if (typeof image === 'string') {
      if (image.includes('[') && image.includes(']')) {
        data = JSON.parse(image)
          .map((item: any) => {
            return {
              name: item.name || item.fileName,
              id: item.id,
            };
          })
          .filter((item: any) => item.id && item.name);
      } else {
        data = image
          .split(',')
          .map((item) => {
            return {
              name: `${item}.x`,
              id: item,
            };
          })
          .filter((item) => item.id && item.name);
      }
    }
  }
  if (data.length && !data[0].name) {
    const keysArr = Object.keys(data[0]);
    const oldKey = keysArr[1];
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      obj.name = obj[oldKey];
      delete obj[oldKey];
    }
  }
  if (data && Array.isArray(data)) {
    if (data.length) {
      const imageArr = [];
      for (const item of data) {
        const arr = item.name.split('.');
        let type = 'image/png';
        const imageType = [
          'png',
          'bmp',
          'jpg',
          'jpeg',
          'tif',
          'gif',
          'pcx',
          'tga',
          'exif',
          'fpx',
          'svg',
          'psd',
          'cdr',
          'pcd',
          'dxf',
          'ufo',
          'eps',
          'ai',
          'raw',
          'wmf',
          'webp',
          'avif',
        ];
        // 取最后一位
        const typeValue =
          Array.isArray(arr) && arr.length > 1
            ? arr[arr.length - 1].toLowerCase()
            : undefined;
        if (imageType.indexOf(typeValue) > -1) {
          type = `image/${typeValue}`;
        } else if (typeValue.includes('pdf')) {
          type = 'pdf';
        } else if (typeValue.includes('doc') || typeValue.includes('docx')) {
          type = 'document';
        } else {
          type = typeValue;
        }
        imageArr.push({
          uid: item.id,
          type: type,
          response: {
            data: [
              {
                id: item.id,
                fileName: item.name,
              },
            ],
          },
          status: 'done',
          name: item.name,
          url: '/cloudFile/common/downloadFile?id=' + item.id,
        });
      }
      return imageArr;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
export const handlePictureToString = (data: any) => {
  if (isUpload(data)) {
    return JSON.stringify(
      data.map((item: any) => {
        return {
          id: item?.response?.data?.[0]?.id,
          name: item?.response?.data?.[0]?.fileName,
        };
      }),
    );
  } else {
    return undefined;
  }
};
export const isEmptyArray = (value: any) => {
  return value && Array.isArray(value) && value.length == 0 ? true : false;
};
export const isEmptyObject = (value: any) => {
  return value &&
    Object.prototype.toString.call(value) === '[object Object]' &&
    Object.keys(value).length == 0
    ? true
    : false;
};

export const isString = (data: any) => {
  return typeof data == 'string' ? true : false;
};
export const isImageString = (data: any) => {
  return typeof data == 'string' && data.includes('[{') && data.includes('}]')
    ? true
    : false;
};
export const isDateString = (data: any) => {
  return /\d{4}-\d{1,2}-\d{1,2}/.test(data) ? true : false;
};
export const isObject = (data: any) => {
  return Object.prototype.toString.call(data) === '[object Object]'
    ? true
    : false;
};
export const isSelectObject = (data: any) => {
  return Object.prototype.toString.call(data) === '[object Object]' &&
    data?.label
    ? true
    : false;
};
export const isSelectArray = (data: any) => {
  return data && Array.isArray(data) && data.length && data?.[0]?.label
    ? true
    : false;
};
export const isMoment = (data: any) => {
  if (typeof data == 'object' && !data?.label) {
    // 对象不能是select
    if (data && !Array.isArray(data)) {
      // data不能是数组，否则会报错
      if (data?._isAMomentObject) {
        return true;
      } else if (data?.isValid()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
export const isMomentArray = (data: any) => {
  if (
    data &&
    Array.isArray(data) &&
    data.length &&
    typeof data?.[0] == 'object' &&
    !data?.[0]?.label
  ) {
    if (data?.[0]?._isAMomentObject) {
      return true;
    } else if (data?.[0]?.isValid()) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
// 判断是否是mathjs的格式
export const isMathjs = (data: any) => {
  if (data instanceof Object) {
    if (data?.isBigNumber) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
export const isMomentString = (data: any) => {
  const isTimeString = /\d{4}-\d/.test(data); // 存在2022-5 这样格式的就认为是时间字符串，
  return isTimeString;
};
export const nonEmptyArray = (data: any) => {
  return data && Array.isArray(data) && data.length ? true : false;
};
export const isUpload = (data: any) => {
  return data && Array.isArray(data) && data.length && data?.[0]?.response
    ? true
    : false;
};
export const isPicture = (data: any) => {
  return isUpload(data) || isImageString(data);
};
export const handleMomentToString = (data: any, formate = '') => {
  if (isMoment(data)) {
    if (formate == 'timestamp') {
      return data?.valueOf();
    } else {
      return data?.format(`${formate ? formate : 'YYYY-MM-DD HH:mm:ss'}`);
    }
  } else if (isMomentArray(data)) {
    if (formate == 'timestamp') {
      return Array.of(data?.[0]?.valueOf(), data?.[1]?.valueOf());
    } else {
      const startTime = data?.[0]?.format(
        `${formate ? formate : 'YYYY-MM-DD HH:mm:ss'}`,
      );
      const endTime = data?.[1]?.format(
        `${formate ? formate : 'YYYY-MM-DD HH:mm:ss'}`,
      );
      return Array.of(startTime, endTime);
    }
  } else {
    return undefined;
  }
};
export const handleSingleSelect = (valueItems: any, labelItems: any) => {
  if (!valueItems && !labelItems) {
    // 都是空的时候，返回undefiend
    return undefined;
  } else {
    return { label: labelItems, value: valueItems };
  }
};
export const handleMultiSelect = (valueItems: any, labelItems: any) => {
  const arr = [];
  for (const [index] of valueItems.entries()) {
    arr.push({ value: valueItems[index], label: labelItems[index] });
  }
  return arr;
};
export const handleStringToMoment = (data: any) => {
  if (isDateString(data)) {
    return moment(data);
  } else {
    return undefined;
  }
};
// 处理时间的下发与回显的统一入口函数
const getMoment = (data: any, dataFormat = '') => {
  if (isDateString(data)) {
    return handleStringToMoment(data);
  } else if (isMoment(data) || isMomentArray(data)) {
    return handleMomentToString(data, dataFormat);
  } else if (isMomentString(data)) {
    return moment(data);
  } else {
    return undefined;
  }
};
// 处理图片的下发与回显的统一入口函数
const getPicture = (data: any) => {
  if (isUpload(data)) {
    // 图片新建下发
    return handlePictureToString(data);
  } else if (isImageString(data)) {
    // 图片回显
    return handleStringToPicture(data);
  } else {
    return undefined;
  }
};
// 处理select的入口函数

/**
 ** select  的查询通用处理
 *
 * @param {*} data form提交的表单数据
 * @param {string} [key='value']   指定取{label：carName,value:carId} 里面的value的值还是label的值
 * @return {*} 多选的select  return [id1,id2,id3,...]  单选的select   reutrn id1
 * ! 多选的返回数组  单选的返回字符串
 */
const getSelect = (data: any, key = 'value') => {
  const newData = [];
  if (isSelectArray(data)) {
    for (const item of data) {
      newData.push(item[key].toString());
    }
    return newData;
  } else if (isSelectObject(data)) {
    return data?.value;
  } else {
    return data ? data : undefined;
  }
};
// 回显select的入口函数
export const showSelect = (valueItems: any, labelItems: any) => {
  if (isString(valueItems) && isString(labelItems)) {
    return handleSingleSelect(valueItems, labelItems);
  } else if (Array.isArray(valueItems) && valueItems.length) {
    return handleMultiSelect(valueItems, labelItems);
  } else {
    return undefined;
  }
};
export const requireDataType = (data: any) => {
  if (
    isSelectObject(data) ||
    isSelectArray(data) ||
    (Array.isArray(data) && isString(data?.[0]))
  ) {
    return 'select';
  } else if (isPicture(data)) {
    return 'picture';
  } else if (isMathjs(data)) {
    // mathjs 数据类型
    return 'mathjs';
  } else if (isMoment(data) || isMomentArray(data) || isMomentString(data)) {
    // 处理时间字符串回显时要转换为moment()格式
    return 'moment';
  } else if (isEmptyArray(data) || isEmptyObject(data)) {
    return 'emptyObject';
  } else {
    return 'other';
  }
};

/**
 * *多合一 select 用于的编辑的回显
 *
 * @param {*} data 表单数据对象
 * @param {*} item from属性的字段名
 * @return {*} 输出一个对象{value,label,id(可选)}
 */
const multiToOne = (data: any, item: any) => {
  if (item.length == 3) {
    const value = data[item?.[0]];
    const label = data[item?.[1]];
    const id = item.length == 3 ? data[item?.[2]] : undefined;
    return { value: value, label: label, id: id };
  } else {
    return showSelect(data[item?.[0]], data[item?.[1]]);
  }
};

/**
 * * 一拆多 select  用于新建的下发
 *
 * @param {*} data 表单数据对象
 * @param {*} item from属性的字段名
 * @param {*} newName  to属性，包含字段名的数组
 * @return {*} 输出一个数组[value,label,id(可选)]
 * ! newName  长度可以为2或3  顺序必须是  [value,label,id(可选)]
 *
 */
const oneToMulti = (data: any, item: any, newName: any) => {
  const obj = data[item];
  return newName.length == 3
    ? Array.of(obj.value, obj.label, obj.id)
    : Array.of(obj.value, obj.label);
};
// get 获取mathjs 对象的数据内容
const getMathjs = (value: any) => {
  if (value) {
    if (typeof value == 'number' || typeof value == 'string') {
      return Number(value);
    } else if (value?.d?.[0]) {
      const result = value?.valueOf();
      return Number(result);
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
/**
 **处理表单数据的主入口函数
 **目前支持 下拉框  图片  时间 的数据格式处理    number,string,null这些不会处理  空对象和空数组会转化为undefined
 *TODO 单选框 多选框
 * @param {*} data  必填 form表单提交时候的数据对象
 * @param {*} [changeValue=<any>[]]
 * [{from: 必填,to:为空时必须传入dataFormat以改变数据格式，不为空时，同时会改字段名，dataFormat:可以为空，说明数据格式不需要特殊指定,}]
 * @return {*} 返回处理过的数据对象
 */
const handleFormData = (data: any, changeValue: any) => {
  if (!data || isEmptyObject(data)) {
    return data;
  }
  const params = { ...data };
  const fromArray = [];
  const toArray = [];
  const dataFormatArry = [];
  if (changeValue?.length) {
    for (const i of changeValue) {
      fromArray.push(i?.from);
      toArray.push(i?.to);
      dataFormatArry.push(i?.dataFormat);
    }
  }
  // 处理默认数据
  for (const item in data) {
    if (data.hasOwnProperty(item)) {
      if (!fromArray.includes(item)) {
        params[item] = handleData(data[item]);
      }
    }
  }
  // 处理特殊处理数据
  if (fromArray.length) {
    // 修改需要处理的字段
    for (const [index, item] of fromArray.entries()) {
      const newName = toArray?.[index] ? toArray?.[index] : item;
      const newDataFormat = dataFormatArry?.[index] ?? '';
      if (newDataFormat) {
        if (newDataFormat == 'array') {
          params[newName] = Array.of(data[item]);
        } else {
          // newName 可能是数组，需要判断
          if (newName && Array.isArray(newName) && newName.length == 2) {
            const momentValue = getMoment(data[item], newDataFormat);
            if (!data[item]) {
              //时间范围没有值的时候
              params[item] = undefined; // 删除原有的日期数据
              params[newName[0]] = undefined;
              params[newName[1]] = undefined;
            } else {
              params[item] = undefined; // 删除原有的日期数据
              params[newName[0]] = momentValue?.[0] ?? undefined;
              params[newName[1]] = momentValue?.[1] ?? undefined;
            }
          } else {
            params[item] = undefined;
            params[newName] = getMoment(data[item], newDataFormat);
          }
        }
      } else if (Array.isArray(item) && item.length) {
        // 多合一
        params[newName] = multiToOne(data, item);
      } else if (Array.isArray(newName) && newName.length) {
        // 一拆多
        const newArr = oneToMulti(data, item, newName);
        params[newName[0]] = newArr[0];
        params[newName[1]] = newArr[1];
        if (newName.length == 3) {
          params[newName[2]] = newArr?.[2];
        }
      } else {
        params[newName] = data[item];
      }
    }
  }
  return params;
};
export const handleData = (data: any, dataFormat = '') => {
  let returnData = undefined;
  switch (requireDataType(data)) {
    case 'select':
      returnData = getSelect(data);
      break;
    case 'mathjs':
      returnData = getMathjs(data);
      break;
    case 'moment':
      returnData = getMoment(data, dataFormat);
      break;
    case 'picture':
      returnData = getPicture(data);
      break;
    case 'emptyObject':
      returnData = undefined;
      break;
    default:
      returnData = data;
  }
  return returnData;
};

/**
 *
 *
 * @param {*} data changeValue的值   将from的值与to的值对调
 * @return {*} 反转后的数组
 */
const reverseFromTo = (data: any) => {
  const newData = [];
  for (const item of data) {
    newData.push({
      ...item,
      from: item?.to,
      to: item?.from,
    });
  }
  return newData;
};
const handleArrayToString = (data: any[]) => {
  const obj: any = {};
  for (const item in data) {
    if (data.hasOwnProperty(item)) {
      if (Array.isArray(data[item]) && data[item].length) {
        obj[item] = data[item].toString();
      } else {
        obj[item] = data[item];
      }
    }
  }
  return obj;
};
const getType = (type: any) => {
  return Object.prototype.toString.call(type).slice(8, -1);
};
// 将字符串放进数组中
const getList = (value: string) => {
  return getType(value).toLowerCase() == 'string' ? Array.of(value) : value;
};
const isEmpty = (value: any) => {
  if (value == null) {
    return true;
  }
  if (!value) {
    return true;
  }
  if (value && Array.isArray(value) && value.length == 0) {
    return true;
  }
  if (typeof value == 'object' && Object.keys(value).length == 0) {
    return true;
  }
  return false;
};
export {
  getPicture,
  getSelect,
  getMoment,
  handleFormData,
  reverseFromTo,
  handleArrayToString,
  getType,
  isEmpty,
  getList,
};
