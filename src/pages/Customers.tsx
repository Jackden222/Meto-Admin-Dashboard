import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  RiSearchLine, 
  RiFilter3Line,
  RiUserAddLine,
  RiUserLine,
  RiMoneyDollarCircleLine,
  RiShoppingCart2Line,
  RiCustomerService2Line,
  RiArrowUpLine,
  RiArrowDownLine,
  RiMoreLine,
  RiEditLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine
} from 'react-icons/ri';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  totalSpent: string;
  status: 'active' | 'inactive' | 'blocked';
  lastOrder: string;
}

const customers: Customer[] = [
  { id: '#CST-001', name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', location: 'New York, USA', orders: 12, totalSpent: '$1,234.56', status: 'active', lastOrder: '2024-03-22' },
  { id: '#CST-002', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 891', location: 'Los Angeles, USA', orders: 8, totalSpent: '$987.65', status: 'active', lastOrder: '2024-03-21' },
  { id: '#CST-003', name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 234 567 892', location: 'Chicago, USA', orders: 5, totalSpent: '$543.21', status: 'inactive', lastOrder: '2024-03-15' },
  { id: '#CST-004', name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1 234 567 893', location: 'Houston, USA', orders: 15, totalSpent: '$2,345.67', status: 'active', lastOrder: '2024-03-20' },
  { id: '#CST-005', name: 'Tom Brown', email: 'tom@example.com', phone: '+1 234 567 894', location: 'Phoenix, USA', orders: 3, totalSpent: '$234.56', status: 'blocked', lastOrder: '2024-03-10' },
];

const stats = [
  { title: 'Total Customers', value: '1,234', change: '+12.5%', icon: RiUserLine, color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { title: 'Active Customers', value: '1,089', change: '+8.2%', icon: RiCustomerService2Line, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { title: 'Total Revenue', value: '$45,678', change: '+15.3%', icon: RiMoneyDollarCircleLine, color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { title: 'Average Order Value', value: '$89.45', change: '+5.7%', icon: RiShoppingCart2Line, color: 'text-amber-500', bgColor: 'bg-amber-50' },
];

const getStatusClass = (status: Customer['status']) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-50 text-emerald-700';
    case 'inactive':
      return 'bg-slate-50 text-slate-700';
    case 'blocked':
      return 'bg-red-50 text-red-700';
  }
};

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

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Customer['status'] | 'all'>('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
          <p className="text-slate-500 mt-1">Manage your customer base</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600 transition-colors"
        >
          <RiUserAddLine className="w-5 h-5" />
          Add Customer
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
            <div className={`flex items-center gap-1 mt-2 text-sm ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
              {stat.change.startsWith('+') ? <RiArrowUpLine className="w-4 h-4" /> : <RiArrowDownLine className="w-4 h-4" />}
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
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Customer['status'] | 'all')}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
            <button className="px-4 py-2 border border-slate-200 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <RiFilter3Line className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Orders</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Total Spent</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Last Order</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        <RiUserLine className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{customer.name}</div>
                        <div className="text-sm text-slate-500">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <RiMailLine className="w-4 h-4" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <RiPhoneLine className="w-4 h-4" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <RiMapPinLine className="w-4 h-4" />
                      {customer.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{customer.totalSpent}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusClass(customer.status)}`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{customer.lastOrder}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                        <RiEyeLine className="w-4 h-4 text-slate-500" />
                      </button>
                      <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                        <RiEditLine className="w-4 h-4 text-slate-500" />
                      </button>
                      <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                        <RiDeleteBinLine className="w-4 h-4 text-slate-500" />
                      </button>
                      <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                        <RiMoreLine className="w-4 h-4 text-slate-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Customers;
