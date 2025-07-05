import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/ - Configuración de Vite optimizada
export default defineConfig(({ mode }) => ({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@data": path.resolve(__dirname, "./src/data"),
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false
      }
    },
    // Optimización CSS
    devSourcemap: mode === 'development',
    postcss: {
      plugins: [
        // Autoprefixer y optimizaciones CSS se pueden agregar aquí
      ]
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    // Optimización del servidor de desarrollo
    hmr: {
      overlay: true
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'development',
    // Optimizaciones de build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.warn'] : []
      }
    },
    // Configuración para mejorar el rendimiento
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Estrategia de chunks optimizada
        manualChunks: (id) => {
          // Vendor chunk para dependencias principales
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('react-bootstrap') || id.includes('bootstrap')) {
              return 'ui';
            }
            if (id.includes('react-icons') || id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('date-fns') || id.includes('react-toastify')) {
              return 'utils';
            }
            if (id.includes('@mercadopago')) {
              return 'payments';
            }
            // Otras dependencias
            return 'vendor';
          }
          
          // Chunks para páginas específicas
          if (id.includes('/pages/')) {
            if (id.includes('Admin')) return 'admin';
            if (id.includes('Perfil')) return 'profile';
            if (id.includes('Payment')) return 'payments';
            return 'pages';
          }
          
          // Chunks para componentes grandes
          if (id.includes('/components/')) {
            if (id.includes('ProductCard') || id.includes('ProductList') || id.includes('ProductDetail')) {
              return 'products';
            }
            if (id.includes('Cart') || id.includes('Checkout')) {
              return 'cart';
            }
            return 'components';
          }
        },
        // Optimización de nombres de archivos
        entryFileNames: mode === 'production' ? 'assets/[name].[hash].js' : 'assets/[name].js',
        chunkFileNames: mode === 'production' ? 'assets/[name].[hash].js' : 'assets/[name].js',
        assetFileNames: mode === 'production' ? 'assets/[name].[hash].[ext]' : 'assets/[name].[ext]'
      }
    }
  },
  define: {
    __DEV__: mode === 'development',
    __PROD__: mode === 'production'
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'bootstrap',
      'react-bootstrap',
      'date-fns',
      'lucide-react',
      'react-toastify',
      'react-helmet-async',
      'styled-components'
    ],
    exclude: [
      // Excluir dependencias que pueden causar problemas
    ]
  },
  // Configuración adicional para análisis
  ...(mode === 'analyze' && {
    build: {
      rollupOptions: {
        external: [],
        output: {
          manualChunks: undefined
        }
      }
    }
  })
}))
