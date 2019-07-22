import { receivePosts } from './posts'
import { receiveCategories } from './categories'
import { receiveComments } from './comments'
import { getInitialData } from '../utils/DataAPI'
import { setCurrentUser } from './currentUser'
import { getRandomUser } from '../utils/helpers'

const name = localStorage.getItem('name') || getRandomUser()

export const handleInitialData = () => (dispatch) => {
  return getInitialData().then(({ posts, categories, comments }) => {
    dispatch(receivePosts(posts))
    dispatch(receiveCategories(categories))
    dispatch(receiveComments(comments))
    dispatch(setCurrentUser(name))
  })
}
