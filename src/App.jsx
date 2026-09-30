import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { FarmBriefModal } from './components/FarmBriefModal';
import { Landing } from './pages/Landing';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { CropPlanner } from './pages/CropPlanner';
import { CropHealth } from './pages/CropHealth';
import { Weather } from './pages/Weather';
import { Market } from './pages/Market';
import { Assistant } from './pages/Assistant';
import { NameEntry } from './pages/NameEntry';

import { DEFAULT_FARMER } from './data/defaultFarmer';
import { WEATHER_FORECAST } from './data/weather';
import { MARKET_DATA } from './data/markets';
import { generateDailyAdvisory } from './engine/advisoryEngine';
import { evaluateFarmRisks } from './engine/riskEngine';

export function App() {
  // Saved language preference (defaults to 'hi' for Indian farmer focus)
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('agrigrow_lang') || 'hi';
  });

  // Voice toggle (TTS audio playback & ASR)
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Active navigation tab
  const [currentTab, setCurrentTab] = useState('dashboard');

  // Track whether user has entered their name yet
  const [hasName, setHasName] = useState(() => {
    const saved = localStorage.getItem('agrigrow_farmer');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Consider the user has named themselves if the saved name differs from default
        return !!parsed.name && parsed.name !== 'Himesh Pant';
      } catch { return false; }
    }
    return false;
  });

  // Farmer Profile (defaults to Hero Scenario: Pithoragarh, Uttarakhand)
  const [farmer, setFarmer] = useState(() => {
    const saved = localStorage.getItem('agrigrow_farmer');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse farmer profile:', e);
      }
    }
    return DEFAULT_FARMER;
  });

  // Daily Farm Brief modal state
  const [isFarmBriefOpen, setIsFarmBriefOpen] = useState(false);

  // Sync language changes
  useEffect(() => {
    localStorage.setItem('agrigrow_lang', language);
  }, [language]);

  // Sync farmer profile changes
  useEffect(() => {
    localStorage.setItem('agrigrow_farmer', JSON.stringify(farmer));
  }, [farmer]);

  const handleSaveFarmer = (updatedFarmer) => {
    setFarmer(updatedFarmer);
    setCurrentTab('dashboard');
  };

  const handleResetHero = () => {
    setFarmer(DEFAULT_FARMER);
    localStorage.removeItem('agrigrow_farmer');
    setCurrentTab('dashboard');
  };

  // Called from NameEntry page — persists the name into farmer profile
  const handleNameSubmit = (enteredName) => {
    const updatedFarmer = {
      ...farmer,
      name: enteredName,
      hindiName: enteredName
    };
    setFarmer(updatedFarmer);
    localStorage.setItem('agrigrow_farmer', JSON.stringify(updatedFarmer));
    setHasName(true);
    setCurrentTab('dashboard');
  };

  // Pre-calculate decision models
  const weather = WEATHER_FORECAST;
  const advisory = generateDailyAdvisory(farmer, weather);
  const risks = evaluateFarmRisks(farmer, weather);
  const market = MARKET_DATA;

  // — FIRST SCREEN GATE: show name entry until the user submits their name —
  if (!hasName) {
    return (
      <NameEntry
        onContinue={handleNameSubmit}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5ED] text-[#12372A] font-sans pb-20 lg:pb-0 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        voiceEnabled={voiceEnabled}
        setVoiceEnabled={setVoiceEnabled}
        farmer={farmer}
        onOpenFarmBrief={() => setIsFarmBriefOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <Landing
            onStart={() => setCurrentTab('dashboard')}
            onConfigure={() => setCurrentTab('onboarding')}
            language={language}
          />
        )}

        {currentTab === 'onboarding' && (
          <Onboarding
            farmer={farmer}
            onSaveFarmer={handleSaveFarmer}
            onResetHero={handleResetHero}
            language={language}
            onCancel={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            farmer={farmer}
            weather={weather}
            language={language}
            voiceEnabled={voiceEnabled}
            onOpenFarmBrief={() => setIsFarmBriefOpen(true)}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'planner' && (
          <CropPlanner
            farmer={farmer}
            language={language}
            voiceEnabled={voiceEnabled}
          />
        )}

        {currentTab === 'health' && (
          <CropHealth
            farmer={farmer}
            language={language}
            voiceEnabled={voiceEnabled}
          />
        )}

        {currentTab === 'weather' && (
          <Weather
            farmer={farmer}
            language={language}
            voiceEnabled={voiceEnabled}
          />
        )}

        {currentTab === 'market' && (
          <Market
            farmer={farmer}
            language={language}
            voiceEnabled={voiceEnabled}
          />
        )}

        {currentTab === 'assistant' && (
          <Assistant
            farmer={farmer}
            language={language}
            voiceEnabled={voiceEnabled}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
      />

      {/* Daily Farm Brief Audio Modal */}
      <FarmBriefModal
        isOpen={isFarmBriefOpen}
        onClose={() => setIsFarmBriefOpen(false)}
        farmer={farmer}
        weather={weather}
        advisory={advisory}
        risks={risks}
        market={market}
        language={language}
      />
    </div>
  );
}

export default App;
