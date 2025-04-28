export const updatePageUrl = (page: number) => {
  const url = new URL(window.location.href);
  url.searchParams.set('page', page.toString());
  window.history.pushState({ page }, '', url.toString());
};
