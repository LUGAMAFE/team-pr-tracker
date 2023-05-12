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

  const [open, setOpen] = useState(false);

  return (
    <ReviewerContext.Provider
      value={{
        members,
        setMembers,
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
