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
          .map((item) => {
            return {
              name: item.name || item.fileName,
              id: item.id,
            };
          })
          .filter((item) => item.id && item.name);
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
        ]; // 取最后一位

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
          status: 'done' as UploadFileStatus,
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
      data.map((subItem: any) =>
        subItem.id ? subItem : subItem?.response?.data?.[0] || {},
      ),
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

// 封装表单 查询条件的函数
// params:查询数据的对象 必填
// changeValue 需要更改的值 数组  选填 比如时间范围需要更改
// [{
//  from: 必填
//  to: 可以为空，说明不用改名，只改数据格式
//  dataFormat:可以为空，说明数据格式不需要特殊指定,
// }]
// 图片的处理  ，多选数组对象的处理，单选对象的处理,单个时间，时间范围
export const isString = (data: any) => {
  return typeof data == 'string' ? true : false;
};
export const isImageString = (data: any) => {
  return typeof data == 'string' && data.includes('[') && data.includes(']')
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
    data?.label &&
    data?.value
    ? true
    : false;
};
export const isSelectArray = (data: any) => {
  return data &&
    Array.isArray(data) &&
    data.length &&
    data?.[0]?.label &&
    data?.[0]?.value
    ? true
    : false;
};
export const isMoment = (data: any) => {
  return data?._isAMomentObject ? true : false;
};
export const isMomentArray = (data: any) => {
  return data &&
    Array.isArray(data) &&
    data.length &&
    data?.[0]?._isAMomentObject
    ? true
    : false;
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
      let startTime = data?.[0]?.format(
        `${formate ? formate : 'YYYY-MM-DD HH:mm:ss'}`,
      );
      let endTime = data?.[1]?.format(
        `${formate ? formate : 'YYYY-MM-DD HH:mm:ss'}`,
      );
      return Array.of(startTime, endTime);
    }
  } else {
    return undefined;
  }
};
export const handleSingleSelect = (valueItems: any, labelItems: any) => {
  return { label: labelItems, value: valueItems };
};
export const handleMultiSelect = (valueItems: any, labelItems: any) => {
  let arr = [];
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

//处理时间的下发与回显的统一入口函数
export const getMoment = (data: any, dataFormat = '') => {
  if (isDateString(data)) {
    handleStringToMoment(data);
  } else if (isMoment(data) || isMomentArray(data)) {
    handleMomentToString(data, dataFormat);
  } else {
    return undefined;
  }
};
//处理图片的下发与回显的统一入口函数
export const getPicture = (data: any) => {
  if (isUpload(data)) {
    //图片新建下发
    return handlePictureToString(data);
  } else if (isImageString(data)) {
    //图片回显
    return handleStringToPicture(data);
  } else {
    return undefined;
  }
};
// 处理select的入口函数
export const getSelect = (data: any, key = 'value') => {
  const newData = [];
  if (isSelectArray(data)) {
    for (const item of data) {
      newData.push(item[key].toString());
    }
    return newData;
  } else if (isSelectObject(data)) {
    return data?.value;
  } else {
    return undefined;
  }
};
//回显select的入口函数
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
  if (isSelectObject(data) || isSelectArray(data)) {
    return 'select';
  } else if (isPicture(data)) {
    return 'picture';
  } else if (isMoment(data) || isMomentArray) {
    return 'moment';
  } else if (isEmptyArray(data) || isEmptyObject(data)) {
    return 'emptyObject';
  } else {
    return 'other';
  }
};
//多合一
const multiToOne = (data: any, item: any) => {
  if (item.length == 3) {
    let value = data[item?.[0]];
    let label = data[item?.[1]];
    let id = item.length == 3 ? data[item?.[2]] : undefined;
    return { calue: value, label: label, id: id };
  } else {
    return showSelect(data[item?.[0]], data[item?.[1]]);
  }
};
//一拆多
const oneToMulti = (data: any, item: any, newName: any) => {
  let obj = data[item];
  return newName.length == 3
    ? Array.of(obj.value, obj.label, obj.id)
    : Array.of(obj.value, obj.label);
};

export const handleFromData = (data: any, changeValue: any) => {
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
  //处理默认数据
  for (const item in data) {
    if (data.hasOwnProperty(item)) {
      if (!fromArray.includes(item)) {
        params[item] = handleData(data[item]);
      }
    }
  }
  //处理特殊处理数据
  if (fromArray.length) {
    // 修改需要处理的字段
    for (const [index, item] of fromArray.entries()) {
      let newName = toArray?.[index] ? toArray?.[index] : item;
      let newDataFormat = dataFormatArry?.[index] ?? '';
      if (Array.isArray(item) && item.length) {
        //多合一
        params[newName] = multiToOne(data, item);
      } else if (Array.isArray(newName) && newName.length) {
        //一拆多
        let newArr = oneToMulti(data, item, newName);
        params[newName[0]] = newArr[0];
        params[newName[1]] = newArr[1];
        if (newName.length == 3) {
          params[newName[2]] = newArr?.[2];
        }
      } else if (newDataFormat) {
        if (newDataFormat == 'array') {
          params[newName] = Array.of(data[item]);
        } else {
          params[newName] = getMoment(data[item], newDataFormat);
        }
      } else {
        params[newName] = data[item];
      }
    }
  }
};
export const handleData = (data: any, dataFormat = '') => {
  let returnData = undefined;
  switch (requireDataType(data)) {
    case 'select':
      returnData = getSelect(data);
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
export const reverseFromTo = (data: any) => {
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
