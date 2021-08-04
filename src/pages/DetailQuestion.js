import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Layout from '../components/Layout';
import { useGlobalContext } from '../context/GlobalContext';
import {
  deletePost,
  detailPost,
  votePost,
} from '../context/actions/postAction';
import dayjs from 'dayjs';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import QuestionBox from '../components/QuestionBox';
import Answer from '../components/Answer';
import Modal from '../components/atom/Modal';
dayjs.extend(relativeTime);

const DetailQuestion = () => {
  const { slug } = useParams();
  const {
    postState: { post },
    postDispatch,
    authState: { authenticated, user },
  } = useGlobalContext();

  useEffect(() => {
    detailPost(slug)(postDispatch);
  }, [postDispatch, slug]);

  const voteScore = post?.votes?.reduce(
    (acc, curr) => acc + (curr.value || 0),
    0
  );

  let voteUser;
  if (authenticated) {
    voteUser = post?.votes.find((vote) => vote.user?.id === user?.id);
  }

  //

  return (
    <Layout title={`${post?.title}`}>
      <div className="row">
        <div className="mb-3 col-md-12">
          <h1 style={{ marginBottom: 0 }}>{post?.title}</h1>
          <div className="mt-2">
            <img
              src={post?.user.photo}
              alt="profile"
              className="rounded-circle me-2"
              style={{ width: 32, height: 32 }}
            />
            <span className="me-2">{post?.user.username}</span>
            <small className="text-success">
              &bull; {dayjs(post?.createdAt).fromNow()}
            </small>
          </div>
        </div>
        <div className="col-md-8">
          <div className="px-3 py-4 mb-3 overflow-hidden shadow w-100 card card-post? position-relative">
            {authenticated && user.id === post?.user.id && (
              <div className="top-0 p-2 position-absolute end-0 d-flex align-items-center ">
                <FaTrash
                  className="text-danger"
                  style={{ cursor: 'pointer', marginRight: 12 }}
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                />
                <Link to="/create-post">
                  <FaEdit
                    onClick={() =>
                      postDispatch({ type: 'SET_CURRENT', payload: post?.id })
                    }
                    className="text-primary"
                    style={{ cursor: 'pointer' }}
                  />
                </Link>
              </div>
            )}

            <div className="detail-post">
              <div className="right">
                <TiArrowSortedUp
                  style={{ fontSize: 32, cursor: 'pointer' }}
                  onClick={() =>
                    votePost(post?.id, 1, post?.slug)(postDispatch)
                  }
                  className={`${voteUser?.value === 1 && 'text-success'}`}
                />
                <p className="text-center" style={{ marginBottom: 0 }}>
                  {voteScore}
                </p>
                <TiArrowSortedDown
                  style={{ fontSize: 32, cursor: 'pointer' }}
                  onClick={() =>
                    votePost(post?.id, -1, post?.slug)(postDispatch)
                  }
                  className={`${voteUser?.value === -1 && 'text-danger'}`}
                />
              </div>
              <div className="left">
                <p className="card-text" style={{ fontSize: 14 }}>
                  {post?.body}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <QuestionBox postId={post?.id} slug={post?.slug} />
            </div>
          </div>
          <div className="mt-3 row">
            <div className="col-md-8">
              <h3>Jawaban</h3>
              {post?.comments.length > 0 ? (
                post?.comments.map((comment) => (
                  <Answer
                    comment={comment}
                    postId={post?.id}
                    slug={post?.slug}
                    key={comment.id}
                  />
                ))
              ) : (
                <p>Tidak ada jawaban</p>
              )}
            </div>
          </div>

          {/* Delete modal */}
          <Modal
            title="questions"
            onClick={() => deletePost(post?.id)(postDispatch)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default DetailQuestion;
