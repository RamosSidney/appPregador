import React from 'react';
import LandingPage from './LandingPage';

export default function AuthScreen({ onLogin, onRegister, onGuestBypass, themeMode, onToggleTheme }) {
  return (
    <LandingPage
      onLogin={onLogin}
      onRegister={onRegister}
      onGuestBypass={onGuestBypass}
      themeMode={themeMode}
      onToggleTheme={onToggleTheme}
    />
  );
}
