import { QueryClient, QueryClientProvider } from 'react-query';
import AppRouter from '../router/AppRouter';
import { ReviewerProvider } from './context/ReviewerContext';
import { ReviewerLayout } from './layout/ReviewerLayout';
const queryClient = new QueryClient();

export const ReviewApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReviewerProvider>
        <ReviewerLayout>
          <AppRouter />
        </ReviewerLayout>
      </ReviewerProvider>
    </QueryClientProvider>
  );
};
