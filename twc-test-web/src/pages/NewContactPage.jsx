import { useState, useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContact } from '../services/contactService';
import { AuthContext } from '../context/AuthContext';

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
    <div className="min-h-screen bg-gray-800">
      {/* Header */}
     
      
      {/* Main Content */}
      <div className="flex flex-col h-[calc(100vh)] bg-twc-dark relative">
        {/* Corner Effects */}
        <div className="absolute left-0 top-0 w-0 h-0 border-t-[150px] border-l-[150px] border-t-white border-l-transparent opacity-10"></div>
        <div className="absolute right-0 bottom-0 w-0 h-0 border-b-[150px] border-r-[150px] border-b-white border-r-transparent opacity-10"></div>
        
        {/* Logo */}
        <div className="p-8">
          <div className="flex items-end">
            <span className="text-twc-red text-4xl font-bold">twc</span>
            <div className="text-white ml-2 text-2xl font-bold">contacts<br />portal</div>
          </div>
        </div>
        
        {/* Form Content */}
        <div className="px-16 py-8">
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
                  className="w-full rounded-full py-3 px-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full rounded-full py-3 px-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full rounded-full py-3 px-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="rounded-full border border-white text-white px-8 py-3 hover:bg-white hover:text-twc-dark transition-colors"
              >
                {isSubmitting ? 'Adding...' : 'add your first contact'}
              </button>
            </div>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4">
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>
        
        {/* Logout */}
        <div className="p-6 absolute bottom-0 right-0">
          <button
            onClick={handleLogout}
            className="text-white flex items-center hover:underline"
          >
            <span>logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewContactPage;