# AGENTS.md

## Architecture Overview

**Front-end for PokedexApi backend.** Angular 21 SPA that displays Pokémon data from a backend API. The app caches ALL Pokémon data in `PokemonService.allPokemon[]` on first load—this is not paginated backend queries, but a full in-memory dataset filtered client-side.

### Backend Integration Pattern

**NO proxy in production.** The `proxy.conf.js` is commented out—environment files handle backend routing:

- **Development** (`environment.development.ts`): Constructs backend URL dynamically from `window.location.hostname` + `:4204/pokedexapi`
- **Production** (`environment.ts`): Hardcoded to `https://mypokedex.us/springboot`
- Backend calls in `PokemonService.callURL()` rewrite `https://pokeapi.co/api/v2` URLs to local backend automatically

### Key Components & Data Flow

1. **PokemonListComponent** (`/`): Entry point, displays paginated list from cached data
2. **PokedexComponent** (`/pokedex/:pokemonID`): Detail view with tabs (description/locations/moves/evolutions)
3. **SearchComponent** (`/search`): Search interface
4. **EvolutionsComponent**: Embedded in Pokedex, renders evolution chains

**Data Loading:** `PokemonService.collectPokemonData()` fetches ALL Pokemon on first call, enriches with species data (color, weight conversion), caches in `allPokemon[]`. Type filtering with `fetchPokemonByType()` filters the cached array—no backend calls.

**Evolution Data:** 480 hardcoded evolution chains in `PokemonService.getEvolutionsMap()` (lines 226-716). This Map includes Mega evolutions, regional variants, and Gigantamax forms.

## Critical Workflows

### First Command

**ALWAYS run `npm install` first.** Dependency installation takes ~23 seconds. All build/test commands fail without this.

### Development Server

```bash
npm start  # Runs on port 4203 (non-standard)
```

Navigate to `http://localhost:4203/`. Backend expected at `:4204/pokedexapi` (see environment.development.ts).

### Building with Network Restrictions

**Font optimization breaks in sandboxed environments.** The default build inlines Google Fonts, causing failures in restricted networks. Workaround:

```bash
npm run build -- --optimization=false
```

This bypasses font optimization. Budget limits (900KB warning, 1MB error) may trigger but builds succeed.

### Testing

```bash
npm test  # Launches Karma + Chrome
```

## Project-Specific Patterns

### Standalone Components

`MobileMenuComponent` is standalone (imported in `app.module.ts` imports array, not declarations). Other components are traditional Angular declarations.

### Environment File Replacement

Angular's `fileReplacements` in `angular.json` swaps `environment.ts` with `environment.development.ts` during dev builds. Production builds use `environment.ts` by default.

### Direct DOM Manipulation

Components use `document.getElementById()` for style changes (e.g., `pokedex.component.ts` line 45). Not ViewChild pattern—legacy approach.

### Dark Mode

`DarkModeService` uses RxJS `BehaviorSubject` pattern. Applies `dark`/`light` classes to `document.body`. Components subscribe to `darkMode$` observable.

### Type Formatting

`PokemonService.setThePokemonTypes()` capitalizes first letter and joins multiple types with ` & ` (e.g., "Fire & Flying"). This format is used throughout templates.

### Routing Configuration

`onSameUrlNavigation: 'reload'` in `app-routing.module.ts` forces component reload on same-URL navigation (important for Pokedex detail view).

## External Dependencies

- **pokeapi-js-wrapper** v1.2.2: Imported types only (`NamedAPIResourceList`, `Pokemon`, etc.). Not used for API calls—`PokemonService` uses HttpClient directly.
- **ngx-pagination** v6.0.3: Pagination pipes in templates
- **ngx-order-pipe** v3.0.0: Sorting pipes (also has custom `ArraySortPipe`)
- **Angular Material** v21: `deeppurple-amber` prebuilt theme (see angular.json)

## Common Issues

**Build failures**: Run `npm install`, then use `--optimization=false` if font errors occur.

**Backend connection**: Dev server expects backend on `:4204`. Check `environment.development.ts` if API calls fail.

**Memory usage**: `allPokemon[]` array holds ~1000+ Pokemon objects with images/species data. Not an issue for modern browsers.

**Evolution chain updates**: New Pokemon require editing the 480-entry Map in `PokemonService.getEvolutionsMap()`. Follow the `[chainID, [[form1], [form2], [form3]]]` pattern.

