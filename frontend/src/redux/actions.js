export const ADD_POST = "ADD_POST"
export const UPDATE_POST = "UPDATE_POST"
export const DELETE_POST = "DELETE_POST"

export function addPost(post) {
  return { type: ADD_POST, post }
}

export function updatePost(id, title, rating, description, photo) {
  return { type: UPDATE_POST, id, title, rating, description, photo}
}

export function deletePost(post) {
  return { type: DELETE_POST, post}
}