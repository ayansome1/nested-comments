import { useState } from 'react';
import { mockComments } from '../../mock/mock';
import styles from './Comment.module.scss';

const Comment = () => {
  const [comments, setComments] = useState<any>([]);
  const [comment, setComment] = useState('');
  const [isReplySectionEnabled, setIsReplySectionEnabled] = useState<any>({});

  const [replyInputs, setReplyInputs] = useState([]);

  const handleCommentInput = (e) => {
    setComment(e.target.value);
  };

  const handlePostComment = () => {
    if (!comment.length) {
      return;
    }
    setComments((val) => [
      ...val,
      {
        id: Date.now(),
        content: comment,
        isRoot: true,
        children: [],
      },
    ]);
    setComment('');
  };

  const handleCommentInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handlePostComment();
    }
  };

  const handleReplyButtonClick = (commentId) => {
    setIsReplySectionEnabled((oldVal) => ({
      ...oldVal,
      [commentId]: true,
    }));
  };

  const handleReplyInputChange = (id, e) => {
    const obj = {
      [id]: e.target.value,
    };

    setReplyInputs((oldVal) => {
      return { ...oldVal, ...obj };
    });
  };

  const handleCancelClick = (commentId) => {
    setIsReplySectionEnabled((oldVal) => ({
      ...oldVal,
      [commentId]: false,
    }));

    const obj = {
      [commentId]: '',
    };
    setReplyInputs((oldVal) => {
      return { ...oldVal, ...obj };
    });
  };

  const handleSaveClick = (commentId) => {
    setIsReplySectionEnabled((oldVal) => ({
      ...oldVal,
      [commentId]: false,
    }));

    const newReply = {
      id: Date.now(),
      content: replyInputs[commentId],
      isRoot: false,
      children: [],
    };

    const commentsClone = structuredClone(comments);

    console.log('commentsClone', commentsClone);
    console.log('commentId', commentId);
    console.log('newReply', newReply);

    const updatedCommentsClone = commentsClone.map((val) => {
      if (val.id === commentId) {
        return {
          ...val,
          children: [...val.children, newReply.id],
        };
      } else {
        return val;
      }
    });
    updatedCommentsClone.push(newReply);
    console.log(updatedCommentsClone);

    setComments(updatedCommentsClone);

    const obj = {
      [commentId]: '',
    };
    setReplyInputs((oldVal) => {
      return { ...oldVal, ...obj };
    });
  };

  const handleReplyInputKeyDown = (id, e) => {
    if (e.key === 'Enter') {
      handleSaveClick(id);
    }
  };

  const getReplySection = (id) => {
    return (
      <>
        <input
          onChange={(e) => handleReplyInputChange(id, e)}
          autoFocus
          onKeyDown={(e) => handleReplyInputKeyDown(id, e)}
        />
        <button onClick={() => handleCancelClick(id)}>Cancel</button>
        <button onClick={() => handleSaveClick(id)}>Save</button>
      </>
    );
  };

  const getReplies = (children) => {
    const replies = comments.filter((val) => children.indexOf(val.id) > -1);
    return replies.map((val) => (
      <div className={styles.reply} key={val.id}>
        {val.content}
        <button onClick={() => handleReplyButtonClick(val.id)}>Reply</button>
        {isReplySectionEnabled[val.id] && getReplySection(val.id)}

        <div>{getReplies(val.children)}</div>
      </div>
    ));
  };

  return (
    <div>
      <input
        onChange={handleCommentInput}
        onKeyDown={handleCommentInputKeyDown}
        value={comment}
        autoFocus
      />{' '}
      <button onClick={handlePostComment}>Post comment</button>
      {comments.map((val) => {
        if (val.isRoot) {
          return (
            <div key={val.id}>
              {val.content}{' '}
              {!isReplySectionEnabled[val.id] && (
                <button onClick={() => handleReplyButtonClick(val.id)}>
                  Reply
                </button>
              )}
              {isReplySectionEnabled[val.id] && getReplySection(val.id)}
              <div>{getReplies(val?.children || [])}</div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Comment;
