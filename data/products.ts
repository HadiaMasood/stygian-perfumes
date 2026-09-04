export interface ScentNote {
  name: string;
  category: 'top' | 'heart' | 'base';
  description: string;
  botanical?: string;
  icon?: string;
}

export interface VolumeOption {
  size: string; // '30ml', '50ml', '100ml', '6x5ml'
  price: number; // in USD
  concentration: string; // 'Extrait de Parfum (35%)', 'Eau de Parfum (24%)', etc.
  stockStatus: 'in_stock' | 'low_stock' | 'preorder';
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  subtitle: string;
  fragranceFamily: 'Woody Smoky' | 'Floral Noir' | 'Oriental Amber' | 'Dark Resinous' | 'Discovery Coffret';
  concentration: string;
  basePrice: number;
  featured: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
  story: string;
  inspiration: string;
  character: string;
  atmosphere: string;
  intensity: number; // 1 to 5
  longevity: string; // e.g. "14+ Hours"
  sillage: 'Intimate' | 'Moderate' | 'Enveloping' | 'Transcendent' | 'Curated' | string;
  seasonality: string[];
  pairing: {
    recommendedSlug: string;
    recommendedName: string;
    rationale: string;
  };
  notes: {
    top: ScentNote[];
    heart: ScentNote[];
    base: ScentNote[];
  };
  volumes: VolumeOption[];
  images: {
    primary: string;
    secondary: string;
    lifestyle: string;
    pyramidHero: string;
    thumbnail: string;
  };
  palette: {
    accent: string;
    glow: string;
    tagBg: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: 'stygian-01',
    slug: 'wolfsbane',
    name: 'Wolfsbane',
    tagline: 'The Shadow of the Forest Moon',
    subtitle: 'Extrait de Parfum • 35% Concentration',
    fragranceFamily: 'Woody Smoky',
    concentration: 'Extrait de Parfum',
    basePrice: 245,
    featured: true,
    bestSeller: true,
    rating: 4.95,
    reviewsCount: 148,
    story: 'Forged in the nocturnal dampness of ancient pine forests where wild aconite blooms under celestial frost. Wolfsbane opens with cold camphor and bitter crushed juniper needles, unfurling into smoldering black cedar, raw birch tar, and a rich undercurrent of aged amber and distressed bridle leather.',
    inspiration: 'The folklore of shape-shifters, twilight cloaks, and forbidden botanical tinctures brewed under winter constellations.',
    character: 'Smoky, brooding, commanding, and magnetic. A sillage that demands reverent silence.',
    atmosphere: 'Dense midnight woodland, cold silver mist, smoldering hearth fire.',
    intensity: 5,
    longevity: '16+ Hours',
    sillage: 'Enveloping',
    seasonality: ['Autumn', 'Winter', 'Nocturnal Solstice'],
    pairing: {
      recommendedSlug: 'belladonna',
      recommendedName: 'Belladonna',
      rationale: 'Layering Wolfsbane under Belladonna yields a hypnotic contrast of venomous night florals suspended over smoldering birch smoke.'
    },
    notes: {
      top: [
        { name: 'Frostbitten Juniper', category: 'top', description: 'Crisp, needle-sharp aromatic chill and distilled wild berries.' },
        { name: 'Black Pepper & Camphor', category: 'top', description: 'An invigorating crackle of dark pepper and nocturnal alpine breeze.' },
        { name: 'Crushed Aconite Accord', category: 'top', description: 'Bittersweet botanical tension, cold and magnetic.' }
      ],
      heart: [
        { name: 'Smoked Black Cedar', category: 'heart', description: 'Charred timber aged in subterranean stone chambers.' },
        { name: 'Birch Tar & Cistus', category: 'heart', description: 'Leathery smoke with golden balsamic resins.' },
        { name: 'Wild Thyme & Moss', category: 'heart', description: 'Earthy green undergrowth wet with cold night dew.' }
      ],
      base: [
        { name: 'Dark Fossilized Amber', category: 'base', description: 'Centuries-old resinous warmth steeped in golden glow.' },
        { name: 'Raw Bridle Leather', category: 'base', description: 'Rich, supple leather worn smooth by nocturnal journeys.' },
        { name: 'Castoreum Accord & Vetiver', category: 'base', description: 'Primal, deeply rooted smoky vetiver and dark musk.' }
      ]
    },
    volumes: [
      { size: '30ml Flacon', price: 175, concentration: 'Extrait de Parfum (35%)', stockStatus: 'in_stock', sku: 'WLF-30-EXT' },
      { size: '50ml Flacon', price: 245, concentration: 'Extrait de Parfum (35%)', stockStatus: 'in_stock', sku: 'WLF-50-EXT' },
      { size: '100ml Heavy Glass Decanter', price: 380, concentration: 'Extrait de Parfum (35%)', stockStatus: 'low_stock', sku: 'WLF-100-DEC' }
    ],
    images: {
      primary: '/images/wolfsbane.jpg',
      secondary: '/images/stygian-nocturne-duo.jpg',
      lifestyle: '/images/stygian-marble-lifestyle.jpg',
      pyramidHero: '/images/wolfsbane.jpg',
      thumbnail: '/images/wolfsbane.jpg'
    },
    palette: {
      accent: '#c5a880',
      glow: 'rgba(197, 168, 128, 0.25)',
      tagBg: 'rgba(28, 26, 22, 0.9)'
    }
  },
  {
    id: 'stygian-02',
    slug: 'belladonna',
    name: 'Belladonna',
    tagline: 'The Beautiful Poison',
    subtitle: 'Eau de Parfum • 26% Concentration',
    fragranceFamily: 'Floral Noir',
    concentration: 'Eau de Parfum',
    basePrice: 225,
    featured: true,
    bestSeller: true,
    rating: 4.98,
    reviewsCount: 204,
    story: 'An intoxicating narcotic blend inspired by the seductive danger of Atropa belladonna. It unfurls with velvety black plum noir and bitter marzipan almond, cascading into a decadent heart of nocturnal tuberose, purple datura flower, and dark Indonesian patchouli drenched in bourbon vanilla.',
    inspiration: 'Renaissance Venetian court rituals, veiled courtesans, and velvet-lined apothecary cabinets.',
    character: 'Sensual, intoxicating, opulent, and dangerously alluring.',
    atmosphere: 'A candlelit salon draped in black silk velvet, wilted exotic blossoms, vintage decanted port.',
    intensity: 4,
    longevity: '14+ Hours',
    sillage: 'Enveloping',
    seasonality: ['Autumn', 'Spring Nights', 'Winter'],
    pairing: {
      recommendedSlug: 'obsidian-rose',
      recommendedName: 'Obsidian Rose',
      rationale: 'Pairs with Obsidian Rose to create a multi-dimensional garden of night blooms steeped in spiced rum and velvet tuberose.'
    },
    notes: {
      top: [
        { name: 'Black Plum Noir', category: 'top', description: 'Overripe, sweet-tart dark plum dripping in spiced nectar.' },
        { name: 'Bitter Almond Tincture', category: 'top', description: 'The unmistakable cyanic, creamy edge of poisonous kernels.' },
        { name: 'Mandarin Zest & Pink Peppercorn', category: 'top', description: 'A brief, luminous flash of spiced citrus top notes.' }
      ],
      heart: [
        { name: 'Midnight Tuberose', category: 'heart', description: 'Carnal, narcotic white floral harvested exclusively after sunset.' },
        { name: 'Purple Datura Accord', category: 'heart', description: 'Hypnotic nocturnal bloom with powdery gothic sweetness.' },
        { name: 'Black Jasmine & Ylang', category: 'heart', description: 'Rich indolent blossoms suspended in ambered wine.' }
      ],
      base: [
        { name: 'Indonesian Dark Patchouli', category: 'base', description: 'Aged 5 years in dark barrels for smooth chocolatey depth.' },
        { name: 'Bourbon Vanilla Bean', category: 'base', description: 'Smoky, non-culinary vanilla steeped in dark oak.' },
        { name: 'Benzoin Tears & White Musk', category: 'base', description: 'Powdery, enveloping skin-scent with enduring warmth.' }
      ]
    },
    volumes: [
      { size: '30ml Flacon', price: 165, concentration: 'Eau de Parfum (26%)', stockStatus: 'in_stock', sku: 'BEL-30-EDP' },
      { size: '50ml Flacon', price: 225, concentration: 'Eau de Parfum (26%)', stockStatus: 'in_stock', sku: 'BEL-50-EDP' },
      { size: '100ml Heavy Glass Decanter', price: 350, concentration: 'Eau de Parfum (26%)', stockStatus: 'in_stock', sku: 'BEL-100-DEC' }
    ],
    images: {
      primary: '/images/belladonna.jpg',
      secondary: '/images/stygian-nocturne-duo.jpg',
      lifestyle: '/images/stygian-marble-lifestyle.jpg',
      pyramidHero: '/images/belladonna.jpg',
      thumbnail: '/images/belladonna.jpg'
    },
    palette: {
      accent: '#9d6381',
      glow: 'rgba(157, 99, 129, 0.3)',
      tagBg: 'rgba(38, 20, 30, 0.9)'
    }
  },
  {
    id: 'stygian-03',
    slug: 'nox-arcana',
    name: 'Nox Arcana',
    tagline: 'The Secret of the Holy Pyre',
    subtitle: 'Extrait de Parfum • 38% Concentration',
    fragranceFamily: 'Dark Resinous',
    concentration: 'Extrait de Parfum',
    basePrice: 260,
    featured: true,
    rating: 4.92,
    reviewsCount: 96,
    story: 'A sacred nocturnal alchemy of holy smokes and ancient resins. Nox Arcana captures the solemn stillness of gothic cathedral vaults at 3 AM. Waves of burning frankincense tears and Royal Cambodian oud interlock with toasted saffron and charred labdanum.',
    inspiration: 'Occult manuscripts, ecclesiastical censers swinging in shadows, and aged vellum books bound in dark leather.',
    character: 'Mystical, meditative, profound, and transcendent.',
    atmosphere: 'Vaulted stone ceilings, drifting incense smoke, gold leaf glinting in shadow.',
    intensity: 5,
    longevity: '18+ Hours',
    sillage: 'Transcendent',
    seasonality: ['Winter', 'Autumn', 'Sacred Evenings'],
    pairing: {
      recommendedSlug: 'thanatos',
      recommendedName: 'Thanatos',
      rationale: 'Combining the sacred temple incense of Nox Arcana with the cold marble and cypress of Thanatos creates the ultimate contemplative aura.'
    },
    notes: {
      top: [
        { name: 'Omani Frankincense Tears', category: 'top', description: 'Lemony, sparkling high-grade sacred resin smoke.' },
        { name: 'Saffron Threads', category: 'top', description: 'Precious metallic-leathery gold harvested in autumn.' },
        { name: 'Clove Bud & Nutmeg', category: 'top', description: 'Dry, warm aromatic spice that warms the soul.' }
      ],
      heart: [
        { name: 'Aged Royal Cambodian Oud', category: 'heart', description: 'Deep, balsamic agarwood without barnyard funk; noble and smooth.' },
        { name: 'Smoked Birch & Guaiacwood', category: 'heart', description: 'Dense charred woods from ancient temple rafters.' },
        { name: 'Black Cistus Labdanum', category: 'heart', description: 'Sticky, ambery golden sap distilled slowly.' }
      ],
      base: [
        { name: 'Burnt Myrrh & Opoponax', category: 'base', description: 'Warm, sweet-resinous balsamic weight.' },
        { name: 'Dark Ambergris Accord', category: 'base', description: 'Salty, oceanic mineral warmth that anchors the resins.' },
        { name: 'Santalum Album (Sandalwood)', category: 'base', description: 'Creamy, meditative temple sandalwood.' }
      ]
    },
    volumes: [
      { size: '30ml Flacon', price: 185, concentration: 'Extrait de Parfum (38%)', stockStatus: 'in_stock', sku: 'NOX-30-EXT' },
      { size: '50ml Flacon', price: 260, concentration: 'Extrait de Parfum (38%)', stockStatus: 'in_stock', sku: 'NOX-50-EXT' },
      { size: '100ml Heavy Glass Decanter', price: 410, concentration: 'Extrait de Parfum (38%)', stockStatus: 'in_stock', sku: 'NOX-100-DEC' }
    ],
    images: {
      primary: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
      secondary: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
      pyramidHero: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80'
    },
    palette: {
      accent: '#e6a15c',
      glow: 'rgba(230, 161, 92, 0.25)',
      tagBg: 'rgba(36, 25, 16, 0.9)'
    }
  },
  {
    id: 'stygian-04',
    slug: 'obsidian-rose',
    name: 'Obsidian Rose',
    tagline: 'Velvet Petals Steeped in Rum & Ebony',
    subtitle: 'Parfum Intense • 30% Concentration',
    fragranceFamily: 'Floral Noir',
    concentration: 'Parfum Intense',
    basePrice: 235,
    featured: true,
    rating: 4.89,
    reviewsCount: 112,
    story: 'Not your conventional floral. Obsidian Rose is a gothic romance of crimson Damask roses submerged in Jamaican dark spiced rum, dusted with cracked black peppercorns, and encased in dark polished ebony wood with warm cashmeran blankets.',
    inspiration: 'Wuthering Heights, moonlit rose gardens after a tempest, and old vintage liqueurs.',
    character: 'Romantic, dark, opulent, and intoxicatingly warm.',
    atmosphere: 'A library in the rain, a crystal glass of aged rum, wilted red roses on mahogany.',
    intensity: 4,
    longevity: '15+ Hours',
    sillage: 'Enveloping',
    seasonality: ['Autumn', 'Winter', 'All Seasons Evening'],
    pairing: {
      recommendedSlug: 'wolfsbane',
      recommendedName: 'Wolfsbane',
      rationale: 'Adds deep cedarwood and raw leather smoke behind the lush spiced rose and rum.'
    },
    notes: {
      top: [
        { name: 'Dark Jamaican Rum', category: 'top', description: 'Boozy molasses warmth with sweet spice.' },
        { name: 'Crushed Black Pepper', category: 'top', description: 'Sharp, dry counterpoint to lush boozy notes.' },
        { name: 'Blood Orange Bitters', category: 'top', description: 'Zesty dark citrus undertone.' }
      ],
      heart: [
        { name: 'Damascene Rose Absolute', category: 'heart', description: 'Deep, honeyed, velvety crimson rose petals.' },
        { name: 'Turkish Rose Taif', category: 'heart', description: 'Spicy, complex floral elegance.' },
        { name: 'Cacao Pod & Cardamom', category: 'heart', description: 'Dark bittersweet chocolate and green spice.' }
      ],
      base: [
        { name: 'Ebony Wood & Oud', category: 'base', description: 'Polished black tropical timber with mysterious warmth.' },
        { name: 'Cashmeran Velvet', category: 'base', description: 'Soft, musky, tactile warmth of luxury cashmere.' },
        { name: 'Smoked Amber Resin', category: 'base', description: 'Long lingering golden warmth.' }
      ]
    },
    volumes: [
      { size: '30ml Flacon', price: 170, concentration: 'Parfum Intense (30%)', stockStatus: 'in_stock', sku: 'ROSE-30-PAR' },
      { size: '50ml Flacon', price: 235, concentration: 'Parfum Intense (30%)', stockStatus: 'in_stock', sku: 'ROSE-50-PAR' },
      { size: '100ml Heavy Glass Decanter', price: 365, concentration: 'Parfum Intense (30%)', stockStatus: 'in_stock', sku: 'ROSE-100-DEC' }
    ],
    images: {
      primary: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
      secondary: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
      pyramidHero: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80'
    },
    palette: {
      accent: '#c94d5d',
      glow: 'rgba(201, 77, 93, 0.25)',
      tagBg: 'rgba(40, 16, 20, 0.9)'
    }
  },
  {
    id: 'stygian-05',
    slug: 'thanatos',
    name: 'Thanatos',
    tagline: 'The Breath of Cold Marble & Petrichor',
    subtitle: 'Eau de Parfum • 25% Concentration',
    fragranceFamily: 'Woody Smoky',
    concentration: 'Eau de Parfum',
    basePrice: 220,
    featured: false,
    rating: 4.88,
    reviewsCount: 78,
    story: 'A tribute to classical tranquility and the poetic beauty of the void. Thanatos captures the cool mineral scent of rain falling over ancient Carrara marble sculptures, Mediterranean cypress branches, wet mossy earth, and pure Somalian myrrh.',
    inspiration: 'Ancient Greek necropolises, whispering cypress avenues, and cold marble bathed in moonlight.',
    character: 'Contemplative, mineral, ethereal, and grounding.',
    atmosphere: 'Rain on stone, towering green cypress, stillness of dawn.',
    intensity: 3,
    longevity: '12+ Hours',
    sillage: 'Moderate',
    seasonality: ['Spring', 'Autumn', 'Summer Nights'],
    pairing: {
      recommendedSlug: 'hecates-veil',
      recommendedName: "Hecate's Veil",
      rationale: 'Blends crisp mineral stone and cypress with bitter herbal absinthe and violet leaf.'
    },
    notes: {
      top: [
        { name: 'Cold Marble Accord', category: 'top', description: 'Crisp, mineral, stony coolness with ozonic clarity.' },
        { name: 'Mediterranean Cypress', category: 'top', description: 'Resinous green pine needles and clean wood.' },
        { name: 'Wet Petrichor', category: 'top', description: 'Geosmin and damp soil after first rainfall.' }
      ],
      heart: [
        { name: 'Somalian Myrrh', category: 'heart', description: 'Clean, cooling balsamic resin with bittersweet nuance.' },
        { name: 'Iris Pallida (Orris Root)', category: 'heart', description: 'Silky, powdery earth and aristocratic coolness.' },
        { name: 'Crushed Ivy Leaves', category: 'heart', description: 'Dark green botanical freshness.' }
      ],
      base: [
        { name: 'Atlas Cedarwood', category: 'base', description: 'Sturdy, noble cedar timber with clean undertones.' },
        { name: 'Oakmoss & Lichen', category: 'base', description: 'Ancient woodland floor moss.' },
        { name: 'Mineral Ambergris & Musk', category: 'base', description: 'Clean, radiant skin finish.' }
      ]
    },
    volumes: [
      { size: '30ml Flacon', price: 160, concentration: 'Eau de Parfum (25%)', stockStatus: 'in_stock', sku: 'THA-30-EDP' },
      { size: '50ml Flacon', price: 220, concentration: 'Eau de Parfum (25%)', stockStatus: 'in_stock', sku: 'THA-50-EDP' },
      { size: '100ml Heavy Glass Decanter', price: 340, concentration: 'Eau de Parfum (25%)', stockStatus: 'in_stock', sku: 'THA-100-DEC' }
    ],
    images: {
      primary: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
      secondary: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80',
      pyramidHero: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=400&q=80'
    },
    palette: {
      accent: '#839ca1',
      glow: 'rgba(131, 156, 161, 0.25)',
      tagBg: 'rgba(20, 27, 30, 0.9)'
    }
  },
  {
    id: 'stygian-06',
    slug: 'hecates-veil',
    name: "Hecate's Veil",
    tagline: 'Silver Absinthe, Violet Leaf & Smoked Tea',
    subtitle: 'Extrait de Parfum • 32% Concentration',
    fragranceFamily: 'Oriental Amber',
    concentration: 'Extrait de Parfum',
    basePrice: 240,
    featured: false,
    isNew: true,
    rating: 4.96,
    reviewsCount: 64,
    story: 'Named for the goddess of the crossroads, magic, and the night moon. Hecate’s Veil opens with an exhilarating emerald flash of artisanal wormwood absinthe and dewy violet leaf, flowing into steamed Keemun black tea, dried figs, and animalic dark musk.',
    inspiration: 'Crossroads at midnight, moonlit divination, and Bohemian absinthe rituals.',
    character: 'Enigmatic, herbal, intellectual, and shadow-draped.',
    atmosphere: 'Silver moonlight on dark water, an antique glass of absinthe with sugar melting.',
    intensity: 4,
    longevity: '14+ Hours',
    sillage: 'Enveloping',
    seasonality: ['Spring', 'Summer Nights', 'Autumn'],
    pairing: {
      recommendedSlug: 'nox-arcana',
      recommendedName: 'Nox Arcana',
      rationale: 'Creates an otherworldly harmony of smoky resins and emerald absinthe herbs.'
    },
    notes: {
      top: [
        { name: 'Artemisia Absinthium (Wormwood)', category: 'top', description: 'Bittersweet, emerald green herbal liquor.' },
        { name: 'Dewy Violet Leaf', category: 'top', description: 'Aquatic, green cucumber-metallic crunch.' },
        { name: 'Anise Seed & Fennel', category: 'top', description: 'Spicy licorice sparkle of the green fairy.' }
      ],
      heart: [
        { name: 'Steamed Keemun Black Tea', category: 'heart', description: 'Smoky, tannic Chinese black tea brew.' },
        { name: 'Sun-Dried Black Fig', category: 'heart', description: 'Dense, dark honeyed fruit flesh.' },
        { name: 'Guaiacwood Flower', category: 'heart', description: 'Subtle sweet smoke and warm floral nuance.' }
      ],
      base: [
        { name: 'Dark Tonkin Musk Accord', category: 'base', description: 'Silky, hypnotic nocturnal skin musk.' },
        { name: 'Bourbon Vetiver', category: 'base', description: 'Smoky roots aged in dark barrels.' },
        { name: 'Spanish Labdanum', category: 'base', description: 'Rich ambery resin that fixes the green notes.' }
      ]
    },
    volumes: [
      { size: '30ml Flacon', price: 170, concentration: 'Extrait de Parfum (32%)', stockStatus: 'in_stock', sku: 'HEC-30-EXT' },
      { size: '50ml Flacon', price: 240, concentration: 'Extrait de Parfum (32%)', stockStatus: 'in_stock', sku: 'HEC-50-EXT' },
      { size: '100ml Heavy Glass Decanter', price: 375, concentration: 'Extrait de Parfum (32%)', stockStatus: 'in_stock', sku: 'HEC-100-DEC' }
    ],
    images: {
      primary: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
      secondary: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
      pyramidHero: 'https://images.unsplash.com/photo-1588405748480-1cf41488c70f?auto=format&fit=crop&w=600&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=80'
    },
    palette: {
      accent: '#6ea684',
      glow: 'rgba(110, 166, 132, 0.25)',
      tagBg: 'rgba(18, 30, 24, 0.9)'
    }
  },
  {
    id: 'stygian-07',
    slug: 'discovery-set',
    name: "The Alchemist's Discovery Coffret",
    tagline: 'Complete 6-Piece Scent Exploration',
    subtitle: '6 x 5ml Miniature Flacons • Luxury Presentation Box',
    fragranceFamily: 'Discovery Coffret',
    concentration: 'Discovery Set',
    basePrice: 95,
    featured: true,
    bestSeller: true,
    rating: 4.99,
    reviewsCount: 318,
    story: 'Immerse yourself fully into the Stygian universe. This bespoke coffret features six 5ml miniature flacons of our iconic creations (Wolfsbane, Belladonna, Nox Arcana, Obsidian Rose, Thanatos, Hecate’s Veil). Housed in a custom black velvet coffret with wax-sealed certification. Includes a $95 voucher redeemable toward any full 50ml or 100ml flacon.',
    inspiration: 'The alchemist’s travel chest, curated discovery, zero-risk olfactory journey.',
    character: 'Curated, comprehensive, giftable, and luxurious.',
    atmosphere: 'Black velvet interior, silver embossed crest, numbered miniature flacons.',
    intensity: 4,
    longevity: 'Varies by Flacon',
    sillage: 'Varies by Flacon',
    seasonality: ['All Seasons', 'Gift Season', 'Initiation'],
    pairing: {
      recommendedSlug: 'wolfsbane',
      recommendedName: 'Wolfsbane',
      rationale: 'Use the coffret to test layering combinations before committing to full flacons.'
    },
    notes: {
      top: [
        { name: '6 Curated Top Accords', category: 'top', description: 'From frostbitten juniper to bitter wormwood absinthe.' }
      ],
      heart: [
        { name: '6 Iconic Heart Accords', category: 'heart', description: 'From midnight tuberose to aged Cambodian oud.' }
      ],
      base: [
        { name: '6 Enduring Base Accords', category: 'base', description: 'From smoldering black cedar to Tonkin musk.' }
      ]
    },
    volumes: [
      { size: '6 x 5ml Coffret Box', price: 95, concentration: 'Pure Extrait & EDP Collection', stockStatus: 'in_stock', sku: 'DISC-6X5-BOX' }
    ],
    images: {
      primary: '/images/stygian-campaign.jpg',
      secondary: '/images/stygian-nocturne-duo.jpg',
      lifestyle: '/images/stygian-marble-lifestyle.jpg',
      pyramidHero: '/images/stygian-campaign.jpg',
      thumbnail: '/images/stygian-campaign.jpg'
    },
    palette: {
      accent: '#dfc287',
      glow: 'rgba(223, 194, 135, 0.3)',
      tagBg: 'rgba(32, 28, 20, 0.9)'
    }
  }
];

