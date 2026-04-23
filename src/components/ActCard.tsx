import { useState } from 'react'
import { Clock, Zap, MapPin, CheckCircle2, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

export interface ActData {
  title: string
  description: string
  time: string
  energy: string
  impact: string
  location: string
}

interface ActCardProps {
  act: ActData
  onAccept: () => void
  onSwap: () => void
  onComplete: () => void
}

export default function ActCard({ act, onAccept, onSwap, onComplete }: ActCardProps) {
  const [isCompleted, setIsCompleted] = useState(false)

  const handleComplete = () => {
    setIsCompleted(true)
    onComplete()
  }

  if (isCompleted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="lentera-card bg-green-50 border-green-100 mt-4 text-center p-8"
      >
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-green-100">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-green-900 mb-1">Well Done!</h3>
        <p className="text-green-700 text-sm">You helped yourself and someone else today.</p>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="lentera-card bg-lentera-highlight/30 border-lentera-primary/20 mt-4 overflow-hidden"
    >
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-xs font-bold text-lentera-primary uppercase tracking-widest mb-1 block">
            Suggested Act
          </span>
          <h3 className="text-xl font-bold text-lentera-text">{act.title}</h3>
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">
            {act.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 py-2">
          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full text-xs font-medium border border-gray-100 shadow-sm">
            <Clock className="w-3 h-3 text-lentera-primary" />
            {act.time}
          </div>
          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full text-xs font-medium border border-gray-100 shadow-sm">
            <Zap className="w-3 h-3 text-lentera-primary" />
            {act.energy}
          </div>
          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full text-xs font-medium border border-gray-100 shadow-sm">
            <MapPin className="w-3 h-3 text-lentera-primary" />
            {act.location}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-lentera-primary/10">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Impact: {act.impact}
          </span>
          <div className="h-px flex-1 bg-lentera-primary/10" />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <button 
            onClick={onSwap}
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-gray-100 text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Swap
          </button>
          <button 
            onClick={onAccept}
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-lentera-primary text-white text-sm font-semibold shadow-md hover:opacity-90 transition-opacity"
          >
            <CheckCircle2 className="w-4 h-4" /> Accept
          </button>
        </div>
        
        <button 
          onClick={handleComplete}
          className="w-full py-3 rounded-2xl bg-lentera-base text-white text-sm font-semibold shadow-md hover:opacity-90 transition-opacity"
        >
          Mark as Completed
        </button>
      </div>
    </motion.div>
  )
}
