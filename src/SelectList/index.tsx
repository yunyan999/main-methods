import React from 'react';
import { Select } from 'antd';
import 'antd/lib/select/style/css';
const { Option } = Select;
export const SelectList = (props: any) => {
  const {
    dataContext,
    selectOptions,
    dataLabel,
    dataValue,
    showInfo,
    showTitleInfo,
    onChange,
  } = props;
  return (
    <>
      <Select
        placeholder={selectOptions?.placeholder ?? '请选择'}
        showSearch
        style={selectOptions?.style ?? { width: '100%' }}
        labelInValue={true}
        dropdownMatchSelectWidth={
          selectOptions?.dropdownMatchSelectWidth ?? 600
        }
        optionLabelProp="label"
        filterOption={(input, option) => {
          let length = 0,
            data = [],
            flag = false;

          if (
            option &&
            Array.isArray(option.children) &&
            option.children.length != 0
          ) {
            length = option.children.length;
            data = option.children;
          } else if (
            option &&
            Array.isArray(option.children.props.children) &&
            option.children.props.children.length != 0
          ) {
            length = option.children.props.children.length;
            data = option.children.props.children;
          }
          if (length) {
            for (let item of data) {
              if (item?.props && item?.props?.children) {
                let matchData = item.props.children;
                if (typeof matchData != 'string') {
                  matchData = matchData.toString();
                }
                if (matchData.toLowerCase().indexOf(input.toLowerCase()) >= 0) {
                  flag = true;
                }
              }
            }
          }
          if (flag) {
            return true;
          } else {
            return false;
          }
        }}
        onChange={(value, option) => {
          onChange(value, option);
        }}
      >
                                        
        {dataContext &&
          dataContext.map((item: any, index: number) => {
            if (showTitleInfo) {
              if (index == 0) {
                return (
                  <>
                    <Option key={'noValue'} value={'noValue'} disabled={true}>
                      {showTitleInfo()}
                    </Option>
                    <Option
                      key={index}
                      value={item[dataValue]}
                      label={item[dataLabel]}
                    >
                      {showInfo(item, index)}
                    </Option>
                  </>
                );
              } else {
                return (
                  <>
                    <Option
                      key={index}
                      value={item[dataValue]}
                      label={item[dataLabel]}
                    >
                      {showInfo(item, index)}
                    </Option>
                  </>
                );
              }
            } else {
              return (
                <Option
                  key={index}
                  value={item[dataValue]}
                  label={item[dataLabel]}
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
