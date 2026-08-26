const SITE = 'https://something-blue-productions.com';

type Crumb = { name: string; path: string };

/**
 * BreadcrumbList JSON-LD builder.
 *
 * Pass crumbs starting after Home — Home is prepended automatically.
 * Example: breadcrumbList([{ name: 'Weddings', path: '/weddings' }])
 */
export function breadcrumbList(crumbs: Crumb[]) {
  const full: Crumb[] = [{ name: 'Home', path: '/' }, ...crumbs];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: full.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.path === '/' ? SITE : `${SITE}${c.path}`,
    })),
  };
}
