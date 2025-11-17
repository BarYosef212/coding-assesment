import { useState, useEffect } from 'react';
import { SECTIONS } from '../utils/constants';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { X } from 'lucide-react';

const PreferencesForm = ({
  initialData = null,
  onSubmit,
  isLoading = false,
  error = '',
  submitButtonText = 'Save Preferences',
  showCancelButton = false,
  onCancel,
}) => {
  const [followedAssets, setFollowedAssets] = useState([]);
  const [assetInput, setAssetInput] = useState('');
  const [investorType, setInvestorType] = useState('moderate');
  const [contentPreferences, setContentPreferences] = useState({
    news: true,
    prices: true,
    meme: true,
    insight: false,
  });

  useEffect(() => {
    if (initialData) {
      setFollowedAssets(initialData.followedAssets || []);
      setInvestorType(initialData.investorType || 'moderate');
      setContentPreferences(
        initialData.contentPreferences || {
          news: true,
          prices: true,
          meme: true,
          insight: false,
        },
      );
    }
  }, [initialData]);

  const handleAddAsset = () => {
    if (
      assetInput.trim() &&
      !followedAssets.includes(assetInput.trim().toUpperCase())
    ) {
      setFollowedAssets([...followedAssets, assetInput.trim().toUpperCase()]);
      setAssetInput('');
    }
  };

  const handleRemoveAsset = (asset) => {
    setFollowedAssets(followedAssets.filter((a) => a !== asset));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddAsset();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      followedAssets,
      investorType,
      contentPreferences,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-2'>
        <Label className='text-base font-semibold'>
          Which crypto assets do you follow?
        </Label>
        <div className='flex gap-2'>
          <Input
            type='text'
            value={assetInput}
            onChange={(e) => setAssetInput(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            placeholder='e.g., BTC, ETH'
            className='flex-1'
          />
          <Button type='button' onClick={handleAddAsset} variant='secondary'>
            Add
          </Button>
        </div>
        {followedAssets.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-2'>
            {followedAssets.map((asset) => (
              <div
                key={asset}
                className='inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-md'
              >
                <span>{asset}</span>
                <button
                  type='button'
                  onClick={() => handleRemoveAsset(asset)}
                  className='hover:opacity-70 transition-opacity'
                >
                  <X className='h-4 w-4' />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='space-y-2'>
        <Label className='text-base font-semibold'>
          What type of investor are you?
        </Label>
        <Select value={investorType} onValueChange={setInvestorType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='conservative'>Conservative</SelectItem>
            <SelectItem value='moderate'>Moderate</SelectItem>
            <SelectItem value='aggressive'>Aggressive</SelectItem>
            <SelectItem value='trader'>Trader</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <Label className='text-base font-semibold'>
          What content do you want?
        </Label>
        <div className='space-y-2 mt-2'>
          {SECTIONS.map((pref) => (
            <div key={pref} className='flex items-center space-x-2'>
              <Checkbox
                id={pref}
                checked={contentPreferences[pref]}
                onCheckedChange={(checked) => {
                  const active = Object.values(contentPreferences).filter(Boolean).length;
                  if(!checked && active === 1) {
                    return;
                  }
                  setContentPreferences({
                    ...contentPreferences,
                    [pref]: checked,
                  });
                }}
              />
              <Label
                htmlFor={pref}
                className='text-sm font-normal cursor-pointer'
              >
                {pref.charAt(0).toUpperCase() + pref.slice(1)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className='text-sm text-destructive bg-destructive/10 p-3 rounded-md'>
          {error}
        </div>
      )}

      <div className={`flex ${showCancelButton ? 'gap-4' : ''}`}>
        {showCancelButton && (
          <Button
            type='button'
            onClick={onCancel}
            variant='secondary'
            className='flex-1'
          >
            Cancel
          </Button>
        )}
        <Button
          type='submit'
          disabled={isLoading}
          className={showCancelButton ? 'flex-1' : 'w-full'}
        >
          {isLoading ? 'Saving...' : submitButtonText}
        </Button>
      </div>
    </form>
  );
};

export default PreferencesForm;
