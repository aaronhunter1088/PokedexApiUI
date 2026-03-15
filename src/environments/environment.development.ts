const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const environment = {
    production: false,
    get landingPageUrl(): string {
        // Check if running on mobile device
        return isMobile ? `http://${window.location.hostname}:4200` : 'http://localhost:4200';
    },
    // used to call backend
    get hostUrl(): string {
        const host = window.location.hostname;
        const proto = window.location.protocol; // "http:" or "https:"
        const apiPort = proto === 'http:' ? ':4204' : ''; // same here, but you can customize
        return `${proto}//${host}${apiPort}/pokedexapi`;
    }
};