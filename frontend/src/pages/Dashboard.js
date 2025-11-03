import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Plus, Eye, Trash2, BarChart3, Edit, FileText } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [funnels, setFunnels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFunnelName, setNewFunnelName] = useState('');
  const [newFunnelDesc, setNewFunnelDesc] = useState('');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFunnels();
  }, []);

  const fetchFunnels = async () => {
    try {
      const response = await api.get('/api/funnels');
      setFunnels(response.data);
    } catch (error) {
      console.error('Error fetching funnels:', error);
    } finally {
      setLoading(false);
    }
  };

  const createFunnel = async () => {
    if (!newFunnelName.trim()) return;

    setCreating(true);
    try {
      const response = await api.post('/api/funnels', {
        name: newFunnelName,
        description: newFunnelDesc,
      });
      setShowCreateModal(false);
      setNewFunnelName('');
      setNewFunnelDesc('');
      navigate(`/funnel/${response.data.id}`);
    } catch (error) {
      console.error('Error creating funnel:', error);
      alert('Failed to create funnel');
    } finally {
      setCreating(false);
    }
  };

  const deleteFunnel = async (funnelId) => {
    if (!window.confirm('Are you sure you want to delete this funnel?')) return;

    try {
      await api.delete(`/api/funnels/${funnelId}`);
      fetchFunnels();
    } catch (error) {
      console.error('Error deleting funnel:', error);
      alert('Failed to delete funnel');
    }
  };

  return (
    <DashboardLayout>
      <div>
        {/* Demo User Welcome Banner */}
        {user?.email === 'demo@flowfunnels.com' && (
          <div className="mb-6 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Welcome to FlowFunnels Demo! 🎉</h2>
                <p className="text-primary-50 mb-4">
                  You're using the demo account. Feel free to explore all features, create funnels, and test the platform. 
                  When ready, register your own account to build real funnels!
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate('/templates')}
                    className="px-4 py-2 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-sm"
                  >
                    Browse Templates
                  </button>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-primary-400 hover:bg-primary-300 text-white rounded-lg font-semibold transition-colors text-sm"
                  >
                    Create Test Funnel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800" data-testid="dashboard-title">My Funnels</h1>
            <p className="text-gray-600 mt-1">Create and manage your marketing funnels</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors shadow-lg"
            data-testid="create-funnel-btn"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Funnel
          </button>
        </div>

        {/* Browse Templates Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/templates')}
            className="flex items-center px-6 py-3 bg-white border-2 border-primary-500 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
            data-testid="browse-templates-btn"
          >
            <FileText className="w-5 h-5 mr-2" />
            Browse Templates
          </button>
        </div>

        {/* Funnels Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : funnels.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No funnels yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first funnel or browse our templates</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                Create Your First Funnel
              </button>
              <button
                onClick={() => navigate('/templates')}
                className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
              >
                Browse Templates
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funnels.map((funnel) => (
              <div
                key={funnel.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                data-testid={`funnel-card-${funnel.id}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{funnel.name}</h3>
                      <p className="text-sm text-gray-600">{funnel.description || 'No description'}</p>
                    </div>
                    {funnel.published && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                        Published
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FileText className="w-4 h-4 mr-1" />
                    <span>{funnel.pages?.length || 0} pages</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/funnel/${funnel.id}`)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors text-sm"
                      data-testid={`edit-funnel-${funnel.id}`}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/analytics/${funnel.id}`)}
                      className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
                      data-testid={`analytics-funnel-${funnel.id}`}
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteFunnel(funnel.id)}
                      className="flex items-center justify-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-sm"
                      data-testid={`delete-funnel-${funnel.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Funnel Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Funnel</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Funnel Name
                  </label>
                  <input
                    type="text"
                    value={newFunnelName}
                    onChange={(e) => setNewFunnelName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="e.g., Product Launch Funnel"
                    data-testid="funnel-name-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newFunnelDesc}
                    onChange={(e) => setNewFunnelDesc(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="Brief description of your funnel"
                    rows="3"
                    data-testid="funnel-description-input"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={createFunnel}
                  disabled={creating || !newFunnelName.trim()}
                  className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="create-funnel-submit"
                >
                  {creating ? 'Creating...' : 'Create Funnel'}
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewFunnelName('');
                    setNewFunnelDesc('');
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                  data-testid="create-funnel-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
