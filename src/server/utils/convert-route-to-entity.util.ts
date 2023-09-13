const mapping: Record<string, string> = {
  farms: 'farm',
  'financial-statements': 'financial_statement',
  purchases: 'purchase',
  sales: 'sale',
  users: 'user',
  visits: 'visit',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
