// WisdomWell - Complete Working Data Structure

const wisdomData = {
    categories: [
        {
            id: 'life-lessons',
            name: 'Life Lessons',
            icon: '🌱',
            description: 'Fundamental truths about living well'
        },
        {
            id: 'relationships',
            name: 'Relationships',
            icon: '❤️',
            description: 'Building meaningful connections'
        },
        {
            id: 'patience',
            name: 'Patience',
            icon: '⏳',
            description: 'The art of waiting wisely'
        },
        {
            id: 'decision-making',
            name: 'Decision Making',
            icon: '🤔',
            description: 'Choosing your path thoughtfully'
        },
        {
            id: 'happiness',
            name: 'Happiness',
            icon: '😊',
            description: 'Finding joy in everyday moments'
        },
        {
            id: 'resilience',
            name: 'Resilience',
            icon: '💪',
            description: 'Bouncing back from adversity'
        },
        {
            id: 'wisdom-courage',
            name: 'Courage & Strength',
            icon: '🦁',
            description: 'Finding bravery in difficult times'
        },
        {
            id: 'gratitude',
            name: 'Gratitude',
            icon: '🙏',
            description: 'Appreciating what we have'
        },
        {
            id: 'knowledge',
            name: 'Knowledge & Learning',
            icon: '📚',
            description: 'The pursuit of wisdom and understanding'
        },
        {
            id: 'peace',
            name: 'Peace & Harmony',
            icon: '☮️',
            description: 'Finding inner calm and balance'
        },
        {
            id: 'asian-wisdom',
            name: 'Asian Wisdom',
            icon: '🏮',
            description: 'Ancient wisdom from Asia'
        },
        {
            id: 'african-wisdom',
            name: 'African Wisdom',
            icon: '🌍',
            description: 'Proverbs from African cultures'
        }
    ],

    wisdom: {
        'life-lessons': [
            {
                text: "Life is not about waiting for the storm to pass, but learning to dance in the rain.",
                author: "Elder Thomas",
                type: "quote"
            },
            {
                text: "Every mistake is a lesson in disguise. The key is to recognize the lesson before repeating the mistake.",
                author: "Grandma Rose",
                type: "lesson"
            },
            {
                text: "The best time to plant a tree was 20 years ago. The second best time is now.",
                author: "Elder Thomas",
                type: "quote"
            },
            {
                text: "Your character is built not in moments of comfort, but in times of challenge and adversity.",
                author: "Grandma Rose",
                type: "lesson"
            }
        ],
        'relationships': [
            {
                text: "Listen with the intent to understand, not with the intent to reply.",
                author: "Elder Thomas",
                type: "advice"
            },
            {
                text: "A strong relationship requires choosing to love each other even in those moments when you struggle to like each other.",
                author: "Grandma Rose",
                type: "lesson"
            },
            {
                text: "The quality of your relationships determines the quality of your life.",
                author: "Elder Thomas",
                type: "quote"
            },
            {
                text: "Forgiveness is not about forgetting. It's about letting go of the hurt.",
                author: "Grandma Rose",
                type: "advice"
            }
        ],
        'patience': [
            {
                text: "Patience is not the ability to wait, but the ability to keep a good attitude while waiting.",
                author: "Grandma Rose",
                type: "lesson"
            },
            {
                text: "Good things come to those who wait, but better things come to those who work while they wait.",
                author: "Elder Thomas",
                type: "quote"
            },
            {
                text: "In a world of instant gratification, patience has become a superpower.",
                author: "Grandma Rose",
                type: "advice"
            }
        ],
        'decision-making': [
            {
                text: "When faced with two choices, simply toss a coin. It works not because it settles the question, but because in that brief moment when the coin is in the air, you suddenly know what you're hoping for.",
                author: "Elder Thomas",
                type: "lesson"
            },
            {
                text: "The hardest decisions in life aren't between good and bad, but between good and good.",
                author: "Grandma Rose",
                type: "quote"
            },
            {
                text: "Never make permanent decisions based on temporary emotions.",
                author: "Elder Thomas",
                type: "advice"
            }
        ],
        'happiness': [
            {
                text: "Happiness is not something you postpone for the future; it is something you design for the present.",
                author: "Grandma Rose",
                type: "lesson"
            },
            {
                text: "The secret to happiness is not in doing what you like, but in liking what you do.",
                author: "Elder Thomas",
                type: "quote"
            },
            {
                text: "Gratitude turns what we have into enough.",
                author: "Grandma Rose",
                type: "advice"
            }
        ],
        'resilience': [
            {
                text: "Fall seven times, stand up eight. That's the spirit of resilience.",
                author: "Elder Thomas",
                type: "quote"
            },
            {
                text: "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
                author: "Grandma Rose",
                type: "lesson"
            },
            {
                text: "The oak tree fought the wind and was broken. The willow bent and survived.",
                author: "Elder Thomas",
                type: "advice"
            }
        ],
        'wisdom-courage': [
            {
                text: "Courage is not the absence of fear, but rather the judgment that something else is more important than fear.",
                author: "Elder Thomas",
                type: "quote"
            },
            {
                text: "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.",
                author: "Grandma Rose",
                type: "lesson"
            },
            {
                text: "The brave man is not he who does not feel afraid, but he who conquers that fear.",
                author: "Elder Thomas",
                type: "advice"
            }
        ],
        'gratitude': [
            {
                text: "Gratitude is not only the greatest of virtues, but the parent of all others.",
                author: "Elder Thomas",
                type: "quote"
            },
            {
                text: "When you are grateful, fear disappears and abundance appears.",
                author: "Grandma Rose",
                type: "lesson"
            },
            {
                text: "The more grateful I am, the more beauty I see.",
                author: "Elder Thomas",
                type: "advice"
            }
        ],
        'knowledge': [
            {
                text: "The only true wisdom is in knowing you know nothing.",
                author: "Elder Thomas",
                type: "quote"
            },
            {
                text: "An investment in knowledge pays the best interest.",
                author: "Grandma Rose",
                type: "lesson"
            },
            {
                text: "The beautiful thing about learning is that no one can take it away from you.",
                author: "Elder Thomas",
                type: "advice"
            }
        ],
        'peace': [
            {
                text: "Peace comes from within. Do not seek it without.",
                author: "Elder Thomas",
                type: "quote"
            },
            {
                text: "If you want to make peace with your enemy, you have to work with your enemy. Then he becomes your partner.",
                author: "Grandma Rose",
                type: "lesson"
            },
            {
                text: "Peace begins with a smile.",
                author: "Elder Thomas",
                type: "advice"
            }
        ],
        'asian-wisdom': [
            {
                text: "A diamond with a flaw is worth more than a pebble without imperfections.",
                author: "Elder Thomas",
                type: "quote"
            },
            {
                text: "The bamboo that bends is stronger than the oak that resists.",
                author: "Grandma Rose",
                type: "lesson"
            },
            {
                text: "When the winds of change blow, some people build walls and others build windmills.",
                author: "Elder Thomas",
                type: "advice"
            },
            {
                text: "Fall seven times, stand up eight.",
                author: "Grandma Rose",
                type: "quote"
            }
        ],
        'african-wisdom': [
            {
                text: "If you want to go fast, go alone. If you want to go far, go together.",
                author: "Elder Thomas",
                type: "quote"
            },
            {
                text: "However long the night, the dawn will break.",
                author: "Grandma Rose",
                type: "lesson"
            },
            {
                text: "It takes a village to raise a child.",
                author: "Elder Thomas",
                type: "advice"
            },
            {
                text: "When there is no enemy within, the enemies outside cannot hurt you.",
                author: "Grandma Rose",
                type: "quote"
            }
        ]
    },

    stories: [
        {
            id: 1,
            title: "The Two Wolves",
            narrator: "Elder Thomas",
            avatar: "👴",
            preview: "A grandfather teaches his grandson about the battle within...",
            content: `
                <div class="dialog-message">
                    <p>An old Cherokee told his grandson, "My son, there is a battle between two wolves inside us all.</p>
                    <p>One is Evil. It is anger, jealousy, greed, resentment, inferiority, lies, and ego.</p>
                    <p>The other is Good. It is joy, peace, love, hope, humility, kindness, empathy, and truth."</p>
                    <p>The boy thought about it and asked, "Grandfather, which wolf wins?"</p>
                    <p>The old man quietly replied, "The one you feed."</p>
                </div>
                <div class="dialog-message">
                    <strong>The Lesson:</strong>
                    <p>Every day, we make choices about which thoughts and emotions we nurture. Your character is shaped by what you choose to feed with your attention and energy. Choose wisely.</p>
                </div>
            `
        },
        {
            id: 2,
            title: "The Cracked Pot",
            narrator: "Grandma Rose",
            avatar: "👵",
            preview: "A water bearer discovers beauty in imperfection...",
            content: `
                <div class="dialog-message">
                    <p>A water bearer had two large pots. One was perfect, the other had a crack. Every day, by the time he reached his master's house, the cracked pot had leaked half its water.</p>
                    <p>For two years this went on. The perfect pot was proud of its accomplishments. The cracked pot was ashamed of its imperfection.</p>
                    <p>One day, the cracked pot spoke to the water bearer: "I am ashamed of myself, and I want to apologize to you."</p>
                    <p>The water bearer smiled. "Did you notice that there were flowers only on your side of the path? I planted flower seeds on your side, and every day while we walk back, you've watered them. Without you being just the way you are, he would not have this beauty to grace his house."</p>
                </div>
                <div class="dialog-message">
                    <strong>The Lesson:</strong>
                    <p>Each of us has our own unique flaws. We're all cracked pots. But it's the cracks and flaws we each have that make our lives together so very interesting and rewarding. Don't be afraid of your imperfections—they might be creating beauty you can't even see.</p>
                </div>
            `
        },
        {
            id: 3,
            title: "The Starfish Story",
            narrator: "Elder Thomas",
            avatar: "👴",
            preview: "One person can make a difference...",
            content: `
                <div class="dialog-message">
                    <p>An old man walked along a beach at dawn. In the distance, he saw a young woman picking up starfish and throwing them back into the sea.</p>
                    <p>He approached her and asked why she was doing this. She replied, "The tide has washed them up onto the beach, and they can't return to the sea by themselves. When the sun gets high, they will die."</p>
                    <p>The old man looked at the miles of beach stretching in both directions. Thousands of starfish lay stranded. "But there must be tens of thousands of starfish on this beach," he said. "You can't possibly save them all. What difference can you make?"</p>
                    <p>The young woman bent down, picked up another starfish, and threw it back into the ocean. She smiled and said, "I made a difference to that one."</p>
                </div>
                <div class="dialog-message">
                    <strong>The Lesson:</strong>
                    <p>Don't let the magnitude of the world's problems paralyze you. You may not be able to change everything, but you can change something. Every act of kindness matters. Start where you are, use what you have, do what you can.</p>
                </div>
            `
        },
        {
            id: 4,
            title: "The Wise Judge",
            narrator: "Grandma Rose",
            avatar: "👵",
            preview: "Wisdom reveals the truth through clever testing...",
            content: `
                <div class="dialog-message">
                    <p>Two women came before a wise judge, each claiming to be the mother of the same baby.</p>
                    <p>The first woman said, "Your Honor, this is my child. She stole him from me!"</p>
                    <p>The second woman protested, "No! The baby is mine. She's lying!"</p>
                    <p>The judge listened to both women argue, but could not determine who was telling the truth.</p>
                    <p>Finally, he said, "Since both of you claim this child, I will cut the baby in half and give each of you an equal share."</p>
                    <p>The first woman immediately cried out, "No! Please don't hurt the child! Give him to her. I'd rather he live with her than die!"</p>
                    <p>The second woman said, "Yes, cut him in half. If I can't have him, neither should she!"</p>
                    <p>The judge immediately gave the baby to the first woman, saying, "A true mother would rather give up her child than see him harmed. You have revealed yourself through your love."</p>
                </div>
                <div class="dialog-message">
                    <strong>The Lesson:</strong>
                    <p>True love is selfless and puts the welfare of the beloved above personal desires. Wisdom can reveal truth by testing people's real motivations. Those who truly care will sacrifice their own interests for the good of others.</p>
                </div>
            `
        }
    ],

    qaResponses: {
        keywords: {
            'love': [
                { text: "Love is not just a feeling, my dear. It's a choice you make every day. Choose to be kind, patient, and understanding, even when it's difficult.", author: "Grandma Rose", avatar: "👵" },
                { text: "True love isn't about finding someone perfect. It's about seeing an imperfect person perfectly.", author: "Elder Thomas", avatar: "👴" }
            ],
            'fear': [
                { text: "Fear is natural, but don't let it be your master. Acknowledge it, understand it, then do what you need to do anyway. Courage isn't the absence of fear—it's action in spite of it.", author: "Elder Thomas", avatar: "👴" },
                { text: "I've learned that fear often grows in the darkness of uncertainty. Shine the light of knowledge on it, and it shrinks.", author: "Grandma Rose", avatar: "👵" }
            ],
            'failure': [
                { text: "Failure is not the opposite of success; it's a stepping stone to it. Every successful person has failed many times. The difference is they didn't stop.", author: "Grandma Rose", avatar: "👵" },
                { text: "I've failed more times than I can count. But each failure taught me something valuable. Don't fear failure—fear not trying.", author: "Elder Thomas", avatar: "👴" }
            ],
            'success': [
                { text: "Success isn't measured by wealth or status. It's measured by the positive impact you have on others and the peace you feel within yourself.", author: "Elder Thomas", avatar: "👴" },
                { text: "Real success is when you can look back on your life and say you lived with integrity, loved deeply, and made a difference.", author: "Grandma Rose", avatar: "👵" }
            ],
            'change': [
                { text: "Change is the only constant in life. Instead of resisting it, learn to dance with it. Flexibility is strength.", author: "Grandma Rose", avatar: "👵" },
                { text: "The people who adapt to change are the ones who thrive. Don't cling to the past—embrace the possibilities of tomorrow.", author: "Elder Thomas", avatar: "👴" }
            ],
            'time': [
                { text: "Time is the most precious resource you have. Spend it wisely on things and people that truly matter.", author: "Elder Thomas", avatar: "👴" },
                { text: "You can't buy more time, but you can choose how to use what you have. Make every moment count.", author: "Grandma Rose", avatar: "👵" }
            ],
            'family': [
                { text: "Family isn't always blood. It's the people who love you, support you, and stand by you no matter what.", author: "Grandma Rose", avatar: "👵" },
                { text: "Cherish your family. In the end, they're what matters most. Success means nothing if you have no one to share it with.", author: "Elder Thomas", avatar: "👴" }
            ],
            'work': [
                { text: "Find work that gives you purpose, not just a paycheck. When you love what you do, it doesn't feel like work.", author: "Elder Thomas", avatar: "👴" },
                { text: "Work hard, but don't forget to live. Balance is the key to a fulfilling life.", author: "Grandma Rose", avatar: "👵" }
            ]
        },
        default: [
            { text: "That's a thoughtful question. Remember, wisdom comes from reflection and experience. Take time to think deeply about what truly matters to you.", author: "Elder Thomas", avatar: "👴" },
            { text: "Life's questions rarely have simple answers, dear. But asking the question is the first step toward understanding. Keep seeking, keep learning.", author: "Grandma Rose", avatar: "👵" },
            { text: "In my years, I've learned that the best answers come from within. Listen to your heart, but let your mind guide you.", author: "Elder Thomas", avatar: "👴" },
            { text: "Every challenge you face is an opportunity to grow. Trust yourself, be patient, and remember that you're stronger than you think.", author: "Grandma Rose", avatar: "👵" }
        ]
    },

    characterDialogs: {
        thomas: [
            "Welcome, my friend. I'm Elder Thomas. I've walked this earth for seven decades, and I've learned that life's greatest lessons often come from its hardest moments.",
            "You know, when I was young, I thought I knew everything. Now that I'm old, I realize how much there is still to learn. That's the beauty of life—it never stops teaching.",
            "The secret to a good life? It's simpler than you think: be kind, work hard, love deeply, and never stop growing.",
            "Remember, every person you meet knows something you don't. Stay humble, stay curious, and you'll never stop growing wiser."
        ],
        rose: [
            "Hello, dear. I'm Grandma Rose. Life has given me many gifts—some wrapped in joy, others in challenge. Both have made me who I am today.",
            "I've learned that the most important things in life aren't things at all. They're moments, memories, and the people we share them with.",
            "Wisdom isn't about having all the answers. It's about asking the right questions and being open to learning from everyone and everything.",
            "My dear, life is too short to hold grudges, too precious to waste on worry, and too beautiful not to celebrate every single day."
        ]
    }
};