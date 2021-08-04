import { useGlobalContext } from '../context/GlobalContext';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { FaTrash } from 'react-icons/fa';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { deleteAnswer, voteAnswer } from '../context/actions/postAction';

dayjs.extend(relativeTime);

const Answer = ({ comment, postId, slug }) => {
  const {
    authState: { authenticated, user },
    postDispatch,
  } = useGlobalContext();

  const voteScore = comment.votes_comment.reduce(
    (acc, curr) => acc + (curr.value || 0),
    0
  );

  let voteCommentUser;
  if (authenticated) {
    voteCommentUser = comment?.votes_comment.find(
      (vote) => vote.user.id === user.id
    );
  }

  return (
    <div className="px-3 py-4 mb-3 overflow-hidden shadow w-100 card card-post position-relative">
      {authenticated && user.id === comment.user.id && (
        <div className="top-0 p-2 position-absolute end-0 d-flex align-items-center ">
          <FaTrash
            className="text-danger"
            style={{ cursor: 'pointer', marginRight: 12 }}
            onClick={() => deleteAnswer(postId, comment.id, slug)(postDispatch)}
          />
        </div>
      )}

      <div className="detail-post">
        <div className="right">
          <TiArrowSortedUp
            style={{ fontSize: 32, cursor: 'pointer' }}
            onClick={() =>
              voteAnswer(postId, comment.id, 1, slug)(postDispatch)
            }
            className={`${voteCommentUser?.value === 1 && 'text-success'}`}
          />
          <p className="text-center" style={{ marginBottom: 0 }}>
            {voteScore}
          </p>
          <TiArrowSortedDown
            style={{ fontSize: 32, cursor: 'pointer' }}
            onClick={() =>
              voteAnswer(postId, comment.id, -1, slug)(postDispatch)
            }
            className={`${voteCommentUser?.value === -1 && 'text-danger'}`}
          />
        </div>
        <div className="left comment">
          <div className="user-comment">
            <img
              src={comment.user.photo}
              className="rounded-circle me-2"
              style={{ width: 32, height: 32 }}
              alt="hmghghn"
            />
            <div className="user-biodata">
              <p className="card-text">{comment.user.fullname}</p>
            </div>
          </div>
          <p
            className="card-text"
            style={{ fontSize: 14, marginBottom: 0, marginTop: 4 }}
          >
            {comment.comment}
          </p>
          <small className="text-muted">
            {dayjs(comment.createdAt).fromNow()}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Answer;
