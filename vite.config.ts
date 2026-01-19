

// Force Vite restart 2
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url) {
            // Rewrite URL without .html to .html extension
            // Only rewrite if it's a GET request and doesn't have an extension (or is specific path)
            // But we can just use simple string matching for now based on user request.
            // Using replace to handle query params too.
            // Matches /article or /article?query or /article/
            // Vite handles /article/ usually, but user is asking for /article access.
            if (req.url === '/' || req.url === '/index' || req.url.startsWith('/index?')) {
              req.url = req.url.replace('/index', '/src/P01_toppage/index.html').replace(/^(\/)$/, '/src/P01_toppage/index.html');
            } else if (req.url === '/article' || req.url.startsWith('/article?')) {
              req.url = req.url.replace('/article', '/src/P02_article/article.html');
            } else if (req.url === '/notfound' || req.url.startsWith('/notfound?')) {
              req.url = req.url.replace('/notfound', '/src/P99_notfound/PageNotFound.html');
            } else if (req.url === '/search' || req.url.startsWith('/search?')) {
              req.url = req.url.replace('/search', '/src/P03_search/search.html');
            } else if (req.url === '/project' || req.url.startsWith('/project?')) {
              req.url = req.url.replace('/project', '/src/P04_project/project.html');
            } else if (req.url === '/login' || req.url.startsWith('/login?')) {
              req.url = req.url.replace('/login', '/src/A01_login/login.html');
            } else if (req.url === '/article_management' || req.url.startsWith('/article_management?')) {
              req.url = req.url.replace('/article_management', '/src/A03_article_management/index.html');
            } else if (req.url === '/editor' || req.url.startsWith('/editor?')) {
              req.url = req.url.replace('/editor', '/src/A04_editor/editor.html');
            } else if (req.url === '/master_management' || req.url.startsWith('/master_management?')) {
              req.url = req.url.replace('/master_management', '/src/A05_master_management/index.html');
            } else if (req.url === '/creator_management' || req.url.startsWith('/creator_management?')) {
              req.url = req.url.replace('/creator_management', '/src/A06_creator_management/index.html');
            } else if (req.url === '/account_management' || req.url.startsWith('/account_management?')) {
              req.url = req.url.replace('/account_management', '/src/A07_account_management/index.html');
            } else if (req.url === '/baduser' || req.url.startsWith('/baduser?')) {
              req.url = req.url.replace('/baduser', '/src/P98_baduser/index.html');
            } else if (req.url === '/creator' || req.url.startsWith('/creator?')) {
              req.url = req.url.replace('/creator', '/src/P05_creator/creator.html');
            }
          }
          next();
        });
      }
    }
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'vaul@1.1.2': 'vaul',
      'sonner@2.0.3': 'sonner',
      'recharts@2.15.2': 'recharts',
      'react-resizable-panels@2.1.7': 'react-resizable-panels',
      'react-hook-form@7.55.0': 'react-hook-form',
      'react-day-picker@8.10.1': 'react-day-picker',
      'next-themes@0.4.6': 'next-themes',
      'lucide-react@0.487.0': 'lucide-react',
      'input-otp@1.4.2': 'input-otp',
      'embla-carousel-react@8.6.0': 'embla-carousel-react',
      'cmdk@1.1.1': 'cmdk',
      'class-variance-authority@0.7.1': 'class-variance-authority',
      '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
      '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
      '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
      '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
      '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
      '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
      '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
      '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
      '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
      '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
      '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
      '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
      '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
      '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
      '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
      '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
      '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
      '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
      '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
      '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
      '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
      '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
      '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/P01_toppage/index.html'),
        article: path.resolve(__dirname, 'src/P02_article/article.html'),
        search: path.resolve(__dirname, 'src/P03_search/search.html'),
        project: path.resolve(__dirname, 'src/P04_project/project.html'),
        login: path.resolve(__dirname, 'src/A01_login/login.html'),
        article_management: path.resolve(__dirname, 'src/A03_article_management/index.html'),
        editor: path.resolve(__dirname, 'src/A04_editor/editor.html'),
        notfound: path.resolve(__dirname, 'src/P99_notfound/PageNotFound.html'),
        master_management: path.resolve(__dirname, 'src/A05_master_management/index.html'),
        creator_management: path.resolve(__dirname, 'src/A06_creator_management/index.html'),
        account_management: path.resolve(__dirname, 'src/A07_account_management/index.html'),
        baduser: path.resolve(__dirname, 'src/P98_baduser/index.html'),
        creator: path.resolve(__dirname, 'src/P05_creator/creator.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});