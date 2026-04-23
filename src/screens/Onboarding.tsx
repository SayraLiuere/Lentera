import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Globe, Clock, Zap, Shield, Heart } from 'lucide-react'

type OnboardingStep = 1 | 2 | 3 | 4

interface OnboardingProps {
  onComplete: (preferences: any) => void
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<OnboardingStep>(1)
  const [language, setLanguage] = useState<string>('English')
  const [preferences, setPreferences] = useState({
    time: '15 mins',
    energy: 'Low',
    categories: [] as string[]
  })

  const nextStep = () => {
    if (step < 4) setStep((step + 1) as OnboardingStep)
    else onComplete({ language, ...preferences })
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <div className="flex-1 flex flex-col bg-lentera-bg relative min-h-screen">
      <div className="p-6 pt-12 max-w-xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? 'w-8 bg-lentera-base' : 'w-4 bg-gray-200'
                }`}
              />
            ))}
          </div>
          {step < 4 && (
            <button onClick={nextStep} className="text-lentera-base font-medium">
              Skip
            </button>
          )}
        </div>

        <AnimatePresence mode="wait" custom={step}>
          <motion.div
            key={step}
            custom={step}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex-1"
          >
            {step === 1 && (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-lentera-highlight rounded-3xl flex items-center justify-center mb-8">
                  <Heart className="w-10 h-10 text-lentera-primary" />
                </div>
                <h1 className="text-3xl font-bold leading-tight">
                  Selamat Datang ke Lentera
                </h1>
                <p className="text-lg text-gray-600">
                  Lentera helps you care for yourself by doing small acts that also help your community.
                </p>
                <div className="pt-8">
                  <button onClick={nextStep} className="lentera-button-primary w-full flex items-center justify-center gap-2">
                    Let's Begin <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-2">Choose your language</h2>
                <p className="text-gray-600 mb-8">Select the language you feel most comfortable with.</p>
                
                <div className="grid gap-4">
                  {['Bahasa Melayu', 'English', 'Mandarin'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); nextStep(); }}
                      className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                        language === lang 
                        ? 'border-lentera-base bg-lentera-base/5' 
                        : 'border-gray-100 bg-white hover:border-gray-200'
                      }`}
                    >
                      <span className="font-semibold text-lg">{lang}</span>
                      <Globe className={`w-6 h-6 ${language === lang ? 'text-lentera-base' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Your Preferences</h2>
                  <p className="text-gray-600">This helps us match the right acts for you.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                      <Clock className="w-4 h-4" /> Available Time
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['5 mins', '15 mins', '30 mins', '1 hour'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setPreferences({ ...preferences, time: t })}
                          className={`px-4 py-2 rounded-full border transition-all ${
                            preferences.time === t
                            ? 'bg-lentera-primary text-white border-lentera-primary'
                            : 'bg-white text-gray-600 border-gray-200'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                      <Zap className="w-4 h-4" /> Energy Level
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Low', 'Medium', 'High'].map((e) => (
                        <button
                          key={e}
                          onClick={() => setPreferences({ ...preferences, energy: e })}
                          className={`px-4 py-2 rounded-full border transition-all ${
                            preferences.energy === e
                            ? 'bg-lentera-primary text-white border-lentera-primary'
                            : 'bg-white text-gray-600 border-gray-200'
                          }`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button onClick={nextStep} className="lentera-button-primary w-full mt-8">
                  Save Preferences
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mb-8">
                  <Shield className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold">Your Privacy Matters</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-2xl border border-gray-100 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold">Private Check-ins</p>
                      <p className="text-sm text-gray-600">Your reflections are yours alone. We don't share personal data.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-gray-100 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="font-semibold">Immediate Help</p>
                      <p className="text-sm text-gray-600">Crisis support is always one tap away if you need it.</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-center text-gray-500 pt-4">
                  By continuing, you agree to our gentle approach to well-being.
                </p>
                <button onClick={nextStep} className="lentera-button-primary w-full mt-4">
                  I Understand, Let's Go
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
