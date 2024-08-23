import Position from '../Position';
import './index.scss';
export default function Card({ layout, visible }) {
  return <>{!visible && <div className="card"></div>}</>;
}
