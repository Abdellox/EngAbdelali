export interface CameraType {
  id: string;
  name: string;
  category: string;
  yearIntroduced: string;
  image: string;
  description: string;
  technology: string;
  advantages: string[];
  disadvantages: string[];
  useCases: string[];
}

export const cameraTypes: CameraType[] = [
  {
    id: 'film-slr',
    name: 'Film SLR Camera',
    category: 'Film Cameras',
    yearIntroduced: '1936',
    image: '/images/types/film-slr.jpg',
    description: 'Single-Lens Reflex cameras use a mirror system to show exactly what the lens sees through an optical viewfinder.',
    technology: '35mm film, mechanical shutter, pentaprism viewfinder, interchangeable lenses',
    advantages: ['Optical viewfinder shows real scene', 'No battery needed for basic operation', 'Interchangeable lenses', 'Professional image quality'],
    disadvantages: ['Film costs and development', 'Limited shots per roll', 'No instant preview', 'Mechanical complexity'],
    useCases: ['Professional photography', 'Fine art', 'Photojournalism', 'Portrait photography']
  },
  {
    id: 'dslr',
    name: 'DSLR Camera',
    category: 'DSLR Cameras',
    yearIntroduced: '1999',
    image: '/images/types/dslr.jpg',
    description: 'Digital Single-Lens Reflex combines SLR mechanics with digital sensors for professional digital photography.',
    technology: 'CMOS/CCD sensor, digital image processor, phase-detection autofocus, interchangeable lenses',
    advantages: ['Instant preview', 'No film costs', 'Fast autofocus', 'Excellent battery life', 'Vast lens selection'],
    disadvantages: ['Heavy and bulky', 'Mirror mechanism adds complexity', 'Loud shutter sound', 'Expensive'],
    useCases: ['Professional photography', 'Sports', 'Wildlife', 'Studio work', 'Weddings']
  },
  {
    id: 'mirrorless',
    name: 'Mirrorless Camera',
    category: 'Mirrorless Cameras',
    yearIntroduced: '2008',
    image: '/images/types/mirrorless.jpg',
    description: 'Modern cameras without mirror mechanisms, using electronic viewfinders and offering compact professional quality.',
    technology: 'Large sensor, electronic viewfinder, on-sensor phase detection, in-body stabilization',
    advantages: ['Compact and lightweight', 'Silent shooting', 'Real-time exposure preview', 'Advanced video features', 'Fast continuous shooting'],
    disadvantages: ['Shorter battery life', 'EVF lag in low light', 'Smaller lens selection (improving)', 'More expensive'],
    useCases: ['Professional photography', 'Video production', 'Travel', 'Street photography', 'Hybrid photo/video work']
  },
  {
    id: 'point-shoot',
    name: 'Point & Shoot Camera',
    category: 'Point & Shoot',
    yearIntroduced: '1980s',
    image: '/images/types/point-shoot.jpg',
    description: 'Compact cameras with fixed lenses designed for simplicity and portability.',
    technology: 'Small sensor, fixed lens, automatic exposure, built-in flash',
    advantages: ['Very portable', 'Simple to use', 'Affordable', 'Good for casual photography'],
    disadvantages: ['Small sensor limits quality', 'No manual control', 'Fixed lens', 'Largely replaced by smartphones'],
    useCases: ['Casual photography', 'Travel snapshots', 'Family events', 'Backup camera']
  },
  {
    id: 'instant',
    name: 'Instant Camera',
    category: 'Instant Cameras',
    yearIntroduced: '1948',
    image: '/images/types/instant.jpg',
    description: 'Cameras that produce physical prints immediately after shooting, experiencing a modern revival.',
    technology: 'Self-developing film, chemical processing, simple optics',
    advantages: ['Instant physical prints', 'Unique aesthetic', 'No digital processing needed', 'Tangible memories'],
    disadvantages: ['Expensive per shot', 'Limited control', 'Lower image quality', 'Film has expiration date'],
    useCases: ['Parties and events', 'Art projects', 'Scrapbooking', 'Nostalgic photography']
  },
  {
    id: 'medium-format',
    name: 'Medium Format Camera',
    category: 'Medium Format',
    yearIntroduced: '1929',
    image: '/images/types/medium-format.jpg',
    description: 'Professional cameras with sensors larger than 35mm, offering exceptional image quality and detail.',
    technology: 'Large sensor (44x33mm or larger), high resolution, excellent dynamic range',
    advantages: ['Exceptional image quality', 'Incredible detail', 'Superior color depth', 'Shallow depth of field control'],
    disadvantages: ['Very expensive', 'Heavy and bulky', 'Slower autofocus', 'Limited lens selection'],
    useCases: ['Fashion photography', 'Commercial work', 'Landscape', 'Fine art', 'Studio portraits']
  },
  {
    id: 'action',
    name: 'Action Camera',
    category: 'Action Cameras',
    yearIntroduced: '2004',
    image: '/images/types/action.jpg',
    description: 'Rugged, compact cameras designed for extreme sports and adventure, popularized by GoPro.',
    technology: 'Ultra-wide lens, waterproof housing, image stabilization, small form factor',
    advantages: ['Extremely durable', 'Waterproof', 'Compact', 'Wide field of view', 'Excellent stabilization'],
    disadvantages: ['Distorted wide-angle look', 'Small sensor', 'Limited zoom', 'Short battery life'],
    useCases: ['Extreme sports', 'Underwater photography', 'POV footage', 'Vlogging', 'Helmet/body mounting']
  },
  {
    id: 'smartphone',
    name: 'Smartphone Camera',
    category: 'Smartphone Cameras',
    yearIntroduced: '2000',
    image: '/images/types/smartphone.jpg',
    description: 'Multi-lens camera systems integrated into phones, using computational photography to overcome physical limitations.',
    technology: 'Multiple small sensors, computational photography, AI processing, neural engines',
    advantages: ['Always with you', 'Instant sharing', 'Computational features', 'Multiple focal lengths', 'Continuous improvement via software'],
    disadvantages: ['Small sensors', 'Limited in low light', 'Digital zoom quality', 'Less manual control'],
    useCases: ['Everyday photography', 'Social media', 'Quick documentation', 'Video calls', 'Casual video']
  },
  {
    id: 'cinema',
    name: 'Cinema Camera',
    category: 'Cinema Cameras',
    yearIntroduced: '2007',
    image: '/images/types/cinema.jpg',
    description: 'Professional video cameras designed for filmmaking with cinema-quality sensors and recording.',
    technology: 'Large sensor, high bitrate recording, RAW video, professional codecs, modular design',
    advantages: ['Cinema-quality image', 'Professional features', 'Excellent dynamic range', 'Flexible workflow', 'Modular accessories'],
    disadvantages: ['Very expensive', 'Complex operation', 'Heavy', 'Requires accessories', 'Overkill for casual use'],
    useCases: ['Film production', 'Commercials', 'Music videos', 'Documentary', 'High-end content creation']
  },
  {
    id: '360',
    name: '360° Camera',
    category: '360° Cameras',
    yearIntroduced: '2011',
    image: '/images/types/360.jpg',
    description: 'Cameras that capture the entire sphere around them, enabling immersive VR content.',
    technology: 'Multiple ultra-wide lenses, automatic stitching, spatial audio, VR-ready output',
    advantages: ['Capture everything', 'Immersive content', 'Reframe after shooting', 'VR-ready', 'Unique perspectives'],
    disadvantages: ['Large file sizes', 'Requires special playback', 'Stitching artifacts', 'Photographer always in shot'],
    useCases: ['VR content', 'Real estate tours', 'Action sports', 'Virtual tourism', 'Immersive journalism']
  },
  {
    id: 'drone',
    name: 'Drone Camera',
    category: 'Drone Cameras',
    yearIntroduced: '2013',
    image: '/images/types/drone.jpg',
    description: 'Aerial cameras mounted on quadcopters, making aerial photography accessible to everyone.',
    technology: 'Gimbal stabilization, GPS positioning, obstacle avoidance, 4K+ video, automated flight modes',
    advantages: ['Aerial perspectives', 'Smooth stabilization', 'Automated flight', 'Unique angles', 'Increasingly affordable'],
    disadvantages: ['Regulations and restrictions', 'Weather dependent', 'Limited flight time', 'Requires practice', 'Privacy concerns'],
    useCases: ['Aerial photography', 'Real estate', 'Landscape', 'Inspection', 'Filmmaking', 'Mapping']
  },
  {
    id: 'security',
    name: 'Security Camera',
    category: 'Security Cameras',
    yearIntroduced: '1942',
    image: '/images/types/security.jpg',
    description: 'Surveillance cameras designed for continuous recording and monitoring.',
    technology: 'Network connectivity, night vision, motion detection, cloud storage, AI recognition',
    advantages: ['24/7 monitoring', 'Night vision', 'Motion alerts', 'Remote viewing', 'AI features'],
    disadvantages: ['Privacy concerns', 'Storage requirements', 'Network dependent', 'Limited image quality'],
    useCases: ['Home security', 'Business surveillance', 'Traffic monitoring', 'Wildlife observation']
  },
  {
    id: 'thermal',
    name: 'Thermal Camera',
    category: 'Scientific Cameras',
    yearIntroduced: '1960s',
    image: '/images/types/thermal.jpg',
    description: 'Cameras that detect infrared radiation, visualizing heat instead of visible light.',
    technology: 'Infrared sensor, thermal imaging, temperature measurement, false color display',
    advantages: ['See in total darkness', 'Detect heat signatures', 'Measure temperature', 'See through smoke/fog'],
    disadvantages: ['Very expensive', 'Low resolution', 'Can\'t see through glass', 'Specialized use'],
    useCases: ['Building inspection', 'Electrical diagnostics', 'Search and rescue', 'Wildlife observation', 'Military']
  },
  {
    id: 'astrophotography',
    name: 'Astrophotography Camera',
    category: 'Scientific Cameras',
    yearIntroduced: '1970s',
    image: '/images/types/astro.jpg',
    description: 'Specialized cameras optimized for capturing faint celestial objects with long exposures.',
    technology: 'Cooled sensor, high sensitivity, low noise, monochrome option, filter wheels',
    advantages: ['Extreme sensitivity', 'Low noise', 'Cooled sensor', 'Specialized filters', 'Long exposure capability'],
    disadvantages: ['Very expensive', 'Requires telescope', 'Complex processing', 'Specialized knowledge needed'],
    useCases: ['Deep sky imaging', 'Planetary photography', 'Scientific research', 'Amateur astronomy']
  }
];

export const categories = [
  'All',
  'Film Cameras',
  'DSLR Cameras',
  'Mirrorless Cameras',
  'Point & Shoot',
  'Instant Cameras',
  'Medium Format',
  'Action Cameras',
  'Smartphone Cameras',
  'Cinema Cameras',
  '360° Cameras',
  'Drone Cameras',
  'Security Cameras',
  'Scientific Cameras'
];
