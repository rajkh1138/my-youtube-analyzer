export interface NicheAnalysis {
  saturation: {
    activeChannels: number;
    videoFrequency: number;
    competitionLevel: 'Low' | 'Medium' | 'High';
  };
  potential: {
    estimatedViews: number;
    searchVolume: number;
    audienceDemand: number;
  };
  revenue: {
    estimatedRpm: number;
    estimatedCpm: number;
    monthlyPotential: number;
  };
  topVideos: TopVideo[];
}

export interface TopVideo {
  title: string;
  views: number;
  likes: number;
  comments: number;
  duration: string;
  publishDate: string;
  thumbnail: string;
}