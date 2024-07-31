export enum RouteEnum {
  DEFAULT = '/',
  GUEST = '/auth',
  AUTH = '/user',
  TEST = '/category',
  COLLECTION = '/:collectionSlug',
  CATEGORY = '/:collectionSlug/:categorySlug',
  PRODUCT_DETAILS = '/:collectionSlug/:categorySlug/:productSlug',
  HOTDEALS = '/hotdeals',
  SEARCH = '/search',
  REGISTER = '/register',
  LOGIN = '/login',
  FAVORITE = '/user/favorite',
  PROFIL = '/user/profil'
}
