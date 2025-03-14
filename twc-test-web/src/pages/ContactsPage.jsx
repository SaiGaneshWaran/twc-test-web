import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getContacts, deleteContact, updateContact } from '../services/contactService';
import { AuthContext } from '../context/AuthContext';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    gender: ''
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if not logged in


  useEffect(() => {
    // If not logged in, redirect
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchContacts();
  }, [user, navigate]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getContacts();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact._id);
    setEditForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      gender: contact.gender || 'male'
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async () => {
    try {
      await updateContact(editingContact, editForm);
      setContacts(contacts.map(contact => 
        contact._id === editingContact 
          ? { ...contact, ...editForm } 
          : contact
      ));
      setEditingContact(null);
      setSuccessMessage('Your contact has been saved successfully!');
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error updating contact:', error);
      setError('Failed to update contact');
    }
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!contactToDelete) return;
    
    try {
      await deleteContact(contactToDelete._id);
      setContacts(contacts.filter(c => c._id !== contactToDelete._id));
      setShowDeleteModal(false);
      setContactToDelete(null);
      setSuccessMessage('Your contact has been deleted successfully!');
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError('Failed to delete contact');
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
        
        {/* Logo and Header */}
        <div className="p-8 flex justify-between items-start">
          <div className="flex items-end">
            <span className="text-twc-red text-4xl font-bold">twc</span>
            <div className="text-white ml-2 text-2xl font-bold">contacts<br />portal</div>
          </div>
          
          <div className="flex items-center">
            <div className="text-white mr-4">{user.email}</div>
            <Link
              to="/contacts/new"
              className="rounded-full border border-white text-white px-6 py-2 hover:bg-white hover:text-twc-dark transition-colors"
            >
              add new contact
            </Link>
          </div>
        </div>
        
        {/* Contacts List */}
        <div className="px-8 pb-8 flex-grow">
          <h1 className="text-5xl font-bold text-white mb-8">Contacts</h1>
          
          {loading ? (
            <div className="text-white text-center py-8">Loading contacts...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : contacts.length === 0 ? (
            <div className="text-white text-center py-8">No contacts found. Add your first contact!</div>
          ) : (
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-600">full name</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-600">gender</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-600">e-mail</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-600">phone number</th>
                    <th className="px-6 py-3 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contacts.map(contact => (
                    <tr key={contact._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img 
                              className="h-12 w-12 rounded-full" 
                              src={contact.gender === 'female' 
                                ? '/src/assets/female-avatar.png' 
                                : '/src/assets/male-avatar.png'} 
                              alt="" 
                            />
                          </div>
                          <div className="ml-4">
                            {editingContact === contact._id ? (
                              <input
                                type="text"
                                name="name"
                                value={editForm.name}
                                onChange={handleEditFormChange}
                                className="border border-gray-300 rounded px-2 py-1"
                              />
                            ) : (
                              <div className="text-lg font-medium text-gray-900">{contact.name}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingContact === contact._id ? (
                          <select
                            name="gender"
                            value={editForm.gender}
                            onChange={handleEditFormChange}
                            className="border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        ) : (
                          <div className="text-lg text-gray-900">
                            {contact.gender === 'female' ? 'Female' : 'Male'}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingContact === contact._id ? (
                          <input
                            type="email"
                            name="email"
                            value={editForm.email}
                            onChange={handleEditFormChange}
                            className="border border-gray-300 rounded px-2 py-1"
                          />
                        ) : (
                          <div className="text-lg text-gray-900">{contact.email}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingContact === contact._id ? (
                          <input
                            type="tel"
                            name="phone"
                            value={editForm.phone}
                            onChange={handleEditFormChange}
                            className="border border-gray-300 rounded px-2 py-1"
                          />
                        ) : (
                          <div className="text-lg text-gray-900">{contact.phone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        {editingContact === contact._id ? (
                          <button
                            onClick={handleSaveEdit}
                            className="text-twc-dark font-medium bg-gray-200 px-3 py-1 rounded mr-2"
                          >
                            save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(contact)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteClick(contact)}
                          className="text-red-600 hover:text-red-900"
                          disabled={editingContact === contact._id}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
        
        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                Do you want to delete the contact "{contactToDelete?.name}"?
              </h2>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-twc-dark text-white px-4 py-2 rounded-full"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setContactToDelete(null);
                  }}
                  className="border border-gray-300 px-4 py-2 rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md">
              <h2 className="text-xl font-semibold mb-6 text-center">
                {successMessage}
              </h2>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="bg-twc-dark text-white px-6 py-2 rounded-full"
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsPage;