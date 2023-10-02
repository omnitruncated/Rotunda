function parseUrl(urlFormat, urlInstance) {
  const result = {};

  const [path, queryString] = urlInstance.split('?');

  const formatParts = urlFormat.split('/');
  const instanceParts = path.split('/');

  for (let i = 0; i < formatParts.length; i++) {
    if (formatParts[i].startsWith(':')) {
      const key = formatParts[i].substring(1);
      const value = instanceParts[i];

      result[key] = isNaN(value) ? value : Number(value);
    }
  }

  const queryParams = new URLSearchParams(queryString);
  for (const [key, value] of queryParams.entries()) {

    result[key] = isNaN(value) ? value : Number(value);
  }

  return result;
}

module.exports = parseUrl;
