import { receivePosts } from './posts'
import { receiveCategories } from './categories'
import { receiveComments } from './comments'
import { setCurrentUser } from './currentUser'
import { getInitialData } from '../utils/DataAPI'
import { getRandomUser } from '../utils/helpers'

const userName = localStorage.getItem('userName') || getRandomUser()

export const handleInitialData = () => (dispatch) => {
  return getInitialData().then(({ posts, categories, comments }) => {
    dispatch(receivePosts(posts))
    dispatch(receiveCategories(categories))
    dispatch(receiveComments(comments))
    dispatch(setCurrentUser(userName))
  })
}