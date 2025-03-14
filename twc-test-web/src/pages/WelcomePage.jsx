import { useContext,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const WelcomePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

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
        
        {/* Welcome Content */}
        <div className="flex-grow flex flex-col justify-center px-16">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome,</h1>
          <p className="text-2xl text-white mb-12">
            This is where your contacts will live. Click the button below
            to add a new contact.
          </p>
          
          <div>
            <Link
              to="/contacts/new"
              className="inline-block rounded-full border border-white text-white px-8 py-3 hover:bg-white hover:text-twc-dark transition-colors"
            >
              add your first contact
            </Link>
          </div>
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

export default WelcomePage;