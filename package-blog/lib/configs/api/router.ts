import type {GraphqlOpTypeStr, HttpMethodStr} from "~/lib/models/api-request";

interface Link {
  id: number
  name: string
  url: string
  method: HttpMethodStr|GraphqlOpTypeStr
  type: 'rest'|'graphql'
}

interface Category {
  id: number
  name: string
  expanded: boolean
  links: Link[]
}



export const apiRouters:Category[] = [
  {
    id: 1,
    name: 'sample',
    expanded: true,
    links: [
      { id: 11, name: 'echo', url: '/basic/echo', method:'GET' , type:'rest'},
      { id: 12, name: 'ping', url: '/basic/ping', method:'GET' , type:'rest'},
      { id: 14, name: 'post', url: '/basic/post', method:'POST', type:'rest' },
      { id: 13, name: 'rand/thing', url: '/basic/rand-thing',method:'GET', type:'rest' },
      { id: 15, name: 'jsonplaceholder', url: '/basic/json-placeholder', method:'query' , type:'graphql'},
    ],
  },
]