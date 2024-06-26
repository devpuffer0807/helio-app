export const copyText = (data: string): void => {
  void navigator.clipboard.writeText(data);
};
