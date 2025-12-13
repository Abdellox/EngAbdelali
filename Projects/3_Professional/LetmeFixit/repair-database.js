// Comprehensive repair database with step-by-step guides
const repairDatabase = [
    {
        id: 1,
        title: "HP Laptop Won't Turn On",
        category: "laptop",
        brand: "HP",
        difficulty: "easy",
        time: "15 min",
        tools: ["None required"],
        parts: [],
        image: "https://via.placeholder.com/400x300?text=HP+Laptop+Power",
        keywords: ["hp laptop not turning on", "hp won't boot", "hp black screen", "hp no power"],
        description: "Fix an HP laptop that won't power on or boot up",
        steps: [
            {
                number: 1,
                title: "Perform a Hard Reset",
                description: "Disconnect all external devices and power adapter",
                details: [
                    "Remove the power adapter from the laptop",
                    "Disconnect all USB devices, external monitors, and peripherals",
                    "If possible, remove the battery (for models with removable batteries)",
                    "Press and hold the power button for 15-20 seconds",
                    "Reconnect the power adapter (leave battery out for now)",
                    "Try turning on the laptop"
                ],
                warning: "Do not force the battery out if it's not designed to be removable",
                image: "https://via.placeholder.com/600x400?text=Hard+Reset"
            },
            {
                number: 2,
                title: "Check Power Adapter",
                description: "Verify the power adapter is working properly",
                details: [
                    "Check if the LED light on the power adapter is on",
                    "Inspect the power cable for any damage or fraying",
                    "Make sure the adapter is firmly connected to both the wall and laptop"
,
                    "Try a different power outlet",
                    "If available, test with another compatible HP power adapter"
                ],
                tip: "The LED on the adapter should glow steadily. If it's off or flickering, the adapter may be faulty",
                image: "https://via.placeholder.com/600x400?text=Power+Adapter"
            },
            {
                number: 3,
                title: "Check for Display Issues",
                description: "Ensure the problem isn't just a black screen",
                details: [
                    "Look closely at the screen in a dark room",
                    "Check if you can see a very dim image (backlight failure)",
                    "Listen for fan noise or hard drive activity",
                    "Press Caps Lock key and see if the LED responds",
                    "Connect to an external monitor using HDMI or VGA",
                    "Press Windows key + P to switch display modes"
                ],
                tip: "If external monitor works, your laptop is on but the screen is faulty",
                image: "https://via.placeholder.com/600x400?text=Display+Check"
            },
            {
                number: 4,
                title: "Reseat RAM Memory",
                description: "Remove and reinstall RAM modules",
                details: [
                    "Turn off laptop and disconnect power",
                    "Remove the back panel (check HP manual for your model)",
                    "Locate the RAM modules",
                    "Press the clips on both sides to release RAM",
                    "Remove RAM and clean contacts with eraser gently",
                    "Reinsert RAM firmly until clips click",
                    "Replace back panel and try powering on"
                ],
                warning: "Ground yourself before touching internal components to prevent static damage",
                image: "https://via.placeholder.com/600x400?text=RAM+Reseat"
            }
        ],
        commonCauses: [
            "Drained battery or faulty power adapter",
            "Loose RAM connection",
            "Display backlight failure",
            "Motherboard power issue"
        ],
        preventionTips: [
            "Always use genuine HP power adapters",
            "Avoid letting battery drain completely regularly",
            "Keep laptop ventilated to prevent overheating"
        ]
    },
    {
        id: 2,
        title: "HP Laptop Overheating and Shutting Down",
        category: "laptop",
        brand: "HP",
        difficulty: "moderate",
        time: "45 min",
        tools: ["Compressed air", "Screwdriver set", "Thermal paste (optional)"],
        parts: ["Thermal paste"],
        image: "https://via.placeholder.com/400x300?text=HP+Overheating",
        keywords: ["hp laptop overheating", "hp laptop hot", "hp shuts down", "hp fan loud"],
        description: "Fix an overheating HP laptop that shuts down unexpectedly",
        steps: [
            {
                number: 1,
                title: "Clean Air Vents Externally",
                description: "Remove dust from exterior vents",
                details: [
                    "Turn off the laptop completely",
                    "Locate the air vents (usually on sides and bottom)",
                    "Use compressed air to blow out dust from vents",
                    "Hold can upright and use short bursts",
                    "Blow from multiple angles",
                    "Wipe vents with a soft cloth"
                ],
                tip: "Do this every 3-6 months to prevent buildup",
                image: "https://via.placeholder.com/600x400?text=Clean+Vents"
            },
            {
                number: 2,
                title: "Check Fan Operation",
                description: "Verify cooling fan is working",
                details: [
                    "Turn on the laptop",
                    "Listen for fan noise during startup",
                    "Run a demanding program to trigger fan",
                    "Place hand near vent to feel airflow",
                    "If no airflow, fan may be broken or blocked"
                ],
                warning: "If fan doesn't spin at all, it needs replacement",
                image: "https://via.placeholder.com/600x400?text=Fan+Check"
            },
            {
                number: 3,
                title: "Deep Clean Internal Fan",
                description: "Open laptop and clean fan thoroughly",
                details: [
                    "Shut down and unplug laptop completely",
                    "Remove battery if possible",
                    "Unscrew back panel (refer to HP service manual)",
                    "Locate the cooling fan and heat sink",
                    "Use compressed air to blow out dust from fan blades",
                    "Clean heat sink fins carefully",
                    "Use cotton swabs for stubborn dust",
                    "Reassemble laptop"
                ],
                warning: "Take photos before disassembly to remember screw locations",
                image: "https://via.placeholder.com/600x400?text=Internal+Clean"
            },
            {
                number: 4,
                title: "Apply Fresh Thermal Paste",
                description: "Replace old thermal paste on CPU/GPU",
                details: [
                    "Follow steps 1-4 from previous section",
                    "Locate the CPU heat sink (metal block on processor)",
                    "Unscrew heat sink carefully",
                    "Clean old thermal paste with isopropyl alcohol",
                    "Apply small pea-sized amount of new thermal paste",
                    "Spread evenly or let pressure spread it",
                    "Reattach heat sink firmly",
                    "Reassemble laptop"
                ],
                tip: "Use quality thermal paste like Arctic MX-4 or Noctua NT-H1",
                image: "https://via.placeholder.com/600x400?text=Thermal+Paste"
            },
            {
                number: 5,
                title: "Optimize Power Settings",
                description: "Reduce heat through software settings",
                details: [
                    "Open Windows Settings > System > Power & Battery",
                    "Select 'Balanced' or 'Power Saver' mode",
                    "Click 'Additional power settings'",
                    "Change plan settings > Advanced settings",
                    "Set 'Maximum processor state' to 95% instead of 100%",
                    "This reduces heat while maintaining performance"
                ],
                tip: "You can also use HP Command Center to manage cooling",
                image: "https://via.placeholder.com/600x400?text=Power+Settings"
            }
        ],
        commonCauses: [
            "Dust blocking air vents and fan",
            "Dried thermal paste on CPU",
            "Faulty cooling fan",
            "Running too many programs simultaneously"
        ],
        preventionTips: [
            "Use laptop on hard, flat surfaces",
            "Clean vents every 3-6 months",
            "Use a cooling pad for heavy tasks",
            "Close unnecessary background programs"
        ]
    },
    {
        id: 3,
        title: "HP Laptop Keyboard Keys Not Working",
        category: "laptop",
        brand: "HP",
        difficulty: "easy",
        time: "20 min",
        tools: ["Compressed air", "Cotton swabs", "Isopropyl alcohol"],
        parts: [],
        image: "https://via.placeholder.com/400x300?text=HP+Keyboard",
        keywords: ["hp keyboard not working", "hp keys stuck", "hp keyboard broken", "hp typing wrong letters"],
        description: "Fix non-responsive or sticky keys on HP laptop keyboard",
        steps: [
            {
                number: 1,
                title: "Restart and Check Basics",
                description: "Rule out software issues first",
                details: [
                    "Restart your laptop completely",
                    "Check if keyboard works in BIOS (press F10 during startup)",
                    "If it works in BIOS, it's a Windows driver issue",
                    "Try keyboard in Safe Mode (restart + hold Shift)",
                    "Test with on-screen keyboard to verify other functions work"
                ],
                tip: "If keyboard works in BIOS but not Windows, it's a driver problem",
                image: "https://via.placeholder.com/600x400?text=Basic+Check"
            },
            {
                number: 2,
                title: "Update or Reinstall Keyboard Driver",
                description: "Fix driver-related keyboard issues",
                details: [
                    "Right-click Start menu and select Device Manager",
                    "Expand 'Keyboards' section",
                    "Right-click on your keyboard device",
                    "Select 'Uninstall device'",
                    "Restart laptop (driver will reinstall automatically)",
                    "Alternatively, select 'Update driver' instead",
                    "Choose 'Search automatically for drivers'"
                ],
                tip: "You can also download latest drivers from HP support website",
                image: "https://via.placeholder.com/600x400?text=Driver+Update"
            },
            {
                number: 3,
                title: "Clean Keyboard Physically",
                description: "Remove debris and sticky residue",
                details: [
                    "Turn off laptop and unplug it",
                    "Turn laptop upside down and gently shake",
                    "Use compressed air between keys at an angle",
                    "For sticky keys: dampen cotton swab with isopropyl alcohol",
                    "Clean around and under the key gently",
                    "Let it dry completely (5-10 minutes)",
                    "Test keys after drying"
                ],
                warning: "Don't use too much liquid - just dampen the swab",
                image: "https://via.placeholder.com/600x400?text=Clean+Keys"
            },
            {
                number: 4,
                title: "Remove and Clean Individual Keys",
                description: "Deep clean specific problematic keys",
                details: [
                    "Use a flat tool (plastic card or keycap puller)",
                    "Gently pry up the key from one corner",
                    "Note the orientation of the key mechanism",
                    "Clean under the key with cotton swab and alcohol",
                    "Clean the keycap itself",
                    "Let everything dry completely",
                    "Snap key back in place firmly"
                ],
                warning: "Be very gentle - key mechanisms are fragile. Don't try this on laptop keyboards if you're not confident",
                image: "https://via.placeholder.com/600x400?text=Remove+Keys"
            },
            {
                number: 5,
                title: "Disable Filter Keys",
                description: "Turn off accessibility feature that may interfere",
                details: [
                    "Open Settings > Accessibility > Keyboard",
                    "Turn OFF 'Filter keys'",
                    "Turn OFF 'Sticky keys'",
                    "Turn OFF 'Toggle keys'",
                    "Test keyboard functionality"
                ],
                tip: "These features can make keyboard seem unresponsive",
                image: "https://via.placeholder.com/600x400?text=Filter+Keys"
            }
        ],
        commonCauses: [
            "Outdated or corrupted keyboard drivers",
            "Debris or liquid under keys",
            "Filter Keys enabled accidentally",
            "Hardware connection issue"
        ],
        preventionTips: [
            "Keep food and drinks away from laptop",
            "Clean keyboard regularly with compressed air",
            "Use keyboard cover if eating nearby"
        ]
    }
];

