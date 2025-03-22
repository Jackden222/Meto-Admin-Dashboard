import { motion } from 'framer-motion';
import { 
  RiArrowUpLine, 
  RiArrowDownLine,
  RiMoneyDollarCircleLine,
  RiShoppingBagLine,
  RiUserSmileLine,
  RiEyeLine,
  RiPieChartLine,
  RiBarChartBoxLine,
  RiShoppingCart2Line,
  RiCheckboxCircleLine,
  RiTimeLine,
  RiErrorWarningLine
} from 'react-icons/ri';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface ChartDataPoint {
  name: string;
  value: number;
}

const chartData: ChartDataPoint[] = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 19000 },
  { name: 'Mar', value: 15000 },
  { name: 'Apr', value: 22000 },
  { name: 'May', value: 28000 },
  { name: 'Jun', value: 25000 },
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#6366f1' },
  { name: 'Fashion', value: 25, color: '#10b981' },
  { name: 'Home', value: 20, color: '#f59e0b' },
  { name: 'Sports', value: 15, color: '#ef4444' },
  { name: 'Books', value: 5, color: '#8b5cf6' },
];

interface Transaction {
  id: string;
  customer: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

const recentTransactions: Transaction[] = [
  { id: '#TR-123', customer: 'John Doe', amount: '$1,234.56', status: 'completed', date: '2024-03-22' },
  { id: '#TR-124', customer: 'Jane Smith', amount: '$897.00', status: 'pending', date: '2024-03-22' },
  { id: '#TR-125', customer: 'Mike Johnson', amount: '$2,345.00', status: 'completed', date: '2024-03-21' },
  { id: '#TR-126', customer: 'Sarah Williams', amount: '$445.90', status: 'failed', date: '2024-03-21' },
  { id: '#TR-127', customer: 'Tom Brown', amount: '$1,567.00', status: 'completed', date: '2024-03-21' },
];

interface StatData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType;
  color: string;
  bgColor: string;
}

const statsData: StatData[] = [
  {
    title: 'Net Income',
    value: '$53,765',
    change: '+10.5%',
    isPositive: true,
    icon: RiMoneyDollarCircleLine,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50'
  },
  {
    title: 'Total Orders',
    value: '11,294',
    change: '+0.5%',
    isPositive: true,
    icon: RiShoppingBagLine,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50'
  },
  {
    title: 'New Customers',
    value: '1,543',
    change: '-2.1%',
    isPositive: false,
    icon: RiUserSmileLine,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50'
  },
  {
    title: 'Page Views',
    value: '45.5K',
    change: '-15.2%',
    isPositive: false,
    icon: RiEyeLine,
    color: 'text-red-500',
    bgColor: 'bg-red-50'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1]
    }
  })
};

const getStatusIcon = (status: Transaction['status']) => {
  switch (status) {
    case 'completed':
      return <RiCheckboxCircleLine className="w-5 h-5 text-emerald-500" />;
    case 'pending':
      return <RiTimeLine className="w-5 h-5 text-amber-500" />;
    case 'failed':
      return <RiErrorWarningLine className="w-5 h-5 text-red-500" />;
  }
};

const getStatusClass = (status: Transaction['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-emerald-50 text-emerald-700';
    case 'pending':
      return 'bg-amber-50 text-amber-700';
    case 'failed':
      return 'bg-red-50 text-red-700';
  }
};

const Dashboard: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid gap-4 sm:gap-8 px-2 sm:px-0"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2 sm:mb-4">
              <div className={`w-8 h-8 sm:w-12 sm:h-12 ${stat.bgColor} ${stat.color} rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-2xl`}>
                <stat.icon />
              </div>
              <h3 className="text-[10px] sm:text-sm font-medium text-slate-500">{stat.title}</h3>
            </div>
            <div className="text-base sm:text-2xl font-semibold text-slate-800">{stat.value}</div>
            <div className={`flex items-center gap-1 mt-1 sm:mt-2 text-[10px] sm:text-sm ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              {stat.isPositive ? <RiArrowUpLine className="w-3 h-3 sm:w-4 sm:h-4" /> : <RiArrowDownLine className="w-3 h-3 sm:w-4 sm:h-4" />}
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
            <h2 className="text-base sm:text-xl font-semibold text-slate-800">Revenue Overview</h2>
            <div className="flex items-center gap-2">
              <RiBarChartBoxLine className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <span className="text-[10px] sm:text-sm text-slate-500">Last 6 months</span>
            </div>
          </div>
          <div className="h-[200px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: 10 }}
                  tickMargin={5}
                />
                <YAxis 
                  stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: 10 }}
                  tickFormatter={(value: number) => `$${(value / 1000)}k`}
                  tickMargin={5}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px',
                    padding: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-base sm:text-xl font-semibold text-slate-800">Sales by Category</h2>
            <RiPieChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
          </div>
          <div className="h-[200px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={window.innerWidth < 640 ? 40 : 60}
                  outerRadius={window.innerWidth < 640 ? 60 : 80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value: string) => (
                    <span className="text-[10px] sm:text-sm text-slate-600">{value}</span>
                  )}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, 'Percentage']}
                  contentStyle={{
                    background: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '10px',
                    padding: '6px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-base sm:text-xl font-semibold text-slate-800">Recent Transactions</h2>
          <RiShoppingCart2Line className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
        </div>
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead>
                  <tr>
                    <th className="py-2 sm:py-3 text-left text-[10px] sm:text-sm font-medium text-slate-500">Transaction ID</th>
                    <th className="py-2 sm:py-3 text-left text-[10px] sm:text-sm font-medium text-slate-500">Customer</th>
                    <th className="py-2 sm:py-3 text-left text-[10px] sm:text-sm font-medium text-slate-500">Amount</th>
                    <th className="py-2 sm:py-3 text-left text-[10px] sm:text-sm font-medium text-slate-500">Status</th>
                    <th className="py-2 sm:py-3 text-left text-[10px] sm:text-sm font-medium text-slate-500">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-slate-50 transition-colors duration-150">
                      <td className="py-2 sm:py-4 text-[10px] sm:text-sm font-medium text-slate-900 whitespace-nowrap">{transaction.id}</td>
                      <td className="py-2 sm:py-4 text-[10px] sm:text-sm text-slate-500 whitespace-nowrap">{transaction.customer}</td>
                      <td className="py-2 sm:py-4 text-[10px] sm:text-sm font-medium text-slate-900 whitespace-nowrap">{transaction.amount}</td>
                      <td className="py-2 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 sm:gap-2">
                          {getStatusIcon(transaction.status)}
                          <span className={`text-[8px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${getStatusClass(transaction.status)}`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 sm:py-4 text-[10px] sm:text-sm text-slate-500 whitespace-nowrap">{transaction.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
