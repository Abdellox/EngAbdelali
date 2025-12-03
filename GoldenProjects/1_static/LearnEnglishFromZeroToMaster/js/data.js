// Learning levels configuration
const LEVELS = [
    {
        id: 0,
        name: "Level 0: Absolute Beginner",
        description: "Alphabet, basic words, simple greetings",
        badge: "🌱",
        color: "level-0",
        lessons: 10
    },
    {
        id: 1,
        name: "Level 1: Beginner",
        description: "Basic grammar, simple sentences, daily conversations",
        badge: "🌿",
        color: "level-1",
        lessons: 15
    },
    {
        id: 2,
        name: "Level 2: Elementary",
        description: "Expand vocabulary, complex sentences, basic reading",
        badge: "🌳",
        color: "level-2",
        lessons: 20
    },
    {
        id: 3,
        name: "Level 3: Intermediate",
        description: "Complex sentences, tenses, writing paragraphs",
        badge: "🎯",
        color: "level-3",
        lessons: 25
    },
    {
        id: 4,
        name: "Level 4: Upper-Intermediate",
        description: "Advanced grammar, idioms, conversational practice",
        badge: "🚀",
        color: "level-4",
        lessons: 30
    },
    {
        id: 5,
        name: "Level 5: Advanced",
        description: "Fluency, comprehension, formal writing",
        badge: "⭐",
        color: "level-5",
        lessons: 35
    },
    {
        id: 6,
        name: "Level 6: Master",
        description: "Native-level proficiency, debates, literature",
        badge: "👑",
        color: "level-6",
        lessons: 40
    }
];

// Level 0 Lessons
const LEVEL_0_LESSONS = [
    {
        id: 1,
        title: "The English Alphabet",
        content: `
            <h3>Welcome to English! 🎉</h3>
            <p>Let's start with the foundation - the English alphabet has 26 letters.</p>
            <h4>Uppercase Letters:</h4>
            <p style="font-size: 1.5rem; letter-spacing: 5px;">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
            <h4>Lowercase Letters:</h4>
            <p style="font-size: 1.5rem; letter-spacing: 5px;">a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
            <h4>Vowels (Special Letters):</h4>
            <p>A, E, I, O, U - These are vowels. Every word needs at least one vowel!</p>
        `,
        vocabulary: [
            { word: "Hello", pronunciation: "/həˈloʊ/", meaning: "A greeting" },
            { word: "Yes", pronunciation: "/jɛs/", meaning: "Affirmative answer" },
            { word: "No", pronunciation: "/noʊ/", meaning: "Negative answer" },
            { word: "Thank you", pronunciation: "/θæŋk juː/", meaning: "Expression of gratitude" }
        ],
        quiz: [
            {
                question: "How many letters are in the English alphabet?",
                options: ["20", "26", "30", "24"],
                correct: 1
            },
            {
                question: "Which of these is a vowel?",
                options: ["B", "C", "E", "F"],
                correct: 2
            }
        ]
    },
    {
        id: 2,
        title: "Basic Greetings",
        content: `
            <h3>How to Greet People 👋</h3>
            <p>Greetings are the first words you use when meeting someone.</p>
            <h4>Common Greetings:</h4>
            <ul>
                <li><strong>Hello</strong> - General greeting (any time)</li>
                <li><strong>Good morning</strong> - Before 12 PM</li>
                <li><strong>Good afternoon</strong> - 12 PM to 6 PM</li>
                <li><strong>Good evening</strong> - After 6 PM</li>
                <li><strong>Hi</strong> - Informal greeting</li>
            </ul>
            <h4>Responses:</h4>
            <p>When someone greets you, you can say the same greeting back!</p>
        `,
        vocabulary: [
            { word: "Morning", pronunciation: "/ˈmɔːrnɪŋ/", meaning: "Early part of the day" },
            { word: "Afternoon", pronunciation: "/ˌæftərˈnuːn/", meaning: "Middle part of the day" },
            { word: "Evening", pronunciation: "/ˈiːvnɪŋ/", meaning: "Late part of the day" },
            { word: "Goodbye", pronunciation: "/ɡʊdˈbaɪ/", meaning: "Farewell" }
        ],
        quiz: [
            {
                question: "What greeting do you use at 10 AM?",
                options: ["Good evening", "Good morning", "Good night", "Good afternoon"],
                correct: 1
            }
        ]
    }
];

