import { useRoute } from "vue-router";
import { queryCollection, queryCollectionItemSurroundings } from '#imports';
import type { HandbookChapterGroup } from "~/lib/models/handbook";


/**
 * 
 * @returns 
 */
export async function useHandbook(locale:'zh'|'en') {

  let { params: { book,id } } = useRoute()
  if(!id){
    id='index'
  }
  /**
   * locate article markdown with `_id`
   */
  const markdownItem = await queryCollection('handbook')
    .where('_id', '=', id)
    .where('path','LIKE',`/handbook/${book}/%`)
    .where('_locale', '=', locale)
    .first()

  const surroundingItems = await queryCollectionItemSurroundings('blog', markdownItem.path ?? '', { fields: ['_id'] })
    .where('_locale', '=', locale)
    .order('date', 'ASC')

  const [previousItem, nextItem] = surroundingItems?? []

  const previous = previousItem ? {
    link: `/${locale}/handbook/${book}/${previousItem._id}`,
    title: previousItem.title
  } : undefined

  const next = nextItem ? {
    link: `/${locale}/handbook/${book}/${nextItem._id}`,
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


export async function useHandbookOutline(locale:'zh'|'en') {

  let { params: { book } } = useRoute()
  
  /**
   * locate article markdown with `_id`
   */
  const articles = await queryCollection('handbook')
    .where('path','LIKE',`/handbook/${book}/%`)
    .where('_locale', '=', locale)
    .select('_id','title','_order','_group')
    .all()

  articles.sort((a,b)=>(a._order??0)-(b._order??0))
  let noNameGroup:HandbookChapterGroup={name:'',chapters:[]}

  let chapterGroups:HandbookChapterGroup[]=[]

  articles.forEach(item=>{
    const chapter={
      name:item.title,
      path:`/${locale}/handbook/${book}/${item._id}`
    }
    if(!item._group){
      noNameGroup.chapters.push(chapter)
      return;
    }

    let group=chapterGroups.find(g=>g.name===item._group)
    if(!group){
      group={name:item._group,chapters:[]}
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


