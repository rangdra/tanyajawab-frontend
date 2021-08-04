import axios from '../config/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

const TopQuestions = () => {
  const [postsTop, setPostsTop] = useState([]);
  const {
    postState: { posts },
  } = useGlobalContext();

  useEffect(() => {
    axios.get('/posts/top_questions').then((res) => setPostsTop(res));
  }, []);
  return (
    <div className="shadow card">
      <div className="card-header">Top Questions</div>
      <ul className="list-group list-group-flush">
        {postsTop.map((post) => (
          <li className="list-group-item" key={post.id}>
            <Link
              to={`/detail/${post.slug}`}
              key={post.id}
              className="link-btn"
            >
              {post.title} (
              {post.votes.reduce((acc, curr) => acc + (curr.value || 0), 0)})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopQuestions;
