/**
 * @author maoyungui
 * @description 整合业务中常用的方法
 * @version 2021-09-20
 * @enum
 *                功能大类         函数名                        核心功能
 *                @校验类          isValidatorNumber             校验数字类型   校验精度,整数长度
 *                @校验类          isValidatorCode               校验数字和字母的组合   校验长度,范围长度
 *                @图片数据类      handlePicture                 将数据处理成可以回显的图片数据
 */


/**
 * 匹配带精度的数字
 * 用法：validator:(...args)=>{isValidatorNumber( ...args)}  2位小数
 * 用法：validator:(...args)=>{isValidatorNumber( ...args,1)} 一位小数
 * 用法：validator:(...args)=>{isValidatorNumber( ...args,1,8)} 一位小数,且整数位最多为8
 */
export const isValidatorNumber = (rule, value, callback, percison=2, intNumberLength) => {
      let reg = new RegExp(`^\\d*(\\\.\\d{1,${percison}})?$`);
      let message = `最多只能输入${percison}位小数`;
      if (!percison) {
        reg = new RegExp(`^\\d*$`);
        message = `请输入整数`;
      } else if (percison && intNumberLength) {
        reg = new RegExp(`^\\d{1,${intNumberLength}}(\\\.\\d{1,${percison}})?$`);
        message = `整数部分最大长度为${intNumberLength},且最多只能输入${percison}位小数`;
      } else if (!percison && intNumberLength) {
        reg = new RegExp(`^\\d{1,${intNumberLength}}$`);
        message = `整数最大长度为${intNumberLength}`;
      }
      if (reg.test(value)) {
        callback();
      }
      callback(message);
    };
    /**
     * 匹配字母和数字的组合
     * 用法：validator:(...args)=>{isValidatorCode(...args)} 只能由数字和字母组成
     * 用法：validator:(...args)=>{isValidatorCode( ...args,10)}  只能由数字和字母组成,且长度最多为10
     * 用法：validator:(...args)=>{isValidatorCode( ...args,10,20)}   只能由数字和字母组成,且长度范围为10~20
     */
    export const isValidatorCode = (rule, value, callback, min, max) =>{
      let reg = '';
      let message = '';
      if (!min && !max) {
        reg = new RegExp(`^[0-9A-Za-z]*$`);
        message = '只能输入字母或数字';
      } else if ((min && !max) || (!min && max)) {
        const length = min || max;
        reg = new RegExp(`^[0-9A-Za-z]{1,${length}}$`);
        message = `只能输入字母或数字,且最大长度为${length}`;
      } else if (min && max) {
        reg = new RegExp(`^[0-9A-Za-z]{${min},${max}}$`);
        message = `只能输入字母或数字,且长度范围为${min}~${max}`;
      }
      if (reg.test(value)) {
        callback();
      }
      callback(message);
    };
    /**
     * 处理图片预览的函数
     * @description image 可以传数组的序列化字符串或者数组
     *              数组对象包含两个属性，第一个属性名必须为id,第二个默认name ,叫其他任意名字也可以
     */
    export const handlePicture = (image)=>{
      let data = undefined;
      if (image && Array.isArray(image)) {
        data = image;
      } else {
        data = JSON.parse(image);
      }
      if (data.length && !data[0].name) {
        const keysArr = Object.keys(data[0]);
        const oldKey = keysArr[1];
    
        for (let i = 0; i < data.length; i++) {
          const obj = data[i];
          obj.name = obj[oldKey];
          delete obj[oldKey];
        }
      }
      if (data && Array.isArray(data)) {
        if (data.length) {
          const imageArr = [];
          for (const item of data) {
            const arr = item.name.split('.');
            let type = 'image/png';
            const imageType = ['png', 'bmp', 'jpg', 'tif', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF', 'webp', 'avif'];
            const typeValue = Array.isArray(arr) && arr.length==2?arr[1]:undefined;
            if (imageType.indexOf(typeValue)>-1) {
              type = `image/${typeValue}`;
            } else if (typeValue.indexOf('pdf')) {
              type = 'pdf';
            } else {
              type = typeValue;
            }
            imageArr.push({
              uid: item.id,
              type: type,
              response: {
                data: [
                  {
                    id: item.id,
                    fileName: item.name,
                  },
                ],
              },
              status: 'done',
              name: item.name,
              url: '/cloudFile/common/downloadFile?id=' + item.id,
            });
          }
          return imageArr;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    };
    /*
        处理枚举对象
    */
    export const getEnumArr = (objArr) => {
      const arr
        = objArr instanceof Array
        && objArr.map((item) => {
          for (const [key, value] of Object.entries(item)) {
            return {
              id: key,
              name: value,
            };
          }
        });
      return arr;
    };