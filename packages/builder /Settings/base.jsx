import { Input, Select, Form, InputNumber } from 'antd';

export default function IBase({ onChange }) {
  const changeWidth = (value) => {
    onChange({ layout: { width: value } });
  };

  const changeHeight = (value) => {
    onChange({ layout: { height: value } });
  };

  return (
    <Form>
      <Form.Item label="宽度">
        <InputNumber onChange={changeWidth}></InputNumber>
      </Form.Item>
      <Form.Item label="高度">
        <InputNumber onChange={changeHeight}></InputNumber>
      </Form.Item>
    </Form>
  );
}
