export const depureText = (text: string) =>
  text.replace(/\.?\s+/g, ' ').trimStart();

export const depureEmail = (text: string) =>
  text.replace(/\s+/g, '').toLowerCase();
