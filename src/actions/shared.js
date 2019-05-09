import { getTest } from '../utils/DataAPI'
import { receivePosts } from './posts'
import { receiveCategories } from './categories'

export function initialTest() {
  return (dispatch) => {
    return getTest().then(({ posts, categories }) => {
      // const format = posts.reduce((acc, item) => {
      //   acc[item.id] = item
      //   return acc
      // }, {})
      // const format = {}
      // for (const item of posts) {
      //   format[item.id] = item
      // }
      dispatch(receivePosts(posts))
      dispatch(receiveCategories(categories))
      console.log('WOOT', categories)
    })
  }
}
