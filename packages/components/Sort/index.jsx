import { useRef, useEffect } from 'react';

export default function Sort({ scheme, updateSchema, children }) {
  const sortContainer = useRef();

  useEffect(() => {
    const elements = document.querySelectorAll('[data-sort]');
    const topOffsetList = [];
    const topOffsetMap = {};
    const bottomOffsetList = [];
    const bottomOffsetMap = {};

    let offsetX, offsetY, initialMouseX, initialMouseY, initialSort;

    const onMouseDown = (e, sort) => {
      initialSort = sort;
      initialMouseX = e.clientX;
      initialMouseY = e.clientY;

      offsetX = e.target.offsetLeft;
      offsetY = e.target.offsetTop;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      console.log('....onMouseMove', e);
      const diffX = e.clientX - initialMouseX;
      const diffY = e.clientY - initialMouseY;
      const newOffsetX = offsetX + diffX;
      const newOffsetY = offsetY + diffY;

      e.target.style.position = 'absolute';
      e.target.style.left = `${newOffsetX}px`;
      e.target.style.top = `${newOffsetY}px`;
    };

    const onMouseUp = (e) => {
      const diffY = e.clientY - initialMouseY;
      if (diffY > 0) {
      } else {
        const distance = getShortestDistance(offsetY + diffY, topOffsetList);
        const sort = topOffsetList[distance];
        upAdjustSort(initialSort, sort);
      }
      e.target.style.top = {};
    };

    const getShortestDistance = (offsetY, topOffsetList) => {
      let minDiffY;
      let index;
      topOffsetList.forEach((top, i) => {
        if (i === 0) {
          minDiffY = Math.abs(offsetY - top);
          index = i;
        } else {
          const diffY = Math.abs(offsetY - top);
          if (diffY < minDiffY) {
            minDiffY = diffY;
            index = i;
          }
        }
      });
      return topOffsetList[index];
    };

    const upAdjustSort = (sort, toSort) => {
      console.log('sort, toSort', sort, toSort);
    };

    elements.forEach((element) => {
      const { offsetTop, offsetHeight } = element;
      const sort = element.getAttribute('data-sort');
      topOffsetList.push(offsetTop);
      topOffsetMap[offsetTop] = sort;
      const offsetButtom = offsetTop + offsetHeight;
      bottomOffsetList.push(offsetButtom);
      bottomOffsetMap[offsetButtom] = sort;
      element.addEventListener('mousedown', (e) => onMouseDown(e, sort));
    });
  }, []);

  return (
    <div className="sort-container" ref={sortContainer}>
      {scheme.components.map((component) => children(component))}
    </div>
  );
}
