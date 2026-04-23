import { Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts'
import { TrendingUp, Clock, CheckCircle, Flame } from 'lucide-react'
import { motion } from 'framer-motion'

const DATA = [
  { day: 'Mon', mood: 4, hours: 0.5 },
  { day: 'Tue', mood: 3, hours: 0 },
  { day: 'Wed', mood: 5, hours: 1.5 },
  { day: 'Thu', mood: 6, hours: 2 },
  { day: 'Fri', mood: 5, hours: 1 },
  { day: 'Sat', mood: 8, hours: 3 },
  { day: 'Sun', mood: 7, hours: 2.5 },
]

export default function Dashboard({ isMobileView = true }: { isMobileView?: boolean }) {
  return (
    <div className={`flex-1 flex flex-col bg-lentera-bg p-6 pb-24 space-y-8 overflow-y-auto ${!isMobileView ? 'max-w-6xl mx-auto w-full' : ''}`}>
      <div className={`${!isMobileView ? 'flex items-end justify-between' : ''}`}>
        <div>
          <h1 className="text-3xl font-bold text-lentera-text">Your Impact</h1>
          <p className="text-gray-500 text-lg">Seeing the light you bring to the community.</p>
        </div>
        {!isMobileView && (
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
            <Flame className="w-5 h-5 text-lentera-primary" />
            <span className="font-bold">7 Day Streak</span>
          </div>
        )}
      </div>

      <div className={`grid gap-8 ${!isMobileView ? 'grid-cols-3' : 'grid-cols-1'}`}>
        {/* Left/Main Column: Chart and KPIs */}
        <div className={`${!isMobileView ? 'col-span-2 space-y-8' : 'space-y-8'}`}>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-lentera-highlight rounded-[1.5rem] flex items-center justify-center text-lentera-primary">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <span className="text-3xl font-black text-lentera-text block">10.5h</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contributed</span>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-purple-50 rounded-[1.5rem] flex items-center justify-center text-lentera-base">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <span className="text-3xl font-black text-lentera-text block">12</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Acts Done</span>
              </div>
            </motion.div>
          </div>

          {/* Chart Section */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
            <h3 className="font-bold text-xl flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-lentera-primary" />
                Double Helix Impact
              </h3>

            <div className={`${!isMobileView ? 'h-96' : 'h-64'} w-full`}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 'bold' }} 
                  />
                  <YAxis 
                    yAxisId="left"
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '1rem' }}
                  />
                  <Bar 
                    yAxisId="right" 
                    dataKey="hours" 
                    name="Community Hours" 
                    fill="#f59e0b" 
                    radius={[8, 8, 0, 0]} 
                    barSize={!isMobileView ? 40 : 20}
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="mood" 
                    name="Mood Level" 
                    stroke="#8b5cf6" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#8b5cf6', strokeWidth: 3, stroke: '#fff' }} 
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="p-6 bg-lentera-highlight/30 rounded-3xl flex gap-4 items-center">
              <div className="w-12 h-12 bg-lentera-primary rounded-2xl flex items-center justify-center text-white shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <p className="text-base text-lentera-text leading-relaxed">
                <span className="font-black uppercase tracking-widest text-xs block mb-1">Weekly Insight</span>
                Your mood steadiness has improved by <span className="font-bold text-lentera-primary">24%</span> this week alongside your community acts.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Acts */}
        <div className="space-y-6">
          <h3 className="font-bold text-xl px-2">Recent Contributions</h3>
          <div className="space-y-4">
            {[
              { title: 'Checked on Neighbor', date: 'Today', impact: '+0.5h', type: 'Connection' },
              { title: 'Shared Food Bank Info', date: 'Yesterday', impact: '+0.2h', type: 'Support' },
              { title: 'Tutored Student Online', date: '2 days ago', impact: '+2.0h', type: 'Education' },
              { title: 'Community Cleanup', date: 'Last Saturday', impact: '+3.0h', type: 'Environment' },
            ].map((act, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-5 bg-white rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-lentera-base">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lentera-text">{act.title}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{act.date}</span>
                      <span className="w-1 h-1 bg-gray-200 rounded-full" />
                      <span className="text-[10px] font-bold text-lentera-base uppercase tracking-widest">{act.type}</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-black text-lentera-primary">{act.impact}</span>
              </motion.div>
            ))}
          </div>
          
          <button className="w-full py-4 bg-white border-2 border-dashed border-gray-200 rounded-[2rem] text-gray-400 font-bold text-sm hover:border-lentera-base hover:text-lentera-base transition-all">
            View All History
          </button>
        </div>
      </div>
    </div>
  )
}
