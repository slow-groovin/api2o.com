import { defineNuxtRouteMiddleware } from "#imports"
/*
 * TODO: remove after test
 */
const PREFIX = '[Middleware: route debug]'
export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    console.debug(PREFIX, 'Navigation triggered', from.path, '==>', to.path)
  }
})
