const isEmpty = (value: any) => {
  if (value == null) {
    return true;
  }
  if (!value) {
    return true;
  }
  if (value && Array.isArray(value) && value.length == 0) {
    return true;
  }
  if (typeof value == 'object' && Object.keys(value).length == 0) {
    return true;
  }
  return false;
};
export { isEmpty };
