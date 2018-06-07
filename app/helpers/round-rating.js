import { helper } from '@ember/component/helper';

export function roundRating(rating) {
  const decimal = 10;
  return Math.round(rating * decimal) / decimal;
}

export default helper(roundRating);
