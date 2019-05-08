import { getTest } from '../utils/DataAPI'
import { receivePosts } from './posts'

export function initialTest() {
  return(dispatch) => {
    return getTest().then((posts) => {
        dispatch(receivePosts(posts))
        console.log('WHAT',posts)
      })
  }
}
