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
    ...rest
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
        optionFilterProp="label"
        onChange={(value, option) => {
          onChange && onChange(value, option);
        }}
        filterOption={(input, option) => {
          debugger;
          console.log({ input });
          console.log({ option });
        }}
        {...rest}
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
                      key={item[dataValue]}
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
                      key={item[dataValue]}
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
                  key={item[dataValue]}
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
