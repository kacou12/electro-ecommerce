export enum RouteEnum {
  DEFAULT = '/',
  TEST = '/category',
  COLLECTION = '/:collectionSlug',
  CATEGORY = '/:collectionSlug/:categorySlug',
  PRODUCT_DETAILS = '/:collectionSlug/:categorySlug/:productSlug',
  HOTDEALS = '/hotdeals',
  SEARCH = '/search'
}
