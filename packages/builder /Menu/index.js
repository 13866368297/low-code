import Render from '@lowcode/render';
import { useSchemaStore } from '../store/schema';
import { Button, Drawer } from 'antd';
import { useState } from 'react';
import './index.scss';

export default function Menu() {
  const { schema, goFoward, goBack } = useSchemaStore();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="menu">
        <Button onClick={goBack}>后退</Button>
        <Button onClick={goFoward}>前进</Button>
        <Button onClick={showDrawer}>预览</Button>
      </div>
      <Drawer title="预览" onClose={onClose} open={open} width={1200}>
        <Render schema={schema} />
      </Drawer>
    </>
  );
}
