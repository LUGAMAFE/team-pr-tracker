import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const ReviewerContext = createContext({
  reviewers: [],
  setReviewers: null,
  members: [],
  setMembers: null,
  onAddReviewer: null,
  deletedMember: null,
  onAddMember: null,
  deletedReviewer: null,
  open: false,
  setOpen: null,
});

const ReviewerProvider = ({ children }) => {
  const [members, setMembers] = useState([]);

  const [reviewers, setReviewers] = useState([]);

  const [open, setOpen] = useState(false);

  const onAddReviewer = (form) => {
    setReviewers((reviewers) => [...reviewers, form]);
  };

  const onAddMember = (form) => {
    setMembers((members) => [...members, form]);
  };
  // FIXME: Pesima implementación de esta función
  const deletedMember = (members) => {
    setMembers(members);
  };
  // FIXME: Pesima implementación de esta función
  const deletedReviewer = (reviewers) => {
    setReviewers(reviewers);
  };

  return (
    <ReviewerContext.Provider
      value={{
        reviewers,
        setReviewers,
        members,
        setMembers,
        onAddReviewer,
        onAddMember,
        deletedMember,
        deletedReviewer,
        open,
        setOpen,
      }}
    >
      {children}
    </ReviewerContext.Provider>
  );
};

ReviewerProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
export { ReviewerProvider };
