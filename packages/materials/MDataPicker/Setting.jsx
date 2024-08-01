import { Input, Select, Form } from 'antd';

export default function Setting({ updateProps, components }) {
  const options = components
    .filter(({ type }) => type === 'MLineChart')
    .map(({ name }) => ({ value: name, label: name }));

  const onChangeRelation = (value) => {
    updateProps({ relation: value });
  };

  return (
    <Form autoComplete="off">
      <Form.Item label="目标组件">
        <Select options={options} onChange={onChangeRelation}></Select>
      </Form.Item>
    </Form>
  );
}
