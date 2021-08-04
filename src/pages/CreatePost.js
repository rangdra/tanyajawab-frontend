import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../components/Layout';
import { createPost, updatePost } from '../context/actions/postAction';
import { useGlobalContext } from '../context/GlobalContext';

const CreatePost = () => {
  const history = useHistory();
  const {
    postDispatch,
    postState: { error, current, posts, loading },
  } = useGlobalContext();
  const [data, setData] = useState({
    title: '',
    body: '',
    tags: '',
  });

  const post = current ? posts.find((post) => post.id === current) : 0;

  useEffect(() => {
    if (post) {
      setData({
        ...data,
        title: post.title,
        body: post.body,
        tags: post.tags.join(','),
      });
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    postDispatch({ type: 'ERROR', payload: null });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title: data.title,
      body: data.body,
      tags: data.tags.split(','),
    };
    if (current) {
      updatePost(newPost, current, history)(postDispatch);
    } else {
      createPost(newPost, history)(postDispatch);
    }
  };

  return (
    <Layout title={`${current ? 'Update' : 'Create'} Post`}>
      <h1>{current ? 'Update' : 'Create'} Post</h1>
      <div className="mt-3 w-100 create-post">
        <form className="p-4 shadow bg-light" onSubmit={handleSubmit}>
          {loading && (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}

          <div className="row">
            <div className="mb-3 col-md-6">
              <div>
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  placeholder="Title"
                  required
                />
                {error?.title && (
                  <small className="text-danger">*{error.title}</small>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <label htmlFor="tags" className="form-label">
                  Tags
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  name="tags"
                  value={data.tags}
                  onChange={handleChange}
                  placeholder="*example react,javascript"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="body" className="form-label">
              Body
            </label>
            <textarea
              className="form-control"
              id="body"
              name="body"
              value={data.body}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            {current ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;
