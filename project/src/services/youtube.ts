import { NicheAnalysis, TopVideo } from '../types';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export async function analyzeNiche(query: string): Promise<NicheAnalysis> {
  try {
    // Search for videos in the niche
    const searchResponse = await fetch(
      `${YOUTUBE_API_BASE}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=50&order=viewCount&key=${API_KEY}`
    );
    const searchData = await searchResponse.json();

    if (!searchData.items) {
      throw new Error('No videos found');
    }

    // Get video IDs
    const videoIds = searchData.items.map((item: any) => item.id.videoId);

    // Get detailed video statistics
    const videosResponse = await fetch(
      `${YOUTUBE_API_BASE}/videos?part=snippet,statistics,contentDetails&id=${videoIds.join(',')}&key=${API_KEY}`
    );
    const videosData = await videosResponse.json();

    if (!videosData.items) {
      throw new Error('Failed to fetch video details');
    }

    const videos = videosData.items;
    const totalViews = videos.reduce((sum: number, video: any) => 
      sum + (parseInt(video.statistics?.viewCount || '0')), 0);
    const avgViews = totalViews / videos.length;
    
    // Calculate competition level
    const competitionLevel = avgViews > 1000000 ? 'High' 
      : avgViews > 100000 ? 'Medium' : 'Low';

    const topVideos: TopVideo[] = videos.slice(0, 5).map((video: any) => ({
      title: video.snippet?.title || '',
      views: parseInt(video.statistics?.viewCount || '0'),
      likes: parseInt(video.statistics?.likeCount || '0'),
      comments: parseInt(video.statistics?.commentCount || '0'),
      duration: video.contentDetails?.duration || '',
      publishDate: video.snippet?.publishedAt || '',
      thumbnail: video.snippet?.thumbnails?.high?.url || ''
    }));

    return {
      saturation: {
        activeChannels: videos.length,
        videoFrequency: Math.round(videos.length / 7), // Approximate weekly upload rate
        competitionLevel
      },
      potential: {
        estimatedViews: Math.round(avgViews),
        searchVolume: videos.length * 1000, // Rough estimation
        audienceDemand: Math.min(100, Math.round((totalViews / (videos.length * 1000)) * 10))
      },
      revenue: {
        estimatedRpm: calculateRPM(videos),
        estimatedCpm: calculateCPM(videos),
        monthlyPotential: calculateMonthlyPotential(avgViews)
      },
      topVideos
    };
  } catch (error) {
    console.error('Error analyzing niche:', error);
    throw new Error('Failed to analyze niche');
  }
}

function calculateRPM(videos: any[]): number {
  // Estimate RPM based on engagement rates and niche type
  const avgEngagementRate = videos.reduce((sum, video) => {
    const views = parseInt(video.statistics?.viewCount || '0');
    const likes = parseInt(video.statistics?.likeCount || '0');
    const comments = parseInt(video.statistics?.commentCount || '0');
    return sum + ((likes + comments) / views);
  }, 0) / videos.length;

  // Base RPM calculation (simplified)
  return Math.round((avgEngagementRate * 1000 + 2) * 100) / 100;
}

function calculateCPM(videos: any[]): number {
  // CPM is typically higher than RPM
  const rpm = calculateRPM(videos);
  return Math.round((rpm * 1.5) * 100) / 100;
}

function calculateMonthlyPotential(avgViews: number): number {
  // Estimate monthly earnings based on average views
  const estimatedMonthlyViews = avgViews * 4; // Assume 4 videos per month
  const rpm = 2.50; // Conservative RPM estimate
  return Math.round((estimatedMonthlyViews / 1000) * rpm);
}