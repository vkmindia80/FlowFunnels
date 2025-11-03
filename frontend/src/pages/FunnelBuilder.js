import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';
import { ArrowLeft, Save, Eye, Plus } from 'lucide-react';

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
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              data-testid="back-to-dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{funnel?.name}</h1>
              <p className="text-gray-600 mt-1">{funnel?.description || 'No description'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddPage(true)}
              className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
              data-testid="add-page-btn"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Page
            </button>
          </div>
        </div>

        {/* Pages List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Funnel Pages</h2>
          
          {pages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No pages yet. Start by adding your first page.</p>
              <button
                onClick={() => setShowAddPage(true)}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                Add First Page
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                  data-testid={`page-item-${page.id}`}
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">{page.name}</h3>
                    <p className="text-sm text-gray-500">/{page.slug}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors text-sm"
                      data-testid={`edit-page-${page.id}`}
                    >
                      Edit Page
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drag-and-Drop Editor Placeholder */}
        <div className="mt-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border-2 border-dashed border-primary-300 p-12 text-center">
          <h3 className="text-2xl font-bold text-primary-800 mb-2">Drag-and-Drop Editor</h3>
          <p className="text-primary-600">Coming in Phase 2 - Advanced visual editor with element library</p>
        </div>

        {/* Add Page Modal */}
        {showAddPage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Page</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Name
                </label>
                <input
                  type="text"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="e.g., Landing Page"
                  data-testid="page-name-input"
                />
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={createPage}
                  disabled={!newPageName.trim()}
                  className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="create-page-submit"
                >
                  Add Page
                </button>
                <button
                  onClick={() => {
                    setShowAddPage(false);
                    setNewPageName('');
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
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
