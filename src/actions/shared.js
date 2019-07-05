import { getTest } from '../utils/DataAPI'
import { receivePosts } from './posts'
import { receiveCategories } from './categories'

export const initialTest = () => (dispatch) => {
  return getTest().then(({ posts, categories }) => {
    dispatch(receivePosts(posts))
    dispatch(receiveCategories(categories))
  })
}
