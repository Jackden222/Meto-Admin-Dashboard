import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SideBar from './components/SideBar';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const App: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <SideBar 
          isCollapsed={isCollapsed} 
          onCollapse={setIsCollapsed}
          onMobileChange={setIsMobile}
        />
        <motion.main
          initial={false}
          animate={{ 
            marginLeft: isMobile ? 0 : (isCollapsed ? '5rem' : '16rem'),
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className={`
            min-h-screen
            transition-all duration-150
            ${isMobile ? 'px-4 py-16' : 'p-8'}
          `}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
};

export default App;
