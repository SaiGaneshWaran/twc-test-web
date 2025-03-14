import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import twcLogo from '../assets/image.png'; 
import doodle from '../assets/doodle.png';

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
    <div className="min-h-screen flex">
      <div className="flex w-full h-screen relative">
        {/* Left Section - dark teal background */}
        <div className="w-2/5 bg-[#1A3640] p-16 flex flex-col justify-center">
          <div className="z-10">
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
                  className="w-full rounded-full py-3 px-6 text-gray-700 focus:outline-none shadow-md font-bold"
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
                  className="w-full rounded-full py-3 px-6 text-gray-700 focus:outline-none shadow-md font-bold"
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
                  className="w-full rounded-full py-3 px-6 text-gray-700 focus:outline-none shadow-md font-bold"
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-full border border-white text-white px-8 py-2 hover:bg-white hover:text-[#1A3640] transition-colors"
                >
                  {isLoading ? 'Registering...' : 'register'}
                </button>
              </div>
              
              <div>
                <Link to="/login" className="text-white hover:underline flex items-center underline">
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
        </div>
        
        {/* Right Section - with doodles background */}
        <div className="w-3/5 bg-white flex flex-col justify-center items-center relative">
          {/* Doodles background - use a CSS pattern or an actual image */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: `url(${doodle})`,
              backgroundSize: '400px 400px'
            }}
          ></div>
          
          {/* TWC Logo and text */}
          <div className="text-center z-10">
            <div className="flex items-end justify-center mb-8">
              <img src={twcLogo} alt="TWC Logo" className="h-12 mr-2" />
              <span className="text-black text-5xl font-bold">twc</span>
            </div>
            <div className="text-[#1A3640]">
              <span className="text-7xl font-bold">contacts</span><br/>
              <span className="text-7xl font-normal">portal</span>
            </div>
          </div>
        </div>
        
        {/* Curved divider */}
        <div className="absolute top-0 right-[calc(60%-100px)] h-full flex items-center pointer-events-none">
          <div className="h-[2300px] w-[1300px] bg-[#1A3640] rounded-r-full"></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;