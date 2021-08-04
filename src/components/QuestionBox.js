import { useState } from 'react';
import { createAnswer } from '../context/actions/postAction';
import { useGlobalContext } from '../context/GlobalContext';

const AnswerBox = ({ postId, slug }) => {
  const [question, setQuestion] = useState('');
  const { postDispatch } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    createAnswer(postId, question, slug)(postDispatch);
    setQuestion('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="comment" className="form-label h3">
          Tulis Pertanyaan
        </label>
        <textarea
          className="shadow form-control"
          id="comment"
          onChange={(e) => setQuestion(e.target.value)}
          rows="5"
          value={question}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AnswerBox;
