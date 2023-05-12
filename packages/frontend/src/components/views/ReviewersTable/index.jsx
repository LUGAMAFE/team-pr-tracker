import { AddOutlined } from '@mui/icons-material';
import { Alert, Box, Grid, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchReviewers } from '../../../utils/fetch';
import { ComponentButton } from '../../common/ComponentButton';
import ReviewerItem from './ReviewerItem';
import { RollMembers } from './RollMembers';

const StyledBox = styled(Box)({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  minHeight: 'calc(100vh - 110px)',
  backgroundColor: '#262254',
  borderRadius: 15,
});

const StyledGrid = styled(Grid)({
  alignItems: 'center',
  justifyContent: 'center',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 250px))',
  margin: '40px',
  overflow: 'hidden',
});

export const ReviewersTable = () => {
  const [reviewItems, setReviewItems] = useState([]);

  const { data, status } = useQuery(['reviewers', 5], fetchReviewers);
  useEffect(() => {
    if (data && data.revisions) {
      const reviewers = data.revisions
        .filter((assignment) => {
          if (assignment.reviewer == null) return false;
          return true;
        })
        .map((assignment) => ({
          id: assignment.reviewer?._id,
          name: assignment.reviewer?.name,
          email: assignment.reviewer?.email,
          members: assignment.members,
        }));
      if (reviewers !== null) {
        reviewers.sort((a, b) => a.name?.localeCompare(b.name));
      }
      setReviewItems(reviewers);
    }
  }, [data, setReviewItems]);

  if (status === 'loading') {
    return <div className="loader">Loading...</div>;
  }

  if (status === 'error') {
    return <Alert severity="error">Error al cargar los reviewers</Alert>;
  }

  return (
    <StyledBox>
      <StyledGrid container>
        {reviewItems.map((reviewer, index) => (
          <ReviewerItem
            key={`${index} ${reviewer.id}`}
            name={reviewer.name}
            email={reviewer.email}
            members={reviewer.members}
          />
        ))}

        <ComponentButton route={'/add-reviewer'} right={20} bottom={37}>
          <AddOutlined sx={{ fontSize: 30 }} />
        </ComponentButton>
        <RollMembers />
      </StyledGrid>
    </StyledBox>
  );
};
