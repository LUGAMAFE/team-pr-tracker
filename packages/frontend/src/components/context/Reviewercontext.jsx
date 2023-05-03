import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const ReviewerContext = createContext({
  reviewers: [],
  setReviewers: null,
  students: [],
  setStudents: null,
  onAddReviewer: null,
  onDeletedStudent: null,
  onAddStudent: null,
  onDeletedReviewer: null,
});

const ReviewerProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const [reviewers, setReviewers] = useState([]);

  const onAddReviewer = (form) => {
    setReviewers((reviewers) => [...reviewers, form]);
  };

  const onAddStudent = (form) => {
    setStudents((students) => [...students, form]);
  };
  // FIXME: Pesima implementación de esta función
  const onDeletedStudent = (students) => {
    setStudents(students);
  };
  // FIXME: Pesima implementación de esta función
  const onDeletedReviewer = (reviewers) => {
    setReviewers(reviewers);
  };

  return (
    <ReviewerContext.Provider
      value={{
        reviewers,
        setReviewers,
        students,
        setStudents,
        onAddReviewer,
        onAddStudent,
        onDeletedStudent,
        onDeletedReviewer,
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
