import { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import doodle from '../assets/doodle.png';
import twc from '../assets/twc.png';
import logou from '../assets/logout.png';

const WelcomePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
            <div><span className="text-white text-2xl  ml-1">portal</span></div>
          
        </div>
        
        {/* Welcome Content - Centered */}
        <div className="flex-grow flex flex-col justify-center px-16">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome,</h1>
          <p className="text-2xl text-white mb-12">
            This is where your contacts will live. Click the button below
            to add a new contact.
          </p>
          
          <div>
            <Link
              to="/contacts/new"
              className="inline-block rounded-full border border-white text-white px-8 py-3 hover:bg-white hover:text-[#173B3F] transition-colors"
            >
              add your first contact
            </Link>
          </div>
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

export default WelcomePage;