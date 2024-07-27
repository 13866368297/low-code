import Position from '../Position';
import './index.scss';
export default function Card({ layout, color }) {
  return (
    <Position layout={layout}>
      <div className="card" style={{ background: color }}></div>
    </Position>
  );
}
