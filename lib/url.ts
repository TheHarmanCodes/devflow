import qs from "query-string";

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

/**
 * Adds or replaces one URL query parameter while retaining all other parameters.
 * here params is a string of query parameters, key is the parameter to add or replace, and value is the new value for that parameter.
 * Example parameters: params = "filter=react&sort=asc", key = "filter", value = "angular"
 * Result: "filter=angular&sort=asc"
 */
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  /* https://www.npmjs.com/package/query-string */
  const queryString = qs.parse(params); // url -> json

  // queryString is now an object representation of the query parameters, e.g., { filter: "react", sort: "asc" }
  queryString[key] = value;

  return qs.stringifyUrl({
    // json -> url
    url: window.location.pathname,
    query: queryString,
  });
};

/**
 * Removes selected URL query parameters while retaining the rest.
 * LocalSearch uses this when the user clears its input.
 */
export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key: string) => {
    delete queryString[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true },
  );
};
