// Data structure
let problems = [];
let currentProblemId = null;
let currentUser = null;
let selectedCategory = '';

// Categories data - inline for reliability
const categories = [
    {
        id: 'tech',
        name: 'Technology',
        icon: '💻',
        problems: [
            { 
                title: 'Best laptop for gaming under $1500?', 
                solutions: [
                    'ASUS ROG Strix G15 - RTX 3060, excellent cooling, 144Hz display',
                    'Lenovo Legion 5 Pro - Best value, great build quality, RTX 3070',
                    'MSI Katana GF66 - Budget friendly, good performance for the price',
                    'Acer Predator Helios 300 - Reliable brand, upgradeable RAM and storage',
                    'HP Omen 15 - Sleek design, good thermals, RGB keyboard'
                ]
            },
            { 
                title: 'Which programming language should I learn first in 2024?', 
                solutions: [
                    'Python - Easiest syntax, huge job market, AI/ML/Data Science',
                    'JavaScript - Essential for web dev, React/Node.js everywhere',
                    'Java - Enterprise jobs, Android development, stable career',
                    'Go - Modern, fast, great for backend and cloud services',
                    'Rust - Future-proof, memory safe, growing demand'
                ]
            },
            { 
                title: 'How to fix "npm ERR! code EACCES" permission error?', 
                solutions: [
                    'Use nvm (Node Version Manager) to install Node without sudo',
                    'Change npm default directory: npm config set prefix ~/.npm-global',
                    'Fix permissions: sudo chown -R $(whoami) ~/.npm',
                    'Use npx instead of global installs when possible',
                    'Run with --unsafe-perm flag (not recommended for production)'
                ]
            },
            { 
                title: 'Best free IDE for web development?', 
                solutions: [
                    'VS Code - Most popular, tons of extensions, lightweight',
                    'WebStorm - Powerful but heavy, free for students',
                    'Sublime Text - Fast, minimal, great for quick edits',
                    'Atom - Hackable, GitHub integration, customizable',
                    'Brackets - Adobe, live preview, great for beginners'
                ]
            },
            { 
                title: 'How to center a div in CSS?', 
                solutions: [
                    'Flexbox: display: flex; justify-content: center; align-items: center;',
                    'Grid: display: grid; place-items: center;',
                    'Margin auto: margin: 0 auto; (horizontal only)',
                    'Absolute positioning: position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);',
                    'Text-align for inline elements: text-align: center;'
                ]
            }
        ]
    },
    {
        id: 'health',
        name: 'Health & Fitness',
        icon: '💪',
        problems: [
            { 
                title: 'Best workout routine for beginners at home?', 
                solutions: [
                    'Push-ups, squats, planks - 3 sets of 10-15 reps, 3x per week',
                    'Follow YouTube channels: Chloe Ting, FitnessBlender, Athlean-X',
                    'Start with 20-min walks daily, gradually increase intensity',
                    'Bodyweight circuit: burpees, lunges, mountain climbers, rest 30s',
                    'Yoga for flexibility: Yoga with Adriene, 15-20 min daily'
                ]
            },
            { 
                title: 'How to fix lower back pain from sitting all day?', 
                solutions: [
                    'Stretch every hour: cat-cow, child pose, hip flexor stretches',
                    'Strengthen core: planks, bird dogs, dead bugs daily',
                    'Ergonomic setup: monitor at eye level, feet flat, lumbar support',
                    'Walk 5-10 minutes every 2 hours, use standing desk',
                    'See a physical therapist for personalized assessment'
                ]
            },
            { 
                title: 'Best diet for losing weight without feeling hungry?', 
                solutions: [
                    'High protein + fiber: chicken, fish, vegetables, legumes',
                    'Intermittent fasting 16:8 - skip breakfast, eat 12pm-8pm',
                    'Volumetrics: eat low-calorie dense foods like soups, salads',
                    'Meal prep on Sundays, track calories with MyFitnessPal',
                    'Drink water before meals, eat slowly, avoid liquid calories'
                ]
            },
            { 
                title: 'How to improve sleep quality naturally?', 
                solutions: [
                    'No screens 1 hour before bed, use blue light filter',
                    'Keep room cool (65-68°F), dark, and quiet',
                    'Consistent schedule: same bedtime and wake time daily',
                    'Magnesium supplement, chamomile tea, avoid caffeine after 2pm',
                    'Exercise daily but not within 3 hours of bedtime'
                ]
            },
            { 
                title: 'Best supplements for muscle gain?', 
                solutions: [
                    'Whey protein - 25-30g post-workout, convenient and effective',
                    'Creatine monohydrate - 5g daily, most researched supplement',
                    'Vitamin D + Omega-3 - support recovery and reduce inflammation',
                    'Focus on real food first: chicken, eggs, rice, vegetables',
                    'Pre-workout with caffeine for energy and focus (optional)'
                ]
            }
        ]
    },
    {
        id: 'career',
        name: 'Career',
        icon: '💼',
        problems: [
            { 
                title: 'How to negotiate salary for first job offer?', 
                solutions: [
                    'Research Glassdoor, Levels.fyi, Payscale for market rates',
                    'Wait for them to give number first, then counter 10-20% higher',
                    'Emphasize value: skills, projects, certifications you bring',
                    'Ask for signing bonus if base salary is fixed',
                    'Practice with friend, be confident but respectful'
                ]
            },
            { 
                title: 'Best way to learn new skills while working full-time?', 
                solutions: [
                    'Wake up 1 hour early, dedicate to learning before work',
                    'Use lunch breaks for online courses: Coursera, Udemy, YouTube',
                    'Weekend projects: build something real with new skill',
                    'Pomodoro technique: 25 min focused learning after work',
                    'Join online communities: Reddit, Discord for accountability'
                ]
            },
            { 
                title: 'How to deal with toxic coworker professionally?', 
                solutions: [
                    'Document everything: emails, incidents, dates for HR',
                    'Set boundaries: keep conversations professional and brief',
                    'Focus on your work, don\'t engage in gossip or drama',
                    'Talk to manager privately with specific examples',
                    'If nothing changes, consider internal transfer or new job'
                ]
            },
            { 
                title: 'Should I quit my job without another offer?', 
                solutions: [
                    'NO - unless health/safety at risk. Job search while employed',
                    'Save 6-12 months expenses first, then consider',
                    'Try to negotiate sabbatical or reduced hours first',
                    'Line up freelance work or side income before quitting',
                    'Talk to therapist if burnout, might just need vacation'
                ]
            },
            { 
                title: 'How to stand out in job interviews?', 
                solutions: [
                    'Research company deeply: products, culture, recent news',
                    'Prepare STAR stories: Situation, Task, Action, Result',
                    'Ask smart questions about team, challenges, growth',
                    'Send thank-you email within 24 hours with specific details',
                    'Bring portfolio/projects, show don\'t just tell'
                ]
            }
        ]
    },
    {
        id: 'finance',
        name: 'Finance',
        icon: '💰',
        problems: [
            { 
                title: 'Best investment strategy for complete beginners?', 
                solutions: [
                    'Index funds: VTI (total market) or VOO (S&P 500), low fees',
                    'Max out 401k match first - free money from employer',
                    'Roth IRA: $6500/year, tax-free growth, use Vanguard/Fidelity',
                    'Emergency fund first: 3-6 months expenses in high-yield savings',
                    'Dollar-cost averaging: invest same amount monthly, ignore market'
                ]
            },
            { 
                title: 'How to pay off $30k credit card debt fast?', 
                solutions: [
                    'Avalanche method: pay highest interest rate first',
                    'Balance transfer to 0% APR card, pay off in 12-18 months',
                    'Debt consolidation loan at lower interest rate',
                    'Side hustle: DoorDash, freelance, sell unused items',
                    'Cut expenses: cancel subscriptions, cook at home, no eating out'
                ]
            },
            { 
                title: 'Is buying a house worth it in 2024?', 
                solutions: [
                    'Depends on location and plans to stay 5+ years',
                    'Rent if: high interest rates, uncertain job, want flexibility',
                    'Buy if: stable income, good down payment, plan to settle',
                    'Calculate: mortgage + taxes + maintenance vs rent + investing difference',
                    'Consider house hacking: rent out rooms to offset mortgage'
                ]
            },
            { 
                title: 'Best budgeting app that actually works?', 
                solutions: [
                    'YNAB (You Need A Budget) - envelope method, $99/year',
                    'Mint - Free, automatic tracking, good for beginners',
                    'Personal Capital - Free, great for investments tracking',
                    'EveryDollar - Dave Ramsey method, simple interface',
                    'Spreadsheet - Google Sheets, full control, free templates'
                ]
            },
            { 
                title: 'How much should I save for retirement?', 
                solutions: [
                    'Rule of thumb: 15% of gross income including employer match',
                    'By age 30: 1x salary, age 40: 3x, age 50: 6x, age 67: 10x',
                    'Use retirement calculator: consider inflation, lifestyle',
                    'Max 401k ($22,500) + Roth IRA ($6,500) = $29k/year if possible',
                    'Start NOW - compound interest is powerful, even small amounts'
                ]
            }
        ]
    },
    {
        id: 'education',
        name: 'Education',
        icon: '📚',
        problems: [
            { 
                title: 'Best free online courses for career change?', 
                solutions: [
                    'Google Career Certificates - IT, Data, Project Management',
                    'freeCodeCamp - Web development, 300+ hours, completely free',
                    'CS50 Harvard - Computer Science fundamentals, excellent quality',
                    'Coursera - Audit courses free, pay only for certificate',
                    'YouTube - Traversy Media, Fireship, The Net Ninja for tech'
                ]
            },
            { 
                title: 'How to study effectively for exams in less time?', 
                solutions: [
                    'Active recall: test yourself instead of re-reading notes',
                    'Spaced repetition: Anki flashcards, review before forgetting',
                    'Pomodoro: 25 min focus, 5 min break, repeat 4x then 30 min break',
                    'Feynman technique: explain concept simply like teaching a child',
                    'Practice problems > theory, focus on past exams'
                ]
            },
            { 
                title: 'Is a coding bootcamp worth $15k?', 
                solutions: [
                    'YES if: career switcher, need structure, good job placement rate',
                    'NO if: self-motivated, can learn free online, tight budget',
                    'Check outcomes: graduation rate, job placement, salary increase',
                    'Try free resources first: freeCodeCamp, Odin Project, CS50',
                    'Consider income share agreements (ISA) - pay after getting job'
                ]
            },
            { 
                title: 'Best way to learn a new language fast?', 
                solutions: [
                    'Immersion: change phone/computer language, watch shows with subtitles',
                    'Duolingo daily + Anki for vocabulary (30 min/day minimum)',
                    'iTalki - practice with native speakers, $10-15/hour',
                    'Comprehensible input: watch YouTube in target language',
                    'Don\'t focus on grammar early, prioritize speaking and listening'
                ]
            },
            { 
                title: 'How to remember what you read in books?', 
                solutions: [
                    'Take notes while reading, summarize each chapter in own words',
                    'Highlight + review highlights within 24 hours',
                    'Teach concepts to someone else or write blog post',
                    'Spaced repetition: review notes after 1 day, 1 week, 1 month',
                    'Apply immediately: use concepts in real life or projects'
                ]
            }
        ]
    },
    {
        id: 'lifestyle',
        name: 'Lifestyle',
        icon: '🏠',
        problems: [
            { 
                title: 'Best cities for remote workers in 2024?', 
                solutions: [
                    'Lisbon, Portugal - Affordable, great weather, digital nomad visa',
                    'Medellín, Colombia - Low cost, spring weather year-round, fast internet',
                    'Chiang Mai, Thailand - Very cheap, nomad community, amazing food',
                    'Austin, Texas - No state tax, tech hub, good quality of life',
                    'Barcelona, Spain - Culture, beaches, coworking spaces everywhere'
                ]
            },
            { 
                title: 'How to maintain work-life balance with remote job?', 
                solutions: [
                    'Separate workspace: dedicated room or corner, not bedroom',
                    'Strict schedule: 9-5 then close laptop, no email after hours',
                    'Physical transition: walk around block after work to "commute"',
                    'Use different browser profiles for work and personal',
                    'Schedule personal time like meetings: gym, hobbies, family'
                ]
            },
            { 
                title: 'Best morning routine for productivity?', 
                solutions: [
                    'Wake 6am, no phone for 1 hour, hydrate, exercise 20-30 min',
                    'Cold shower, meditation 10 min, healthy breakfast',
                    'Plan top 3 priorities for day, tackle hardest task first',
                    'Sunlight exposure within 30 min of waking for circadian rhythm',
                    'Journal 5 min: gratitude, goals, intentions for the day'
                ]
            },
            { 
                title: 'How to make friends in a new city as an adult?', 
                solutions: [
                    'Meetup.com - join hobby groups, sports leagues, language exchanges',
                    'Bumble BFF - dating app but for friendships',
                    'Coworking spaces - even if remote, go few times a week',
                    'Volunteer - animal shelter, food bank, community events',
                    'Say yes to everything first 3 months, filter later'
                ]
            },
            { 
                title: 'Best way to declutter and organize home?', 
                solutions: [
                    'KonMari method: keep only what sparks joy, thank items before discarding',
                    'One room at a time, don\'t move to next until complete',
                    'Four boxes: keep, donate, sell, trash - be ruthless',
                    'One in, one out rule: buy new item, remove old one',
                    'Digital declutter too: unsubscribe emails, delete apps, organize files'
                ]
            }
        ]
    },
    {
        id: 'relationships',
        name: 'Relationships',
        icon: '❤️',
        problems: [
            { 
                title: 'How to maintain long-distance relationship?', 
                solutions: [
                    'Video call daily even if short, schedule date nights with movies',
                    'Send surprise gifts, handwritten letters, care packages',
                    'Have end goal: when will distance end? Make concrete plans',
                    'Share daily life: photos, voice messages, what you ate',
                    'Visit regularly: alternate who travels, plan trips together'
                ]
            },
            { 
                title: 'Best way to resolve conflicts with partner?', 
                solutions: [
                    'Use "I feel" statements, not "You always" accusations',
                    'Listen to understand, not to respond - repeat back what they said',
                    'Take 20 min break if too heated, come back when calm',
                    'Focus on solution, not winning - you\'re on same team',
                    'Apologize sincerely when wrong, don\'t bring up past issues'
                ]
            },
            { 
                title: 'How to make friends as an introvert?', 
                solutions: [
                    'Quality over quantity: focus on 2-3 deep friendships',
                    'One-on-one hangouts instead of group events',
                    'Online communities first: Discord, Reddit, then meet IRL',
                    'Shared activities: book club, hiking, gaming - focus on activity not small talk',
                    'Be honest about needing alone time to recharge'
                ]
            },
            { 
                title: 'Signs you should break up with someone?', 
                solutions: [
                    'You feel worse about yourself when with them',
                    'Constant criticism, disrespect, or controlling behavior',
                    'Different life goals: kids, marriage, location, values',
                    'You\'re staying out of fear or comfort, not love',
                    'Trust is broken and can\'t be rebuilt despite effort'
                ]
            },
            { 
                title: 'How to set boundaries with family?', 
                solutions: [
                    'Be clear and specific: "I can\'t talk about my weight"',
                    'Enforce consequences: "If you bring it up, I\'ll leave"',
                    'Don\'t JADE: Justify, Argue, Defend, Explain - just state boundary',
                    'Reduce contact if needed: less visits, shorter calls',
                    'Therapy helps: learn to handle guilt and stand firm'
                ]
            }
        ]
    },
    {
        id: 'travel',
        name: 'Travel',
        icon: '✈️',
        problems: [
            { 
                title: 'Best budget travel destinations in 2024?', 
                solutions: [
                    'Vietnam - $30/day, amazing food, beautiful beaches and cities',
                    'Portugal - Cheapest Western Europe, Porto and Lisbon',
                    'Mexico - Close to US, $40/day, incredible culture and food',
                    'Thailand - $25/day, islands, temples, street food paradise',
                    'Albania - Hidden gem Europe, beaches, mountains, very affordable'
                ]
            },
            { 
                title: 'How to pack light for 2-week trip?', 
                solutions: [
                    'Capsule wardrobe: 3 tops, 2 bottoms, 1 jacket - mix and match',
                    'Wear heaviest items on plane: boots, jacket, jeans',
                    'Packing cubes for organization, compression bags for bulky items',
                    'Travel-size toiletries, buy shampoo at destination',
                    'One bag rule: carry-on only, avoid checked bag fees and waiting'
                ]
            },
            { 
                title: 'Best travel credit card for beginners?', 
                solutions: [
                    'Chase Sapphire Preferred - 60k points bonus, no foreign fees',
                    'Capital One Venture - Simple 2x miles, easy to use',
                    'Amex Gold - 4x on dining and groceries, great for foodies',
                    'Citi Premier - 3x on travel, gas, groceries, $95 annual fee',
                    'Start with no annual fee: Discover It, Chase Freedom'
                ]
            },
            { 
                title: 'How to find cheap flights?', 
                solutions: [
                    'Google Flights - set price alerts, flexible dates, explore map',
                    'Book Tuesday/Wednesday, fly Tuesday/Wednesday for cheapest',
                    'Incognito mode - airlines track searches and raise prices',
                    'Scott\'s Cheap Flights / Going.com - email alerts for deals',
                    'Be flexible: nearby airports, layovers, off-season travel'
                ]
            },
            { 
                title: 'Is travel insurance worth it?', 
                solutions: [
                    'YES for: international trips, expensive bookings, adventure activities',
                    'NO for: domestic weekend trips, refundable bookings',
                    'Check credit card benefits first - many include travel insurance',
                    'World Nomads or SafetyWing for long-term travel',
                    'Read fine print: pre-existing conditions, adventure sports coverage'
                ]
            }
        ]
    }
];

