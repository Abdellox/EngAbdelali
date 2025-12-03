export interface HistoryEntry {
  id: string;
  era: string;
  year: string;
  title: string;
  description: string;
  image: string;
  howItWorks: string;
  funFact: string;
  secret: string;
}

export const cameraHistory: HistoryEntry[] = [
  {
    id: '1',
    era: 'Early Concepts',
    year: '400 BC - 1700s',
    title: 'Camera Obscura',
    description: 'The first concept of projecting an image through a small hole. Ancient philosophers discovered that light passing through a tiny aperture would project an inverted image on the opposite wall.',
    image: '/images/camera-obscura.jpg',
    howItWorks: 'Light rays travel in straight lines. When light from a scene passes through a small hole, each point of light creates a corresponding point on the opposite surface, forming an inverted image.',
    funFact: 'Leonardo da Vinci used camera obscura to study perspective and create accurate drawings.',
    secret: 'The smaller the hole, the sharper the image - but also dimmer. This trade-off between sharpness and brightness still affects modern cameras.'
  },
  {
    id: '2',
    era: 'First Photography',
    year: '1826',
    title: 'First Photograph by Niépce',
    description: 'Joseph Nicéphore Niépce created the first permanent photograph using a camera obscura and a pewter plate coated with bitumen.',
    image: '/images/first-photo.jpg',
    howItWorks: 'Bitumen hardens when exposed to light. After 8 hours of exposure, unhardened bitumen was washed away, leaving a permanent image.',
    funFact: 'The exposure took 8 hours, so moving objects like people and animals don\'t appear in the image.',
    secret: 'Niépce called it "heliography" - sun writing. The challenge was finding materials that changed permanently when exposed to light.'
  },
  {
    id: '3',
    era: 'First Photography',
    year: '1839',
    title: 'Daguerreotype',
    description: 'Louis Daguerre perfected the first practical photographic process, creating sharp, detailed images on silver-plated copper.',
    image: '/images/daguerreotype.jpg',
    howItWorks: 'A silver-plated copper sheet is exposed to iodine vapor, creating light-sensitive silver iodide. After exposure, mercury vapor develops the image.',
    funFact: 'Each daguerreotype is unique - there\'s no negative, so copies are impossible.',
    secret: 'The image appears positive or negative depending on viewing angle due to the mirror-like surface.'
  },
  {
    id: '4',
    era: 'Film Era',
    year: '1888',
    title: 'Kodak Box Camera',
    description: 'George Eastman revolutionized photography with the first consumer camera. "You press the button, we do the rest."',
    image: '/images/kodak-box.jpg',
    howItWorks: 'Pre-loaded with 100-exposure roll film. Users sent the entire camera back to Kodak for developing and reloading.',
    funFact: 'The name "Kodak" was invented by Eastman - he wanted a word that was short, distinctive, and easy to pronounce in any language.',
    secret: 'Eastman\'s genius was making photography accessible. Before Kodak, photography required expertise in chemistry and optics.'
  },
  {
    id: '5',
    era: 'Film Era',
    year: '1913',
    title: '35mm Film Standard',
    description: 'Oskar Barnack at Leica adapted 35mm cinema film for still photography, creating the portable camera revolution.',
    image: '/images/35mm-film.jpg',
    howItWorks: 'Cinema film was cut to create 24x36mm frames. The compact format allowed smaller, portable cameras without sacrificing quality.',
    funFact: '35mm became the most popular film format for nearly a century, only declining with digital photography.',
    secret: 'The 3:2 aspect ratio of 35mm film influenced digital sensor design - most DSLRs still use this ratio today.'
  },
  {
    id: '6',
    era: 'Film Era',
    year: '1948',
    title: 'Polaroid Instant Camera',
    description: 'Edwin Land invented instant photography, allowing photos to develop in minutes without a darkroom.',
    image: '/images/polaroid.jpg',
    howItWorks: 'Film contains layers of light-sensitive chemicals and developing agents. Breaking a pod spreads reagent across the film, developing the image.',
    funFact: 'Land conceived the idea when his daughter asked why she couldn\'t see a photo immediately after he took it.',
    secret: 'Each Polaroid photo is a miniature darkroom - all the chemistry needed for development is built into the film pack.'
  },
  {
    id: '7',
    era: 'Film Era',
    year: '1959',
    title: 'Nikon F - Professional SLR',
    description: 'The Nikon F established the 35mm SLR as the professional standard with its modular system and reliability.',
    image: '/images/nikon-f.jpg',
    howItWorks: 'A mirror reflects light from the lens to the viewfinder. When you press the shutter, the mirror flips up, allowing light to hit the film.',
    funFact: 'NASA chose Nikon F cameras for space missions due to their reliability and modular design.',
    secret: 'The interchangeable viewfinder system allowed photographers to customize the camera for different shooting situations.'
  },
  {
    id: '8',
    era: 'Digital Revolution',
    year: '1975',
    title: 'First Digital Camera',
    description: 'Steven Sasson at Kodak built the first digital camera - weighing 8 pounds and recording 0.01 megapixel images to cassette tape.',
    image: '/images/first-digital.jpg',
    howItWorks: 'A CCD sensor converted light to electrical signals, which were digitized and stored on magnetic tape. Playback required a special TV setup.',
    funFact: 'It took 23 seconds to record a single image and another 23 seconds to display it on a TV.',
    secret: 'Kodak executives didn\'t pursue digital photography aggressively, fearing it would cannibalize their film business - a decision that later bankrupted the company.'
  },
  {
    id: '9',
    era: 'Digital Revolution',
    year: '1999',
    title: 'Nikon D1 - Professional DSLR',
    description: 'The first affordable professional DSLR, making digital photography practical for working photographers.',
    image: '/images/nikon-d1.jpg',
    howItWorks: 'Combined traditional SLR mechanics with a 2.7MP CCD sensor. Images stored on CompactFlash cards instead of film.',
    funFact: 'At $5,000, it was expensive but still 1/5 the price of previous professional digital cameras.',
    secret: 'The D1 used Nikon F-mount lenses, allowing photographers to use their existing glass - crucial for professional adoption.'
  },
  {
    id: '10',
    era: 'Digital Revolution',
    year: '2003',
    title: 'Canon EOS 300D / Digital Rebel',
    description: 'The first consumer-affordable DSLR under $1,000, democratizing digital photography.',
    image: '/images/canon-300d.jpg',
    howItWorks: '6.3MP CMOS sensor with Canon\'s DIGIC image processor. Interchangeable lenses and full manual control.',
    funFact: 'Sales exceeded all expectations - Canon couldn\'t keep up with demand for the first year.',
    secret: 'Canon used a CMOS sensor instead of CCD, which was cheaper to manufacture and consumed less power.'
  },
  {
    id: '11',
    era: 'Smartphone Era',
    year: '2007',
    title: 'iPhone Camera Revolution',
    description: 'The iPhone put a camera in everyone\'s pocket, making photography ubiquitous and social.',
    image: '/images/iphone-camera.jpg',
    howItWorks: 'Tiny CMOS sensor with fixed lens. Software processing compensates for hardware limitations.',
    funFact: 'The original iPhone had just 2 megapixels - less than cameras from 5 years earlier - but convenience trumped quality.',
    secret: 'Apple realized the best camera is the one you have with you. Accessibility matters more than specifications.'
  },
  {
    id: '12',
    era: 'Smartphone Era',
    year: '2016',
    title: 'Dual Camera Systems',
    description: 'Multiple lenses in smartphones enabled optical zoom, portrait mode, and computational photography.',
    image: '/images/dual-camera.jpg',
    howItWorks: 'Two or more cameras with different focal lengths work together. Software combines images to create effects impossible with a single lens.',
    funFact: 'The iPhone 7 Plus was the first mainstream phone with dual cameras, introducing "Portrait Mode."',
    secret: 'Computational photography uses AI to simulate optical effects like shallow depth of field, which would normally require large sensors and lenses.'
  },
  {
    id: '13',
    era: 'AI & Future',
    year: '2020-Present',
    title: 'Computational Photography',
    description: 'AI and machine learning now do more work than optics, creating images that surpass what the sensor actually captured.',
    image: '/images/computational.jpg',
    howItWorks: 'Multiple exposures are captured and combined. AI enhances details, reduces noise, and even generates missing information.',
    funFact: 'Google\'s Night Sight can capture usable photos in near-total darkness by combining dozens of frames.',
    secret: 'Modern smartphone photos are not single captures - they\'re composites of multiple images processed by neural networks in real-time.'
  },
  {
    id: '14',
    era: 'AI & Future',
    year: '2023-Future',
    title: 'Light Field & Neural Cameras',
    description: 'Next-generation cameras capture complete light information, allowing focus and perspective changes after shooting.',
    image: '/images/light-field.jpg',
    howItWorks: 'Instead of capturing a 2D image, light field cameras record the direction and intensity of all light rays, creating a 4D representation.',
    funFact: 'You can refocus a light field photo after taking it, or even change the viewing angle slightly.',
    secret: 'The future of photography is less about capturing reality and more about capturing data that can be rendered into any desired image.'
  }
];
