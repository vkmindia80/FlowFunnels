import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';
import { FileText, Copy } from 'lucide-react';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await api.get('/api/templates');
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const cloneTemplate = async (templateId) => {
    try {
      const response = await api.post(`/api/templates/${templateId}/clone`);
      navigate(`/funnel/${response.data.id}`);
    } catch (error) {
      console.error('Error cloning template:', error);
      alert('Failed to clone template');
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800" data-testid="templates-title">Funnel Templates</h1>
          <p className="text-gray-600 mt-1">Start with a professionally designed template</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : templates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No templates available yet</h3>
            <p className="text-gray-600">Templates will be added in Phase 3</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                data-testid={`template-card-${template.id}`}
              >
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-t-xl flex items-center justify-center">
                  <FileText className="w-16 h-16 text-primary-600" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <button
                    onClick={() => cloneTemplate(template.id)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    data-testid={`use-template-${template.id}`}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Templates;
