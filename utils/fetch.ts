export const makeRequest = (
  url: string,
  params: Omit<RequestInit, 'signal'> = {},
) => {
  const controller = new AbortController();
  return {
    controller,
    request: fetch(url, {
      ...params,
      signal: controller.signal,
    }),
  };
};
