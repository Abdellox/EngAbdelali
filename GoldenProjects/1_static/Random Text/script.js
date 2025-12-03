// Topic-based text data
const topicData = {
    football: {
        words: ['player', 'goal', 'match', 'team', 'stadium', 'coach', 'ball', 'kick', 'pass', 'shoot', 'defense', 'attack', 'midfielder', 'striker', 'goalkeeper', 'penalty', 'corner', 'offside', 'referee', 'tournament', 'championship', 'league', 'victory', 'defeat', 'training', 'tactics', 'formation', 'substitute', 'captain', 'fans', 'crowd', 'score', 'assist', 'dribble', 'header', 'tackle', 'foul', 'yellow card', 'red card', 'free kick'],
        titles: ['Championship Victory Celebration', 'Last Minute Goal Secures Win', 'Team Announces New Signing', 'Tactical Analysis of the Match', 'Player of the Season Award', 'Historic Derby Match Preview', 'Training Camp Updates', 'Transfer Window Latest News'],
        phrases: ['scored a brilliant goal', 'made an incredible save', 'dominated possession', 'created numerous chances', 'showed great teamwork', 'displayed excellent skills', 'controlled the midfield', 'defended solidly', 'attacked relentlessly', 'celebrated with fans']
    },
    basketball: {
        words: ['player', 'basket', 'dunk', 'shoot', 'rebound', 'assist', 'defense', 'offense', 'court', 'hoop', 'three-pointer', 'layup', 'dribble', 'pass', 'block', 'steal', 'foul', 'timeout', 'quarter', 'championship', 'playoff', 'coach', 'team', 'point guard', 'center', 'forward', 'bench', 'arena', 'fans', 'score', 'alley-oop', 'fast break', 'jump shot', 'free throw', 'slam dunk', 'crossover', 'pick and roll'],
        titles: ['Playoff Game Highlights', 'Triple-Double Performance', 'Championship Finals Preview', 'Rookie of the Year Announcement', 'Historic Comeback Victory', 'All-Star Game Selection', 'Team Trade Analysis', 'Season Statistics Review'],
        phrases: ['sank a three-pointer', 'grabbed the rebound', 'made a perfect assist', 'blocked the shot', 'drove to the basket', 'executed the play', 'dominated the paint', 'controlled the tempo', 'sealed the victory', 'energized the crowd']
    },
    technology: {
        words: ['software', 'hardware', 'application', 'development', 'innovation', 'digital', 'platform', 'system', 'interface', 'algorithm', 'database', 'cloud', 'artificial intelligence', 'machine learning', 'programming', 'coding', 'framework', 'API', 'security', 'encryption', 'network', 'server', 'mobile', 'desktop', 'browser', 'update', 'feature', 'bug', 'performance', 'optimization', 'integration', 'deployment', 'automation', 'analytics', 'data', 'user experience'],
        titles: ['New Software Release Announced', 'Revolutionary AI Technology', 'Cloud Platform Updates', 'Cybersecurity Best Practices', 'Mobile App Development Trends', 'Tech Innovation Summit', 'Digital Transformation Guide', 'Future of Computing'],
        phrases: ['improved performance significantly', 'enhanced user experience', 'implemented new features', 'optimized the algorithm', 'secured the system', 'integrated seamlessly', 'deployed successfully', 'automated the process', 'analyzed the data', 'revolutionized the industry']
    },
    cooking: {
        words: ['recipe', 'ingredient', 'flavor', 'dish', 'cuisine', 'chef', 'kitchen', 'cooking', 'baking', 'seasoning', 'spice', 'herb', 'sauce', 'meal', 'appetizer', 'main course', 'dessert', 'preparation', 'technique', 'temperature', 'oven', 'pan', 'knife', 'cutting board', 'fresh', 'organic', 'delicious', 'tasty', 'savory', 'sweet', 'sour', 'bitter', 'umami', 'texture', 'aroma', 'presentation', 'garnish', 'portion'],
        titles: ['Delicious Homemade Recipe', 'Chef\'s Special Creation', 'Seasonal Cooking Guide', 'Traditional Cuisine Secrets', 'Quick Weeknight Dinner', 'Gourmet Dessert Ideas', 'Healthy Meal Planning', 'Kitchen Tips and Tricks'],
        phrases: ['perfectly seasoned', 'cooked to perfection', 'beautifully presented', 'bursting with flavor', 'carefully prepared', 'expertly crafted', 'freshly made', 'traditionally cooked', 'artfully plated', 'delightfully aromatic']
    },
    travel: {
        words: ['destination', 'journey', 'adventure', 'explore', 'discover', 'vacation', 'tourist', 'traveler', 'hotel', 'resort', 'flight', 'airport', 'passport', 'luggage', 'sightseeing', 'landmark', 'culture', 'tradition', 'local', 'guide', 'tour', 'excursion', 'beach', 'mountain', 'city', 'countryside', 'experience', 'memory', 'photography', 'souvenir', 'itinerary', 'booking', 'accommodation', 'transportation', 'scenic', 'beautiful', 'exotic', 'remote'],
        titles: ['Ultimate Travel Guide', 'Hidden Gems to Explore', 'Bucket List Destinations', 'Travel Tips for Beginners', 'Cultural Experience Journey', 'Adventure Travel Stories', 'Luxury Resort Review', 'Budget Travel Hacks'],
        phrases: ['explored the city', 'discovered hidden gems', 'experienced local culture', 'captured stunning photos', 'enjoyed the scenery', 'visited famous landmarks', 'tasted authentic cuisine', 'met friendly locals', 'created lasting memories', 'embarked on adventure']
    },
    business: {
        words: ['company', 'strategy', 'growth', 'revenue', 'profit', 'market', 'customer', 'client', 'service', 'product', 'sales', 'marketing', 'management', 'leadership', 'team', 'employee', 'investment', 'finance', 'budget', 'analysis', 'report', 'meeting', 'presentation', 'project', 'goal', 'objective', 'performance', 'success', 'innovation', 'competition', 'industry', 'partnership', 'contract', 'negotiation', 'deal', 'expansion', 'development'],
        titles: ['Quarterly Business Report', 'Strategic Growth Plan', 'Market Analysis Update', 'Leadership Team Announcement', 'New Partnership Agreement', 'Innovation Strategy Launch', 'Financial Performance Review', 'Industry Trends Analysis'],
        phrases: ['exceeded expectations', 'achieved targets', 'improved efficiency', 'increased revenue', 'expanded market share', 'strengthened position', 'delivered results', 'optimized operations', 'enhanced productivity', 'drove innovation']
    },
    fitness: {
        words: ['workout', 'exercise', 'training', 'fitness', 'health', 'strength', 'cardio', 'muscle', 'endurance', 'flexibility', 'nutrition', 'diet', 'protein', 'calories', 'gym', 'equipment', 'weights', 'running', 'cycling', 'swimming', 'yoga', 'stretching', 'recovery', 'rest', 'hydration', 'energy', 'performance', 'goal', 'progress', 'motivation', 'coach', 'trainer', 'routine', 'schedule', 'intensity', 'repetition', 'set', 'form'],
        titles: ['Complete Workout Guide', 'Fitness Transformation Journey', 'Nutrition and Training Tips', 'Strength Building Program', 'Cardio Exercise Routine', 'Healthy Lifestyle Changes', 'Athletic Performance Guide', 'Recovery and Rest Importance'],
        phrases: ['built muscle mass', 'improved endurance', 'increased strength', 'burned calories', 'achieved fitness goals', 'maintained consistency', 'pushed limits', 'stayed motivated', 'tracked progress', 'optimized performance']
    },
    fashion: {
        words: ['style', 'trend', 'design', 'clothing', 'outfit', 'fashion', 'collection', 'designer', 'model', 'runway', 'fabric', 'texture', 'color', 'pattern', 'accessory', 'jewelry', 'shoes', 'bag', 'dress', 'suit', 'casual', 'formal', 'elegant', 'chic', 'modern', 'vintage', 'classic', 'seasonal', 'wardrobe', 'look', 'ensemble', 'statement', 'piece', 'brand', 'luxury', 'boutique', 'shopping'],
        titles: ['Latest Fashion Trends', 'Designer Collection Launch', 'Style Guide for Season', 'Fashion Week Highlights', 'Wardrobe Essentials Guide', 'Accessory Styling Tips', 'Sustainable Fashion Movement', 'Celebrity Style Analysis'],
        phrases: ['perfectly styled', 'elegantly designed', 'beautifully crafted', 'trendsetting look', 'fashion-forward approach', 'timeless elegance', 'bold statement', 'sophisticated style', 'carefully curated', 'expertly tailored']
    },
    science: {
        words: ['research', 'study', 'experiment', 'discovery', 'theory', 'hypothesis', 'data', 'analysis', 'observation', 'method', 'scientist', 'laboratory', 'technology', 'innovation', 'breakthrough', 'evidence', 'result', 'conclusion', 'investigation', 'phenomenon', 'molecule', 'atom', 'cell', 'organism', 'evolution', 'genetics', 'chemistry', 'physics', 'biology', 'astronomy', 'ecology', 'environment', 'climate', 'energy', 'matter', 'force', 'reaction'],
        titles: ['Groundbreaking Research Discovery', 'Scientific Study Results', 'New Theory Proposed', 'Laboratory Experiment Success', 'Environmental Research Update', 'Space Exploration Findings', 'Medical Breakthrough Announced', 'Climate Science Report'],
        phrases: ['conducted experiments', 'analyzed data', 'discovered evidence', 'proved hypothesis', 'advanced understanding', 'revealed insights', 'demonstrated results', 'investigated phenomenon', 'published findings', 'contributed knowledge']
    },
    music: {
        words: ['song', 'melody', 'rhythm', 'harmony', 'beat', 'tempo', 'artist', 'musician', 'band', 'album', 'track', 'concert', 'performance', 'stage', 'audience', 'instrument', 'guitar', 'piano', 'drums', 'vocals', 'lyrics', 'composition', 'recording', 'studio', 'producer', 'genre', 'style', 'sound', 'acoustic', 'electric', 'live', 'tour', 'festival', 'playlist', 'streaming', 'release', 'single'],
        titles: ['New Album Release', 'Concert Tour Announcement', 'Music Festival Lineup', 'Artist Collaboration News', 'Behind the Music Story', 'Chart-Topping Hit Single', 'Live Performance Review', 'Music Industry Trends'],
        phrases: ['performed live', 'released new album', 'topped the charts', 'captivated audience', 'composed masterpiece', 'recorded track', 'showcased talent', 'delivered performance', 'created sound', 'inspired fans']
    }
};

