import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { deletePost } from '../context/actions/postAction';
import { useGlobalContext } from '../context/GlobalContext';
import Modal from './atom/Modal';

dayjs.extend(relativeTime);

const PostItem = ({ post }) => {
  const {
    authState: { authenticated, user },
    postDispatch,
  } = useGlobalContext();
  const voteScore = post?.votes?.reduce(
    (acc, curr) => acc + (curr.value || 0),
    0
  );

  const location = useLocation();

  console.log(user?.id);
  console.log(post?.user?.id);

  return (
    <>
      <div className="p-3 mb-3 overflow-hidden shadow w-100 card card-post">
        {/* {authenticated && user?.id === post?.user?.id && (
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
        )} */}

        <div className="row">
          <div className="col-3 col-sm-2">
            <div className="text-center h-100 post-left d-flex flex-column justify-content-center">
              <div className="mb-3">
                <h2 className="fs-6">{voteScore}</h2>
                <p style={{ fontSize: 14 }}>Votes</p>
              </div>
              <div className="">
                <h2 className="fs-6">{post?.comments?.length}</h2>
                <p style={{ fontSize: 14 }}>Jawaban</p>
              </div>
            </div>
          </div>
          <div className="col-9 col-sm-10 post-right">
            <div className="card-body">
              <Link
                to={`/detail/${post?.slug}`}
                className="card-title h5 link-btn"
              >
                {post?.title}
              </Link>

              <p className="card-text" style={{ fontSize: 14 }}>
                {post?.body.slice(0, 70)}...
              </p>

              <div className="card-text">
                {post?.tags.map((tag, idx) => (
                  <span className="badge bg-secondary me-2" key={idx}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {authenticated && user?.id === post?.user?.id && (
          <div className="my-2 row">
            <div className="text-center col-12">
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
          </div>
        )}

        {location.pathname !== '/users/profile' && (
          <div className="text-center card-footer">
            <small className="text-muted">
              {dayjs(post?.createdAt).fromNow()}
            </small>
            <Link
              to={
                post?.user?.id === user?.id
                  ? '/users/profile'
                  : `/users/${post?.user?.username}`
              }
              className="link-btn"
            >
              <div className="mt-1 d-flex align-items-center justify-content-center">
                <img
                  src={post?.user?.photo}
                  alt="profile"
                  className="rounded-circle me-2"
                  style={{ width: 32, height: 32 }}
                />
                <p>{post?.user?.username}</p>
              </div>
            </Link>
          </div>
        )}
      </div>
      {/* Delete modal */}
      <Modal
        title="questions"
        onClick={() => deletePost(post?.id)(postDispatch)}
      />
    </>
  );
};

export default PostItem;
