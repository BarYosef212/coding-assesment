import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CryptoPrices from '../components/CryptoPrices';
import AiInsight from '../components/AiInsight';
import CryptoMeme from '../components/CryptoMeme';
import CryptoNews from '../components/CryptoNews';
import PreferencesModal from '../components/PreferencesModal';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  useDashboard,
  useAiInsight,
  useFeedbacks,
  useOnboarding,
  useSaveFeedback,
} from '../hooks/useApi';
import { Spinner } from '../components/ui/spinner';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: dashboardData, isLoading, error } = useDashboard();
  const { data: aiInsight, isLoading: aiLoading } = useAiInsight();
  const { data: feedbacks = {} } = useFeedbacks();
  const { data: onboardingData } = useOnboarding();
  const saveFeedbackMutation = useSaveFeedback();

  const handleFeedback = async (contentType, contentId, isPositive) => {
    saveFeedbackMutation.mutate({ contentType, contentId, isPositive });
  };

  const userPreferences = dashboardData?.userPreferences;
  const dashboardDataContent = dashboardData?.dashboardData;

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Card className='p-8'>
          <CardContent className='text-center'>
            <Spinner className="size-4 animate-spin" label="Loading dashboard..."/>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto p-8'>
        <Card className='border-destructive'>
          <CardContent className='p-6'>
            <p className='text-destructive'>
              Error: {error.message || 'Failed to load dashboard'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!dashboardDataContent) {
    return (
      <div className='container mx-auto p-8'>
        <Card>
          <CardContent className='p-6'>
            <p className='text-muted-foreground'>No data available</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4 md:p-8 max-w-7xl'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
        <h1 className='text-3xl font-bold'>Welcome, {user?.name}!</h1>
        <div className='flex gap-2'>
          <Button variant='secondary' onClick={() => setIsModalOpen(true)}>
            Preferences
          </Button>
          <Button onClick={logout} variant='outline'>
            Logout
          </Button>
        </div>
      </div>
      {userPreferences?.prices && (
        <CryptoPrices
          handleFeedback={handleFeedback}
          dashboardData={dashboardDataContent}
          feedback={feedbacks.prices}
        />
      )}

      {userPreferences?.insight && (
        <AiInsight
          handleFeedback={handleFeedback}
          aiLoading={aiLoading}
          aiInsight={aiInsight}
          feedback={feedbacks.insight}
        />
      )}
      {userPreferences?.news && (
        <CryptoNews
          handleFeedback={handleFeedback}
          dashboardData={dashboardDataContent}
          feedback={feedbacks.news}
        />
      )}

      {userPreferences?.meme && (
        <CryptoMeme
          handleFeedback={handleFeedback}
          dashboardData={dashboardDataContent}
          feedback={feedbacks.meme}
        />
      )}

      <PreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentPreferences={onboardingData}
      />
    </div>
  );
};

export default Dashboard;
