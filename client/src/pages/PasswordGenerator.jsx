import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Copy, RefreshCw } from 'lucide-react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState({ label: '', color: '' });

  const generatePassword = () => {
    const chars = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    let charSet = '';
    if (options.uppercase) charSet += chars.uppercase;
    if (options.lowercase) charSet += chars.lowercase;
    if (options.numbers) charSet += chars.numbers;
    if (options.symbols) charSet += chars.symbols;

    if (charSet === '') return setPassword('');

    let generated = '';
    for (let i = 0; i < length; i++) {
      generated += charSet[Math.floor(Math.random() * charSet.length)];
    }
    setPassword(generated);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, [length, options]);

  useEffect(() => {
    calculateStrength(password);
  }, [password]);

  const calculateStrength = (pwd) => {
    let score = 0;
    if (pwd.length > 8) score += 1;
    if (pwd.length > 12) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score < 3) {
      setStrength({ label: 'Weak', color: 'bg-red-500' });
    } else if (score < 5) {
      setStrength({ label: 'Medium', color: 'bg-yellow-500' });
    } else {
      setStrength({ label: 'Strong', color: 'bg-green-500' });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckbox = (option) => {
    // Prevent unchecking the last option
    const activeOptions = Object.values(options).filter(Boolean).length;
    if (activeOptions === 1 && options[option]) return;
    
    setOptions({ ...options, [option]: !options[option] });
  };

  return (
    <Sidebar>
      <div className="p-8 max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Password Generator</h1>
          <p className="text-gray-500 mt-1">Create strong, secure passwords instantly.</p>
        </header>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          {/* Output Display */}
          <div className="relative mb-8">
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl text-center break-all font-mono text-2xl text-gray-800 tracking-wider">
              {password || 'Select options to generate'}
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
              <button onClick={generatePassword} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors bg-white rounded-lg shadow-sm border border-gray-200">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button onClick={handleCopy} className="p-2 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg shadow-sm">
                <Copy className="w-5 h-5" />
              </button>
            </div>
            {copied && <span className="absolute -top-8 right-0 text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Copied!</span>}
          </div>

          {/* Strength Meter */}
          {password && (
            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-gray-500">Password Strength</span>
                <span className={strength.color.replace('bg-', 'text-')}>{strength.label}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex gap-1">
                <div className={`h-full ${strength.color} transition-all duration-300 w-1/3 ${strength.label === 'Weak' ? 'opacity-100' : 'opacity-100'}`}></div>
                <div className={`h-full ${strength.color} transition-all duration-300 w-1/3 ${strength.label === 'Medium' || strength.label === 'Strong' ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className={`h-full ${strength.color} transition-all duration-300 w-1/3 ${strength.label === 'Strong' ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="font-medium text-gray-700">Password Length</label>
                <span className="font-bold text-indigo-600">{length}</span>
              </div>
              <input 
                type="range" 
                min="8" 
                max="32" 
                value={length} 
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                <input 
                  type="checkbox" 
                  checked={options.uppercase} 
                  onChange={() => handleCheckbox('uppercase')}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 accent-indigo-600"
                />
                <span className="font-medium text-gray-700">Uppercase (A-Z)</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                <input 
                  type="checkbox" 
                  checked={options.lowercase} 
                  onChange={() => handleCheckbox('lowercase')}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 accent-indigo-600"
                />
                <span className="font-medium text-gray-700">Lowercase (a-z)</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                <input 
                  type="checkbox" 
                  checked={options.numbers} 
                  onChange={() => handleCheckbox('numbers')}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 accent-indigo-600"
                />
                <span className="font-medium text-gray-700">Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                <input 
                  type="checkbox" 
                  checked={options.symbols} 
                  onChange={() => handleCheckbox('symbols')}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 accent-indigo-600"
                />
                <span className="font-medium text-gray-700">Symbols (!@#$)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default PasswordGenerator;
