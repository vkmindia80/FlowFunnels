import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DndContext, useSensor, useSensors, PointerSensor, DragOverlay } from '@dnd-kit/core';
import api from '../utils/api';
import { ArrowLeft, Save, Eye, Plus, Loader, Check } from 'lucide-react';
import ElementLibrary from '../components/builder/ElementLibrary';
import FunnelCanvas from '../components/builder/FunnelCanvas';
import PropertiesPanel from '../components/builder/PropertiesPanel';
import { debounce } from 'lodash';

const FunnelBuilder = () => {
  const { funnelId } = useParams();
  const navigate = useNavigate();
  const [funnel, setFunnel] = useState(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);
  const [showAddPage, setShowAddPage] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [draggedElement, setDraggedElement] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    fetchFunnelData();
  }, [funnelId]);

  useEffect(() => {
    if (currentPage) {
      // Convert old elements format to new sections format if needed
      if (currentPage.elements && Array.isArray(currentPage.elements) && currentPage.elements.length > 0) {
        // Check if it's old format (has position property)
        if (currentPage.elements[0]?.position) {
          // Convert to new format - create one section with one row
          const convertedSections = [{
            id: 'section-1',
            rows: [{
              id: 'row-1',
              columns: [{
                id: 'col-1',
                width: 12,
                elements: currentPage.elements.map(el => ({
                  ...el,
                  position: undefined // Remove position property
                }))
              }]
            }]
          }];
          setSections(convertedSections);
        } else {
          setSections(currentPage.elements || []);
        }
      } else {
        setSections(currentPage.sections || []);
      }
    }
  }, [currentPage]);

  const fetchFunnelData = async () => {
    try {
      const [funnelRes, pagesRes] = await Promise.all([
        api.get(`/api/funnels/${funnelId}`),
        api.get(`/api/funnels/${funnelId}/pages`)
      ]);
      setFunnel(funnelRes.data);
      setPages(pagesRes.data);
      if (pagesRes.data.length > 0) {
        setCurrentPage(pagesRes.data[0]);
      }
    } catch (error) {
      console.error('Error fetching funnel:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPage = async () => {
    if (!newPageName.trim()) return;

    try {
      const response = await api.post('/api/pages', {
        funnel_id: funnelId,
        name: newPageName
      });
      setShowAddPage(false);
      setNewPageName('');
      await fetchFunnelData();
      setCurrentPage(response.data);
    } catch (error) {
      console.error('Error creating page:', error);
      alert('Failed to create page');
    }
  };

  const savePage = async (sectionsToSave) => {
    if (!currentPage) return;

    setSaving(true);
    setSaved(false);
    try {
      await api.put(`/api/pages/${currentPage.id}`, {
        sections: sectionsToSave
      });
      setSaved(true);
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Failed to save page');
    } finally {
      setSaving(false);
    }
  };

  // Debounced auto-save
  const debouncedSave = useCallback(
    debounce((sectionsToSave) => {
      savePage(sectionsToSave);
    }, 2000),
    [currentPage]
  );

  const handleSectionsChange = (newSections) => {
    setSections(newSections);
    setSaved(false);
    debouncedSave(newSections);
  };

  const handleManualSave = () => {
    savePage(sections);
  };

  const switchPage = (page) => {
    setCurrentPage(page);
    setSelectedElement(null);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    if (active.id.toString().startsWith('library-')) {
      const elementType = active.id.toString().replace('library-', '');
      setDraggedElement(elementType);
    }
  };

  const handleDragEnd = (event) => {
    setDraggedElement(null);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full">
          <div className="glass-dark rounded-2xl shadow-soft-lg border border-gray-200/50 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No pages yet</h2>
            <p className="text-gray-600 mb-6">Create your first page to start building your funnel</p>
            <button
              onClick={() => setShowAddPage(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create First Page
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="block w-full mt-3 px-6 py-3 glass-dark border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl transition-all shadow-soft"
            >
              Back to Dashboard
            </button>
          </div>

          {showAddPage && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="glass-dark rounded-2xl shadow-soft-lg border border-white/20 max-w-md w-full p-6 animate-scale-in backdrop-blur-xl">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                  Create New Page
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
                  />
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={createPage}
                    disabled={!newPageName.trim()}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 font-semibold"
                  >
                    Create Page
                  </button>
                  <button
                    onClick={() => {
                      setShowAddPage(false);
                      setNewPageName('');
                    }}
                    className="px-4 py-3 glass-dark border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl transition-all shadow-soft"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col bg-white">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">{funnel?.name}</h1>
              <p className="text-sm text-gray-500">{currentPage?.name || 'Select a page'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Save Status */}
            <div className="flex items-center gap-2 text-sm">
              {saving && (
                <span className="flex items-center text-gray-600">
                  <Loader className="w-4 h-4 mr-1.5 animate-spin" />
                  Saving...
                </span>
              )}
              {saved && !saving && (
                <span className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-1.5" />
                  Saved
                </span>
              )}
              {!saved && !saving && (
                <span className="text-amber-600">Unsaved changes</span>
              )}
            </div>

            <button
              onClick={handleManualSave}
              disabled={saving || saved}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg transition-all text-sm font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-1.5" />
              Save
            </button>

            <button
              onClick={() => setShowAddPage(true)}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 hover:border-primary-400 text-gray-700 rounded-lg transition-all text-sm font-medium"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Page
            </button>
          </div>
        </div>

        {/* Pages Tab Bar */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-2 flex items-center gap-2 overflow-x-auto">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => switchPage(page)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                currentPage?.id === page.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              {page.name}
            </button>
          ))}
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Element Library */}
          <ElementLibrary />

          {/* Center: Canvas */}
          <FunnelCanvas
            sections={sections}
            onSectionsChange={handleSectionsChange}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            draggedElement={draggedElement}
          />

          {/* Right: Properties Panel */}
          <PropertiesPanel
            selectedElement={selectedElement}
            sections={sections}
            onSectionsChange={handleSectionsChange}
          />
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
                  onKeyPress={(e) => e.key === 'Enter' && createPage()}
                  className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-soft"
                  placeholder="e.g., Thank You Page"
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={createPage}
                  disabled={!newPageName.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 font-semibold"
                >
                  Add Page
                </button>
                <button
                  onClick={() => {
                    setShowAddPage(false);
                    setNewPageName('');
                  }}
                  className="px-4 py-3 glass-dark border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl transition-all shadow-soft"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {draggedElement && (
          <div className="bg-white border-2 border-primary-500 rounded-lg p-4 shadow-lg opacity-80">
            <span className="font-semibold text-gray-800">{draggedElement}</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default FunnelBuilder;
