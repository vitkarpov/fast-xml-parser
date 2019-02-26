/**
 * Deserialize a string of attributes.
 * Supports the following cases:
 * - normal attribute
 * - no space, invalid but accepted by browsers
 * - without quotes
 * - without values
 */
export function parseAttrs(input: string) {
  if (input.length === 0) {
    return {};
  }

  const parts = input.split(' ');
  const result: Record<string, string> = {};

  for (let i = 0; i < parts.length; i++) {
    const item = parts[i];
    const equalPos = item.indexOf('=');
    const key = equalPos > -1 ? item.substring(0, equalPos) : item;
    let value = equalPos > -1 ? item.substring(equalPos + 1) : 'true';

    if (value[0] === '"') {
      const secondQuotePos = value.indexOf('"', 1);

      if (secondQuotePos < value.length - 1) {
        parts.push(value.substring(secondQuotePos + 1));
      }
      value = value.substring(1, secondQuotePos);
    }
    result[key] = value;
  }

  return result;
}
