import axios from '../../config/axios';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/posts');
    dispatch({ type: 'POPULATE_POSTS', payload: res });
    dispatch({ type: 'STOP_LOADING' });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: 'ERROR', payload: error.response.data });
  }
};

// export const getMyPosts = () => async (dispatch) => {
//   try {
//     const res = await axios.get('/posts/myposts');
//     dispatch({ type: 'POPULATE_POSTS', payload: res });
//     dispatch({ type: 'STOP_LOADING' });
//   } catch (error) {
//     console.log(error.response.data);
//     dispatch({ type: 'ERROR', payload: error.response.data });
//   }
// };

export const detailPost = (slug) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/${slug}`);
    dispatch({ type: 'DETAIL_POST', payload: res });
    dispatch({ type: 'STOP_LOADING' });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: 'ERROR', payload: error.response.data });
  }
};

export const createPost = (newPost, history) => async (dispatch) => {
  try {
    await axios.post('/posts', newPost);
    dispatch({ type: 'STOP_LOADING' });
    history.push('/');
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.response.data });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${postId}`);
    window.location.reload();
    // const res = await axios.get('/posts');
    // dispatch({ type: 'POPULATE_POSTS', payload: res });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.response.data });
  }
};

export const updatePost = (updatePost, postId, history) => async (dispatch) => {
  try {
    await axios.put(`/posts/${postId}`, updatePost);
    dispatch({ type: 'STOP_LOADING' });
    history.push('/');
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.response.data });
  }
};

export const votePost = (postId, value, slug) => async (dispatch) => {
  axios
    .post(`/posts/${postId}/votes`, { value })
    .then(() => {
      axios
        .get(`/posts/${slug}`)
        .then((res) => dispatch({ type: 'DETAIL_POST', payload: res }));
    })
    .catch((error) =>
      dispatch({ type: 'ERROR', payload: error.response.data })
    );
};

export const createAnswer = (postId, comment, slug) => async (dispatch) => {
  axios
    .post(`/posts/${postId}/comments`, { comment })
    .then(() => {
      axios
        .get(`/posts/${slug}`)
        .then((res) => dispatch({ type: 'DETAIL_POST', payload: res }));
    })
    .catch((error) =>
      dispatch({ type: 'ERROR', payload: error.response.data })
    );
};

export const deleteAnswer = (postId, commentId, slug) => async (dispatch) => {
  axios
    .delete(`/posts/${postId}/comments/${commentId}`)
    .then(() => {
      axios
        .get(`/posts/${slug}`)
        .then((res) => dispatch({ type: 'DETAIL_POST', payload: res }));
    })
    .catch((error) =>
      dispatch({ type: 'ERROR', payload: error.response.data })
    );
};

export const voteAnswer =
  (postId, commentId, value, slug) => async (dispatch) => {
    axios
      .post(`/posts/${postId}/comments/${commentId}/votes`, { value })
      .then(() => {
        axios
          .get(`/posts/${slug}`)
          .then((res) => dispatch({ type: 'DETAIL_POST', payload: res }));
      })
      .catch((error) =>
        dispatch({ type: 'ERROR', payload: error.response.data })
      );
  };
