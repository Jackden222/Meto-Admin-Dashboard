import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  RiUserSettingsLine,
  RiNotificationLine,
  RiLockLine,
  RiPaletteLine,
  RiGlobalLine,
  RiSaveLine,
  RiUploadCloudLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiEyeOffLine,
  RiBellLine,
  RiMailLine,
  RiSunLine,
  RiMoonLine
} from 'react-icons/ri';

interface SettingSection {
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
}

const settingSections: SettingSection[] = [
  { title: 'Profile Settings', description: 'Manage your account information', icon: RiUserSettingsLine, color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { title: 'Notifications', description: 'Configure your notification preferences', icon: RiNotificationLine, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { title: 'Security', description: 'Manage your security settings', icon: RiLockLine, color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { title: 'Appearance', description: 'Customize the look and feel', icon: RiPaletteLine, color: 'text-amber-500', bgColor: 'bg-amber-50' },
  { title: 'Language', description: 'Set your preferred language', icon: RiGlobalLine, color: 'text-purple-500', bgColor: 'bg-purple-50' },
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

const Settings: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState('light');

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
          <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-500 mt-1">Manage your account settings</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600 transition-colors"
        >
          <RiSaveLine className="w-5 h-5" />
          Save Changes
        </motion.button>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingSections.map((section, index) => (
          <motion.div
            key={section.title}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${section.bgColor} ${section.color} rounded-xl flex items-center justify-center text-2xl`}>
                <section.icon />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{section.title}</h3>
                <p className="text-sm text-slate-500">{section.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-2xl shadow-sm"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center text-2xl">
            <RiUserSettingsLine />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Profile Settings</h2>
            <p className="text-slate-500">Update your personal information</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
              <RiUserSettingsLine className="w-10 h-10 text-slate-400" />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 border border-slate-200 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <RiUploadCloudLine className="w-5 h-5" />
              Change Photo
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-2xl shadow-sm"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-2xl">
            <RiLockLine />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Security Settings</h2>
            <p className="text-slate-500">Manage your password and security</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <RiEyeOffLine className="w-5 h-5" /> : <RiEyeLine className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="twoFactor"
              className="w-4 h-4 text-indigo-500 border-slate-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="twoFactor" className="text-sm text-slate-700">
              Enable two-factor authentication
            </label>
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-2xl shadow-sm"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center text-2xl">
            <RiNotificationLine />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Notification Settings</h2>
            <p className="text-slate-500">Configure your notification preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RiBellLine className="w-5 h-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-800">Push Notifications</div>
                <div className="text-sm text-slate-500">Receive push notifications</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RiMailLine className="w-5 h-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-800">Email Notifications</div>
                <div className="text-sm text-slate-500">Receive email notifications</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Appearance Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-sm"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center text-2xl">
            <RiPaletteLine />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Appearance Settings</h2>
            <p className="text-slate-500">Customize the look and feel</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Theme</label>
            <div className="flex gap-4">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  theme === 'light'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <RiSunLine className="w-5 h-5" />
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  theme === 'dark'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <RiMoonLine className="w-5 h-5" />
                Dark
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Accent Color</label>
            <div className="flex gap-2">
              {['indigo', 'emerald', 'blue', 'amber', 'purple'].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full bg-${color}-500 border-2 border-white shadow-sm hover:scale-110 transition-transform`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-red-100"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-2xl">
            <RiDeleteBinLine />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Danger Zone</h2>
            <p className="text-slate-500">Irreversible and destructive actions</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-800">Delete Account</div>
              <div className="text-sm text-slate-500">Permanently delete your account and all data</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
            >
              Delete Account
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
