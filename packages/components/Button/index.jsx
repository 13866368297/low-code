import { Button } from 'antd';
import Position from '../Position';
export default function IButton({
  layout,
  text,
  relation,
  updateComponentStore,
}) {
  const onChangeRelationColor = () => {
    updateComponentStore(relation, (state) => ({
      visible: state.visible !== undefined ? !state.visible : false,
    }));
  };

  return <Button onClick={onChangeRelationColor}>{text || 'Button'}</Button>;
}
