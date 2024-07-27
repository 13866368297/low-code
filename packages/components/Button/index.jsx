import { Button } from 'antd';
import Position from '../Position';
export default function IButton({
  layout,
  text,
  relation,
  updateComponentStore,
}) {
  const onChangeRelationColor = () => {
    updateComponentStore(relation, { color: 'red' });
  };

  return (
    <Position layout={layout}>
      <Button onClick={onChangeRelationColor}>{text || 'Button'}</Button>
    </Position>
  );
}
