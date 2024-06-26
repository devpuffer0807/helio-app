export const withQueryParams = (
  pathname: string,
  paramName: string,
  value: string | string[],
  type?: string,
): string => {
  const queryParams = new URLSearchParams();
  const values = Array.isArray(value) ? value : [value];

  values.forEach(v => {
    queryParams.append(paramName, v);
  });

  if (type) {
    queryParams.set('type', type);
  }

  return `${pathname}/?${queryParams.toString()}`;
};
