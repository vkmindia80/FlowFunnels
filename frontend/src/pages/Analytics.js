import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';
import { ArrowLeft, Eye, MousePointer, FileText, TrendingUp, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const { funnelId } = useParams();
  const navigate = useNavigate();
  const [funnel, setFunnel] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [funnelId]);

  const fetchData = async () => {
    try {
      const [funnelRes, analyticsRes] = await Promise.all([
        api.get(`/api/funnels/${funnelId}`),
        api.get(`/api/analytics/funnel/${funnelId}`)
      ]);
      setFunnel(funnelRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
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

  const stats = [
    {
      name: 'Page Views',
      value: analytics?.page_views || 0,
      icon: Eye,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-100 to-blue-200',
      testId: 'stat-page-views'
    },
    {
      name: 'Button Clicks',
      value: analytics?.button_clicks || 0,
      icon: MousePointer,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-100 to-green-200',
      testId: 'stat-button-clicks'
    },
    {
      name: 'Form Submissions',
      value: analytics?.form_submissions || 0,
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-100 to-purple-200',
      testId: 'stat-form-submissions'
    },
    {
      name: 'Conversion Rate',
      value: `${analytics?.conversion_rate?.toFixed(1) || 0}%`,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-100 to-orange-200',
      testId: 'stat-conversion-rate'
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2.5 glass-dark border border-gray-300 hover:border-primary-400 rounded-xl transition-all shadow-soft hover:shadow-soft-lg mt-1"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2" data-testid="analytics-title">
              Analytics
            </h1>
            <p className="text-gray-600">{funnel?.name}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="glass-dark rounded-2xl shadow-soft border border-gray-200/50 p-6 backdrop-blur-xl hover:shadow-soft-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 mb-2">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-800" data-testid={stat.testId}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.bgColor} flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-all`}>
                    <Icon className={`w-6 h-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="glass-dark rounded-2xl shadow-soft border border-gray-200/50 p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Traffic Over Time</h2>
          </div>
          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border-2 border-dashed border-gray-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-blue-50/30" />
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-1">Advanced Charts Coming Soon</p>
              <p className="text-sm text-gray-500">Detailed analytics and visualizations in Phase 4</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
