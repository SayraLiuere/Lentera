import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, BarChart3, Settings as SettingsIcon, AlertCircle } from 'lucide-react'
import SplashScreen from './components/SplashScreen'
import Landing from './screens/Landing'
import Onboarding from './screens/Onboarding'
import Chat from './screens/Chat'
import Dashboard from './screens/Dashboard'
import Settings, { CrisisModal } from './screens/Settings'

type Screen = 'landing' | 'onboarding' | 'chat' | 'dashboard' | 'settings'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing')
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false)
  const [, setUserPreferences] = useState<any>(null)
  const [isMobileView, setIsMobileView] = useState(false) // Default is web view
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleOnboardingComplete = (prefs: any) => {
    setUserPreferences(prefs)
    setCurrentScreen('chat')
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isMobileView ? 'bg-[#F0F0F0] flex justify-center items-center' : 'bg-lentera-bg'}`}>
      <AnimatePresence>
        {showSplash && <SplashScreen />}
      </AnimatePresence>

      {/* Container - conditionally apply mobile frame or full web layout */}
      <div className={`transition-all duration-500 flex flex-col relative overflow-hidden ${
        isMobileView 
        ? 'w-full max-w-md h-[844px] shadow-2xl md:rounded-[3rem] border-8 border-white bg-lentera-bg' 
        : 'w-full min-h-screen bg-lentera-bg'
      }`}>
        
        <AnimatePresence mode="wait">
          {!showSplash && currentScreen === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <Landing onStart={() => setCurrentScreen('onboarding')} />
            </motion.div>
          )}

          {!showSplash && currentScreen === 'onboarding' && (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <Onboarding onComplete={handleOnboardingComplete} />
            </motion.div>
          )}

          {!showSplash && currentScreen !== 'onboarding' && currentScreen !== 'landing' && (
            <motion.div
              key="main-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {/* Content Area */}
              <div className="flex-1 overflow-hidden flex flex-col">
                {currentScreen === 'chat' && <Chat isMobileView={isMobileView} />}
                {currentScreen === 'dashboard' && <Dashboard isMobileView={isMobileView} />}
                {currentScreen === 'settings' && (
                  <Settings 
                    isMobileView={isMobileView} 
                    onToggleView={setIsMobileView} 
                  />
                )}
              </div>

              {/* Navigation Bar */}
              <nav className={`bg-white/80 backdrop-blur-md border-t border-gray-100 flex justify-around items-center p-4 sticky bottom-0 z-20 ${
                isMobileView ? 'pb-8' : 'pb-4 max-w-4xl mx-auto w-full rounded-t-[2rem] shadow-lg'
              }`}>
                <button 
                  onClick={() => setCurrentScreen('chat')} 
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    currentScreen === 'chat' ? 'text-lentera-base' : 'text-gray-400'
                  }`}
                >
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Check-in</span>
                </button>
                
                <button 
                  onClick={() => setCurrentScreen('dashboard')} 
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    currentScreen === 'dashboard' ? 'text-lentera-base' : 'text-gray-400'
                  }`}
                >
                  <BarChart3 className="w-6 h-6" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Impact</span>
                </button>
                
                <button 
                  onClick={() => setCurrentScreen('settings')} 
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    currentScreen === 'settings' ? 'text-lentera-base' : 'text-gray-400'
                  }`}
                >
                  <SettingsIcon className="w-6 h-6" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Safety</span>
                </button>

                <button 
                  onClick={() => setIsCrisisModalOpen(true)}
                  className="flex flex-col items-center gap-1 text-red-400"
                >
                  <AlertCircle className="w-6 h-6" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">SOS</span>
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CrisisModal 
        isOpen={isCrisisModalOpen} 
        onClose={() => setIsCrisisModalOpen(false)} 
      />
    </div>
  )
}

export default App
