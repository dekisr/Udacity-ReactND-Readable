import { receivePosts, resetPosts } from './posts'
import { receiveCategories } from './categories'
import { receiveComments, resetComments } from './comments'
import { setCurrentUser } from './currentUser'
import { isLoadingData } from './loading'
import { getInitialData, resetInitialData } from '../utils/DataAPI'
import { getRandomUser, getUser } from '../utils/helpers'


const userName = getUser() || getRandomUser()
export const handleInitialData = () => (dispatch) => {
  dispatch(isLoadingData(true))
  return getInitialData()
    .then(({ posts, categories, comments }) => {
      dispatch(receiveCategories(categories))
      dispatch(receivePosts(posts))
      dispatch(receiveComments(comments))
      dispatch(setCurrentUser(userName))
      dispatch(isLoadingData(false))
    })
    .catch((err) => {
      dispatch(isLoadingData(false))
      throw new Error(err.message)
    })
}

export const handleResetData = () => (dispatch) => {
  dispatch(isLoadingData(true))
  return resetInitialData()
    .then(({ posts, comments }) => {
      dispatch(resetPosts(posts))
      dispatch(resetComments(comments))
      dispatch(isLoadingData(false))
    })
    .catch((err) => {
      dispatch(isLoadingData(false))
      throw new Error(err.message)
    })
}
