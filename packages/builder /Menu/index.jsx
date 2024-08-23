import createRender from '@lowcode/render';
import { useSchemaStore } from '../store/schema';
import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { materials } from '../state';
import './index.scss';
import { SCHEMA_KEY } from '../constant';

export default function Menu() {
  const Render = createRender(materials);
  const { schema, goFoward, goBack } = useSchemaStore();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    window.localStorage.setItem(SCHEMA_KEY, JSON.stringify(schema));
  };

  return (
    <>
      <div className="menu">
        <Button onClick={goBack}>后退</Button>
        <Button onClick={goFoward}>前进</Button>
        <Button onClick={showDrawer}>预览</Button>
        <Button onClick={onSave}>保存</Button>
      </div>
      <Drawer
        title="预览"
        placement="top"
        onClose={onClose}
        open={open}
        height={'100%'}
      >
        <Render schema={schema} />
      </Drawer>
    </>
  );
}