// Text data for different languages
const textData = {
    latin: {
        words: ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat'],
        titles: ['Lorem Ipsum Dolor', 'Consectetur Adipiscing', 'Sed Do Eiusmod', 'Tempor Incididunt', 'Magna Aliqua']
    },
    english: {
        words: ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'amazing', 'beautiful', 'creative', 'dynamic', 'elegant', 'fantastic', 'gorgeous', 'incredible', 'wonderful', 'perfect', 'stunning', 'brilliant', 'excellent', 'magnificent', 'spectacular', 'remarkable', 'outstanding', 'exceptional', 'impressive', 'extraordinary', 'phenomenal', 'marvelous'],
        titles: ['Amazing Product Launch', 'Creative Design Solutions', 'Innovative Technology', 'Perfect User Experience', 'Outstanding Performance']
    },
    spanish: {
        words: ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'ser', 'se', 'no', 'haber', 'por', 'con', 'su', 'para', 'como', 'estar', 'tener', 'le', 'lo', 'todo', 'pero', 'más', 'hacer', 'o', 'poder', 'decir', 'este', 'ir', 'otro', 'ese', 'la', 'si', 'me', 'ya', 'ver', 'porque', 'dar', 'cuando'],
        titles: ['Diseño Increíble', 'Soluciones Creativas', 'Tecnología Innovadora', 'Experiencia Perfecta', 'Rendimiento Excepcional']
    },
    french: {
        words: ['le', 'de', 'un', 'être', 'et', 'à', 'il', 'avoir', 'ne', 'je', 'son', 'que', 'se', 'qui', 'ce', 'dans', 'en', 'du', 'elle', 'au', 'pour', 'pas', 'que', 'vous', 'par', 'sur', 'faire', 'plus', 'dire', 'me', 'on', 'mon', 'lui', 'nous', 'comme', 'mais', 'pouvoir', 'avec', 'tout', 'y'],
        titles: ['Design Magnifique', 'Solutions Créatives', 'Technologie Innovante', 'Expérience Parfaite', 'Performance Exceptionnelle']
    },
    german: {
        words: ['der', 'die', 'und', 'in', 'den', 'von', 'zu', 'das', 'mit', 'sich', 'des', 'auf', 'für', 'ist', 'im', 'dem', 'nicht', 'ein', 'eine', 'als', 'auch', 'es', 'an', 'werden', 'aus', 'er', 'hat', 'dass', 'sie', 'nach', 'wird', 'bei', 'einer', 'um', 'am', 'sind', 'noch', 'wie', 'einem', 'über'],
        titles: ['Erstaunliches Design', 'Kreative Lösungen', 'Innovative Technologie', 'Perfekte Erfahrung', 'Außergewöhnliche Leistung']
    },
    italian: {
        words: ['il', 'di', 'e', 'la', 'che', 'a', 'per', 'un', 'in', 'è', 'non', 'una', 'da', 'con', 'si', 'come', 'io', 'ma', 'dei', 'le', 'del', 'questo', 'alla', 'nel', 'anche', 'più', 'sono', 'essere', 'fare', 'può', 'quando', 'molto', 'tutto', 'cosa', 'dove', 'quale', 'sempre', 'dopo', 'ancora', 'bene'],
        titles: ['Design Incredibile', 'Soluzioni Creative', 'Tecnologia Innovativa', 'Esperienza Perfetta', 'Prestazioni Eccezionali']
    },
    portuguese: {
        words: ['o', 'a', 'de', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'é', 'com', 'não', 'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como', 'mas', 'foi', 'ao', 'ele', 'das', 'tem', 'à', 'seu', 'sua', 'ou', 'ser', 'quando', 'muito', 'há', 'nos', 'já', 'está'],
        titles: ['Design Incrível', 'Soluções Criativas', 'Tecnologia Inovadora', 'Experiência Perfeita', 'Desempenho Excepcional']
    },
    russian: {
        words: ['в', 'и', 'не', 'на', 'я', 'быть', 'он', 'с', 'что', 'а', 'по', 'это', 'она', 'этот', 'к', 'но', 'они', 'мы', 'как', 'из', 'у', 'который', 'то', 'за', 'свой', 'что', 'весь', 'год', 'от', 'так', 'о', 'для', 'ты', 'же', 'все', 'тот', 'мочь', 'вы', 'человек', 'такой'],
        titles: ['Удивительный Дизайн', 'Креативные Решения', 'Инновационные Технологии', 'Идеальный Опыт', 'Исключительная Производительность']
    },
    chinese: {
        words: ['的', '一', '是', '在', '不', '了', '有', '和', '人', '这', '中', '大', '为', '上', '个', '国', '我', '以', '要', '他', '时', '来', '用', '们', '生', '到', '作', '地', '于', '出', '就', '分', '对', '成', '会', '可', '主', '发', '年', '动'],
        titles: ['惊人的设计', '创意解决方案', '创新技术', '完美体验', '卓越性能']
    },
    japanese: {
        words: ['の', 'に', 'は', 'を', 'た', 'が', 'で', 'て', 'と', 'し', 'れ', 'さ', 'ある', 'いる', 'も', 'する', 'から', 'な', 'こと', 'として', 'い', 'や', 'れる', 'など', 'なっ', 'ない', 'この', 'ため', 'その', 'あっ', 'よう', 'また', 'もの', 'という', 'あり', 'まで', 'られ', 'なる', 'へ', 'か'],
        titles: ['素晴らしいデザイン', 'クリエイティブなソリューション', '革新的な技術', '完璧な体験', '優れたパフォーマンス']
    },
    korean: {
        words: ['이', '있', '하', '것', '들', '그', '되', '수', '이', '보', '않', '없', '나', '사람', '주', '아니', '등', '같', '우리', '때', '년', '가', '한', '지', '대하', '오', '말', '일', '그렇', '위하'],
        titles: ['놀라운 디자인', '창의적인 솔루션', '혁신적인 기술', '완벽한 경험', '뛰어난 성능']
    },
    arabic: {
        words: ['في', 'من', 'على', 'إلى', 'أن', 'هذا', 'كان', 'التي', 'هو', 'الذي', 'ما', 'أو', 'كل', 'عن', 'لم', 'قد', 'بعد', 'عند', 'ذلك', 'هي', 'كما', 'أي', 'حتى', 'لا', 'بين', 'ثم', 'إن', 'كانت', 'له', 'مع'],
        titles: ['تصميم مذهل', 'حلول إبداعية', 'تكنولوجيا مبتكرة', 'تجربة مثالية', 'أداء استثنائي']
    },
    hindi: {
        words: ['के', 'का', 'एक', 'में', 'की', 'है', 'यह', 'और', 'से', 'हैं', 'को', 'पर', 'इस', 'होता', 'कि', 'जो', 'कर', 'मे', 'गया', 'करने', 'किया', 'लिये', 'अपने', 'ने', 'बनी', 'नहीं', 'तो', 'ही', 'या', 'हो'],
        titles: ['अद्भुत डिज़ाइन', 'रचनात्मक समाधान', 'नवीन प्रौद्योगिकी', 'सही अनुभव', 'असाधारण प्रदर्शन']
    }
};

