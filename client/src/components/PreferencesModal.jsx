import PreferencesForm from './PreferencesForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useSaveOnboarding } from '../hooks/useApi';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { BookmarkIcon, HeartIcon, StarIcon } from 'lucide-react';

const PreferencesModal = ({ isOpen, onClose, currentPreferences }) => {
  const saveOnboardingMutation = useSaveOnboarding();

  const handleSubmit = async (formData) => {
    try {
      await saveOnboardingMutation.mutateAsync(formData);
      onClose();
    } catch (err) {}
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Edit Preferences</DialogTitle>
          <DialogDescription>
            Update your investment preferences and content settings
          </DialogDescription>
        </DialogHeader>
        <PreferencesForm
          initialData={currentPreferences}
          onSubmit={handleSubmit}
          isLoading={saveOnboardingMutation.isPending}
          error={saveOnboardingMutation.error?.message || ''}
          submitButtonText='Save Preferences'
          showCancelButton={true}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PreferencesModal;
