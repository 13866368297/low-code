import Builder from './Builder';
import { setMaterials } from './state';

export default function createBuilder(materials) {
  setMaterials(materials);
  return () => <Builder />;
}
