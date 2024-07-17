// remix-run.d.ts

declare module '@remix-run/router' {
  import type {
    AgnosticIndexRouteObject as AgnosticIndexRouteObjectOriginal,
    AgnosticNonIndexRouteObject as AgnosticNonIndexRouteObjectOriginal
  } from '@remix-run/router/dist'

  type Handle = {
    foo?: string
  }

  export interface AgnosticIndexRouteObject
    extends AgnosticIndexRouteObjectOriginal {
    handle: Handle
  }

  export interface AgnosticNonIndexRouteObject
    extends AgnosticNonIndexRouteObjectOriginal {
    handle: Handle
  }

  export * from '@remix-run/router/dist'
}
