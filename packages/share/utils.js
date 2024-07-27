import { isNumber } from 'lodash';

export const styleObjectToString = (style) => {
  return Object.entries(style)
    .map(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${kebabKey}: ${isNumber(value) ? value + 'px' : value};`;
    })
    .join(' ');
};
