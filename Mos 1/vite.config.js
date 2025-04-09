import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './', // Asegúrate de que el directorio raíz esté configurado correctamente
});
