const parseUrl = require('./index.js');

describe('parseUrl', () => {
  it('should correctly parse a given URL instance based on its format', () => {
    const urlFormat = '/:version/api/:collection/:id';
    const urlInstance = '/6/api/listings/3?sort=desc&limit=10';
    const expected = {
      version: 6,
      collection: 'listings',
      id: 3,
      sort: 'desc',
      limit: 10,
    };

    expect(parseUrl(urlFormat, urlInstance)).toEqual(expected);
  });

  it('should handle URLs without query parameters', () => {
    const urlFormat = '/:version/api/:collection';
    const urlInstance = '/6/api/listings';
    const expected = {
      version: 6,
      collection: 'listings',
    };

    expect(parseUrl(urlFormat, urlInstance)).toEqual(expected);
  });
});
