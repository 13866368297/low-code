import { styleObjectToString } from '@lowcode/share';
import { useRef, useEffect } from 'react';
import './index.scss';

export default function Position({ layout, children }) {
  const domRef = useRef();

  useEffect(() => {
    const dom = domRef.current;
    const child = dom.firstChild;
    const style = getComputedStyle(child);
    dom.style = style;
  }, []);

  return (
    <div className="component-layout" style={layout} ref={domRef}>
      {children}
    </div>
  );
}