// Get DOM elements
const modeSelect = document.getElementById('mode');
const languageSelect = document.getElementById('language');
const topicSelect = document.getElementById('topic');
const languageGroup = document.getElementById('languageGroup');
const topicGroup = document.getElementById('topicGroup');
const textTypeSelect = document.getElementById('textType');
const countInput = document.getElementById('count');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const output = document.getElementById('output');
const notification = document.getElementById('copyNotification');

// Generate topic-based text
function generateTopicText(topic, type, count) {
    const data = topicData[topic];
    let result = '';

    switch(type) {
        case 'title':
            for (let i = 0; i < count; i++) {
                result += data.titles[Math.floor(Math.random() * data.titles.length)] + '\n';
            }
            break;
        
        case 'sentence':
            for (let i = 0; i < count; i++) {
                const wordCount = Math.floor(Math.random() * 8) + 6;
                let sentence = 'The ';
                
                // Add topic-specific words and phrases
                for (let j = 0; j < wordCount; j++) {
                    if (j > 0 && Math.random() > 0.7 && data.phrases) {
                        sentence += data.phrases[Math.floor(Math.random() * data.phrases.length)] + ' ';
                        j += 2; // Skip a few iterations since phrase is multiple words
                    } else {
                        sentence += data.words[Math.floor(Math.random() * data.words.length)] + ' ';
                    }
                }
                sentence = sentence.trim() + '.';
                result += sentence.charAt(0).toUpperCase() + sentence.slice(1) + '\n';
            }
            break;
        
        case 'paragraph':
            const sentenceCount = Math.floor(Math.random() * 3) + 4;
            for (let i = 0; i < sentenceCount; i++) {
                const wordCount = Math.floor(Math.random() * 10) + 8;
                let sentence = '';
                
                for (let j = 0; j < wordCount; j++) {
                    if (j > 3 && Math.random() > 0.6 && data.phrases) {
                        sentence += data.phrases[Math.floor(Math.random() * data.phrases.length)] + ' ';
                        j += 2;
                    } else {
                        sentence += data.words[Math.floor(Math.random() * data.words.length)] + ' ';
                    }
                }
                sentence = sentence.trim() + '. ';
                result += sentence.charAt(0).toUpperCase() + sentence.slice(1);
            }
            break;
        
        case 'paragraphs':
            for (let p = 0; p < count; p++) {
                const sentenceCount = Math.floor(Math.random() * 3) + 4;
                for (let i = 0; i < sentenceCount; i++) {
                    const wordCount = Math.floor(Math.random() * 10) + 8;
                    let sentence = '';
                    
                    for (let j = 0; j < wordCount; j++) {
                        if (j > 3 && Math.random() > 0.6 && data.phrases) {
                            sentence += data.phrases[Math.floor(Math.random() * data.phrases.length)] + ' ';
                            j += 2;
                        } else {
                            sentence += data.words[Math.floor(Math.random() * data.words.length)] + ' ';
                        }
                    }
                    sentence = sentence.trim() + '. ';
                    result += sentence.charAt(0).toUpperCase() + sentence.slice(1);
                }
                result += '\n\n';
            }
            break;
    }

    return result.trim();
}

