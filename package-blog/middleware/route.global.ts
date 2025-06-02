import { defineNuxtRouteMiddleware, navigateTo } from "#imports"
const redirectRules = new Map<string, string>(Object.entries({
  '/zh/blog/apisix-direct-return-content': '/zh/handbook/apisix/apisix-direct-return-content',
  '/en/blog/apisix-direct-return-content': '/en/handbook/apisix/apisix-direct-return-content'
}))
export default defineNuxtRouteMiddleware((to, from) => {
  if (redirectRules.has(to.path)) {
    return navigateTo(redirectRules.get(to.path), { redirectCode: 301 })
  }
})
