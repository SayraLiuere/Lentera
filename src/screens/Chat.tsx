import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Send, AlertCircle, MessageCircle } from 'lucide-react'
import ActCard, { ActData } from '../components/ActCard'

interface Message {
  id: string
  text: string
  sender: 'ai' | 'user'
  type?: 'text' | 'act'
  actData?: ActData
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hello! I am your Lentera companion. How are you feeling today?',
    sender: 'ai'
  }
]

const MOCK_ACTS: ActData[] = [
  {
    title: 'Check in on a Neighbor',
    description: 'A simple "How are you?" to an elderly neighbor can brighten their day and yours.',
    time: '15 mins',
    energy: 'Low energy',
    impact: 'Connection',
    location: 'Nearby'
  },
  {
    title: 'Share a Local Tip',
    description: 'Post a helpful tip about a local service or hidden gem in your community group.',
    time: '5 mins',
    energy: 'Low energy',
    impact: 'Food support',
    location: 'Online'
  }
]

export default function Chat({ isMobileView = true }: { isMobileView?: boolean }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = (text: string = inputText) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user'
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    
    // Simulate AI response
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for sharing. Let\'s keep this gentle. Based on how you\'re feeling, I found a small act you might find meaningful:',
        sender: 'ai'
      }
      
      const actMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: '',
        sender: 'ai',
        type: 'act',
        actData: MOCK_ACTS[Math.floor(Math.random() * MOCK_ACTS.length)]
      }
      
      setMessages(prev => [...prev, aiResponse, actMessage])
    }, 1500)
  }

  const handleSwap = (messageId: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === messageId) {
        return {
          ...m,
          actData: MOCK_ACTS[Math.floor(Math.random() * MOCK_ACTS.length)]
        }
      }
      return m
    }))
  }

  const toggleMic = () => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.')
      return
    }

    if (isListening) {
      setIsListening(false)
    } else {
      setIsListening(true)
      // Mocking speech recognition for demo
      setTimeout(() => {
        setIsListening(false)
        handleSend('I feel a bit overwhelmed today.')
      }, 3000)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-lentera-bg h-full relative">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 sticky top-0 z-10">
        <div className={`flex items-center justify-between ${!isMobileView ? 'max-w-4xl mx-auto w-full' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-lentera-base rounded-full flex items-center justify-center text-white">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-lentera-text text-lg">Lentera Companion</h2>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Online & Listening</span>
              </div>
            </div>
          </div>
          <button className="p-3 text-red-500 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors">
            <AlertCircle className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className={`flex-1 overflow-y-auto p-4 space-y-6 pb-40 ${!isMobileView ? 'max-w-4xl mx-auto w-full' : ''}`}
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {m.type === 'act' && m.actData ? (
                <div className={`${!isMobileView ? 'max-w-xl' : 'w-full'}`}>
                  <ActCard 
                    act={m.actData} 
                    onAccept={() => {
                      const aiResponse: Message = {
                        id: Date.now().toString(),
                        text: 'Excellent! I\'ve added this to your dashboard. Take your time, there\'s no rush.',
                        sender: 'ai'
                      }
                      setMessages(prev => [...prev, aiResponse])
                    }} 
                    onSwap={() => handleSwap(m.id)} 
                    onComplete={() => {}} 
                  />
                </div>
              ) : (
                <div className={`${m.sender === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'} ${!isMobileView ? 'text-base p-5' : ''}`}>
                  {m.text}
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="chat-bubble-ai flex gap-1.5 items-center"
            >
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-lentera-bg via-lentera-bg/95 to-transparent z-10">
        <div className={`flex flex-col gap-4 ${!isMobileView ? 'max-w-4xl mx-auto w-full' : ''}`}>
          {/* Quick Replies */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['Tired', 'Overwhelmed', 'I have 15 mins', 'Low energy', 'I want to help'].map((reply) => (
              <button
                key={reply}
                onClick={() => handleSend(reply)}
                className="whitespace-nowrap px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:border-lentera-base hover:text-lentera-base hover:shadow-md transition-all"
              >
                {reply}
              </button>
            ))}
          </div>

          <div className="flex gap-3 items-center bg-white p-2 rounded-[2.5rem] border border-gray-100 shadow-xl">
            <button 
              onClick={toggleMic}
              className={`p-4 rounded-full transition-all ${
                isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-lentera-highlight text-lentera-primary'
              }`}
            >
              <Mic className={`w-6 h-6 ${isListening ? 'scale-110' : ''}`} />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Want to share how you're feeling?"
              className="flex-1 p-2 bg-transparent focus:outline-none text-lg font-medium placeholder:text-gray-300"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className={`p-4 rounded-full transition-all ${
                inputText.trim() 
                ? 'bg-lentera-base text-white shadow-lg' 
                : 'bg-gray-50 text-gray-300'
              }`}
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          {isListening && (
            <p className="text-center text-sm font-bold text-lentera-base animate-pulse tracking-wide uppercase">
              Listening to your voice...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
