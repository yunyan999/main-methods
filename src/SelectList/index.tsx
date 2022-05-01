import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import 'antd/lib/select/style/css';
const { Option } = Select;
export const SelectList = (props: any) => {
  const {
    dataContext,
    selectOptions,
    dataLabel,
    dataValue,
    onChange,
    showTitle = true,
    searchChildren = true,
    dataColumns,
    ...rest
  } = props;
  const [dataList, setDataList] = useState([
    { [dataValue]: 'noValue', [dataLabel]: 'noValue' },
    ...dataContext,
  ]);

  const showInfo = (item: any, index: any) => {
    return (
      <>
        {dataColumns.map((subItem: any, index: number) => {
          return (
            <span
              key={index}
              style={{ display: 'inline-block', width: subItem.width }}
            >
              {item[subItem.dataIndex]}
            </span>
          );
        })}
      </>
    );
  };
  const showTitleInfo = () => {
    return (
      <>
        {dataColumns.map((item: any, index: number) => {
          return (
            <span
              key={index}
              style={{ display: 'inline-block', width: item.width }}
            >
              {item.title}
            </span>
          );
        })}
      </>
    );
  };
  return (
    <>
      <Select
        showSearch
        labelInValue={true}
        optionLabelProp="label"
        onChange={(value, option) => {
          onChange && onChange(value, option);
        }}
        filterOption={(input, option) => {
          let optionLabel = option?.label?.toString();
          if (optionLabel == 'noValue') {
            return true;
          } else if (optionLabel?.indexOf(input) != -1) {
            return true;
          } else if (searchChildren) {
            let childrenArray = option?.children?.props?.children;
            let flag = false;
            for (let item of childrenArray) {
              if (item?.props?.children?.indexOf(input) != -1) {
                flag = true;
                break;
              }
            }
            return flag;
          } else {
            return false;
          }
        }}
        {...rest}
      >
                                        
        {Array.isArray(dataList) &&
          dataList.length &&
          dataList.map((item: any, index: number) => {
            if (showTitle) {
              return (
                <Option
                  key={item[dataValue]}
                  value={item[dataValue]}
                  label={item[dataLabel]}
                  data-item={item}
                  disabled={index == 0 ? true : false}
                >
                  {index == 0 ? showTitleInfo() : showInfo(item, index)}
                </Option>
              );
            } else {
              return (
                <Option
                  key={item[dataValue]}
                  value={item[dataValue]}
                  label={item[dataLabel]}
                  data-item={item}
                >
                  {showInfo(item, index)}
                </Option>
              );
            }
          })}
      </Select>
    </>
  );
};
