import { useRoute } from "vue-router";
import { createError, queryCollection, queryCollectionItemSurroundings, showError } from '#imports';


/**
 * 
 * it will throw a `[nuxt] [useAsyncData] Component is already mounted, please use $fetch instead.` warning in route push because of useAsyncData within async(), but it's ok, just ignore it.
 * @returns 
 */
export async function useBlog(locale:'zh'|'en') {

  let { params: { blogId } } = useRoute()
  if (typeof blogId === 'object' && blogId.length) {
    blogId = blogId[0]
  }
  /**
   * locate article markdown with `_id`
   */
  const markdownItem = await queryCollection('blog')
    .where('_id', '=', blogId)
    .where('_locale', '=', locale)
    .first()

  if(!markdownItem){
    throw createError({statusCode:404})
  }
  const surroundingItems = await queryCollectionItemSurroundings('blog', markdownItem.path ?? '', { fields: ['_id'] })
    .where('_locale', '=', locale)
    .order('date', 'ASC')

  const [previousItem, nextItem] = surroundingItems?? []

  const previous = previousItem ? {
    link: `/${locale}/blog/${previousItem._id}`,
    title: previousItem.title
  } : undefined

  const next = nextItem ? {
    link: `/${locale}/blog/${nextItem._id}`,
    title: nextItem.title
  } : undefined

  return {
    /**
     * blog article Promise collection item
     */
    markdownItem,
    /**
     * previous article's link and title (order by date)
     */
    previous,
    /**
     * next article's link and title (order by date)
     */
    next
  }
}
