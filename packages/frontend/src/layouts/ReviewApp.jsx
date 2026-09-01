import Providers from '../contexts/contextProviders';
import AppRouter from '../router/AppRouter';
import { ReviewerLayout } from './ReviewerLayout';

export const ReviewApp = () => {
  return (
    <Providers>
      <ReviewerLayout>
        <AppRouter />
      </ReviewerLayout>
    </Providers>
  );
};