// Add more comprehensive guides for different devices
repairDatabase.push(
    {
        id: 4,
        title: "iPhone Screen Not Responding to Touch",
        category: "phone",
        brand: "Apple",
        difficulty: "easy",
        time: "10 min",
        tools: ["Microfiber cloth"],
        parts: [],
        image: "https://via.placeholder.com/400x300?text=iPhone+Touch",
        keywords: ["iphone touch not working", "iphone screen frozen", "iphone unresponsive", "iphone touch screen"],
        description: "Fix an unresponsive iPhone touchscreen",
        steps: [
            {
                number: 1,
                title: "Force Restart iPhone",
                description: "Reset the device to fix software glitches",
                details: [
                    "iPhone 8 or later: Quickly press Volume Up, then Volume Down, then hold Power button until Apple logo appears",
                    "iPhone 7: Hold Volume Down + Power button together for 10 seconds",
                    "iPhone 6s or earlier: Hold Home + Power button together for 10 seconds",
                    "Wait for Apple logo to appear",
                    "Release buttons and let iPhone restart",
                    "Test touch screen after restart"
                ],
                tip: "This fixes 80% of touchscreen issues",
                image: "https://via.placeholder.com/600x400?text=Force+Restart"
            },
            {
                number: 2,
                title: "Clean Screen Thoroughly",
                description: "Remove dirt and oils affecting touch sensitivity",
                details: [
                    "Turn off iPhone",
                    "Use microfiber cloth slightly dampened with water",
                    "Wipe screen in circular motions",
                    "Remove any screen protector if present",
                    "Check if touch works without protector",
                    "Clean screen again if needed",
                    "Dry completely before turning on"
                ],
                warning: "Don't use harsh chemicals or excessive water",
                image: "https://via.placeholder.com/600x400?text=Clean+Screen"
            },
            {
                number: 3,
                title: "Check for Software Updates",
                description: "Update iOS to fix known bugs",
                details: [
                    "Connect to Wi-Fi",
                    "Go to Settings > General > Software Update",
                    "If update available, tap Download and Install",
                    "Enter passcode if prompted",
                    "Wait for update to complete",
                    "iPhone will restart automatically"
                ],
                tip: "Always backup before updating",
                image: "https://via.placeholder.com/600x400?text=iOS+Update"
            },
            {
                number: 4,
                title: "Reset All Settings",
                description: "Reset settings without deleting data",
                details: [
                    "Go to Settings > General > Transfer or Reset iPhone",
                    "Tap 'Reset'",
                    "Select 'Reset All Settings'",
                    "Enter passcode",
                    "Confirm reset",
                    "iPhone will restart",
                    "Note: This won't delete your data, only settings"
                ],
                warning: "You'll need to reconfigure Wi-Fi, Bluetooth, etc.",
                image: "https://via.placeholder.com/600x400?text=Reset+Settings"
            }
        ],
        commonCauses: [
            "Software glitch or frozen app",
            "Dirty or wet screen",
            "Faulty screen protector",
            "iOS bug",
            "Hardware damage from drop"
        ],
        preventionTips: [
            "Keep screen clean",
            "Use quality screen protectors",
            "Keep iOS updated",
            "Use protective case"
        ]
    },
    {
        id: 5,
        title: "Samsung Galaxy Phone Won't Charge",
        category: "phone",
        brand: "Samsung",
        difficulty: "easy",
        time: "15 min",
        tools: ["Toothpick or needle", "Compressed air"],
        parts: [],
        image: "https://via.placeholder.com/400x300?text=Samsung+Charging",
        keywords: ["samsung not charging", "samsung won't charge", "galaxy charging problem", "samsung battery not charging"],
        description: "Fix Samsung Galaxy phone that won't charge properly",
        steps: [
            {
                number: 1,
                title: "Check Cable and Adapter",
                description: "Verify charging accessories are working",
                details: [
                    "Try a different USB cable",
                    "Use a different wall adapter",
                    "Test with original Samsung charger if possible",
                    "Try charging from computer USB port",
                    "Check cable for visible damage or fraying",
                    "Ensure adapter is plugged in firmly"
                ],
                tip: "Use Samsung original or certified chargers for best results",
                image: "https://via.placeholder.com/600x400?text=Check+Charger"
            },
            {
                number: 2,
                title: "Clean Charging Port",
                description: "Remove lint and debris from USB-C port",
                details: [
                    "Turn off phone completely",
                    "Shine flashlight into charging port",
                    "Look for lint, dust, or debris",
                    "Use wooden toothpick or plastic pick (NOT metal)",
                    "Gently scrape out debris",
                    "Use compressed air to blow out loose particles",
                    "Be very gentle to avoid damaging pins"
                ],
                warning: "Never use metal objects - they can damage the port or cause shorts",
                image: "https://via.placeholder.com/600x400?text=Clean+Port"
            },
            {
                number: 3,
                title: "Force Restart Phone",
                description: "Reset phone to fix software charging issues",
                details: [
                    "Press and hold Volume Down + Power button",
                    "Keep holding for 10-15 seconds",
                    "Wait for phone to vibrate and restart",
                    "Release buttons when Samsung logo appears",
                    "Try charging after restart"
                ],
                tip: "This clears temporary software glitches",
                image: "https://via.placeholder.com/600x400?text=Force+Restart"
            },
            {
                number: 4,
                title: "Boot into Safe Mode",
                description: "Check if third-party app is causing issue",
                details: [
                    "Press and hold Power button",
                    "Tap and hold 'Power off' on screen",
                    "Tap 'Safe mode' when prompted",
                    "Phone will restart in Safe Mode",
                    "Try charging in Safe Mode",
                    "If it charges, a third-party app is the problem",
                    "Restart normally and uninstall recent apps"
                ],
                tip: "Safe Mode only loads system apps",
                image: "https://via.placeholder.com/600x400?text=Safe+Mode"
            },
            {
                number: 5,
                title: "Check for Software Updates",
                description: "Update Samsung software",
                details: [
                    "Go to Settings > Software update",
                    "Tap 'Download and install'",
                    "Connect to Wi-Fi",
                    "Let update download and install",
                    "Phone will restart automatically"
                ],
                tip: "Updates often fix charging bugs",
                image: "https://via.placeholder.com/600x400?text=Software+Update"
            }
        ],
        commonCauses: [
            "Dirty charging port filled with lint",
            "Faulty charging cable",
            "Software glitch",
            "Third-party app interference",
            "Damaged charging port"
        ],
        preventionTips: [
            "Clean charging port monthly",
            "Use quality cables",
            "Avoid charging in dusty environments",
            "Don't force cable into port"
        ]
    }
);


