import { useState } from 'react';
import styles from './NestedComment.module.scss';
import { mockComments } from '../../mock/mock';

const Comment = ({ id, content, replies }) => {
  const [commentInput, setCommentInput] = useState('');
  const [isReplyEnabled, setIsReplyEnabled] = useState(false);
  const handleReplyButtonClick = () => {
    setIsReplyEnabled(true);
  };
  const handleCancelButtonClick = () => {
    setIsReplyEnabled(false);
    setCommentInput('');
  };
  const handleSaveButtonClick = () => {
    if (!commentInput.length) {
      return;
    }
    replies.push({
      id: Date.now(),
      content: commentInput,
      replies: [],
    });
    setCommentInput('');
    // refresh();
  };

  const handleInputChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSaveButtonClick();
    }
  };

  return (
    <div>
      {content}
      <button onClick={handleReplyButtonClick}>Reply</button>
      {isReplyEnabled && (
        <>
          <input
            onChange={handleInputChange}
            value={commentInput}
            autoFocus
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleCancelButtonClick}>Cancel</button>
          <button onClick={handleSaveButtonClick}>Save</button>
        </>
      )}
      <div className={styles.reply}>
        {replies?.length > 0 &&
          replies.map((reply) => {
            return (
              <>
                <Comment
                  id={reply.id}
                  content={reply.content}
                  replies={reply.replies || []}
                  // refresh={refresh}
                  key={reply.id}
                />
              </>
            );
          })}
      </div>
    </div>
  );
};

const NestedComment = () => {
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState<any>([]);

  // const refresh = () => {
  // setComments(JSON.parse(JSON.stringify(comments)));
  // };

  const updateReply = (parentId, childId, childContent) => {
    const updatedComments = comments.map((val) => {
      if (parentId === val.id) {
        const newObj = structuredClone(val);
        newObj.replies.push({
          id: Date.now(),
          content: childContent,
          replies: [],
        });
      } else if (val.replies.length > 0) {
        return val;
      }
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.length) {
      return;
    }
    setComments((prevState) => [
      ...prevState,
      {
        id: Date.now(),
        content: commentInput,
        replies: [],
      },
    ]);
    setCommentInput('');
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input onChange={handleInput} value={commentInput} />
        <button type='submit'>Submit</button>
      </form>
      {comments.map((val) => (
        <Comment
          id={val.id}
          content={val.content}
          replies={val.replies}
          // refresh={refresh}
          key={val.id}
        />
      ))}
    </>
  );
};

export default NestedComment;
