import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/my-youtube-analyzer/", // Yeh path update kar
  plugins: [react()],
});