// Add more laptop repairs
repairDatabase.push(
    {
        id: 6,
        title: "Dell Laptop Running Slow - Speed Up Performance",
        category: "laptop",
        brand: "Dell",
        difficulty: "easy",
        time: "30 min",
        tools: ["None required"],
        parts: [],
        image: "https://via.placeholder.com/400x300?text=Dell+Slow",
        keywords: ["dell laptop slow", "dell running slow", "dell performance", "dell lagging", "speed up dell"],
        description: "Speed up a slow Dell laptop with software optimization",
        steps: [
            {
                number: 1,
                title: "Disable Startup Programs",
                description: "Stop unnecessary programs from launching at startup",
                details: [
                    "Press Ctrl + Shift + Esc to open Task Manager",
                    "Click on 'Startup' tab",
                    "Review the list of startup programs",
                    "Right-click programs you don't need at startup",
                    "Select 'Disable' for each unnecessary program",
                    "Keep antivirus and essential programs enabled",
                    "Restart computer to apply changes"
                ],
                tip: "Disable programs with 'High' startup impact first for best results",
                image: "https://via.placeholder.com/600x400?text=Startup+Programs"
            },
            {
                number: 2,
                title: "Clean Up Disk Space",
                description: "Remove temporary files and free up storage",
                details: [
                    "Press Windows key + R",
                    "Type 'cleanmgr' and press Enter",
                    "Select your C: drive",
                    "Check all boxes (especially 'Temporary files')",
                    "Click 'Clean up system files'",
                    "Check 'Previous Windows installations' if available",
                    "Click OK and confirm deletion",
                    "Wait for cleanup to complete"
                ],
                warning: "Don't delete files if you're unsure what they are",
                image: "https://via.placeholder.com/600x400?text=Disk+Cleanup"
            },
            {
                number: 3,
                title: "Uninstall Bloatware",
                description: "Remove unnecessary pre-installed software",
                details: [
                    "Go to Settings > Apps > Installed apps",
                    "Sort by size to find large programs",
                    "Look for Dell bloatware you don't use",
                    "Click three dots next to program",
                    "Select 'Uninstall'",
                    "Confirm uninstallation",
                    "Restart after removing multiple programs"
                ],
                tip: "Keep Dell Update, Dell SupportAssist, and driver utilities",
                image: "https://via.placeholder.com/600x400?text=Uninstall+Apps"
            },
            {
                number: 4,
                title: "Adjust Visual Effects",
                description: "Reduce animations for better performance",
                details: [
                    "Right-click 'This PC' and select 'Properties'",
                    "Click 'Advanced system settings'",
                    "Under Performance, click 'Settings'",
                    "Select 'Adjust for best performance'",
                    "Or manually uncheck unnecessary effects",
                    "Keep 'Smooth edges of screen fonts' checked",
                    "Click Apply and OK"
                ],
                tip: "This makes Windows look simpler but run faster",
                image: "https://via.placeholder.com/600x400?text=Visual+Effects"
            },
            {
                number: 5,
                title: "Update Windows and Drivers",
                description: "Ensure system is up to date",
                details: [
                    "Go to Settings > Windows Update",
                    "Click 'Check for updates'",
                    "Install all available updates",
                    "Restart when prompted",
                    "Visit Dell support website",
                    "Enter your service tag",
                    "Download and install driver updates"
                ],
                tip: "Updated drivers can significantly improve performance",
                image: "https://via.placeholder.com/600x400?text=Windows+Update"
            },
            {
                number: 6,
                title: "Scan for Malware",
                description: "Check for viruses slowing down your system",
                details: [
                    "Open Windows Security",
                    "Click 'Virus & threat protection'",
                    "Click 'Scan options'",
                    "Select 'Full scan'",
                    "Click 'Scan now'",
                    "Wait for scan to complete (may take 1-2 hours)",
                    "Remove any threats found"
                ],
                warning: "Don't interrupt the scan once started",
                image: "https://via.placeholder.com/600x400?text=Malware+Scan"
            }
        ],
        commonCauses: [
            "Too many startup programs",
            "Full hard drive",
            "Outdated drivers",
            "Malware or viruses",
            "Too many browser extensions",
            "Fragmented hard drive (HDD only)"
        ],
        preventionTips: [
            "Regularly clean temporary files",
            "Keep at least 20% of drive space free",
            "Update Windows monthly",
            "Use antivirus software",
            "Restart laptop weekly"
        ]
    },
    {
        id: 7,
        title: "MacBook Pro Won't Connect to WiFi",
        category: "laptop",
        brand: "Apple",
        difficulty: "easy",
        time: "20 min",
        tools: ["None required"],
        parts: [],
        image: "https://via.placeholder.com/400x300?text=MacBook+WiFi",
        keywords: ["macbook wifi not working", "macbook no internet", "macbook wifi problem", "mac won't connect wifi"],
        description: "Fix WiFi connectivity issues on MacBook Pro",
        steps: [
            {
                number: 1,
                title: "Basic WiFi Troubleshooting",
                description: "Try simple fixes first",
                details: [
                    "Click WiFi icon in menu bar",
                    "Turn WiFi off, wait 10 seconds, turn back on",
                    "Forget the network: Click WiFi icon > Network Settings",
                    "Select your network and click 'Details'",
                    "Click 'Forget This Network'",
                    "Reconnect by selecting network and entering password",
                    "Restart your router by unplugging for 30 seconds"
                ],
                tip: "Most WiFi issues are resolved by forgetting and reconnecting",
                image: "https://via.placeholder.com/600x400?text=WiFi+Basic"
            },
            {
                number: 2,
                title: "Reset NVRAM/PRAM",
                description: "Reset system memory that stores WiFi settings",
                details: [
                    "Shut down your MacBook completely",
                    "Turn it on and immediately press: Option + Command + P + R",
                    "Hold these keys for about 20 seconds",
                    "Release when you hear startup sound twice (or Apple logo appears twice)",
                    "Let MacBook boot normally",
                    "Reconnect to WiFi"
                ],
                tip: "This resets network settings without deleting data",
                image: "https://via.placeholder.com/600x400?text=NVRAM+Reset"
            },
            {
                number: 3,
                title: "Reset SMC (System Management Controller)",
                description: "Reset hardware management system",
                details: [
                    "For M1/M2 Macs: Just restart (SMC resets automatically)",
                    "For Intel Macs with T2 chip:",
                    "Shut down MacBook",
                    "Press and hold power button for 10 seconds",
                    "Release, wait a few seconds, then turn on normally",
                    "For older Intel Macs:",
                    "Shut down, press Shift + Control + Option + Power for 10 seconds",
                    "Release all keys and turn on"
                ],
                warning: "Make sure MacBook is plugged in during SMC reset",
                image: "https://via.placeholder.com/600x400?text=SMC+Reset"
            },
            {
                number: 4,
                title: "Delete WiFi Configuration Files",
                description: "Remove corrupted WiFi preference files",
                details: [
                    "Open Finder",
                    "Click Go menu > Go to Folder",
                    "Type: /Library/Preferences/SystemConfiguration/",
                    "Find these files and move to Trash:",
                    "- com.apple.airport.preferences.plist",
                    "- com.apple.network.identification.plist",
                    "- NetworkInterfaces.plist",
                    "- preferences.plist",
                    "Empty Trash and restart MacBook"
                ],
                warning: "You'll need to reconnect to all WiFi networks after this",
                image: "https://via.placeholder.com/600x400?text=Delete+Config"
            },
            {
                number: 5,
                title: "Update macOS",
                description: "Install latest system updates",
                details: [
                    "Click Apple menu > System Settings",
                    "Click General > Software Update",
                    "If updates available, click 'Update Now'",
                    "Enter password if prompted",
                    "Wait for download and installation",
                    "Restart when prompted"
                ],
                tip: "Updates often include WiFi driver fixes",
                image: "https://via.placeholder.com/600x400?text=macOS+Update"
            },
            {
                number: 6,
                title: "Create New Network Location",
                description: "Set up fresh network configuration",
                details: [
                    "Go to System Settings > Network",
                    "Click the three dots (...) at bottom",
                    "Select 'Edit Locations'",
                    "Click '+' to add new location",
                    "Name it 'Home' or 'Work'",
                    "Click Done",
                    "Select your new location from dropdown",
                    "Connect to WiFi network"
                ],
                tip: "This creates clean network settings",
                image: "https://via.placeholder.com/600x400?text=Network+Location"
            }
        ],
        commonCauses: [
            "Corrupted WiFi preferences",
            "Router compatibility issues",
            "Outdated macOS",
            "NVRAM/PRAM issues",
            "SMC needs reset",
            "Network congestion"
        ],
        preventionTips: [
            "Keep macOS updated",
            "Restart MacBook weekly",
            "Update router firmware",
            "Use 5GHz WiFi when available",
            "Avoid too many saved networks"
        ]
    }
);