export const FRAGRANCE_FAMILIES = [
  {
    name: 'All Scents',
    slug: 'all',
    description: 'The complete Stygian olfactory collection.'
  },
  {
    name: 'Woody Smoky',
    slug: 'woody-smoky',
    description: 'Charred timber, damp pine, birch tar, and primordial embers.'
  },
  {
    name: 'Floral Noir',
    slug: 'floral-noir',
    description: 'Narcotic night blooms, poisonous petals, and dark velvety roses.'
  },
  {
    name: 'Dark Resinous',
    slug: 'dark-resinous',
    description: 'Sacred cathedral incense, royal Cambodian oud, and golden amber tears.'
  },
  {
    name: 'Oriental Amber',
    slug: 'oriental-amber',
    description: 'Silver absinthe, violet herbs, Keemun black tea, and Tonkin musk.'
  },
  {
    name: 'Discovery Coffret',
    slug: 'discovery-coffret',
    description: 'Curated miniature sets with complimentary full-size voucher redemption.'
  }
];

export const COMPLIMENTARY_SAMPLES = [
  { id: 'sample-wolfsbane', name: 'Wolfsbane (2ml Vial)', notes: 'Smoky Aconite & Dark Cedar' },
  { id: 'sample-belladonna', name: 'Belladonna (2ml Vial)', notes: 'Black Plum Noir & Tuberose' },
  { id: 'sample-nox-arcana', name: 'Nox Arcana (2ml Vial)', notes: 'Sacred Frankincense & Oud' },
  { id: 'sample-obsidian-rose', name: 'Obsidian Rose (2ml Vial)', notes: 'Damask Rose & Spiced Rum' },
  { id: 'sample-thanatos', name: 'Thanatos (2ml Vial)', notes: 'Cold Marble & Cypress' },
  { id: 'sample-hecate', name: "Hecate's Veil (2ml Vial)", notes: 'Silver Absinthe & Black Tea' }
];

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Seraphina V.',
    verified: true,
    rating: 5,
    date: 'February 2026',
    scent: 'Wolfsbane',
    title: 'An absolute masterpiece of gothic perfumery',
    content: 'Wolfsbane is unlike anything else in my collection of 80+ niche fragrances. The smoky aconite and birch tar give it a dangerous, moonlit aura, but the drydown is astonishingly smooth, warm, and addictive. Lasts on my coat for days.'
  },
  {
    id: 'rev-2',
    author: 'Damian K.',
    verified: true,
    rating: 5,
    date: 'January 2026',
    scent: 'Belladonna',
    title: 'Intoxicating, seductive and dark',
    content: 'The bitter almond and plum noir opening is pure poetry. People stop me in restaurants and art galleries to ask what I am wearing. The packaging alone feels like holding an antique relic from an ancient Venetian court.'
  },
  {
    id: 'rev-3',
    author: 'Elena M.',
    verified: true,
    rating: 5,
    date: 'February 2026',
    scent: 'Nox Arcana',
    title: 'Sacred cathedral silence in a bottle',
    content: 'The frankincense is sublime—sparkling, solemn, and rich with saffron and smooth oud. Wearing Nox Arcana feels like entering a sanctuary where time has ceased.'
  }
];
