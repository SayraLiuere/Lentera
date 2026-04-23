import { Phone, ExternalLink, Shield, Globe, Info, AlertCircle, Monitor, Smartphone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CrisisModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SettingsProps {
  isMobileView: boolean
  onToggleView: (isMobile: boolean) => void
}

export function CrisisModal({ isOpen, onClose }: CrisisModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative z-10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-red-500" />
            
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">You deserve support</h2>
                <p className="text-gray-600">Please reach out to these services. They are here for you right now.</p>
              </div>

              <div className="w-full space-y-4">
                <a 
                  href="tel:0376272929"
                  className="flex items-center justify-between p-5 bg-red-500 text-white rounded-2xl font-bold shadow-lg shadow-red-200 active:scale-95 transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span>Befrienders KL</span>
                  </div>
                  <ExternalLink className="w-5 h-5 opacity-50" />
                </a>
                
                <a 
                  href="tel:15999"
                  className="flex items-center justify-between p-5 bg-white border-2 border-red-100 text-red-500 rounded-2xl font-bold active:scale-95 transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span>Talian Kasih</span>
                  </div>
                  <ExternalLink className="w-5 h-5 opacity-50" />
                </a>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                Lentera is not an emergency service. If you are in immediate danger, please contact local emergency services.
              </p>

              <button 
                onClick={onClose}
                className="text-gray-400 font-semibold text-sm hover:text-gray-600"
              >
                Back to Safety Resources
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default function Settings({ isMobileView, onToggleView }: SettingsProps) {
  return (
    <div className={`flex-1 flex flex-col bg-lentera-bg p-6 pb-24 space-y-8 overflow-y-auto ${!isMobileView ? 'max-w-4xl mx-auto w-full' : ''}`}>
      <div>
        <h1 className="text-3xl font-bold text-lentera-text">Safety & Settings</h1>
        <p className="text-gray-500">Your space, your control.</p>
      </div>

      {/* Display Mode Toggle */}
      <section className="space-y-4">
        <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs">App Display</h3>
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-2 flex gap-2">
          <button 
            onClick={() => onToggleView(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl transition-all ${
              !isMobileView 
              ? 'bg-lentera-base text-white shadow-md' 
              : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <Monitor className="w-5 h-5" />
            <span className="font-bold text-sm">Web View</span>
          </button>
          <button 
            onClick={() => onToggleView(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl transition-all ${
              isMobileView 
              ? 'bg-lentera-base text-white shadow-md' 
              : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <Smartphone className="w-5 h-5" />
            <span className="font-bold text-sm">Mobile Frame</span>
          </button>
        </div>
      </section>

      {/* Crisis Help Section */}
      <section className="space-y-4">
        <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs">Urgent Support</h3>
        <div className="bg-white rounded-[2rem] overflow-hidden border border-red-100 shadow-sm">
          <div className="p-6 bg-red-50 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
            <div>
              <p className="font-bold text-red-900">Need immediate help?</p>
              <p className="text-sm text-red-700 leading-relaxed">If you're feeling overwhelmed, professional support is just a call away.</p>
            </div>
          </div>
          <div className="p-4 grid gap-2">
            <button className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-xl transition-colors">
              <span className="font-semibold text-sm">Befrienders KL</span>
              <span className="text-red-500 text-sm font-bold">03-7627 2929</span>
            </button>
            <button className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-xl transition-colors">
              <span className="font-semibold text-sm">Talian Kasih</span>
              <span className="text-red-500 text-sm font-bold">15999</span>
            </button>
          </div>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="space-y-4">
        <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs">Preferences</h3>
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 divide-y divide-gray-50">
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                <Globe className="w-5 h-5" />
              </div>
              <span className="font-semibold">Language</span>
            </div>
            <select className="bg-gray-50 border-none text-sm font-bold rounded-lg p-2 focus:ring-0">
              <option>English</option>
              <option>Bahasa Melayu</option>
              <option>Mandarin</option>
            </select>
          </div>
          
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-semibold">Privacy Mode</span>
            </div>
            <div className="w-12 h-6 bg-sinaran-base rounded-full relative p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="space-y-4">
        <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs">About Lentera</h3>
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 divide-y divide-gray-50">
          <div className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500">
              <Info className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Privacy Policy</p>
              <p className="text-xs text-gray-400">How we protect your gentle space.</p>
            </div>
          </div>
          <div className="p-5 text-center">
            <p className="text-xs text-gray-400">Version 1.0.0 (MVP Demo)</p>
          </div>
        </div>
      </section>
      
      <button className="w-full p-4 text-red-500 font-bold text-sm bg-red-50 rounded-2xl hover:bg-red-100 transition-colors">
        Reset My Data
      </button>
    </div>
  )
}
