// CSV export of orders, grouped by customer.
const _ = require('lodash');

function ordersToCsv(orders) {
  const rows = _.sortBy(orders, ['customer', 'id']).map(o => [o.id, o.customer, o.total].join(','));
  return ['id,customer,total', ...rows].join('\n');
}

module.exports = { ordersToCsv };
