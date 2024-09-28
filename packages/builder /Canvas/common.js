const indexMap = {};
export const getName = ({ type, name }) => {
  return `${name}(${(indexMap[type] = indexMap[type]
    ? indexMap[type] + 1
    : 1)})`;
};
