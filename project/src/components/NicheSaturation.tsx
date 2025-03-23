import React from 'react';
import { Users, Video, TrendingUp } from 'lucide-react';
import { NicheAnalysis } from '../types';

interface NicheSaturationProps {
  data: NicheAnalysis['saturation'];
}

export function NicheSaturation({ data }: NicheSaturationProps) {
  const getCompetitionColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Niche Saturation Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <Users className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-gray-600">Active Channels</p>
            <p className="text-lg font-semibold">{data.activeChannels.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <Video className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-gray-600">Videos per Week</p>
            <p className="text-lg font-semibold">{data.videoFrequency}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <TrendingUp className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-gray-600">Competition Level</p>
            <p className={`text-lg font-semibold ${getCompetitionColor(data.competitionLevel)}`}>
              {data.competitionLevel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}