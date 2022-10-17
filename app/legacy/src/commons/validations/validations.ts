export const validateCharacterAlphaNumeric = (value: string) =>
   value.replace(/[^a-z\d]+/gi, '')

export const depureNonLetterCharacters = (text: string, quitQuotes = false) => {
  let result = text
  .replace(/\s+/g, ' ')
  .replace(/[´]{2,}/g, '')
  .replace(/(.+)[´]+(.+)/g, '$1$2')
  .replace(/[^a-zA-ZÀ-ÿ ´]+/g, '')
  .trimStart();

  if(quitQuotes) {
    result = result.replace(/[´]+/g, '')
  }

  return result;
}
