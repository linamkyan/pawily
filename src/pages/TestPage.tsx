import { useState } from 'react';
import { FilledBtn, OutlinedBtn, TextBtn, Switch } from '../UI/index';
import { ThemeSwitcher } from '../UI/ThemeSwitcher/ThemeSwitcher';

export const TestPage = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [switch1, setSwitch1] = useState(true);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div style={{ 
      padding: '40px', 
      backgroundColor: theme === 'light' ? '#ffffff' : '#141218',
      minHeight: '100vh'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <ThemeSwitcher theme={theme} onToggle={toggleTheme} />
      </div>

      <h2 style={{ color: theme === 'light' ? '#111827' : '#ffffff' }}>
        Current Theme: {theme}
      </h2>

      <div style={{ display: 'flex', gap: '16px', marginTop: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <FilledBtn label="Label" theme={theme} />
        <FilledBtn label="Label" theme={theme} showIcon={true} />
        <FilledBtn label="Label" theme={theme} disabled />
        <FilledBtn label="Label" theme={theme} showIcon={true} disabled />
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <OutlinedBtn label="Label" theme={theme} />
        <OutlinedBtn label="Label" theme={theme} showIcon={true} />
        <OutlinedBtn label="Label" theme={theme} disabled />
        <OutlinedBtn label="Label" theme={theme} showIcon={true} disabled />
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <TextBtn label="Label" theme={theme} />
        <TextBtn label="Label" theme={theme} showIcon={true} />
        <TextBtn label="Label" theme={theme} disabled />
        <TextBtn label="Label" theme={theme} showIcon={true} disabled />
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <Switch checked={switch1} onChange={setSwitch1} theme={theme} />
        <Switch checked={false} onChange={() => {}} theme={theme} disabled />
      </div>
    </div>
  );
};