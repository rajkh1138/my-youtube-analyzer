import React, { useState } from 'react';
import { Youtube } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { NicheSaturation } from './components/NicheSaturation';
import { PotentialMetrics } from './components/PotentialMetrics';
import { RevenueChart } from './components/RevenueChart';
import { TopVideos } from './components/TopVideos';
import { NicheAnalysis } from './types';
import { analyzeNiche } from './services/youtube';

function App() {
  const [analysis, setAnalysis] = useState<NicheAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeNiche(query);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze niche. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Youtube className="text-red-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">YouTube Niche Analyzer</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : analysis ? (
          <div className="space-y-8">
            <NicheSaturation data={analysis.saturation} />
            <PotentialMetrics data={analysis.potential} />
            <RevenueChart data={analysis.revenue} />
            <TopVideos videos={analysis.topVideos} />
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-12">
            <p className="text-lg">Enter a YouTube niche to get started</p>
            <p className="mt-2">We'll analyze the competition and opportunities for you</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;