// Online Search API Integration for Interview Questions

// API Configuration
const SEARCH_CONFIG = {
    // Using DuckDuckGo Instant Answer API (free, no key needed)
    duckduckgo: 'https://api.duckduckgo.com/',
    // Using Wikipedia API for job information
    wikipedia: 'https://en.wikipedia.org/w/api.php',
    // Fallback to web scraping proxy
    corsProxy: 'https://api.allorigins.win/raw?url='
};

// Common interview questions templates
const QUESTION_TEMPLATES = [
    "Tell me about yourself and your experience in {job}.",
    "Why do you want to work as a {job}?",
    "What are your greatest strengths as a {job}?",
    "What is your biggest weakness in {job}?",
    "Describe a challenging situation you faced as a {job} and how you handled it.",
    "Where do you see yourself in 5 years in your {job} career?",
    "What skills are most important for a {job}?",
    "How do you stay updated with trends in {job}?",
    "Describe your typical day as a {job}.",
    "What motivates you in your {job} role?"
];

// Search for interview questions online
async function searchInterviewQuestions(jobTitle) {
    console.log('Searching online for:', jobTitle);
    
    try {
        // Try multiple sources
        const results = await Promise.allSettled([
            searchWithDuckDuckGo(jobTitle),
            searchWithWikipedia(jobTitle),
            generateSmartQuestions(jobTitle)
        ]);
        
        // Combine results
        let questions = [];
        results.forEach(result => {
            if (result.status === 'fulfilled' && result.value) {
                questions = questions.concat(result.value);
            }
        });
        
        // If we got questions, return them
        if (questions.length > 0) {
            return {
                job: jobTitle,
                category: 'Online Search Results',
                questions: questions.slice(0, 10), // Limit to 10 questions
                source: 'online'
            };
        }
        
        // Fallback to template questions
        return generateTemplateQuestions(jobTitle);
        
    } catch (error) {
        console.error('Search error:', error);
        return generateTemplateQuestions(jobTitle);
    }
}

// Search using DuckDuckGo
async function searchWithDuckDuckGo(jobTitle) {
    try {
        const query = `${jobTitle} interview questions`;
        const url = `${SEARCH_CONFIG.duckduckgo}?q=${encodeURIComponent(query)}&format=json`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        const questions = [];
        
        // Extract from abstract
        if (data.Abstract) {
            questions.push({
                q: `What does a ${jobTitle} do?`,
                a: data.Abstract,
                source: 'DuckDuckGo'
            });
        }
        
        // Extract from related topics
        if (data.RelatedTopics && data.RelatedTopics.length > 0) {
            data.RelatedTopics.slice(0, 3).forEach((topic, index) => {
                if (topic.Text) {
                    questions.push({
                        q: `Tell me about ${topic.FirstURL ? topic.FirstURL.split('/').pop().replace(/_/g, ' ') : 'this aspect'} in ${jobTitle}.`,
                        a: topic.Text,
                        source: 'DuckDuckGo'
                    });
                }
            });
        }
        
        return questions;
    } catch (error) {
        console.error('DuckDuckGo search failed:', error);
        return [];
    }
}

