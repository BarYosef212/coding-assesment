import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/dashboard');
        if (response.data.success) {
          return {
            dashboardData: response.data.data,
            userPreferences: response.data.userPreferences,
          };
        }
        throw new Error(response.data.message || 'Failed to load dashboard');
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to load dashboard';
        throw new Error(errorMessage);
      }
    },
    staleTime: 30000,
  });
};

export const useAiInsight = () => {
  return useQuery({
    queryKey: ['aiInsight'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/dashboard/ai');
        if (response.data.success) {
          return response.data.data;
        }
        throw new Error(response.data.message || 'Failed to load AI insight');
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to load AI insight';
        throw new Error(errorMessage);
      }
    },
    staleTime: 300000,
  });
};

export const useFeedbacks = () => {
  return useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/feedback/');
        if (response.data.success) {
          const data = response.data.data;
          const feedbacks = {};
          data.forEach((f) => {
            feedbacks[f.contentType] = f.isPositive;
          });
          return feedbacks;
        }
        throw new Error(response.data.message || 'Failed to load feedbacks');
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to load feedbacks';
        throw new Error(errorMessage);
      }
    },
  });
};

export const useOnboarding = () => {
  return useQuery({
    queryKey: ['onboarding'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/onboarding');
        if (response.data.success) {
          return response.data.data;
        }
        return null;
      } catch (error) {
        if (error.response?.status === 404) {
          return null;
        }
        const errorMessage = error.response?.data?.message || error.message || 'Failed to load onboarding data';
        throw new Error(errorMessage);
      }
    },
  });
};

export const useSaveFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contentType, contentId, isPositive }) => {
      try {
        const response = await api.post('/api/feedback', {
          contentType,
          contentId,
          isPositive,
        });
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to save feedback');
        }
        return { contentType, isPositive };
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to save feedback';
        throw new Error(errorMessage);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['feedbacks'], (old) => ({
        ...old,
        [data.contentType]: data.isPositive,
      }));
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
    },
    onError: (error) => {
      console.error('Failed to save feedback:', error);
    },
  });
};

export const useSaveOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      try {
        const response = await api.post('/api/onboarding', formData);
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to save preferences');
        }
        return response.data.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to save preferences';
        throw new Error(errorMessage);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['onboarding'], data);
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['aiInsight'] });
    },
    onError: (error) => {
      console.error('Failed to save onboarding:', error);
    },
  });
};

