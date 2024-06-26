/**
 * Remove http(s) from link.
 *
 * @param link Link to format.
 * @returns Formatted link.
 * @example removeHttp('https://example.com/') // -> 'example.com/'
 */
export function removeHttp(link: string): string {
  return link.replace(/(^\w+:|^)\/\//, '');
}
