import { defineConfig } from 'vite';

export default defineConfig({
    // assetsInlineLimit: 1024000,
    assetsInclude: [
        '**/*.glb', 
        '**/*.gltf'
    ],
});