import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/ - Configuración de Vite
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['react-bootstrap', 'bootstrap'],
          icons: ['react-icons/fa', 'lucide-react'],
          utils: ['date-fns', 'react-toastify'],
          pages: [
            './src/pages/Admin.jsx',
            './src/pages/Perfil.jsx',
            './src/pages/SobreProyecto.jsx',
            './src/pages/Contacto.jsx',
            './src/pages/PaymentSuccess.jsx',
            './src/pages/PaymentFailure.jsx'
          ]
        }
      }
    }
  },
  define: {
    __DEV__: mode === 'development'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'bootstrap']
  }
}))
