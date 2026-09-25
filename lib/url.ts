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
 * Used by LocalSearch after its typing debounce completes.
 */
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const queryString = qs.parse(params);

  queryString[key] = value;

  return qs.stringifyUrl({
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
