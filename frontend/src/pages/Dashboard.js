import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Plus, Eye, Trash2, BarChart3, Edit, FileText, Sparkles, ArrowRight, Layers } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto">
        {/* Demo User Welcome Banner */}
        {user?.email === 'demo@flowfunnels.com' && (
          <div className="mb-8 glass-dark rounded-2xl shadow-soft-lg border border-primary-200/30 p-6 backdrop-blur-xl overflow-hidden relative animate-slide-up">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-400/20 to-blue-400/20 rounded-full blur-3xl" />
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                  Welcome to FlowFunnels Demo! 🎉
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  You're using the demo account. Feel free to explore all features, create funnels, and test the platform. 
                  When ready, register your own account to build real funnels!
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate('/templates')}
                    className="inline-flex items-center px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-800 rounded-xl font-semibold transition-all shadow-soft hover:shadow-soft-lg group"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Browse Templates
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Test Funnel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2" data-testid="dashboard-title">
              My Funnels
            </h1>
            <p className="text-gray-600">Create and manage your marketing funnels</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 font-semibold group"
            data-testid="create-funnel-btn"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Funnel
            <ArrowRight className="w-0 group-hover:w-5 group-hover:ml-2 overflow-hidden transition-all" />
          </button>
        </div>

        {/* Browse Templates Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/templates')}
            className="inline-flex items-center px-6 py-3 glass-dark border border-primary-300/50 text-primary-700 hover:border-primary-500 rounded-xl transition-all shadow-soft hover:shadow-soft-lg font-medium group"
            data-testid="browse-templates-btn"
          >
            <Layers className="w-5 h-5 mr-2 text-primary-500" />
            Browse Templates
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Funnels Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-dark rounded-2xl border border-gray-200/50 p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded-lg w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded-lg w-2/3 mb-6" />
                <div className="flex gap-2">
                  <div className="h-10 bg-gray-200 rounded-lg flex-1" />
                  <div className="h-10 bg-gray-200 rounded-lg w-10" />
                  <div className="h-10 bg-gray-200 rounded-lg w-10" />
                </div>
              </div>
            ))}
          </div>
        ) : funnels.length === 0 ? (
          <div className="glass-dark rounded-2xl shadow-soft border border-gray-200/50 p-12 text-center backdrop-blur-xl animate-scale-in">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-soft">
              <FileText className="w-10 h-10 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No funnels yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Get started by creating your first funnel or browse our templates to jumpstart your marketing</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Funnel
              </button>
              <button
                onClick={() => navigate('/templates')}
                className="inline-flex items-center px-6 py-3 glass-dark border border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl transition-all shadow-soft hover:shadow-soft-lg font-medium"
              >
                <FileText className="w-5 h-5 mr-2" />
                Browse Templates
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {funnels.map((funnel) => (
              <div
                key={funnel.id}
                className="group glass-dark rounded-2xl shadow-soft hover:shadow-soft-lg transition-all border border-gray-200/50 hover:border-primary-300/50 backdrop-blur-xl overflow-hidden"
                data-testid={`funnel-card-${funnel.id}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-primary-600 transition-colors">
                        {funnel.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{funnel.description || 'No description'}</p>
                    </div>
                    {funnel.published && (
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-lg shadow-soft">
                        Published
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-5 px-3 py-2 bg-gray-50/50 rounded-lg">
                    <FileText className="w-4 h-4 mr-2 text-primary-500" />
                    <span className="font-medium">{funnel.pages?.length || 0} pages</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/funnel/${funnel.id}`)}
                      className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all text-sm font-semibold shadow-lg shadow-primary-500/20 hover:shadow-xl hover:-translate-y-0.5"
                      data-testid={`edit-funnel-${funnel.id}`}
                    >
                      <Edit className="w-4 h-4 mr-1.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/analytics/${funnel.id}`)}
                      className="flex items-center justify-center p-2.5 glass-dark border border-gray-300 hover:border-primary-400 text-gray-700 hover:text-primary-600 rounded-xl transition-all shadow-soft hover:shadow-soft-lg"
                      data-testid={`analytics-funnel-${funnel.id}`}
                    >
                      <BarChart3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteFunnel(funnel.id)}
                      className="flex items-center justify-center p-2.5 glass-dark border border-red-200 hover:border-red-400 text-red-600 hover:text-red-700 rounded-xl transition-all shadow-soft hover:shadow-soft-lg"
                      data-testid={`delete-funnel-${funnel.id}`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Funnel Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="glass-dark rounded-2xl shadow-soft-lg border border-white/20 max-w-md w-full p-6 animate-scale-in backdrop-blur-xl">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                Create New Funnel
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Funnel Name
                  </label>
                  <input
                    type="text"
                    value={newFunnelName}
                    onChange={(e) => setNewFunnelName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-soft"
                    placeholder="e.g., Product Launch Funnel"
                    data-testid="funnel-name-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newFunnelDesc}
                    onChange={(e) => setNewFunnelDesc(e.target.value)}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-soft resize-none"
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
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 font-semibold"
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
                  className="px-4 py-3 glass-dark border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl transition-all shadow-soft"
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
