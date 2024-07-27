import { Input } from 'antd';

export default function Setting({ updateProps }) {
  const onChange = (e) => {
    updateProps({ text: e.target.value });
  };
  return (
    <div>
      <Input onChange={onChange}></Input>
    </div>
  );
}
