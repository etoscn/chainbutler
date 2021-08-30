export const strHide = (str: string, frontLen: number, endLen: number) => {
  return (
    str?.substring(0, frontLen) + '***' + str?.substring(str.length - endLen)
  );
};
