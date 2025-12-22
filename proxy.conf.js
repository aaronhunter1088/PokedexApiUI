console.log('[proxy] LOADED FILE:', __filename);
/**
 * Angular Dev Server Proxy Configuration
 *
 * - Routes /pokedexapi/** to the backend API on port 4202
 * - Used only during local development
 * - Eliminates CORS issues by keeping requests same-origin (4200)
 */
const mode = (process.env.POKEDEX_PROXY || 'prod').trim().toLowerCase();
const useProd = mode === 'prod';

console.log(`[proxy] mode=${mode}, useProd=${useProd}`);

module.exports = {
    '/pokedexapi': {
        target: useProd
            ? 'https://pokeapi.co/api/v2'
            : 'http://localhost:4202/pokedexapi',

        changeOrigin: true,
        secure: true,
        logLevel: 'debug',

        // ALWAYS remove /pokedexapi from the incoming request
        pathRewrite: {
            '^/pokedexapi': ''
        }
    }
};
