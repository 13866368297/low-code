import Materials from './Materials';
import Canvas from './Canvas';
import Setting from './Settings';
import Menu from './Menu';
import './index.scss';

function Builder() {
  return (
    <div className="layout">
      <Menu />
      <div className="content">
        <Materials></Materials>
        <Canvas></Canvas>
        <Setting></Setting>
      </div>
    </div>
  );
}

export default Builder;
