// Additional sample lessons - Copy these to data.js to expand content

// More Level 0 Lessons
const LEVEL_0_ADDITIONAL = [
    {
        id: 3,
        title: "Numbers 1-20",
        content: `
            <h3>Learning Numbers 🔢</h3>
            <p>Numbers help us count, tell time, and understand prices!</p>
            
            <h4>Numbers 1-10:</h4>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin: 1rem 0;">
                <div style="text-align: center; padding: 1rem; background: #e3f2fd; border-radius: 5px;">
                    <div style="font-size: 2rem;">1</div>
                    <div>one</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: #e3f2fd; border-radius: 5px;">
                    <div style="font-size: 2rem;">2</div>
                    <div>two</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: #e3f2fd; border-radius: 5px;">
                    <div style="font-size: 2rem;">3</div>
                    <div>three</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: #e3f2fd; border-radius: 5px;">
                    <div style="font-size: 2rem;">4</div>
                    <div>four</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: #e3f2fd; border-radius: 5px;">
                    <div style="font-size: 2rem;">5</div>
                    <div>five</div>
                </div>
            </div>
            
            <h4>Numbers 11-20:</h4>
            <p>11 (eleven), 12 (twelve), 13 (thirteen), 14 (fourteen), 15 (fifteen)</p>
            <p>16 (sixteen), 17 (seventeen), 18 (eighteen), 19 (nineteen), 20 (twenty)</p>
            
            <div style="background: #fff3cd; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
                <strong>💡 Practice:</strong> Count from 1 to 20 out loud three times!
            </div>
        `,
        vocabulary: [
            { word: "One", pronunciation: "/wʌn/", meaning: "Number 1" },
            { word: "Five", pronunciation: "/faɪv/", meaning: "Number 5" },
            { word: "Ten", pronunciation: "/tɛn/", meaning: "Number 10" },
            { word: "Twenty", pronunciation: "/ˈtwɛnti/", meaning: "Number 20" }
        ],
        quiz: [
            {
                question: "What comes after 'five'?",
                options: ["four", "six", "seven", "eight"],
                correct: 1
            },
            {
                question: "How many fingers do you have?",
                options: ["five", "ten", "fifteen", "twenty"],
                correct: 1
            },
            {
                question: "What number is this: 'thirteen'?",
                options: ["3", "13", "30", "31"],
                correct: 1
            }
        ]
    },
    {
        id: 4,
        title: "Colors",
        content: `
            <h3>Learning Colors 🎨</h3>
            <p>Colors make our world beautiful! Let's learn the basic colors.</p>
            
            <h4>Primary Colors:</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0;">
                <div style="background: red; color: white; padding: 2rem; text-align: center; border-radius: 10px;">
                    <strong>RED</strong>
                </div>
                <div style="background: blue; color: white; padding: 2rem; text-align: center; border-radius: 10px;">
                    <strong>BLUE</strong>
                </div>
                <div style="background: yellow; color: black; padding: 2rem; text-align: center; border-radius: 10px;">
                    <strong>YELLOW</strong>
                </div>
            </div>
            
            <h4>More Colors:</h4>
            <ul>
                <li><strong style="color: green;">Green</strong> - like grass and trees</li>
                <li><strong style="color: orange;">Orange</strong> - like oranges</li>
                <li><strong style="color: purple;">Purple</strong> - like grapes</li>
                <li><strong style="color: black;">Black</strong> - like night</li>
                <li><strong style="color: gray;">White</strong> - like snow</li>
            </ul>
            
            <h4>Asking About Colors:</h4>
            <p><strong>Question:</strong> "What color is this?"</p>
            <p><strong>Answer:</strong> "It is red." / "This is blue."</p>
        `,
        vocabulary: [
            { word: "Red", pronunciation: "/rɛd/", meaning: "The color of blood" },
            { word: "Blue", pronunciation: "/bluː/", meaning: "The color of the sky" },
            { word: "Green", pronunciation: "/ɡriːn/", meaning: "The color of grass" },
            { word: "Yellow", pronunciation: "/ˈjɛloʊ/", meaning: "The color of the sun" }
        ],
        quiz: [
            {
                question: "What color is the sky?",
                options: ["Red", "Blue", "Green", "Yellow"],
                correct: 1
            },
            {
                question: "What color is grass?",
                options: ["Red", "Blue", "Green", "Yellow"],
                correct: 2
            },
            {
                question: "Complete: 'The sun is ___.'",
                options: ["red", "blue", "green", "yellow"],
                correct: 3
            }
        ]
    }
];