// Level 1 Lessons
const LEVEL_1_LESSONS = [
    {
        id: 1,
        title: "Personal Pronouns",
        content: `
            <h3>Understanding Pronouns 👤</h3>
            <p>Pronouns replace names. Instead of saying "John is happy," we say "He is happy."</p>
            <h4>Subject Pronouns:</h4>
            <ul>
                <li><strong>I</strong> - yourself</li>
                <li><strong>You</strong> - the person you're talking to</li>
                <li><strong>He</strong> - a male person</li>
                <li><strong>She</strong> - a female person</li>
                <li><strong>It</strong> - a thing or animal</li>
                <li><strong>We</strong> - you and other people</li>
                <li><strong>They</strong> - other people or things</li>
            </ul>
            <h4>Examples:</h4>
            <p>I am a student. / You are kind. / She is happy.</p>
        `,
        vocabulary: [
            { word: "Student", pronunciation: "/ˈstuːdənt/", meaning: "A person who studies" },
            { word: "Teacher", pronunciation: "/ˈtiːtʃər/", meaning: "A person who teaches" },
            { word: "Friend", pronunciation: "/frɛnd/", meaning: "A person you like" },
            { word: "Family", pronunciation: "/ˈfæməli/", meaning: "Parents, siblings, relatives" }
        ],
        quiz: [
            {
                question: "Which pronoun replaces 'Mary'?",
                options: ["He", "She", "It", "They"],
                correct: 1
            },
            {
                question: "Complete: ___ am learning English.",
                options: ["He", "I", "They", "She"],
                correct: 1
            }
        ]
    }
];

// Dictionary data
const DICTIONARY = {
    "hello": {
        word: "hello",
        pronunciation: "/həˈloʊ/",
        partOfSpeech: "interjection",
        definition: "Used as a greeting or to begin a conversation",
        examples: ["Hello, how are you?", "She said hello to everyone."],
        synonyms: ["hi", "greetings", "hey"]
    },
    "book": {
        word: "book",
        pronunciation: "/bʊk/",
        partOfSpeech: "noun",
        definition: "A written or printed work consisting of pages",
        examples: ["I'm reading a book.", "This book is interesting."],
        synonyms: ["volume", "publication", "text"]
    }
};

// Grammar topics
const GRAMMAR_TOPICS = [
    {
        id: 1,
        title: "Present Simple Tense",
        level: 1,
        content: `
            <h3>Present Simple Tense</h3>
            <p>Used for habits, facts, and general truths.</p>
            <h4>Structure:</h4>
            <p><strong>Subject + Verb (+ s/es for he/she/it)</strong></p>
            <h4>Examples:</h4>
            <ul>
                <li>I work every day.</li>
                <li>She works in an office.</li>
                <li>They play football.</li>
            </ul>
            <h4>Negative:</h4>
            <p>Subject + do/does + not + verb</p>
            <p>Example: I do not (don't) like coffee.</p>
            <h4>Question:</h4>
            <p>Do/Does + subject + verb?</p>
            <p>Example: Do you speak English?</p>
        `
    },
    {
        id: 2,
        title: "Articles: A, An, The",
        level: 1,
        content: `
            <h3>Articles</h3>
            <p>Articles are small words that come before nouns.</p>
            <h4>A / An (Indefinite Articles):</h4>
            <ul>
                <li><strong>A</strong> - before consonant sounds: a book, a car</li>
                <li><strong>An</strong> - before vowel sounds: an apple, an hour</li>
            </ul>
            <h4>The (Definite Article):</h4>
            <p>Used for specific things: the book (a specific book we know)</p>
            <h4>Examples:</h4>
            <ul>
                <li>I have a dog. (any dog)</li>
                <li>The dog is brown. (the specific dog I mentioned)</li>
            </ul>
        `
    }
];
