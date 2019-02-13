export const FETCH_POSTS_BEGIN   = 'FETCH_POSTS_BEGIN';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const REWRITE_POSTS_ID = 'REWRITE_POSTS_ID';
export const ADD_POSTS_TIME = 'ADD_POSTS_TIME';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_POST = 'ADD_POST';

export const fetchPostsBegin = () => ({
  type: FETCH_POSTS_BEGIN
});

export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts }
});

export const fetchPostsFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: { error }
});

export const rewritePostsId = () => ({
  type: REWRITE_POSTS_ID,
});

export const addPostsTime = () => ({
  type: ADD_POSTS_TIME,
});

export const updatePost = ( post ) => ({
  type: UPDATE_POST,
  payload: { post }
});

export const deletePost = ( id ) => ({
  type: DELETE_POST,
  payload: id
});

export const addPost = ( post ) => ({
  type: ADD_POST,
  payload:  post 
});

export function fetchPosts () {
  console.log('fetchPosts')
  return (dispatch) => {
    dispatch(fetchPostsBegin());
      return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(responce => responce.json())
        .then(data => {dispatch(fetchPostsSuccess(data)); return data})
        .then(setTimeout(() => {dispatch(rewritePostsId())}, 1000))
        .then(setTimeout(() => {dispatch(addPostsTime())}, 1000))
        .catch(error => dispatch(fetchPostsFailure(error)));
  }
}

export const updateOldPost = (post) => {
  console.log('updatePost: ', post);
  return dispatch => dispatch(updatePost(post));
}

export const deleteOldPost = (id) => {
  console.log('deletePost: ', id);
  return dispatch => dispatch(deletePost(id));
}

export const addNewPost = (post) => {
  console.log('addPost: ', post);
  return dispatch => dispatch(addPost(post));
}