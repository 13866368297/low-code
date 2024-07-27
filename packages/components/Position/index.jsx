import { styleObjectToString } from '@lowcode/share';
import './index.scss';

export default function Position({ layout, children }) {
  return (
    <div className="component-layout" style={layout}>
      {children}
    </div>
  );
}
