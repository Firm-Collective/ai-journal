interface QueryParams {
  [key: string]: string;
}

/**
 * This function parses the string to obtain values for setting the session. It will
 * extract parameters after the end of the app scheme + path
 * @param deepLinkWithAuthString string to be parsed
 * @returns QueryParams
 */
export default function parseAuthURLString(deepLinkWithAuthString: string) {
  const pairs = deepLinkWithAuthString.split('#');
  const queryParams: QueryParams = {};

  for (let i = 1; i < pairs.length; i++) {
    const currElement = pairs[i];

    const nPairs = currElement.split('&');

    nPairs.forEach(pair => {
      const [key, value] = pair.split('=');

      if (key && value) {
        queryParams[key] = value;
      }
    });
  }
  return queryParams;
}
