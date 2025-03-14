import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userData = await login(formData);
      authLogin(userData);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.response?.data?.error || error.message);
      setError(error.response?.data?.error || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Header */}
      
      
      {/* Main Content */}
      <div className="flex h-[calc(100vh)]">
        {/* Left Section */}
        <div className="w-1/2 bg-twc-dark p-16 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-white mb-4">Hi there,</h1>
          <p className="text-3xl text-white mb-12">Welcome to our<br />contacts portal</p>
          
          <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
            <div>
              <input
                type="email"
                name="email"
                placeholder="e-mail"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-full py-3 px-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-full py-3 px-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-full border border-white text-white px-8 py-2 hover:bg-white hover:text-twc-dark transition-colors"
              >
                {isLoading ? 'Signing in...' : 'login'}
              </button>
              <span className="ml-4 text-white">or</span>
              <Link to="/register" className="ml-4 text-white hover:underline">
                Click here to Register
              </Link>
            </div>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4">
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>
        
        {/* Right Section */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center relative">
          <div className="absolute right-0 top-0 w-0 h-0 border-t-[250px] border-r-[250px] border-t-white border-r-transparent"></div>
          <div className="absolute left-0 bottom-0 w-0 h-0 border-b-[250px] border-l-[250px] border-b-white border-l-transparent"></div>
          
          <div className="text-center">
            <div className="flex items-end justify-center mb-8">
              <span className="text-twc-red text-5xl font-bold">twc</span>
            </div>
            <div className="text-twc-dark text-5xl font-bold">contacts<br />portal</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;