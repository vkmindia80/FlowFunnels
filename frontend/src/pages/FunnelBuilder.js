import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';
import { ArrowLeft, Save, Eye, Plus, Edit2, Layers } from 'lucide-react';

const FunnelBuilder = () => {
  const { funnelId } = useParams();
  const navigate = useNavigate();
  const [funnel, setFunnel] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPage, setShowAddPage] = useState(false);
  const [newPageName, setNewPageName] = useState('');

  useEffect(() => {
    fetchFunnelData();
  }, [funnelId]);

  const fetchFunnelData = async () => {
    try {
      const [funnelRes, pagesRes] = await Promise.all([
        api.get(`/api/funnels/${funnelId}`),
        api.get(`/api/funnels/${funnelId}/pages`)
      ]);
      setFunnel(funnelRes.data);
      setPages(pagesRes.data);
    } catch (error) {
      console.error('Error fetching funnel:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPage = async () => {
    if (!newPageName.trim()) return;

    try {
      await api.post('/api/pages', {
        funnel_id: funnelId,
        name: newPageName
      });
      setShowAddPage(false);
      setNewPageName('');
      fetchFunnelData();
    } catch (error) {
      console.error('Error creating page:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2.5 glass-dark border border-gray-300 hover:border-primary-400 rounded-xl transition-all shadow-soft hover:shadow-soft-lg mt-1"
              data-testid="back-to-dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                {funnel?.name}
              </h1>
              <p className="text-gray-600">{funnel?.description || 'No description'}</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddPage(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 font-semibold"
            data-testid="add-page-btn"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Page
          </button>
        </div>

        {/* Pages List */}
        <div className="glass-dark rounded-2xl shadow-soft border border-gray-200/50 p-6 mb-8 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Funnel Pages</h2>
          </div>
          
          {pages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8 text-primary-600" />
              </div>
              <p className="text-gray-600 mb-6">No pages yet. Start by adding your first page.</p>
              <button
                onClick={() => setShowAddPage(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add First Page
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {pages.map((page, index) => (
                <div
                  key={page.id}
                  className="group flex items-center justify-between p-5 border border-gray-200 hover:border-primary-300 rounded-xl hover:shadow-soft transition-all bg-white/50"
                  data-testid={`page-item-${page.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700 font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                        {page.name}
                      </h3>
                      <p className="text-sm text-gray-500">/{page.slug}</p>
                    </div>
                  </div>
                  <button
                    className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all text-sm font-semibold shadow-lg shadow-primary-500/20 hover:shadow-xl hover:-translate-y-0.5"
                    data-testid={`edit-page-${page.id}`}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Page
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drag-and-Drop Editor Placeholder */}
        <div className="glass-dark rounded-2xl border-2 border-dashed border-primary-300 p-12 text-center backdrop-blur-xl shadow-soft overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-50/50 via-transparent to-blue-50/50" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Edit2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent mb-2">
              Drag-and-Drop Editor
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Coming in Phase 2 - Advanced visual editor with element library, real-time preview, and more
            </p>
          </div>
        </div>

        {/* Add Page Modal */}
        {showAddPage && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="glass-dark rounded-2xl shadow-soft-lg border border-white/20 max-w-md w-full p-6 animate-scale-in backdrop-blur-xl">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                Add New Page
              </h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Page Name
                </label>
                <input
                  type="text"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-soft"
                  placeholder="e.g., Landing Page"
                  data-testid="page-name-input"
                />
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={createPage}
                  disabled={!newPageName.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 font-semibold"
                  data-testid="create-page-submit"
                >
                  Add Page
                </button>
                <button
                  onClick={() => {
                    setShowAddPage(false);
                    setNewPageName('');
                  }}
                  className="px-4 py-3 glass-dark border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl transition-all shadow-soft"
                  data-testid="create-page-cancel"
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

export default FunnelBuilder;
