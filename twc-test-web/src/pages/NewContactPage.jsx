import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContact } from '../services/contactService';
import { AuthContext } from '../context/AuthContext';
import doodle from '../assets/doodle.png';
import twc from '../assets/twc.png';
import logou from '../assets/logout.png';


const NewContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await createContact(formData);
      navigate('/contacts');
    } catch (error) {
      console.error('Error creating contact:', error);
      setError(error.response?.data?.error || 'Failed to create contact');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#173B3F] relative overflow-hidden">
      {/* Main container */}
      <div className="flex flex-col h-screen relative z-10">
        {/* Logo in top-left corner */}
        <div className="p-8">
          <div className="flex items-end mb-2">
            <img src={twc} alt="TWC Logo" className="h-7 mr-2" />
          </div>
          <div>
            <span className="text-white text-4xl font-bold">contacts</span>
          </div>
          <div>
            <span className="text-white text-2xl ml-1">portal</span>
          </div>
        </div>
        
        {/* Form Content */}
        <div className="px-16 py-8 flex-grow">
          <h1 className="text-5xl font-bold text-white mb-12">New Contact</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-6">
                <input
                  type="text"
                  name="name"
                  placeholder="full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-full py-3 px-6 text-gray-700 focus:outline-none shadow-md"
                />
              </div>
              
              <div className="w-full md:w-1/2 px-4 mb-6">
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
              
              <div className="w-full md:w-1/2 px-4 mb-6">
                <input
                  type="tel"
                  name="phone"
                  placeholder="phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-full py-3 px-6 text-gray-700 focus:outline-none shadow-md"
                />
              </div>
              
              <div className="w-full md:w-1/2 px-4 mb-6 flex items-center">
                <span className="text-white mr-4">gender</span>
                <label className="inline-flex items-center mr-6">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    className="form-radio h-5 w-5"
                  />
                  <span className="ml-2 text-white">male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    className="form-radio h-5 w-5"
                  />
                  <span className="ml-2 text-white">female</span>
                </label>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full border border-white text-white px-8 py-3 hover:bg-white hover:text-[#173B3F] transition-colors"
              >
                {isSubmitting ? 'Adding...' : 'add contact'}
              </button>
            </div>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4">
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>
        
        {/* Logout - Bottom right with icon before text */}
       <div className="p-8 text-xl absolute bottom-0 right-0">
                 <button
                   onClick={handleLogout}
                   className="text-white flex items-center underline hover:underline"
                 >
                   <img src={logou} alt="TWC Logo" className="h-6 w-6 mr-2" />
                   <span>logout</span>
                 </button>
               </div>
      </div>
      
      {/* Top-right curved cut-out section */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-bl-[900px] bg-[#F5F5F5] overflow-hidden">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url(${doodle})`,
            backgroundSize: '400px 400px',
            opacity: 0.15
          }}
        ></div>
      </div>
      
      {/* Bottom-left curved cut-out section */}
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-tr-[1400px] bg-[#F5F5F5] overflow-hidden">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url(${doodle})`,
            backgroundSize: '400px 400px',
            opacity: 0.15
          }}
        ></div>
      </div>
    </div>
  );
};

export default NewContactPage;