// Add comprehensive phone repair
repairDatabase.push({
    id: 8,
    title: "iPhone Battery Draining Fast - Complete Fix",
    category: "phone",
    brand: "Apple",
    difficulty: "easy",
    time: "25 min",
    tools: ["None required"],
    parts: [],
    image: "https://via.placeholder.com/400x300?text=iPhone+Battery",
    keywords: ["iphone battery drain", "iphone battery dying fast", "iphone battery life", "iphone battery problem"],
    description: "Fix rapid battery drain on iPhone with comprehensive optimization",
    steps: [
        {
            number: 1,
            title: "Check Battery Health",
            description: "Identify if battery needs replacement",
            details: [
                "Go to Settings > Battery > Battery Health & Charging",
                "Check 'Maximum Capacity' percentage",
                "If below 80%, battery replacement recommended",
                "Check for 'Service' message",
                "Note: 100% is brand new, 80%+ is good",
                "If capacity is good, continue with software fixes"
            ],
            tip: "Apple replaces batteries under warranty if below 80% within 1 year",
            image: "https://via.placeholder.com/600x400?text=Battery+Health"
        },
        {
            number: 2,
            title: "Identify Battery Draining Apps",
            description: "Find which apps use most battery",
            details: [
                "Go to Settings > Battery",
                "Scroll down to see battery usage by app",
                "Look at 'Last 10 Days' for patterns",
                "Note apps with high background activity",
                "Tap on app to see screen vs background usage",
                "Consider deleting or limiting problematic apps"
            ],
            tip: "Social media apps (Facebook, Instagram) are common battery drainers",
            image: "https://via.placeholder.com/600x400?text=Battery+Usage"
        },
        {
            number: 3,
            title: "Disable Background App Refresh",
            description: "Stop apps from updating in background",
            details: [
                "Go to Settings > General > Background App Refresh",
                "You can turn it off completely or",
                "Scroll through and disable for specific apps",
                "Keep it on only for essential apps (Messages, Mail)",
                "This can save significant battery life"
            ],
            tip: "Apps will still update when you open them",
            image: "https://via.placeholder.com/600x400?text=Background+Refresh"
        },
        {
            number: 4,
            title: "Optimize Display Settings",
            description: "Reduce screen power consumption",
            details: [
                "Go to Settings > Display & Brightness",
                "Enable 'Auto-Brightness'",
                "Reduce brightness manually if needed",
                "Set 'Auto-Lock' to 30 seconds or 1 minute",
                "Enable 'Dark Mode' (saves battery on OLED screens)",
                "Go to Settings > Accessibility > Display",
                "Enable 'Reduce White Point' and set to 50%"
            ],
            tip: "Display is the biggest battery consumer on iPhones",
            image: "https://via.placeholder.com/600x400?text=Display+Settings"
        },
        {
            number: 5,
            title: "Manage Location Services",
            description: "Limit GPS usage by apps",
            details: [
                "Go to Settings > Privacy & Security > Location Services",
                "Review each app's location access",
                "Change from 'Always' to 'While Using App'",
                "Set to 'Never' for apps that don't need location",
                "Scroll down and tap 'System Services'",
                "Disable unnecessary services like 'iPhone Analytics'",
                "Keep 'Find My iPhone' enabled for security"
            ],
            warning: "Keep location on for Maps and emergency services",
            image: "https://via.placeholder.com/600x400?text=Location+Services"
        },
        {
            number: 6,
            title: "Disable Push Email",
            description: "Change email to fetch instead of push",
            details: [
                "Go to Settings > Mail > Accounts > Fetch New Data",
                "Turn OFF 'Push'",
                "Select 'Fetch' instead",
                "Set fetch schedule to 'Every 30 Minutes' or 'Hourly'",
                "Or select 'Manual' to check only when you open Mail app"
            ],
            tip: "You'll still get emails, just not instantly",
            image: "https://via.placeholder.com/600x400?text=Email+Fetch"
        },
        {
            number: 7,
            title: "Turn Off Unnecessary Features",
            description: "Disable features you don't use",
            details: [
                "Turn off Bluetooth when not in use (Settings > Bluetooth)",
                "Turn off WiFi when not needed (or use Airplane mode)",
                "Disable AirDrop: Settings > General > AirDrop > Receiving Off",
                "Disable Handoff: Settings > General > AirPlay & Handoff",
                "Turn off 'Raise to Wake': Settings > Display & Brightness",
                "Disable vibrations: Settings > Sounds & Haptics"
            ],
            tip: "Use Control Center for quick toggles",
            image: "https://via.placeholder.com/600x400?text=Disable+Features"
        },
        {
            number: 8,
            title: "Update iOS",
            description: "Install latest iOS version",
            details: [
                "Go to Settings > General > Software Update",
                "If update available, tap 'Download and Install'",
                "Connect to WiFi and charger",
                "Enter passcode if prompted",
                "Agree to terms and conditions",
                "Wait for download and installation",
                "iPhone will restart automatically"
            ],
            tip: "Updates often include battery optimization improvements",
            image: "https://via.placeholder.com/600x400?text=iOS+Update"
        },
        {
            number: 9,
            title: "Reset All Settings",
            description: "Last resort software fix",
            details: [
                "Go to Settings > General > Transfer or Reset iPhone",
                "Tap 'Reset'",
                "Select 'Reset All Settings'",
                "Enter passcode",
                "Confirm reset",
                "iPhone will restart",
                "Note: This won't delete data, only settings"
            ],
            warning: "You'll need to reconfigure WiFi, Bluetooth, and preferences",
            image: "https://via.placeholder.com/600x400?text=Reset+Settings"
        },
        {
            number: 10,
            title: "Enable Low Power Mode",
            description: "Temporary battery saving mode",
            details: [
                "Go to Settings > Battery",
                "Enable 'Low Power Mode'",
                "Or add to Control Center for quick access",
                "This reduces background activity and visual effects",
                "Automatically disables at 80% charge",
                "Use when battery is low or you need extended life"
            ],
            tip: "Low Power Mode can extend battery life by 2-3 hours",
            image: "https://via.placeholder.com/600x400?text=Low+Power+Mode"
        }
    ],
    commonCauses: [
        "Degraded battery (below 80% health)",
        "Too many background apps running",
        "High screen brightness",
        "Location services always on",
        "Push email enabled",
        "Outdated iOS version",
        "Poor cellular signal (phone works harder)"
    ],
    preventionTips: [
        "Avoid extreme temperatures (hot or cold)",
        "Don't let battery drain to 0% regularly",
        "Use original or certified chargers",
        "Remove case while charging if phone gets hot",
        "Keep iOS updated",
        "Charge between 20-80% for optimal battery health",
        "Enable Optimized Battery Charging in Settings"
    ]
});

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = repairDatabase;
}
