import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
    build: {
        assetsInlineLimit: 40960000,
    },
    assetsInclude: [
        '**/*.glb', 
        '**/*.gltf',
    ],

    plugins: [
        viteSingleFile(),
    ]
});
