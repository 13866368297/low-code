import Render from './Render';
import './index.scss';

export default function createRender(materials) {
  return ({ schema }) => {
    return <Render schema={schema} materials={materials} />;
  };
}
