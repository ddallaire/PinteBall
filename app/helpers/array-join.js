import { helper } from '@ember/component/helper';

export function arrayJoin([breweries]/*, hash*/) {
  return breweries.map(brewery => brewery.name).join(', ');
}

export default helper(arrayJoin);
