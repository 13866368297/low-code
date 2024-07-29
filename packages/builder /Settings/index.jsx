import { materials } from '../state';
import { Button } from 'antd';
import { useRef } from 'react';
import { useCanvasStore } from '../store/canvas';
import { useSchemaStore } from '../store/schema';

export default function Setting() {
  const { updatePropsByName, schema } = useSchemaStore();
  const { selectedComponent } = useCanvasStore();
  const props = useRef({});
  const Setting =
    selectedComponent && materials[selectedComponent.type]?.setting;

  const { name } = selectedComponent || {};

  const updateProps = (update) => {
    Object.assign(props.current, update);
  };

  const onClick = () => {
    updatePropsByName(name, props.current);
  };

  return (
    <div className="settings">
      {Setting && (
        <Setting
          key={name}
          updateProps={updateProps}
          components={schema.components}
        ></Setting>
      )}
      <Button onClick={onClick}>确定</Button>
    </div>
  );
}
