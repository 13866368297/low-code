import { Input, Select, Form } from 'antd';

export default function Setting({ updateProps, components }) {
  const options = components
    .reduce((list, component) => {
      if (component.type === 'MLineChart' || component.type === 'MCard') {
        list.push(component);
      }
      const childComponent = component.children?.find(
        (child) => child.type === 'MLineChart' || child.type === 'MCard'
      );
      if (childComponent) {
        list.push(childComponent);
      }
      return list;
    }, [])
    .map(({ name }) => ({ value: name, label: name }));

  const onChangeText = (e) => {
    updateProps({ text: e.target.value });
  };

  const onChangeRelation = (value) => {
    updateProps({ relation: value });
  };

  return (
    <Form autoComplete="off">
      <Form.Item label="名称">
        <Input onChange={onChangeText}></Input>
      </Form.Item>

      <Form.Item label="显隐">
        <Select options={options} onChange={onChangeRelation}></Select>
      </Form.Item>
    </Form>
  );
}