// Merge additional problems if available
if (typeof additionalProblems !== 'undefined') {
    categories.forEach(cat => {
        if (additionalProblems[cat.id]) {
            cat.problems = cat.problems.concat(additionalProblems[cat.id]);
        }
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Round Table App Starting...');
    console.log('📊 Categories available:', categories.length);
    
    let totalProblemsInCategories = 0;
    categories.forEach(cat => {
        totalProblemsInCategories += cat.problems.length;
        console.log(`  ${cat.icon} ${cat.name}: ${cat.problems.length} problems`);
    });
    console.log(`📦 Total problems available in categories: ${totalProblemsInCategories}`);
    
    loadData();
    
    // Force reload if we have fewer problems than available in categories
    if (problems.length < totalProblemsInCategories) {
        console.log('🔄 Detected new problems available, clearing old data...');
        problems = [];
        localStorage.removeItem('roundTableData');
    }
    
    initializeSampleData();
    checkAuth();
});

// Check authentication
function checkAuth() {
    const stored = localStorage.getItem('roundTableUser');
    if (stored) {
        currentUser = JSON.parse(stored);
        showMainContent();
    } else {
        showVisitorMode();
    }
}

// Show visitor mode
function showVisitorMode() {
    document.getElementById('visitorContent').style.display = 'block';
    document.getElementById('mainContent').style.display = 'none';
    
    renderHotTopics();
    renderVisitorCategories();
    populateVisitorCategorySelect();
    renderVisitorProblems();
}

// Show/hide auth modal
function showAuthModal() {
    document.getElementById('authModal').style.display = 'flex';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

// Render hot topics (top 3 most voted)
function renderHotTopics() {
    console.log('🔥 Rendering hot topics...');
    const container = document.getElementById('hotTopicsContainer');
    
    if (!container) {
        console.error('❌ hotTopicsContainer not found!');
        return;
    }
    
    console.log('Problems available:', problems.length);
    
    // Get top 3 problems with most total votes
    const problemsWithVotes = problems.map(p => ({
        ...p,
        totalVotes: p.solutions.reduce((sum, s) => sum + s.votes, 0)
    })).sort((a, b) => b.totalVotes - a.totalVotes).slice(0, 3);
    
    if (problemsWithVotes.length === 0) {
        container.innerHTML = '<p style="color: #999;">No hot topics yet!</p>';
        return;
    }
    
    container.innerHTML = problemsWithVotes.map(problem => {
        const categoryData = categories.find(c => c.id === problem.category);
        const categoryName = categoryData ? categoryData.name : 'General';
        
        return `
            <div class="hot-topic-card" onclick="openVisitorRoundTable(${problem.id})">
                <div class="hot-topic-badge">🔥 ${problem.totalVotes} votes</div>
                <div class="category-badge">${categoryName}</div>
                <h3>${problem.icon} ${problem.title}</h3>
                <p>${problem.description || 'Click to see solutions'}</p>
                <div class="problem-stats">
                    <span>💬 ${problem.solutions.length} solutions</span>
                </div>
            </div>
        `;
    }).join('');
}

// Render visitor categories
function renderVisitorCategories() {
    const container = document.getElementById('visitorCategoriesGrid');
    
    container.innerHTML = categories.map(cat => {
        const count = problems.filter(p => p.category === cat.id).length;
        return `
            <div class="category-card" onclick="filterVisitorProblems('${cat.id}')">
                <div class="category-icon">${cat.icon}</div>
                <div class="category-name">${cat.name}</div>
                <div class="category-count">${count} tables</div>
            </div>
        `;
    }).join('');
}

// Populate visitor category select
function populateVisitorCategorySelect() {
    const filterSelect = document.getElementById('visitorFilterCategory');
    
    const options = categories.map(cat => 
        `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`
    ).join('');
    
    filterSelect.innerHTML = '<option value="">All Categories</option>' + options;
}

// Filter visitor problems
function filterVisitorProblems(categoryId = null) {
    if (categoryId) {
        selectedCategory = categoryId;
        document.getElementById('visitorFilterCategory').value = categoryId;
    } else {
        selectedCategory = document.getElementById('visitorFilterCategory').value;
    }
    renderVisitorProblems();
    
    // Smooth scroll to problems list
    const problemsList = document.querySelector('.problems-list');
    if (problemsList) {
        problemsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Render visitor problems
function renderVisitorProblems() {
    const container = document.getElementById('visitorProblemsContainer');
    
    let filteredProblems = problems;
    if (selectedCategory) {
        filteredProblems = problems.filter(p => p.category === selectedCategory);
    }
    
    if (filteredProblems.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center;">No discussions in this category yet.</p>';
        return;
    }
    
    container.innerHTML = filteredProblems.map(problem => {
        const solutionCount = problem.solutions.length;
        const topVotes = problem.solutions.length > 0 
            ? Math.max(...problem.solutions.map(s => s.votes)) 
            : 0;
        
        const categoryData = categories.find(c => c.id === problem.category);
        const categoryName = categoryData ? categoryData.name : 'General';
        
        return `
            <div class="problem-card" onclick="openVisitorRoundTable(${problem.id})">
                <div class="category-badge">${categoryName}</div>
                <h3>${problem.icon} ${problem.title}</h3>
                <p>${problem.description || 'Click to see solutions'}</p>
                <div class="problem-stats">
                    <span>💬 ${solutionCount} solutions</span>
                    <span>🔥 ${topVotes} top votes</span>
                </div>
            </div>
        `;
    }).join('');
}

// Open visitor round table
function openVisitorRoundTable(problemId) {
    currentProblemId = problemId;
    const problem = problems.find(p => p.id === problemId);
    
    if (!problem) return;
    
    document.getElementById('visitorContent').style.display = 'none';
    document.getElementById('visitorRoundTableView').style.display = 'flex';
    
    document.getElementById('visitorCenterTitle').textContent = problem.title;
    document.getElementById('visitorCenterDesc').textContent = problem.description || 'Join the discussion and share your thoughts';
    document.getElementById('visitorProblemIcon').textContent = problem.icon;
    
    // Update metadata
    const solutionCount = problem.solutions.length;
    const topVotes = problem.solutions.length > 0 ? Math.max(...problem.solutions.map(s => s.votes)) : 0;
    document.getElementById('visitorProblemSolutionCount').textContent = `💬 ${solutionCount} solution${solutionCount !== 1 ? 's' : ''}`;
    document.getElementById('visitorProblemTopVotes').textContent = `🔥 ${topVotes} top vote${topVotes !== 1 ? 's' : ''}`;
    
    renderVisitorSolutions(problem);
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Back to visitor list
function backToVisitorList() {
    currentProblemId = null;
    document.getElementById('visitorContent').style.display = 'block';
    document.getElementById('visitorRoundTableView').style.display = 'none';
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render visitor solutions (read-only)
function renderVisitorSolutions(problem) {
    const container = document.getElementById('visitorSolutionsOrbit');
    
    if (problem.solutions.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; grid-column: 1/-1;">No solutions yet. Join to be the first!</p>';
        return;
    }
    
    // Sort by votes
    const sortedSolutions = [...problem.solutions].sort((a, b) => b.votes - a.votes);
    const maxVotes = sortedSolutions[0].votes;
    
    container.innerHTML = sortedSolutions.map(solution => {
        const isHot = solution.votes === maxVotes && maxVotes > 0;
        
        return `
            <div class="solution-card visitor-solution-card ${isHot ? 'hot' : ''}">
                ${isHot ? '<div class="hot-badge">🔥 HOT</div>' : ''}
                <div class="solution-header">
                    <span class="solution-author">Anonymous</span>
                    <div class="vote-section">
                        <button class="vote-btn" onclick="showAuthModal()" title="Join to vote">👍</button>
                        <span class="vote-count">${solution.votes}</span>
                    </div>
                </div>
                <div class="solution-text">${solution.text}</div>
            </div>
        `;
    }).join('');
}

// Register user
function register() {
    const email = document.getElementById('userEmail').value.trim();
    
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address!');
        return;
    }
    
    currentUser = {
        email: email,
        votes: {}, // Track votes: { problemId_solutionId: true }
        joinedAt: new Date().toISOString()
    };
    
    localStorage.setItem('roundTableUser', JSON.stringify(currentUser));
    closeAuthModal();
    showMainContent();
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('roundTableUser');
        currentUser = null;
        location.reload();
    }
}

// Show main content
function showMainContent() {
    document.getElementById('visitorContent').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('userEmailDisplay').textContent = currentUser.email;
    
    renderCategories();
    populateCategorySelects();
    renderProblems();
}

// Load data from localStorage
function loadData() {
    const stored = localStorage.getItem('roundTableData');
    if (stored) {
        problems = JSON.parse(stored);
    }
}

// Initialize sample data if empty
function initializeSampleData() {
    console.log('📝 Initializing sample data...');
    console.log('Current problems count:', problems.length);
    
    if (problems.length === 0) {
        console.log('Loading problems from categories...');
        // Load ALL problems from each category
        categories.forEach((category, catIdx) => {
            console.log(`Loading ${category.problems.length} problems from ${category.name}`);
            category.problems.forEach((sample, idx) => {
                const problem = {
                    id: Date.now() + Math.random() + catIdx * 10000 + idx * 100,
                    title: sample.title,
                    description: '',
                    icon: category.icon,
                    category: category.id,
                    solutions: sample.solutions.map((sol, solIdx) => ({
                        id: Date.now() + Math.random() + solIdx * 10,
                        text: sol,
                        votes: Math.floor(Math.random() * 50) + 5, // 5-55 votes
                        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // Random date within last 30 days
                    })),
                    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
                };
                problems.push(problem);
            });
        });
        
        // Shuffle all problems for variety
        problems.sort(() => 0.5 - Math.random());
        saveData();
        
        console.log(`✅ Loaded ${problems.length} problems across ${categories.length} categories`);
    } else {
        console.log(`✅ Using existing ${problems.length} problems from localStorage`);
    }
}

// Function to add random problem from pool
function addRandomProblem() {
    const allProblems = categories.flatMap(cat => 
        cat.problems.map(p => ({ ...p, category: cat.id, icon: cat.icon }))
    );
    
    // Filter out problems that already exist
    const existingTitles = problems.map(p => p.title);
    const availableProblems = allProblems.filter(p => !existingTitles.includes(p.title));
    
    if (availableProblems.length === 0) {
        alert('All sample problems have been added!');
        return;
    }
    
    // Pick random problem
    const randomProblem = availableProblems[Math.floor(Math.random() * availableProblems.length)];
    
    const problem = {
        id: Date.now(),
        title: randomProblem.title,
        description: '',
        icon: randomProblem.icon,
        category: randomProblem.category,
        solutions: randomProblem.solutions.map((sol, idx) => ({
            id: Date.now() + Math.random() + idx,
            text: sol,
            votes: Math.floor(Math.random() * 30) + 3,
            createdAt: new Date().toISOString()
        })),
        createdAt: new Date().toISOString()
    };
    
    problems.unshift(problem);
    saveData();
    renderCategories();
    renderProblems();
    
    alert(`Added: ${problem.title}`);
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('roundTableData', JSON.stringify(problems));
}

// Render categories
function renderCategories() {
    const container = document.getElementById('categoriesGrid');
    
    container.innerHTML = categories.map(cat => {
        const count = problems.filter(p => p.category === cat.id).length;
        return `
            <div class="category-card" onclick="filterByCategory('${cat.id}')">
                <div class="category-icon">${cat.icon}</div>
                <div class="category-name">${cat.name}</div>
                <div class="category-count">${count} tables</div>
            </div>
        `;
    }).join('');
}

// Populate category selects
function populateCategorySelects() {
    const createSelect = document.getElementById('problemCategory');
    const filterSelect = document.getElementById('filterCategory');
    
    const options = categories.map(cat => 
        `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`
    ).join('');
    
    createSelect.innerHTML = '<option value="">Select Category</option>' + options;
    filterSelect.innerHTML = '<option value="">All Categories</option>' + options;
}

// Filter by category
function filterByCategory(categoryId = null) {
    if (categoryId) {
        selectedCategory = categoryId;
        document.getElementById('filterCategory').value = categoryId;
    } else {
        selectedCategory = document.getElementById('filterCategory').value;
    }
    renderProblems();
    
    // Smooth scroll to problems list
    const problemsList = document.getElementById('problemsList');
    if (problemsList) {
        problemsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Create new problem
function createProblem() {
    const title = document.getElementById('problemTitle').value.trim();
    const desc = document.getElementById('problemDesc').value.trim();
    const category = document.getElementById('problemCategory').value;
    
    if (!title) {
        alert('Please enter a problem or question!');
        return;
    }
    
    if (!category) {
        alert('Please select a category!');
        return;
    }
    
    const categoryData = categories.find(c => c.id === category);
    
    const problem = {
        id: Date.now(),
        title: title,
        description: desc,
        icon: categoryData.icon,
        category: category,
        solutions: [],
        createdAt: new Date().toISOString()
    };
    
    problems.unshift(problem);
    saveData();
    
    document.getElementById('problemTitle').value = '';
    document.getElementById('problemDesc').value = '';
    document.getElementById('problemCategory').value = '';
    
    renderCategories();
    renderProblems();
}

// Get random icon for problem
function getRandomIcon() {
    const icons = ['👤', '👥', '💼', '🎮', '💻', '🏠', '🚗', '📱', '🎯', '💡', '🌟', '🔥'];
    return icons[Math.floor(Math.random() * icons.length)];
}

// Render problems list
function renderProblems() {
    const container = document.getElementById('problemsContainer');
    
    let filteredProblems = problems;
    if (selectedCategory) {
        filteredProblems = problems.filter(p => p.category === selectedCategory);
    }
    
    if (filteredProblems.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center;">No tables in this category yet.</p>';
        return;
    }
    
    container.innerHTML = filteredProblems.map(problem => {
        const solutionCount = problem.solutions.length;
        const topVotes = problem.solutions.length > 0 
            ? Math.max(...problem.solutions.map(s => s.votes)) 
            : 0;
        
        const categoryData = categories.find(c => c.id === problem.category);
        const categoryName = categoryData ? categoryData.name : 'General';
        
        return `
            <div class="problem-card" onclick="openRoundTable(${problem.id})">
                <div class="category-badge">${categoryName}</div>
                <h3>${problem.icon} ${problem.title}</h3>
                <p>${problem.description || 'No description'}</p>
                <div class="problem-stats">
                    <span>💬 ${solutionCount} solutions</span>
                    <span>🔥 ${topVotes} top votes</span>
                </div>
            </div>
        `;
    }).join('');
}

// Open round table view
function openRoundTable(problemId) {
    currentProblemId = problemId;
    const problem = problems.find(p => p.id === problemId);
    
    if (!problem) return;
    
    document.getElementById('createSection').style.display = 'none';
    document.getElementById('problemsList').style.display = 'none';
    document.getElementById('roundTableView').style.display = 'flex';
    
    document.getElementById('centerTitle').textContent = problem.title;
    document.getElementById('centerDesc').textContent = problem.description || 'Join the discussion and share your thoughts';
    document.querySelector('.problem-icon').textContent = problem.icon;
    
    // Update metadata
    const solutionCount = problem.solutions.length;
    const topVotes = problem.solutions.length > 0 ? Math.max(...problem.solutions.map(s => s.votes)) : 0;
    document.getElementById('problemSolutionCount').textContent = `💬 ${solutionCount} solution${solutionCount !== 1 ? 's' : ''}`;
    document.getElementById('problemTopVotes').textContent = `🔥 ${topVotes} top vote${topVotes !== 1 ? 's' : ''}`;
    document.getElementById('solutionsCount').textContent = solutionCount > 0 ? `${solutionCount} solution${solutionCount !== 1 ? 's' : ''} - Vote for the best one` : 'Be the first to share a solution';
    
    renderSolutions(problem);
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Back to list
function backToList() {
    currentProblemId = null;
    document.getElementById('createSection').style.display = 'block';
    document.getElementById('problemsList').style.display = 'block';
    document.getElementById('roundTableView').style.display = 'none';
    document.getElementById('solutionText').value = '';
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render solutions
function renderSolutions(problem) {
    const container = document.getElementById('solutionsOrbit');
    
    if (problem.solutions.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; grid-column: 1/-1;">No solutions yet. Be the first to share your wisdom!</p>';
        return;
    }
    
    // Sort by votes
    const sortedSolutions = [...problem.solutions].sort((a, b) => b.votes - a.votes);
    const maxVotes = sortedSolutions[0].votes;
    
    container.innerHTML = sortedSolutions.map(solution => {
        const isHot = solution.votes === maxVotes && maxVotes > 0;
        const voteKey = `${currentProblemId}_${solution.id}`;
        const hasVoted = currentUser.votes[voteKey];
        
        return `
            <div class="solution-card ${isHot ? 'hot' : ''}">
                ${isHot ? '<div class="hot-badge">🔥 HOT</div>' : ''}
                <div class="solution-header">
                    <span class="solution-author">Anonymous</span>
                    <div class="vote-section">
                        <button class="vote-btn ${hasVoted ? 'voted' : ''}" onclick="vote(${solution.id}, 1)" ${hasVoted ? 'disabled' : ''}>
                            ${hasVoted ? '✅' : '👍'}
                        </button>
                        <span class="vote-count">${solution.votes}</span>
                    </div>
                </div>
                <div class="solution-text">${solution.text}</div>
            </div>
        `;
    }).join('');
}

// Add solution
function addSolution() {
    const text = document.getElementById('solutionText').value.trim();
    
    if (!text) {
        alert('Please enter a solution!');
        return;
    }
    
    const problem = problems.find(p => p.id === currentProblemId);
    if (!problem) return;
    
    const solution = {
        id: Date.now(),
        text: text,
        votes: 0,
        createdAt: new Date().toISOString()
    };
    
    problem.solutions.push(solution);
    saveData();
    
    document.getElementById('solutionText').value = '';
    
    // Update metadata
    const solutionCount = problem.solutions.length;
    document.getElementById('problemSolutionCount').textContent = `💬 ${solutionCount} solution${solutionCount !== 1 ? 's' : ''}`;
    document.getElementById('solutionsCount').textContent = `${solutionCount} solution${solutionCount !== 1 ? 's' : ''} - Vote for the best one`;
    
    renderSolutions(problem);
    
    // Scroll to the new solution
    const solutionsOrbit = document.getElementById('solutionsOrbit');
    setTimeout(() => {
        solutionsOrbit.scrollTop = solutionsOrbit.scrollHeight;
    }, 100);
}

// Vote on solution
function vote(solutionId, delta) {
    const problem = problems.find(p => p.id === currentProblemId);
    if (!problem) return;
    
    const solution = problem.solutions.find(s => s.id === solutionId);
    if (!solution) return;
    
    // Check if user already voted on this solution
    const voteKey = `${currentProblemId}_${solutionId}`;
    
    if (currentUser.votes[voteKey]) {
        alert('You have already voted on this solution!');
        return;
    }
    
    // Only allow upvotes (delta = 1)
    if (delta > 0) {
        solution.votes = Math.max(0, solution.votes + delta);
        currentUser.votes[voteKey] = true;
        
        // Save both user data and problem data
        localStorage.setItem('roundTableUser', JSON.stringify(currentUser));
        saveData();
        
        // Update top votes display
        const topVotes = Math.max(...problem.solutions.map(s => s.votes));
        document.getElementById('problemTopVotes').textContent = `🔥 ${topVotes} top vote${topVotes !== 1 ? 's' : ''}`;
        
        renderSolutions(problem);
    }
}

// Allow Enter key to submit
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        if (document.activeElement.id === 'problemTitle') {
            e.preventDefault();
            createProblem();
        }
    }
});
