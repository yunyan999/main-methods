## 校验类公共函数

校验数字，配合 antd 的 form 表单使用

```tsx
import React from 'react';
import { Form, InputNumber, Input } from 'antd';
import { isValidatorNumber, isValidatorCode } from 'main-methods';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';

export default () => {
  return (
    <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Form.Item
        label="数字"
        name="number"
        rules={[
          { required: true, message: '请输入数字' },
          {
            validator: (...args) => {
              isValidatorNumber(...args);
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="名字"
        name="name"
        rules={[
          { required: true, message: '请输入名字' },
          {
            validator: (...args) => {
              isValidatorCode(...args);
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
```
