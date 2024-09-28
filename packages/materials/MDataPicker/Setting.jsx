import { Input, Select, Form } from 'antd';

export default function Setting({ updateProps, components }) {
  const options = components
    .reduce((list, component) => {
      if (component.type === 'MLineChart') {
        list.push(component);
      }
      const childComponent = component.children?.find(
        (child) => child.type === 'MLineChart'
      );
      if (childComponent) {
        list.push(childComponent);
      }
      return list;
    }, [])
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
