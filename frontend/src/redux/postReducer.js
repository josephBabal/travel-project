import 
{ 
  ADD_POST
} from './actions'

function postReducer(state=[], action) {
  switch(action.type) {
    case ADD_POST: 
      const post = state.find(post => post.postId === action.post.postId) ? false : action.post
      if (post) {
        return [action.post, ...state]
      } else return state

    default: 
      return state
  }
}

export default postReducer