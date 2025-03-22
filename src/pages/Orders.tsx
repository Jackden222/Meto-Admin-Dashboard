import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  RiSearchLine, 
  RiFilter3Line,
  RiArrowUpDownLine,
  RiCheckboxCircleLine,
  RiTimeLine,
  RiErrorWarningLine,
  RiFileListLine,
  RiMoneyDollarCircleLine,
  RiShoppingCart2Line,
  RiUserLine,
  RiArrowRightLine
} from 'react-icons/ri';

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  items: number;
}

const orders: Order[] = [
  { id: '#ORD-001', customer: 'John Doe', product: 'iPhone 13 Pro', amount: '$999.99', status: 'completed', date: '2024-03-22', items: 1 },
  { id: '#ORD-002', customer: 'Jane Smith', product: 'MacBook Air M2', amount: '$1,299.99', status: 'pending', date: '2024-03-22', items: 1 },
  { id: '#ORD-003', customer: 'Mike Johnson', product: 'AirPods Pro', amount: '$249.99', status: 'completed', date: '2024-03-21', items: 2 },
  { id: '#ORD-004', customer: 'Sarah Williams', product: 'iPad Air', amount: '$599.99', status: 'failed', date: '2024-03-21', items: 1 },
  { id: '#ORD-005', customer: 'Tom Brown', product: 'Apple Watch Series 8', amount: '$399.99', status: 'completed', date: '2024-03-21', items: 1 },
  { id: '#ORD-006', customer: 'Emma Davis', product: 'MacBook Pro 14"', amount: '$1,999.99', status: 'pending', date: '2024-03-20', items: 1 },
  { id: '#ORD-007', customer: 'David Wilson', product: 'AirPods Max', amount: '$549.99', status: 'completed', date: '2024-03-20', items: 1 },
  { id: '#ORD-008', customer: 'Lisa Anderson', product: 'iPhone 14', amount: '$799.99', status: 'completed', date: '2024-03-20', items: 2 },
];

const stats = [
  { title: 'Total Orders', value: '1,234', change: '+12.5%', icon: RiFileListLine, color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { title: 'Total Revenue', value: '$45,678', change: '+8.2%', icon: RiMoneyDollarCircleLine, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { title: 'Pending Orders', value: '45', change: '-2.1%', icon: RiShoppingCart2Line, color: 'text-amber-500', bgColor: 'bg-amber-50' },
  { title: 'New Customers', value: '89', change: '+5.3%', icon: RiUserLine, color: 'text-blue-500', bgColor: 'bg-blue-50' },
];

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'completed':
      return <RiCheckboxCircleLine className="w-5 h-5 text-emerald-500" />;
    case 'pending':
      return <RiTimeLine className="w-5 h-5 text-amber-500" />;
    case 'failed':
      return <RiErrorWarningLine className="w-5 h-5 text-red-500" />;
  }
};

const getStatusClass = (status: Order['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-emerald-50 text-emerald-700';
    case 'pending':
      return 'bg-amber-50 text-amber-700';
    case 'failed':
      return 'bg-red-50 text-red-700';
  }
};

const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-2xl font-bold text-slate-800">Orders</h1>
          <p className="text-slate-500 mt-1">Manage and track your orders</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600 transition-colors"
        >
          <RiFileListLine className="w-5 h-5" />
          New Order
        </motion.button>
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
            <div className="flex items-center gap-1 mt-2 text-sm text-emerald-500">
              <RiArrowRightLine className="w-4 h-4" />
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Order['status'] | 'all')}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <button className="px-4 py-2 border border-slate-200 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <RiFilter3Line className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500 flex items-center gap-2">
                  Order ID
                  <RiArrowUpDownLine className="w-4 h-4 cursor-pointer" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Product</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Items</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusClass(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{order.items}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Orders;
