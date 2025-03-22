import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { IconType } from 'react-icons';
import { 
  RiDashboardLine, 
  RiShoppingCart2Line, 
  RiStore2Line,
  RiUserLine,
  RiPieChartLine,
  RiSettings4Line,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiMenuLine,
  RiCloseLine
} from 'react-icons/ri';
import { useState, useEffect } from 'react';

interface NavItemType {
  path: string;
  icon: IconType;
  label: string;
}

interface SideBarProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  onMobileChange?: (isMobile: boolean) => void;
}

const navItems: NavItemType[] = [
  { path: '/', icon: RiDashboardLine, label: 'Dashboard' },
  { path: '/orders', icon: RiShoppingCart2Line, label: 'Orders' },
  { path: '/products', icon: RiStore2Line, label: 'Products' },
  { path: '/customers', icon: RiUserLine, label: 'Customers' },
  { path: '/analytics', icon: RiPieChartLine, label: 'Analytics' },
  { path: '/settings', icon: RiSettings4Line, label: 'Settings' },
];

const SideBar: React.FC<SideBarProps> = ({ isCollapsed, onCollapse, onMobileChange }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      onMobileChange?.(mobile);
      
      // Only close mobile menu when switching from mobile to desktop
      if (!mobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onMobileChange, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <AnimatePresence>
        {isMobile && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileMenu}
            className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <RiCloseLine className="w-6 h-6" /> : <RiMenuLine className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleMobileMenu}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className="fixed top-0 left-0 h-screen z-50"
        initial={false}
        animate={{ 
          x: isMobile && !isMobileMenuOpen ? -300 : 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
          }
        }}
      >
        <motion.div
          className={`
            ${isCollapsed ? 'w-20' : 'w-64'} 
            bg-white h-full shadow-md
            ${isMobile ? 'p-4' : 'p-8'}
          `}
        >
          <motion.div 
            className={`h-8 mb-8 flex items-center justify-center ${isMobile ? 'mt-4' : ''}`}
            initial={false}
            animate={{ 
              width: isCollapsed ? 20 : 'auto',
              scale: isCollapsed ? 0.8 : 1 
            }}
            transition={{ duration: 0.15 }}
          >
            <span className={`text-2xl font-bold text-indigo-500 transition-all duration-150 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
              Meto
            </span>
            <span className={`text-2xl font-bold text-indigo-500 absolute transition-all duration-150 ${isCollapsed ? 'opacity-100' : 'opacity-0 w-0'}`}>
              M
            </span>
          </motion.div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink 
                  key={item.path} 
                  to={item.path}
                  onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 rounded-lg transition-all duration-150
                    ${isActive 
                      ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
                      : 'text-slate-500 hover:bg-slate-100 hover:text-indigo-500'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                    ${isMobile ? 'text-sm py-2' : ''}
                  `}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-4'}`} />
                  {!isCollapsed && (
                    <span className="whitespace-nowrap">{item.label}</span>
                  )}
                </NavLink>
              );
            })}
          </nav>
          {!isMobile && (
            <button
              onClick={() => onCollapse(!isCollapsed)}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-indigo-500 p-2 rounded-lg text-white hover:bg-indigo-600 transition-colors duration-150"
            >
              {isCollapsed ? (
                <RiMenuUnfoldLine className="w-5 h-5" />
              ) : (
                <RiMenuFoldLine className="w-5 h-5" />
              )}
            </button>
          )}
        </motion.div>
      </motion.aside>
    </>
  );
};

export default SideBar;