// Generate random text
function generateText(language, type, count) {
    const data = textData[language];
    let result = '';

    switch(type) {
        case 'title':
            for (let i = 0; i < count; i++) {
                result += data.titles[Math.floor(Math.random() * data.titles.length)] + '\n';
            }
            break;
        
        case 'sentence':
            for (let i = 0; i < count; i++) {
                const wordCount = Math.floor(Math.random() * 10) + 5;
                let sentence = '';
                for (let j = 0; j < wordCount; j++) {
                    sentence += data.words[Math.floor(Math.random() * data.words.length)] + ' ';
                }
                sentence = sentence.trim().charAt(0).toUpperCase() + sentence.slice(1) + '.';
                result += sentence + '\n';
            }
            break;
        
        case 'paragraph':
            const sentenceCount = Math.floor(Math.random() * 3) + 3;
            for (let i = 0; i < sentenceCount; i++) {
                const wordCount = Math.floor(Math.random() * 10) + 8;
                let sentence = '';
                for (let j = 0; j < wordCount; j++) {
                    sentence += data.words[Math.floor(Math.random() * data.words.length)] + ' ';
                }
                sentence = sentence.trim().charAt(0).toUpperCase() + sentence.slice(1) + '. ';
                result += sentence;
            }
            break;
        
        case 'paragraphs':
            for (let p = 0; p < count; p++) {
                const sentenceCount = Math.floor(Math.random() * 3) + 3;
                for (let i = 0; i < sentenceCount; i++) {
                    const wordCount = Math.floor(Math.random() * 10) + 8;
                    let sentence = '';
                    for (let j = 0; j < wordCount; j++) {
                        sentence += data.words[Math.floor(Math.random() * data.words.length)] + ' ';
                    }
                    sentence = sentence.trim().charAt(0).toUpperCase() + sentence.slice(1) + '. ';
                    result += sentence;
                }
                result += '\n\n';
            }
            break;
    }

    return result.trim();
}

// Toggle between random and topic mode
modeSelect.addEventListener('change', () => {
    if (modeSelect.value === 'topic') {
        languageGroup.style.display = 'none';
        topicGroup.style.display = 'flex';
    } else {
        languageGroup.style.display = 'flex';
        topicGroup.style.display = 'none';
    }
});

// Event listeners
generateBtn.addEventListener('click', () => {
    const mode = modeSelect.value;
    const type = textTypeSelect.value;
    const count = parseInt(countInput.value);
    
    let generatedText;
    if (mode === 'topic') {
        const topic = topicSelect.value;
        generatedText = generateTopicText(topic, type, count);
    } else {
        const language = languageSelect.value;
        generatedText = generateText(language, type, count);
    }
    
    output.value = generatedText;
});

copyBtn.addEventListener('click', () => {
    if (output.value) {
        output.select();
        document.execCommand('copy');
        
        // Show notification
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
});

// Generate initial text
window.addEventListener('load', () => {
    output.value = generateText('latin', 'paragraph', 3);
});
