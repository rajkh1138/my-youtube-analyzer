import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { NicheAnalysis } from '../types';

interface RevenueChartProps {
  data: NicheAnalysis['revenue'];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const chartData = [
    {
      name: 'RPM',
      value: data.estimatedRpm,
      fill: '#4F46E5'
    },
    {
      name: 'CPM',
      value: data.estimatedCpm,
      fill: '#7C3AED'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Revenue Metrics</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Rate']}
              labelStyle={{ color: '#374151' }}
            />
            <Legend />
            <Bar dataKey="value" name="Rate (USD)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
        <p className="text-indigo-900 font-semibold">
          Estimated Monthly Potential: ${data.monthlyPotential.toLocaleString()}
        </p>
      </div>
    </div>
  );
}