import 
{ 
  ADD_POST,
  UPDATE_POST,
  DELETE_POST
} from './actions'

function postReducer(state={posts: [], backdrop: false, setting: false}, action) {
  switch(action.type) {
    case ADD_POST: 
      const post = state.posts.find(post => post.postId === action.post.postId) ? false : action.post
      if (post) {
        return { ...state, posts: [ action.post, ...state.posts] }
      } else return state
    default: 
      return state
  }
}

export default postReducer