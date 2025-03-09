import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig(({ mode }) => {

  const PORT = `${'3000'}`;

  return {
    server: {
      open: true,
      port: PORT,
      mimeTypes: {
        'jsx': 'application/javascript'
      }
    },
    define: {
      global: 'window'
    },
    resolve: {
      //     alias: [
      //       {
      //         find: /^~(.+)/,
      //         replacement: path.join(process.cwd(), 'node_modules/$1')
      //       },
      //       {
      //         find: /^src(.+)/,
      //         replacement: path.join(process.cwd(), 'src/$1')
      //       }
      //     ]
    },
    preview: {
      // this ensures that the browser opens upon preview start
      open: true,
      port: PORT
    },
    base: "Locker/dashboards",
    plugins: [react(), jsconfigPaths()]
  };
});
