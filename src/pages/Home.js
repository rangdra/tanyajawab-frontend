import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/atom/Loading';

import Layout from '../components/Layout';
import PostItem from '../components/PostItem';
import TopQuestions from '../components/TopQuestions';
import { getPosts } from '../context/actions/postAction';
import { useGlobalContext } from '../context/GlobalContext';

const Home = () => {
  const {
    authState: { authenticated },
    postState: { posts, loading },
    postDispatch,
  } = useGlobalContext();

  useEffect(() => {
    getPosts()(postDispatch);
  }, [postDispatch]);

  return (
    <Layout title="StuckNeverflow">
      <div className="mb-2 row">
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className={authenticated && 'all-question-title'}>
              All Questions
            </h1>
            {authenticated && (
              <Link
                to="/create-post"
                className="btn btn-primary"
                onClick={() =>
                  postDispatch({ type: 'SET_CURRENT', payload: 0 })
                }
              >
                Create Question
              </Link>
            )}
          </div>
        </div>
      </div>

      <section className="row home">
        {/* Top Question */}
        <div className="mb-3 col-md-4">
          <TopQuestions />
        </div>
        {/* list qustions */}
        <div className="col-md-8">
          {loading ? (
            <Loading />
          ) : posts.length > 0 ? (
            posts.map((post) => <PostItem post={post} key={post.id} />)
          ) : (
            <p>Post kosong</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
