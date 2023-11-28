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

export const groupBy = <T extends object, K extends keyof T>(
  array: T[],
  prop: K,
): { [a in K]: T[] } => {
  const map = new Map<T[K], T[]>();
  array.forEach((element) => {
    const groupName = element[prop];
    const group = map.get(groupName);
    if (!group) {
      map.set(groupName, [element]);
    } else {
      map.set(groupName, [...group, element]);
    }
  });
  return Object.fromEntries(map);
};
