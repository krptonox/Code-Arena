import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': 'http://localhost:3000'
    },
  },
  plugins: [react(),tailwindcss()],
})


// proxy is used to redirect the API calls from frontend to backend server. It is used to avoid CORS error when we are making API calls from frontend to backend server which are running on different ports. In this case, we are redirecting all the API calls starting with '/api' to 'http://localhost:3000' which is our backend server.