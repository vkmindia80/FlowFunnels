import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';
import { FileText, Copy, Sparkles, ArrowRight } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2" data-testid="templates-title">
            Funnel Templates
          </h1>
          <p className="text-gray-600">Start with a professionally designed template</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-dark rounded-2xl border border-gray-200/50 overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-200" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded-lg w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded-lg w-2/3 mb-5" />
                  <div className="h-10 bg-gray-200 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : templates.length === 0 ? (
          <div className="glass-dark rounded-2xl shadow-soft border border-gray-200/50 p-12 text-center backdrop-blur-xl animate-scale-in">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-soft">
              <FileText className="w-10 h-10 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No templates available yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">Templates will be added in Phase 3. Stay tuned for professionally designed funnel templates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group glass-dark rounded-2xl shadow-soft hover:shadow-soft-lg transition-all border border-gray-200/50 hover:border-primary-300/50 overflow-hidden backdrop-blur-xl"
                data-testid={`template-card-${template.id}`}
              >
                <div className="aspect-video bg-gradient-to-br from-primary-100 via-blue-100 to-primary-200 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-blue-500/10" />
                  <FileText className="w-20 h-20 text-primary-600 relative z-10" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-5 line-clamp-2">{template.description}</p>
                  <button
                    onClick={() => cloneTemplate(template.id)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 font-semibold group"
                    data-testid={`use-template-${template.id}`}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Use Template
                    <ArrowRight className="w-0 group-hover:w-4 group-hover:ml-2 overflow-hidden transition-all" />
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
