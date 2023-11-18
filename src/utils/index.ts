export const computeSelectFields = <T extends Record<string, boolean>>(
  selectFields: T,
) => {
  const selectParams: string[] = [];
  Object.entries(selectFields).forEach(([key, isSelected]) => {
    if (isSelected) {
      selectParams.push(key);
    }
  });
  return selectParams.length > 0 ? selectParams.join(",") : "";
};
