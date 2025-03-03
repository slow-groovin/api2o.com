import { useRoute } from "vue-router";
import { queryCollection, useRuntimeConfig } from '#imports';
import type { HandbookChapterGroup } from "~/lib/models/handbook";


/**
 * 
 * @returns 
 */
export async function useHandbook(locale: 'zh' | 'en') {
  let { params: { book, id } } = useRoute()
  if (!id) {
    id = 'index'
  }
  /**
   * locate article markdown with `_id`
   */
  const markdownItem = await queryCollectionWithPathLike(book as string)
    .where('_id', '=', id)
    .where('_locale', '=', locale)
    .first()

  return {
    /**
     * blog article Promise collection item
     */
    markdownItem,
  }
}


export async function useHandbookOutline(locale: 'zh' | 'en') {

  let { params: { book } } = useRoute()

  /**
   * locate article markdown with `_id`
   */
  const articles = await queryCollectionWithPathLike(book as string)
    .where('_locale', '=', locale)
    .where('_id', '<>', 'index')
    .select('_id', 'title', '_order', '_group')
    .all()
  articles.sort((a, b) => (a._order ?? 0) - (b._order ?? 0))
  let noNameGroup: HandbookChapterGroup = { name: '', chapters: [] }

  let chapterGroups: HandbookChapterGroup[] = []

  articles.forEach(item => {
    const chapter = {
      name: item.title,
      path: `/${locale}/handbook/${book}/${item._id}`
    }
    if (!item._group) {
      noNameGroup.chapters.push(chapter)
      return;
    }

    let group = chapterGroups.find(g => g.name === item._group)
    if (!group) {
      group = { name: item._group, chapters: [] }
      chapterGroups.push(group)
    }
    group.chapters.push(chapter)
  })

  chapterGroups.unshift(noNameGroup)




  return {
    book: book,
    /**
     * chapter groups
     */
    chapterGroups: chapterGroups,
  }
}


/**
 * in current nuxt/content version (3.2.2), value of `path` diffs under source of local and github-repo. 
 * this function is to handle the diff
 * @param book 
 * @returns 
 */
function queryCollectionWithPathLike(book: string) {
  /*
   * using RuntimeConfig but not process.env because browser client-end is query through sqlite wasm (not backend api)
   */
  const {public: {customContentSource}} = useRuntimeConfig()
  return customContentSource === 'github' ?
    queryCollection('handbook').where('path', 'LIKE', `/${book}/%`)
    :
    queryCollection('handbook').where('path', 'LIKE', `/handbook/${book}/%`)

}