import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  RiSearchLine, 
  RiFilter3Line,
  RiAddLine,
  RiStore2Line,
  RiMoneyDollarCircleLine,
  RiShoppingBagLine,
  RiBox3Line,
  RiArrowUpLine,
  RiArrowDownLine,
  RiMoreLine,
  RiEditLine,
  RiDeleteBinLine,
  RiEyeLine
} from 'react-icons/ri';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  sales: number;
  revenue: string;
}

const products: Product[] = [
  { id: '#PRD-001', name: 'iPhone 13 Pro', category: 'Electronics', price: '$999.99', stock: 45, status: 'in_stock', sales: 156, revenue: '$155,998.44' },
  { id: '#PRD-002', name: 'MacBook Air M2', category: 'Electronics', price: '$1,299.99', stock: 12, status: 'low_stock', sales: 89, revenue: '$115,699.11' },
  { id: '#PRD-003', name: 'AirPods Pro', category: 'Electronics', price: '$249.99', stock: 0, status: 'out_of_stock', sales: 234, revenue: '$58,497.66' },
  { id: '#PRD-004', name: 'iPad Air', category: 'Electronics', price: '$599.99', stock: 78, status: 'in_stock', sales: 67, revenue: '$40,199.33' },
  { id: '#PRD-005', name: 'Apple Watch Series 8', category: 'Electronics', price: '$399.99', stock: 34, status: 'in_stock', sales: 92, revenue: '$36,799.08' },
];

const stats = [
  { title: 'Total Products', value: '1,234', change: '+12.5%', icon: RiStore2Line, color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { title: 'Total Revenue', value: '$45,678', change: '+8.2%', icon: RiMoneyDollarCircleLine, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { title: 'Low Stock Items', value: '45', change: '-2.1%', icon: RiShoppingBagLine, color: 'text-amber-500', bgColor: 'bg-amber-50' },
  { title: 'Out of Stock', value: '12', change: '+5.3%', icon: RiBox3Line, color: 'text-red-500', bgColor: 'bg-red-50' },
];

const getStatusClass = (status: Product['status']) => {
  switch (status) {
    case 'in_stock':
      return 'bg-emerald-50 text-emerald-700';
    case 'low_stock':
      return 'bg-amber-50 text-amber-700';
    case 'out_of_stock':
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

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
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
          <h1 className="text-2xl font-bold text-slate-800">Products</h1>
          <p className="text-slate-500 mt-1">Manage your product inventory</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600 transition-colors"
        >
          <RiAddLine className="w-5 h-5" />
          Add Product
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
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
            </select>
            <button className="px-4 py-2 border border-slate-200 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <RiFilter3Line className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Product</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Sales</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Revenue</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        <RiStore2Line className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{product.name}</div>
                        <div className="text-sm text-slate-500">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{product.price}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusClass(product.status)}`}>
                      {product.status.replace('_', ' ').charAt(0).toUpperCase() + product.status.slice(1).replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{product.sales}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{product.revenue}</td>
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

export default Products;
