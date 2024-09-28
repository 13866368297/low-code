import { materials } from '../state';
import { Button, Tabs } from 'antd';
import { merge } from 'lodash';
import { useRef } from 'react';
import IBase from './base';
import { useCanvasStore } from '../store/canvas';
import { useSchemaStore } from '../store/schema';
import './index.scss';

export default function Setting() {
  const { updatePropsByName, schema } = useSchemaStore();
  const { selectedComponent } = useCanvasStore();
  const props = useRef({});
  const Setting =
    selectedComponent && materials[selectedComponent.type]?.setting;

  const { name } = selectedComponent || {};

  const updateProps = (update) => {
    props.current = merge(props.current, update);
  };

  const onClick = () => {
    updatePropsByName(name, props.current);
  };

  const items = [
    // {
    //   label: '基础配置',
    //   key: 'base',
    //   children: <IBase onChange={updateProps}></IBase>,
    // }, // 务必填写 key
    {
      label: '自定义配置',
      key: 'custom',
      children: (
        <Setting
          key={name}
          updateProps={updateProps}
          components={schema.components}
        ></Setting>
      ),
    },
  ];

  return (
    <div className="settings">
      {Setting ? (
        <>
          <Tabs items={items} key={name}></Tabs>
          <Button onClick={onClick} type="primary">
            确定
          </Button>
        </>
      ) : (
        '请选择组件'
      )}
    </div>
  );
}
