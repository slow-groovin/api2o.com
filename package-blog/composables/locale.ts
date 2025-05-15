import { useRuntimeConfig, useSwitchLocalePath } from "#imports";

export function useHreflangMetaTags() {

  const { public: { baseUrl } } = useRuntimeConfig()
  const switchLocalePath = useSwitchLocalePath()
  return [
    {
      rel: 'alternate',
      hreflang: 'en',
      href: baseUrl + switchLocalePath('en'),
    },
    {
      rel: 'alternate',
      hreflang: 'zh-CN',
      href: baseUrl + switchLocalePath('zh'),
    }
  ]

}


