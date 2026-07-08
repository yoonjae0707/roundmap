import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api/seoul-subway': {
        target: 'http://swopenAPI.seoul.go.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/seoul-subway/, '/api/subway')
      }
    }
  }
});
