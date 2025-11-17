import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PreferencesForm from '../components/PreferencesForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useOnboarding, useSaveOnboarding } from '../hooks/useApi';

const Onboarding = () => {
  const navigate = useNavigate();
  const { data: onboardingData, isLoading: isLoadingOnboarding } = useOnboarding();
  const saveOnboardingMutation = useSaveOnboarding();

  useEffect(() => {
    if (onboardingData && !isLoadingOnboarding) {
      navigate('/dashboard');
    }
  }, [onboardingData, isLoadingOnboarding, navigate]);

  const handleSubmit = async (formData) => {
    try {
      await saveOnboardingMutation.mutateAsync(formData);
      navigate('/dashboard');
    } catch (err) {
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome! Let's set up your preferences</CardTitle>
          <CardDescription>
            Configure your investment preferences and content settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PreferencesForm
            onSubmit={handleSubmit}
            isLoading={saveOnboardingMutation.isPending}
            error={saveOnboardingMutation.error?.message || ''}
            submitButtonText='Save Preferences'
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
