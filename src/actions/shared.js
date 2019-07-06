import { getTest } from '../utils/DataAPI'
import { receivePosts } from './posts'
import { receiveCategories } from './categories'
import { receiveComments } from './comments'

export const initialTest = () => (dispatch) => {
  return getTest().then(({ posts, categories, comments }) => {
    dispatch(receivePosts(posts))
    dispatch(receiveCategories(categories))
    dispatch(receiveComments(comments))
  })
}
