import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name || formData.email.split('@')[0]
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response?.data?.error || error.message);
      setError(error.response?.data?.error || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Header */}
     
      {/* Main Content */}
      <div className="flex h-[calc(100vh-3rem)]">
        {/* Left Section */}
        <div className="w-1/2 bg-twc-dark p-16 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-white mb-4">Register Now!</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mt-12">
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
                placeholder="create password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-full py-3 px-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-full py-3 px-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-full border border-white text-white px-8 py-2 hover:bg-white hover:text-twc-dark transition-colors"
              >
                {isLoading ? 'Registering...' : 'register'}
              </button>
            </div>
            
            <div>
              <Link to="/login" className="text-white hover:underline flex items-center">
                <span className="mr-2">&#60;</span> Back to login
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

export default RegisterPage;