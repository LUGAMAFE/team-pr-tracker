import { Route, Routes } from 'react-router-dom';
import UserInputForm from '../views/AddUserInput/AddUserInput';
import ReviewersTable from '../views/ReviewersTable';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ReviewersTable />} />
      <Route path="/add-reviewer" element={<UserInputForm user="reviewer" />} />
      <Route path="/add-member" element={<UserInputForm user="member" />} />
    </Routes>
  );
};

export default AppRouter;
