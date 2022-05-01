import { Input } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
const RangeInput = ({ value = {}, onChange }) => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const triggerChange = (changedValue: any) => {
    onChange?.({ start, end, ...value, ...changedValue });
  };
  const onStartNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(start)) {
      return;
    }
    setStart(newNumber);
    triggerChange({ start: newNumber });
  };
  const onEndNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(end)) {
      return;
    }
    setEnd(newNumber);
    triggerChange({ end: newNumber });
  };
  return (
    <div>
      <Input
        className={styles.left}
        placeholder=""
        onChange={onStartNumberChange}
      />
      <Input
        className={styles.split}
        style={{
          width: 30,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none',
        }}
        placeholder="~"
        disabled
      />
      <Input
        className={styles.right}
        placeholder=""
        onChange={onEndNumberChange}
      />
    </div>
  );
};
export { RangeInput };
