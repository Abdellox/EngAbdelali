export interface TechTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  explanation: string;
  diagram: string;
  keyPoints: string[];
}

export const technologyTopics: TechTopic[] = [
  {
    id: 'lenses',
    title: 'Lenses & Focal Length',
    category: 'Optics',
    description: 'How glass elements bend light to create images and why focal length matters.',
    explanation: 'A lens focuses light rays from a scene onto the sensor. Focal length (measured in mm) determines the field of view and magnification. Short focal lengths (wide-angle) capture more of the scene, while long focal lengths (telephoto) magnify distant subjects. The relationship is inverse: shorter = wider view, longer = narrower view.',
    diagram: '/diagrams/focal-length.svg',
    keyPoints: [
      'Wide-angle (14-35mm): Expansive view, exaggerated perspective',
      'Normal (40-60mm): Similar to human vision',
      'Telephoto (70-300mm+): Magnified view, compressed perspective',
      'Focal length also affects depth of field and perspective compression'
    ]
  },
  {
    id: 'aperture',
    title: 'Aperture & Depth of Field',
    category: 'Optics',
    description: 'The adjustable opening that controls light and focus range.',
    explanation: 'Aperture is the opening in the lens that light passes through, measured in f-stops (f/1.4, f/2.8, f/5.6, etc.). Smaller f-numbers = larger opening = more light + shallower focus. Larger f-numbers = smaller opening = less light + deeper focus. This creates the "bokeh" effect in portraits where the background is beautifully blurred.',
    diagram: '/diagrams/aperture.svg',
    keyPoints: [
      'f/1.4-f/2.8: Very shallow depth of field, excellent low-light performance',
      'f/4-f/5.6: Moderate depth of field, good balance',
      'f/8-f/16: Deep depth of field, landscapes',
      'Each stop change doubles or halves the light'
    ]
  },
  {
    id: 'shutter',
    title: 'Shutter Speed & Motion',
    category: 'Mechanics',
    description: 'How long the sensor is exposed to light, controlling motion blur.',
    explanation: 'The shutter is a curtain that opens and closes to control exposure duration. Fast speeds (1/1000s) freeze motion, slow speeds (1/30s or longer) create motion blur. The "reciprocal rule" suggests using a shutter speed at least 1/focal_length to avoid camera shake (e.g., 1/200s for a 200mm lens).',
    diagram: '/diagrams/shutter.svg',
    keyPoints: [
      '1/4000s+: Freeze fast action (sports, wildlife)',
      '1/250-1/500s: General photography',
      '1/60-1/125s: Handheld minimum for most situations',
      '1/30s or slower: Intentional motion blur, requires tripod'
    ]
  },
  {
    id: 'sensors',
    title: 'Image Sensors: CCD vs CMOS',
    category: 'Digital Technology',
    description: 'How digital sensors convert light into electrical signals.',
    explanation: 'Sensors contain millions of photosites that convert photons to electrons. CCD (Charge-Coupled Device) transfers charge across the chip to be read at one corner. CMOS (Complementary Metal-Oxide-Semiconductor) has amplifiers at each photosite. Modern cameras use CMOS for lower power consumption, faster readout, and cheaper manufacturing. Stacked CMOS adds memory layers for even faster performance.',
    diagram: '/diagrams/sensors.svg',
    keyPoints: [
      'Larger sensors = better low-light performance and dynamic range',
      'Full-frame (36x24mm) vs APS-C (23x15mm) vs Micro Four Thirds (17x13mm)',
      'Megapixels measure resolution, but sensor size matters more for quality',
      'Bayer filter array creates color from monochrome photosites'
    ]
  },
  {
    id: 'exposure-triangle',
    title: 'The Exposure Triangle',
    category: 'Fundamentals',
    description: 'The relationship between aperture, shutter speed, and ISO.',
    explanation: 'These three settings control exposure and must be balanced. Aperture controls light amount and depth of field. Shutter speed controls light duration and motion blur. ISO controls sensor sensitivity and noise. Changing one requires adjusting others to maintain proper exposure. This is the foundation of photography.',
    diagram: '/diagrams/exposure-triangle.svg',
    keyPoints: [
      'Aperture: Light amount + depth of field',
      'Shutter Speed: Light duration + motion',
      'ISO: Sensor sensitivity + noise',
      'Each setting has creative and technical implications'
    ]
  },
  {
    id: 'autofocus',
    title: 'Autofocus Systems',
    category: 'Technology',
    description: 'How cameras automatically achieve sharp focus.',
    explanation: 'Phase detection uses dedicated sensors to measure if light is in focus by comparing light from different parts of the lens. Contrast detection analyzes the image for maximum contrast (sharpness). Modern cameras use hybrid systems. On-sensor phase detection puts AF pixels directly on the imaging sensor for speed and coverage. AI-powered AF can recognize and track subjects like eyes, faces, animals, and vehicles.',
    diagram: '/diagrams/autofocus.svg',
    keyPoints: [
      'Phase detection: Fast, works in good light',
      'Contrast detection: Accurate, slower, works in low light',
      'Hybrid systems combine both for speed and accuracy',
      'AI subject recognition revolutionizes tracking'
    ]
  },
  {
    id: 'stabilization',
    title: 'Image Stabilization',
    category: 'Technology',
    description: 'How cameras compensate for hand shake and movement.',
    explanation: 'Optical stabilization (OIS) moves lens elements to counteract shake. In-body stabilization (IBIS) moves the sensor. Gyroscopes detect movement, and actuators make micro-adjustments. This allows slower shutter speeds handheld, typically gaining 3-7 stops of stability. Electronic stabilization (EIS) crops and shifts the image digitally, used in video and smartphones.',
    diagram: '/diagrams/stabilization.svg',
    keyPoints: [
      'Optical (OIS): In lens, works with viewfinder',
      'In-Body (IBIS): Works with any lens, stabilizes sensor',
      'Electronic (EIS): Digital crop, used in video',
      'Modern cameras combine multiple stabilization methods'
    ]
  },
  {
    id: 'dynamic-range',
    title: 'Dynamic Range',
    category: 'Image Quality',
    description: 'The range between the darkest and brightest details a camera can capture.',
    explanation: 'Dynamic range is measured in stops (EV). Each stop represents a doubling or halving of light. Human eyes can see about 20 stops, while cameras typically capture 10-15 stops. HDR (High Dynamic Range) combines multiple exposures to extend this range. Larger sensors and better processing increase dynamic range, allowing detail in both shadows and highlights.',
    diagram: '/diagrams/dynamic-range.svg',
    keyPoints: [
      'More dynamic range = more detail in shadows and highlights',
      'Measured in stops or EV (exposure value)',
      'Modern cameras: 12-15 stops typical',
      'HDR combines multiple exposures for extended range'
    ]
  },
  {
    id: 'raw-jpeg',
    title: 'RAW vs JPEG',
    category: 'File Formats',
    description: 'The difference between unprocessed sensor data and compressed images.',
    explanation: 'RAW files contain unprocessed data directly from the sensor - all the information captured. JPEGs are processed in-camera with white balance, sharpening, and compression applied. RAW files are larger but offer maximum editing flexibility. Think of RAW as a digital negative and JPEG as a finished print. Professional photographers shoot RAW for important work.',
    diagram: '/diagrams/raw-jpeg.svg',
    keyPoints: [
      'RAW: Unprocessed, maximum quality, large files, requires editing',
      'JPEG: Processed, compressed, smaller files, ready to share',
      'RAW allows recovering highlights/shadows and adjusting white balance',
      'Some cameras offer RAW+JPEG to get both'
    ]
  },
  {
    id: 'color-science',
    title: 'Color Science & Bayer Filter',
    category: 'Digital Technology',
    description: 'How cameras create color from monochrome sensors.',
    explanation: 'Camera sensors are colorblind - they only detect light intensity. The Bayer filter is a mosaic of red, green, and blue filters over the photosites (50% green, 25% red, 25% blue - matching human eye sensitivity). Demosaicing algorithms interpolate full color for each pixel. Different manufacturers have different color science, which is why Canon, Nikon, and Sony images have distinct "looks."',
    diagram: '/diagrams/bayer-filter.svg',
    keyPoints: [
      'Sensors are monochrome - color filters create color',
      'Bayer pattern: RGGB mosaic (50% green)',
      'Demosaicing interpolates full RGB for each pixel',
      'Color science varies by manufacturer'
    ]
  },
  {
    id: 'computational',
    title: 'Computational Photography',
    category: 'Modern Technology',
    description: 'How software and AI create images beyond what optics alone can achieve.',
    explanation: 'Modern cameras, especially smartphones, use computational techniques to overcome physical limitations. This includes: HDR (merging exposures), focus stacking (combining focus points), night mode (aligning and averaging frames), portrait mode (AI depth mapping), and super-resolution (combining shifted frames). The camera captures data, and AI creates the final image.',
    diagram: '/diagrams/computational.svg',
    keyPoints: [
      'Multiple frames combined for single image',
      'AI enhances details and reduces noise',
      'Simulates optical effects (bokeh, long exposure)',
      'The future: more computation, less optics'
    ]
  },
  {
    id: 'optical-physics',
    title: 'Optical Physics Basics',
    category: 'Fundamentals',
    description: 'The fundamental physics of how light and lenses work.',
    explanation: 'Light travels in straight lines until it hits a different medium. Refraction bends light when it passes through glass. Convex lenses converge light rays to a focal point. The focal length is the distance from the lens to the focal point. Lens elements correct for aberrations (distortions). Understanding these principles explains why lenses are designed the way they are.',
    diagram: '/diagrams/optics.svg',
    keyPoints: [
      'Refraction: Light bends when passing through glass',
      'Convex lenses converge light to a point',
      'Multiple elements correct aberrations',
      'Focal length determines magnification and field of view'
    ]
  }
];

export const techCategories = [
  'All',
  'Optics',
  'Mechanics',
  'Digital Technology',
  'Fundamentals',
  'Technology',
  'Image Quality',
  'File Formats',
  'Modern Technology'
];
