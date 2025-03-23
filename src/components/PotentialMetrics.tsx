import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { NicheAnalysis } from '../types';
import { TrendingUp, Users, Eye } from 'lucide-react';

interface PotentialMetricsProps {
  data: NicheAnalysis['potential'];
}

export function PotentialMetrics({ data }: PotentialMetricsProps) {
  // Generate trend data for the chart
  const trendData = Array.from({ length: 12 }, (_, i) => ({
    month: `Month ${i + 1}`,
    views: Math.round(data.estimatedViews * (1 + i * 0.1)), // Assume 10% growth per month
    demand: Math.round(data.audienceDemand * (1 + i * 0.05)) // Assume 5% growth per month
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Growth Potential</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-50 rounded-lg flex items-center space-x-3">
          <Eye className="text-green-600" size={24} />
          <div>
            <p className="text-sm text-green-600">Est. Monthly Views</p>
            <p className="text-lg font-semibold text-green-900">
              {data.estimatedViews.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg flex items-center space-x-3">
          <Users className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-blue-600">Search Volume</p>
            <p className="text-lg font-semibold text-blue-900">
              {data.searchVolume.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg flex items-center space-x-3">
          <TrendingUp className="text-purple-600" size={24} />
          <div>
            <p className="text-sm text-purple-600">Audience Demand</p>
            <p className="text-lg font-semibold text-purple-900">
              {data.audienceDemand}/100
            </p>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line 
              yAxisId="left"
              type="monotone"
              dataKey="views"
              stroke="#4F46E5"
              name="Estimated Views"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="demand"
              stroke="#7C3AED"
              name="Audience Demand"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}