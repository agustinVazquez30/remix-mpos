export const redirect = (url: string) => {
  const element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('target', '_blank');
  element.click();
};
