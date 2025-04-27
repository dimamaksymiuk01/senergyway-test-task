// Функція для оновлення URL при зміні сторінки
export const updatePageUrl = (page: number) => {
  const url = new URL(window.location.href);
  url.searchParams.set('page', page.toString());
  window.history.pushState({ page }, '', url.toString());
};
