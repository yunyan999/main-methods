## 一个可以查看多个元素的 select 下拉框选择器

dataContext 数据内容  
showTitleInfo 显示标题
showInfo 显示每行的内容
dataValue 下发的值
dataLabel label 属性 用来回显的

```tsx
import React from 'react';
import { Form } from 'antd';
import { SelectList } from './selectList';
import 'antd/lib/form/style/css';
import 'antd/lib/select/style/css';

export default () => {
  const dataContext = [
    { id: '1', spring: '春天', apple: 'iphone6', other: '2399' },
    { id: '2', spring: '夏天', apple: 'iphone7 plus', other: '2799' },
    { id: '3', spring: '秋天', apple: 'iphone12 pro+', other: '9999' },
  ];

  const onChange = (value: any, option: any) => {
    console.log('查看value属性', value);
    console.log('查看option属性', option);
  };
  return (
    <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Form.Item label="下拉列表的选择框" name="item">
        <SelectList
          dataLabel="spring"
          dataValue="id"
          searchChildren={true}
          dataContext={dataContext}
          dropdownMatchSelectWidth={600}
          dataColumns={[
            { dataIndex: 'spring', title: '季节', width: 150 },
            { dataIndex: 'apple', title: '水果', width: 150 },
            { dataIndex: 'other', title: '其他', width: 150 },
          ]}
          onChange={(value: any, option: any) => {
            onChange(value, option);
          }}
        />
      </Form.Item>
    </Form>
  );
};
```
