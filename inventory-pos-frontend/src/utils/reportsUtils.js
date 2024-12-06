export const formatCurrency = (value) => {
  if (value === null || value === undefined) return "N/A";
  return `£${Number(value).toFixed(2)}`;
};

export const formatValue = (value) => {
  return value || "N/A";
};
