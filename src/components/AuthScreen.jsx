import React from 'react';
import LandingPage from './LandingPage';

export default function AuthScreen({ onLogin, onRegister, onGuestBypass }) {
  return (
    <LandingPage
      onLogin={onLogin}
      onRegister={onRegister}
      onGuestBypass={onGuestBypass}
    />
  );
}