// Search using Wikipedia
async function searchWithWikipedia(jobTitle) {
    try {
        const url = `${SEARCH_CONFIG.wikipedia}?action=query&format=json&origin=*&prop=extracts&exintro=true&explaintext=true&titles=${encodeURIComponent(jobTitle)}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        const questions = [];
        const pages = data.query.pages;
        
        for (let pageId in pages) {
            const page = pages[pageId];
            if (page.extract) {
                // Split extract into sentences
                const sentences = page.extract.split('. ').filter(s => s.length > 50);
                
                if (sentences.length > 0) {
                    questions.push({
                        q: `What is a ${jobTitle}?`,
                        a: sentences[0] + '.',
                        source: 'Wikipedia'
                    });
                }
                
                if (sentences.length > 1) {
                    questions.push({
                        q: `What are the main responsibilities of a ${jobTitle}?`,
                        a: sentences.slice(1, 3).join('. ') + '.',
                        source: 'Wikipedia'
                    });
                }
            }
        }
        
        return questions;
    } catch (error) {
        console.error('Wikipedia search failed:', error);
        return [];
    }
}

// Generate smart questions based on job title analysis
function generateSmartQuestions(jobTitle) {
    const questions = [];
    const jobLower = jobTitle.toLowerCase();
    
    // Analyze job title to generate relevant questions
    const keywords = {
        'manager': ['team management', 'leadership', 'decision making', 'conflict resolution'],
        'developer': ['programming languages', 'problem solving', 'debugging', 'code review'],
        'designer': ['creativity', 'design tools', 'user experience', 'portfolio'],
        'analyst': ['data analysis', 'reporting', 'problem solving', 'attention to detail'],
        'engineer': ['technical skills', 'problem solving', 'project management', 'innovation'],
        'sales': ['persuasion', 'customer relationships', 'targets', 'negotiation'],
        'marketing': ['campaigns', 'analytics', 'creativity', 'brand awareness'],
        'teacher': ['lesson planning', 'classroom management', 'student engagement', 'assessment'],
        'nurse': ['patient care', 'medical knowledge', 'empathy', 'emergency response'],
        'accountant': ['financial reporting', 'accuracy', 'tax knowledge', 'software proficiency']
    };
    
    // Find matching keywords
    for (let key in keywords) {
        if (jobLower.includes(key)) {
            keywords[key].forEach(skill => {
                questions.push({
                    q: `How would you demonstrate ${skill} in your role as a ${jobTitle}?`,
                    a: `As a ${jobTitle}, ${skill} is crucial. I would demonstrate this by maintaining high standards, continuously learning, and applying best practices in my daily work. I focus on delivering quality results while collaborating effectively with my team.`,
                    source: 'AI Generated'
                });
            });
            break;
        }
    }
    
    return questions;
}

// Generate template-based questions
function generateTemplateQuestions(jobTitle) {
    const questions = QUESTION_TEMPLATES.map(template => {
        const question = template.replace(/{job}/g, jobTitle);
        return {
            q: question,
            a: generateTemplateAnswer(question, jobTitle),
            source: 'Template'
        };
    });
    
    return {
        job: jobTitle,
        category: 'General Interview Questions',
        questions: questions,
        source: 'template'
    };
}

// Generate smart template answers
function generateTemplateAnswer(question, jobTitle) {
    if (question.includes('Tell me about yourself')) {
        return `I am a dedicated professional with experience in ${jobTitle}. I have developed strong skills in this field through hands-on work and continuous learning. I'm passionate about delivering quality results and contributing to team success.`;
    }
    if (question.includes('Why do you want')) {
        return `I'm drawn to ${jobTitle} because it aligns with my skills and interests. I enjoy the challenges this role presents and the opportunity to make a meaningful impact. I'm excited about growing in this field and contributing to organizational success.`;
    }
    if (question.includes('greatest strengths')) {
        return `My greatest strengths as a ${jobTitle} include strong problem-solving abilities, attention to detail, and excellent communication skills. I'm adaptable, quick to learn, and committed to continuous improvement. I work well both independently and as part of a team.`;
    }
    if (question.includes('weakness')) {
        return `I sometimes focus too much on perfection, which can slow me down. However, I've learned to balance quality with efficiency by setting realistic deadlines and knowing when good enough is sufficient. I'm continuously working on this through time management techniques.`;
    }
    if (question.includes('challenging situation')) {
        return `I once faced a tight deadline with limited resources. I prioritized tasks, communicated clearly with stakeholders, and worked efficiently to deliver quality results on time. This experience taught me the importance of planning, flexibility, and teamwork.`;
    }
    if (question.includes('5 years')) {
        return `In 5 years, I see myself as an expert ${jobTitle} with expanded responsibilities. I aim to develop leadership skills, mentor others, and contribute to strategic initiatives. I'm committed to continuous learning and growing within the organization.`;
    }
    if (question.includes('skills')) {
        return `Key skills for a ${jobTitle} include technical expertise, problem-solving, communication, adaptability, and attention to detail. Time management, teamwork, and continuous learning are also essential. I actively develop these skills through practice and professional development.`;
    }
    if (question.includes('stay updated')) {
        return `I stay updated by reading industry publications, taking online courses, attending webinars and conferences, and networking with other professionals. I follow thought leaders on social media and participate in professional communities to learn about trends and best practices.`;
    }
    if (question.includes('typical day')) {
        return `A typical day as a ${jobTitle} involves planning priorities, executing key tasks, collaborating with team members, and solving problems as they arise. I balance routine responsibilities with strategic projects, ensuring quality and efficiency in all my work.`;
    }
    if (question.includes('motivates')) {
        return `I'm motivated by solving challenging problems, seeing the impact of my work, and continuous learning. I enjoy collaborating with talented colleagues and contributing to meaningful projects. Recognition for quality work and opportunities for growth also drive my performance.`;
    }
    
    return `As a ${jobTitle}, I focus on delivering quality work, continuous improvement, and effective collaboration. I bring dedication, relevant skills, and a positive attitude to every task. I'm committed to contributing to team success and organizational goals.`;
}

// Export functions
window.searchInterviewQuestions = searchInterviewQuestions;
