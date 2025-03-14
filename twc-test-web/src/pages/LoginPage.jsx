import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import twcLogo from '../assets/image.png'; // Make sure this image exists
import doodle from '../assets/doodle.png';

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
 
    <div className="min-h-screen flex">
      <div className="flex w-full h-screen">
        {/* Left Section - teal background */}
        <div className="w-2/5 bg-[#1A3640] p-16 flex flex-col justify-center relative">
          {/* Improved semicircle overlay */}
          

          <div className="z-10">
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
                  className="w-full rounded-full py-3 px-6 text-gray-700 focus:outline-none shadow-md"
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
                  className="w-full rounded-full py-3 px-6 text-gray-700 focus:outline-none shadow-md"
                />
              </div>
              
              <div className="flex items-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-full border border-white text-white px-8 py-2 hover:bg-white hover:text-[#1A3640] transition-colors"
                >
                  {isLoading ? 'Signing in...' : 'login'}
                </button>
                <span className="ml-4 text-white">or</span>
                <Link to="/register" className="ml-4 text-white underline">
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
              <span className="text-[#EF3F36] text-5xl font-bold"><span className="text-black">twc</span></span>
            </div>
            <div className="text-[#1A3640]">
              <span className="text-7xl font-bold">contacts</span><br/>
              <span className="text-7xl font-normal">portal</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-[calc(60%-100px)] h-full flex items-center pointer-events-none">
  <div className="h-[2300px] w-[1300px] bg-[#1A3640] rounded-r-full"></div>
</div>
      </div>
    </div>
  );
};

export default LoginPage;