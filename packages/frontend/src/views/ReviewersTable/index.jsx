import { AddOutlined } from '@mui/icons-material';
import { Alert, Box, Grid, styled } from '@mui/material';
import ReviewerItem from '../../components/ReviewerItem';
import RollMembersButton from '../../components/RollMembersButton';
import AddButton from '../../components/shared/AddButton';
import { useRevisions } from '../../hooks/useRevisions';

const StyledBox = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  minHeight: `calc(100vh - ${theme.spacing(14)})`,
  backgroundColor: '#262254',
  borderRadius: 15,
}));

const StyledGrid = styled(Grid)({
  alignItems: 'center',
  justifyContent: 'center',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 250px))',
  margin: '40px',
  overflow: 'hidden',
});

const ReviewersTable = () => {
  const { data: { revisions } = {}, status, isFetching } = useRevisions();

  if (status === 'loading' || isFetching) {
    return <div className="loader"></div>;
  }

  if (status === 'error') {
    // @ts-ignore
    return <Alert severity="error">Error al cargar los reviewers</Alert>;
  }

  return (
    <StyledBox>
      <StyledGrid container>
        {revisions.map((reviewer, index) => (
          <ReviewerItem
            key={`${index} ${reviewer.id}`}
            name={reviewer.name}
            email={reviewer.email}
            members={reviewer.members}
          />
        ))}

        <AddButton route={'/add-reviewer'} right={3} bottom={2}>
          <AddOutlined sx={{ fontSize: 30 }} />
        </AddButton>
        <RollMembersButton />
      </StyledGrid>
    </StyledBox>
  );
};

export default ReviewersTable;
