import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  RiMoneyDollarCircleLine,
  RiShoppingCart2Line,
  RiUserLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiCalendarLine,
  RiBarChartLine,
  RiDownloadLine,
  RiFilter3Line
} from 'react-icons/ri';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Sample data for charts
const revenueData = [
  { month: 'Jan', value: 45000 },
  { month: 'Feb', value: 52000 },
  { month: 'Mar', value: 48000 },
  { month: 'Apr', value: 58000 },
  { month: 'May', value: 62000 },
  { month: 'Jun', value: 55000 },
];

const salesData = [
  { category: 'Electronics', value: 45 },
  { category: 'Fashion', value: 25 },
  { category: 'Home', value: 20 },
  { category: 'Books', value: 10 },
];

const userActivityData = [
  { day: 'Mon', users: 120 },
  { day: 'Tue', users: 150 },
  { day: 'Wed', users: 180 },
  { day: 'Thu', users: 160 },
  { day: 'Fri', users: 200 },
  { day: 'Sat', users: 170 },
  { day: 'Sun', users: 140 },
];

const COLORS = ['#6366F1', '#10B981', '#3B82F6', '#F59E0B'];

const stats = [
  { title: 'Total Revenue', value: '$45,678', change: '+12.5%', icon: RiMoneyDollarCircleLine, color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { title: 'Total Sales', value: '1,234', change: '+8.2%', icon: RiShoppingCart2Line, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { title: 'Active Users', value: '892', change: '+15.3%', icon: RiUserLine, color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { title: 'Conversion Rate', value: '3.2%', change: '+2.1%', icon: RiBarChartLine, color: 'text-amber-500', bgColor: 'bg-amber-50' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1]
    }
  })
};

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
          <p className="text-slate-500 mt-1">Track your business performance</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 border border-slate-200 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <RiDownloadLine className="w-5 h-5" />
            Export Report
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 border border-slate-200 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <RiFilter3Line className="w-5 h-5" />
            Filters
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-center mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} ${stat.color} rounded-xl flex items-center justify-center text-2xl`}>
                <stat.icon />
              </div>
              <span className="text-sm font-medium text-slate-500">{stat.title}</span>
            </div>
            <div className="text-2xl font-semibold text-slate-800">{stat.value}</div>
            <div className={`flex items-center gap-1 mt-2 text-sm ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
              {stat.change.startsWith('+') ? <RiArrowUpLine className="w-4 h-4" /> : <RiArrowDownLine className="w-4 h-4" />}
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Revenue Overview</h3>
              <p className="text-sm text-slate-500">Monthly revenue analysis</p>
            </div>
            <div className="flex items-center gap-2">
              <RiCalendarLine className="w-5 h-5 text-slate-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-1 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="1m">Last Month</option>
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sales Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Sales Distribution</h3>
              <p className="text-sm text-slate-500">Category-wise sales analysis</p>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <RiFilter3Line className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salesData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">User Activity</h3>
              <p className="text-sm text-slate-500">Daily active users</p>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <RiFilter3Line className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="day" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Top Products</h3>
              <p className="text-sm text-slate-500">Best performing products</p>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <RiFilter3Line className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                    <RiShoppingCart2Line className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">Product {item}</div>
                    <div className="text-sm text-slate-500">Category {item}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-slate-800">${(Math.random() * 1000).toFixed(2)}</div>
                  <div className="text-sm text-emerald-500">+{(Math.random() * 20).toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Analytics;
