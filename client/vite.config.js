import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
dotenv.config({path:'../.env'})
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:3000",
        secure:false,
      },
    },
  },

  plugins: [react()],
})
