import React from 'react';
import { Clock, ThumbsUp, MessageCircle } from 'lucide-react';
import { TopVideo } from '../types';

interface TopVideosProps {
  videos: TopVideo[];
}

export function TopVideos({ videos }: TopVideosProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Top Performing Videos</h2>
      <div className="space-y-4">
        {videos.map((video, index) => (
          <div key={index} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-48 h-27 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
              <div className="flex space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {video.duration}
                </span>
                <span className="flex items-center">
                  <ThumbsUp size={16} className="mr-1" />
                  {video.likes.toLocaleString()}
                </span>
                <span className="flex items-center">
                  <MessageCircle size={16} className="mr-1" />
                  {video.comments.toLocaleString()}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Published: {new Date(video.publishDate).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg">{video.views.toLocaleString()}</p>
              <p className="text-sm text-gray-600">views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}