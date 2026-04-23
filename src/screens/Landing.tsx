import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Activity, Wand2, Leaf, Lock, Cloud, Quote } from 'lucide-react'

interface LandingProps {
  onStart: () => void
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="flex-1 flex flex-col bg-lentera-bg relative overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-lentera-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-lentera-base/10 rounded-full blur-[120px]" />
      </div>

      {/* Header component */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 h-16 max-w-7xl mx-auto rounded-2xl mt-4 bg-white/60 backdrop-blur-xl border border-white/20 shadow-sm w-full">
        <div className="text-2xl font-black tracking-tighter text-lentera-text">Lentera</div>
        <nav className="hidden md:flex items-center gap-8">
          {['Practice', 'Insights', 'Community', 'About'].map((item) => (
            <a key={item} href="#" className="text-gray-400 hover:text-lentera-text transition-colors text-sm font-bold uppercase tracking-widest">
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={onStart} className="lentera-button-primary px-6 py-2 text-sm">
            Get Started
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-8 pt-24 pb-32 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-lentera-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-lentera-primary" />
            <span className="text-[10px] font-bold text-lentera-text uppercase tracking-[0.2em]">Techno-Zen Harmony</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-lentera-text max-w-4xl mb-6 leading-[0.9] tracking-tighter"
          >
            Welcome to <span className="text-lentera-base italic relative inline-block">Lentera<span className="absolute bottom-2 left-0 w-full h-4 bg-lentera-highlight -z-10 rounded-full opacity-60" /></span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl mb-12 font-medium leading-relaxed"
          >
            Finding clarity through modern mindfulness. Experience a sanctuary designed to bridge the gap between digital efficiency and organic tranquility.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <button 
              onClick={onStart}
              className="group relative px-10 py-5 bg-lentera-primary text-white rounded-full font-bold text-lg shadow-xl shadow-lentera-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 rounded-full font-bold text-lg text-lentera-text hover:bg-white/50 transition-colors">
              Explore Rituals
            </button>
          </motion.div>
        </section>

        {/* Bento Grid */}
        <section className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 group relative overflow-hidden rounded-[3rem] bg-white p-2 shadow-xl border border-gray-100">
              <div className="relative h-[450px] overflow-hidden rounded-[2.5rem]">
                <img 
                  src="https://images.unsplash.com/photo-1545208393-596371ba4a34?q=80&w=2070&auto=format&fit=crop" 
                  alt="Zen space" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lentera-text/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <h3 className="text-3xl font-black mb-2">Immersive Stillness</h3>
                  <p className="text-white/80 max-w-md font-medium">High-fidelity ambient soundscapes paired with AI-driven breath guidance.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="flex-1 bg-white rounded-[2.5rem] p-8 flex flex-col justify-between border border-gray-100 shadow-xl group hover:border-lentera-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-lentera-primary/10 flex items-center justify-center text-lentera-primary">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-lentera-text mb-2">Biometric Sync</h4>
                  <p className="text-gray-500 font-medium">Real-time heart rate coherence tracking for precision wellness.</p>
                </div>
              </div>
              <div className="flex-1 bg-lentera-base text-white rounded-[2.5rem] p-8 flex flex-col justify-between shadow-xl group hover:brightness-110 transition-all">
                <div className="flex justify-between items-start">
                  <Wand2 className="w-10 h-10" />
                  <div className="text-right">
                    <p className="text-4xl font-black">98%</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Focus Score</p>
                  </div>
                </div>
                <p className="text-xl font-bold leading-tight">Peak cognitive clarity achieved through Lentera.</p>
              </div>
            </div>

            <div className="md:col-span-4 bg-white/50 backdrop-blur-md rounded-[2.5rem] p-8 flex items-center gap-6 border border-white/20 shadow-sm group hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 shrink-0 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                <Leaf className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-black text-lentera-text">Ethical Tech</h4>
                <p className="text-sm text-gray-500 font-medium">Designed to reduce screen fatigue.</p>
              </div>
            </div>

            <div className="md:col-span-4 bg-white/50 backdrop-blur-md rounded-[2.5rem] p-8 flex items-center gap-6 border border-white/20 shadow-sm group hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 shrink-0 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-black text-lentera-text">Private by Default</h4>
                <p className="text-sm text-gray-500 font-medium">Your data never leaves your device.</p>
              </div>
            </div>

            <div className="md:col-span-4 bg-white/50 backdrop-blur-md rounded-[2.5rem] p-8 flex items-center gap-6 border border-white/20 shadow-sm group hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 shrink-0 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                <Cloud className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-black text-lentera-text">Cloud Archive</h4>
                <p className="text-sm text-gray-500 font-medium">Sync your progress across all Zen devices.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="max-w-4xl mx-auto px-8 py-32 text-center">
          <Quote className="w-16 h-16 text-lentera-primary opacity-20 mx-auto mb-8" />
          <blockquote className="text-3xl font-bold italic text-lentera-text mb-8 leading-relaxed">
            "The future of wellness isn't a return to the past, but a thoughtful integration of our technological reality with our biological needs."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" alt="Founder" />
            </div>
            <div className="text-left">
              <p className="font-black text-lentera-text">Elara Vance</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Founder, Lentera</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-white/30 backdrop-blur-md border-t border-white/20">
        <div className="text-xl font-black text-gray-400">Lentera</div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2024 Lentera Wellness. Finding clarity in precision.</p>
        <div className="flex gap-8">
          {['Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
            <a key={item} href="#" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-lentera-primary transition-colors">
              {item}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
