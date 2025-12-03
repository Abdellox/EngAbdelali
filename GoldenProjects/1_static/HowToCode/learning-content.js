// Complete learning content with lessons, resources, and validation tests
const learningContent = {
    cpp: {
        level1: {
            modules: [
                {
                    id: 'cpp-l1-m1',
                    title: 'Getting Started with C++',
                    lessons: [
                        {
                            id: 'lesson-1',
                            title: 'What is C++ and Why Learn It?',
                            content: `
                                <h3>Welcome to C++ Programming!</h3>
                                <p>C++ is a powerful, high-performance programming language created by Bjarne Stroustrup in 1979.</p>
                                
                                <h4>Why Learn C++?</h4>
                                <ul>
                                    <li><strong>Performance:</strong> C++ is one of the fastest programming languages</li>
                                    <li><strong>Control:</strong> Direct memory management and hardware control</li>
                                    <li><strong>Versatility:</strong> Used in games, operating systems, browsers, databases</li>
                                    <li><strong>Foundation:</strong> Understanding C++ makes learning other languages easier</li>
                                    <li><strong>Career:</strong> High-paying jobs in game development, finance, systems programming</li>
                                </ul>
                                
                                <h4>What Can You Build with C++?</h4>
                                <ul>
                                    <li>Video games (Unreal Engine, Unity backend)</li>
                                    <li>Operating systems (Windows, Linux, macOS)</li>
                                    <li>Web browsers (Chrome, Firefox)</li>
                                    <li>Databases (MySQL, MongoDB)</li>
                                    <li>Graphics applications (Adobe Photoshop)</li>
                                    <li>Embedded systems and IoT devices</li>
                                </ul>
                            `,
                            resources: [
                                { type: 'video', title: 'C++ in 100 Seconds', url: 'https://www.youtube.com/watch?v=MNeX4EGtR5Y' },
                                { type: 'article', title: 'C++ Official Documentation', url: 'https://cplusplus.com/doc/tutorial/' },
                                { type: 'interactive', title: 'Try C++ Online', url: 'https://www.programiz.com/cpp-programming/online-compiler/' }
                            ]
                        },
                        {
                            id: 'lesson-2',
                            title: 'Setting Up Your Development Environment',
                            content: `
                                <h3>Installing C++ Compiler and IDE</h3>
                                
                                <h4>Option 1: Visual Studio (Windows - Recommended)</h4>
                                <ol>
                                    <li>Download Visual Studio Community (free) from <a href="https://visualstudio.microsoft.com/" target="_blank">visualstudio.microsoft.com</a></li>
                                    <li>During installation, select "Desktop development with C++"</li>
                                    <li>Launch Visual Studio and create a new C++ Console App</li>
                                </ol>
                                
                                <h4>Option 2: Code::Blocks (Cross-platform)</h4>
                                <ol>
                                    <li>Download from <a href="http://www.codeblocks.org/downloads" target="_blank">codeblocks.org</a></li>
                                    <li>Choose the version with MinGW compiler included</li>
                                    <li>Install and launch Code::Blocks</li>
                                </ol>
                                
                                <h4>Option 3: VS Code (Lightweight)</h4>
                                <ol>
                                    <li>Install VS Code from <a href="https://code.visualstudio.com/" target="_blank">code.visualstudio.com</a></li>
                                    <li>Install C/C++ extension by Microsoft</li>
                                    <li>Install MinGW compiler (Windows) or GCC (Linux/Mac)</li>
                                </ol>
                                
                                <h4>Online Compilers (No Installation)</h4>
                                <ul>
                                    <li><a href="https://www.programiz.com/cpp-programming/online-compiler/" target="_blank">Programiz Online Compiler</a></li>
                                    <li><a href="https://www.onlinegdb.com/online_c++_compiler" target="_blank">OnlineGDB</a></li>
                                    <li><a href="https://replit.com/" target="_blank">Replit</a></li>
                                </ul>
                            `,
                            resources: [
                                { type: 'video', title: 'Install Visual Studio for C++', url: 'https://www.youtube.com/watch?v=1OsGXuNA5cc' },
                                { type: 'video', title: 'Setup VS Code for C++', url: 'https://www.youtube.com/watch?v=DIw02CaEusY' },
                                { type: 'article', title: 'C++ Setup Guide', url: 'https://www.learncpp.com/cpp-tutorial/installing-an-integrated-development-environment-ide/' }
                            ]
                        },
                        {
                            id: 'lesson-3',
                            title: 'Your First C++ Program',
                            content: `
                                <h3>Hello World Program</h3>
                                <p>Let's write your first C++ program!</p>
                                
                                <pre><code class="language-cpp">#include &lt;iostream&gt;
using namespace std;

int main() {
    cout &lt;&lt; "Hello, World!" &lt;&lt; endl;
    return 0;
}</code></pre>
                                
                                <h4>Understanding Each Line:</h4>
                                <ul>
                                    <li><code>#include &lt;iostream&gt;</code> - Includes input/output library for cout</li>
                                    <li><code>using namespace std;</code> - Allows us to use cout without std:: prefix</li>
                                    <li><code>int main()</code> - Main function where program execution begins</li>
                                    <li><code>cout &lt;&lt; "Hello, World!"</code> - Prints text to console</li>
                                    <li><code>endl</code> - Ends the line (like pressing Enter)</li>
                                    <li><code>return 0;</code> - Indicates successful program execution</li>
                                </ul>
                                
                                <h4>Try It Yourself:</h4>
                                <ol>
                                    <li>Open your IDE or online compiler</li>
                                    <li>Type the code above</li>
                                    <li>Save the file as <code>hello.cpp</code></li>
                                    <li>Compile and run the program</li>
                                    <li>You should see "Hello, World!" printed</li>
                                </ol>
                                
                                <h4>Experiment:</h4>
                                <p>Try modifying the program to print your name:</p>
                                <pre><code class="language-cpp">cout &lt;&lt; "Hello, [Your Name]!" &lt;&lt; endl;</code></pre>
                            `,
                            resources: [
                                { type: 'video', title: 'First C++ Program Explained', url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y' },
                                { type: 'interactive', title: 'Practice Hello World', url: 'https://www.programiz.com/cpp-programming/online-compiler/' },
                                { type: 'article', title: 'C++ Hello World Tutorial', url: 'https://www.learncpp.com/cpp-tutorial/introduction-to-iostream-cout-cin-and-endl/' }
                            ]
                        }
                    ],
                    quiz: {
                        passingScore: 70,
                        questions: [
                            {
                                id: 'q1',
                                question: 'What does #include <iostream> do in C++?',
                                options: [
                                    'It includes the input/output library',
                                    'It creates a new file',
                                    'It defines a variable',
                                    'It starts the program'
                                ],
                                correct: 0,
                                explanation: '#include <iostream> includes the input/output stream library, which provides cout for output and cin for input.'
                            },
                            {
                                id: 'q2',
                                question: 'Which function is the entry point of every C++ program?',
                                options: [
                                    'start()',
                                    'begin()',
                                    'main()',
                                    'run()'
                                ],
                                correct: 2,
                                explanation: 'main() is the entry point where program execution begins. Every C++ program must have a main() function.'
                            },
                            {
                                id: 'q3',
                                question: 'What does cout << "Hello" do?',
                                options: [
                                    'Reads input from user',
                                    'Prints "Hello" to console',
                                    'Creates a variable',
                                    'Ends the program'
                                ],
                                correct: 1,
                                explanation: 'cout << outputs text to the console. The << operator sends data to the output stream.'
                            },
                            {
                                id: 'q4',
                                question: 'What does "return 0;" indicate in the main function?',
                                options: [
                                    'The program failed',
                                    'The program executed successfully',
                                    'The program needs to restart',
                                    'The program is paused'
                                ],
                                correct: 1,
                                explanation: 'return 0; indicates successful program execution. Non-zero values typically indicate errors.'
                            },
                            {
                                id: 'q5',
                                question: 'What is the file extension for C++ source files?',
                                options: [
                                    '.c',
                                    '.cpp',
                                    '.java',
                                    '.py'
                                ],
                                correct: 1,
                                explanation: '.cpp is the standard file extension for C++ source files. Some also use .cc or .cxx.'
                            }
                        ]
                    }
                },
                {
                    id: 'cpp-l1-m2',
                    title: 'Variables and Data Types',
                    lessons: [
                        {
                            id: 'lesson-1',
                            title: 'Understanding Variables',
                            content: `
                                <h3>What are Variables?</h3>
                                <p>Variables are containers that store data values. Think of them as labeled boxes where you can store information.</p>
                                
                                <h4>Variable Declaration and Initialization:</h4>
                                <pre><code class="language-cpp">// Declaration (creating a variable)
int age;

// Initialization (assigning a value)
age = 25;

// Declaration + Initialization
int score = 100;
string name = "John";</code></pre>
                                
                                <h4>Variable Naming Rules:</h4>
                                <ul>
                                    <li>Must start with a letter or underscore</li>
                                    <li>Can contain letters, numbers, and underscores</li>
                                    <li>Cannot use C++ keywords (int, return, etc.)</li>
                                    <li>Case-sensitive (age and Age are different)</li>
                                    <li>Use meaningful names (age, not x)</li>
                                </ul>
                                
                                <h4>Good vs Bad Variable Names:</h4>
                                <pre><code class="language-cpp">// Good names
int studentAge;
double accountBalance;
string firstName;

// Bad names
int a;  // Not descriptive
int 2fast;  // Starts with number
int my-var;  // Contains hyphen</code></pre>
                            `,
                            resources: [
                                { type: 'video', title: 'C++ Variables Explained', url: 'https://www.youtube.com/watch?v=zF_kIA1jJkE' },
                                { type: 'article', title: 'Variables in C++', url: 'https://www.learncpp.com/cpp-tutorial/variable-assignment-and-initialization/' }
                            ]
                        },
                        {
                            id: 'lesson-2',
                            title: 'Data Types in C++',
                            content: `
                                <h3>Basic Data Types</h3>
                                
                                <h4>Integer Types:</h4>
                                <pre><code class="language-cpp">int age = 25;           // Whole numbers (-2147483648 to 2147483647)
short smallNum = 100;   // Smaller range (-32768 to 32767)
long bigNum = 1000000;  // Larger range
unsigned int positive = 50;  // Only positive numbers</code></pre>
                                
                                <h4>Floating-Point Types:</h4>
                                <pre><code class="language-cpp">float price = 19.99;    // Decimal numbers (7 digits precision)
double pi = 3.14159265; // More precision (15 digits)</code></pre>
                                
                                <h4>Character Type:</h4>
                                <pre><code class="language-cpp">char grade = 'A';       // Single character
char symbol = '$';</code></pre>
                                
                                <h4>Boolean Type:</h4>
                                <pre><code class="language-cpp">bool isStudent = true;
bool hasLicense = false;</code></pre>
                                
                                <h4>String Type:</h4>
                                <pre><code class="language-cpp">#include &lt;string&gt;
string name = "John Doe";
string message = "Hello, World!";</code></pre>
                                
                                <h4>Complete Example:</h4>
                                <pre><code class="language-cpp">#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;

int main() {
    // Different data types
    int age = 25;
    double height = 5.9;
    char grade = 'A';
    bool isPassing = true;
    string name = "Alice";
    
    // Output
    cout &lt;&lt; "Name: " &lt;&lt; name &lt;&lt; endl;
    cout &lt;&lt; "Age: " &lt;&lt; age &lt;&lt; endl;
    cout &lt;&lt; "Height: " &lt;&lt; height &lt;&lt; endl;
    cout &lt;&lt; "Grade: " &lt;&lt; grade &lt;&lt; endl;
    cout &lt;&lt; "Passing: " &lt;&lt; isPassing &lt;&lt; endl;
    
    return 0;
}</code></pre>
                            `,
                            resources: [
                                { type: 'video', title: 'C++ Data Types Tutorial', url: 'https://www.youtube.com/watch?v=ER48gd4CoPU' },
                                { type: 'article', title: 'C++ Data Types Reference', url: 'https://www.w3schools.com/cpp/cpp_data_types.asp' },
                                { type: 'interactive', title: 'Practice Data Types', url: 'https://www.programiz.com/cpp-programming/online-compiler/' }
                            ]
                        }
                    ],
                    quiz: {
                        passingScore: 70,
                        questions: [
                            {
                                id: 'q1',
                                question: 'Which data type would you use to store a person\'s age?',
                                options: ['int', 'char', 'bool', 'string'],
                                correct: 0,
                                explanation: 'int is used for whole numbers like age. Age doesn\'t need decimal points.'
                            },
                            {
                                id: 'q2',
                                question: 'What is the correct way to declare a variable in C++?',
                                options: [
                                    'int 123age;',
                                    'int age = 25;',
                                    'age int = 25;',
                                    'int age-value = 25;'
                                ],
                                correct: 1,
                                explanation: 'Correct syntax is: dataType variableName = value;'
                            },
                            {
                                id: 'q3',
                                question: 'Which data type stores true/false values?',
                                options: ['int', 'bool', 'char', 'string'],
                                correct: 1,
                                explanation: 'bool (boolean) stores true or false values.'
                            },
                            {
                                id: 'q4',
                                question: 'What data type would you use for storing "Hello"?',
                                options: ['char', 'int', 'string', 'bool'],
                                correct: 2,
                                explanation: 'string is used for text/words. char is only for single characters.'
                            },
                            {
                                id: 'q5',
                                question: 'Which is a valid variable name?',
                                options: ['2fast', 'my-var', 'student_age', 'int'],
                                correct: 2,
                                explanation: 'student_age is valid. Variables can\'t start with numbers, contain hyphens, or use keywords.'
                            }
                        ]
                    }
                }
            ]
        }
    },
    
    python: {
        level1: {
            modules: [
                {
                    id: 'py-l1-m1',
                    title: 'Getting Started with Python',
                    lessons: [
                        {
                            id: 'lesson-1',
                            title: 'What is Python?',
                            content: `
                                <h3>Welcome to Python Programming!</h3>
                                <p>Python is a high-level, interpreted programming language created by Guido van Rossum in 1991.</p>
                                
                                <h4>Why Learn Python?</h4>
                                <ul>
                                    <li><strong>Easy to Learn:</strong> Simple, readable syntax similar to English</li>
                                    <li><strong>Versatile:</strong> Web, AI, data science, automation, and more</li>
                                    <li><strong>Popular:</strong> Most in-demand language for jobs</li>
                                    <li><strong>Huge Community:</strong> Millions of developers and resources</li>
                                    <li><strong>Great Libraries:</strong> Tools for everything you can imagine</li>
                                </ul>
                                
                                <h4>What Can You Build?</h4>
                                <ul>
                                    <li>AI and Machine Learning models</li>
                                    <li>Web applications (Django, Flask)</li>
                                    <li>Data analysis and visualization</li>
                                    <li>Automation scripts</li>
                                    <li>Games and desktop applications</li>
                                    <li>APIs and backend services</li>
                                </ul>
                                
                                <h4>Companies Using Python:</h4>
                                <p>Google, Netflix, Instagram, Spotify, NASA, Dropbox, and thousands more!</p>
                            `,
                            resources: [
                                { type: 'video', title: 'Python in 100 Seconds', url: 'https://www.youtube.com/watch?v=x7X9w_GIm1s' },
                                { type: 'article', title: 'Python Official Tutorial', url: 'https://docs.python.org/3/tutorial/' },
                                { type: 'interactive', title: 'Try Python Online', url: 'https://www.programiz.com/python-programming/online-compiler/' }
                            ]
                        },
                        {
                            id: 'lesson-2',
                            title: 'Installing Python',
                            content: `
                                <h3>Setting Up Python</h3>
                                
                                <h4>Step 1: Download Python</h4>
                                <ol>
                                    <li>Go to <a href="https://www.python.org/downloads/" target="_blank">python.org/downloads</a></li>
                                    <li>Download Python 3.x (latest version)</li>
                                    <li>Run the installer</li>
                                    <li><strong>Important:</strong> Check "Add Python to PATH"</li>
                                </ol>
                                
                                <h4>Step 2: Verify Installation</h4>
                                <p>Open terminal/command prompt and type:</p>
                                <pre><code>python --version</code></pre>
                                <p>You should see: Python 3.x.x</p>
                                
                                <h4>Step 3: Choose an IDE</h4>
                                <ul>
                                    <li><strong>VS Code</strong> (Recommended) - <a href="https://code.visualstudio.com/" target="_blank">code.visualstudio.com</a></li>
                                    <li><strong>PyCharm</strong> - <a href="https://www.jetbrains.com/pycharm/" target="_blank">jetbrains.com/pycharm</a></li>
                                    <li><strong>IDLE</strong> - Comes with Python</li>
                                </ul>
                                
                                <h4>Online Options (No Installation):</h4>
                                <ul>
                                    <li><a href="https://replit.com/" target="_blank">Replit</a></li>
                                    <li><a href="https://www.programiz.com/python-programming/online-compiler/" target="_blank">Programiz</a></li>
                                    <li><a href="https://colab.research.google.com/" target="_blank">Google Colab</a></li>
                                </ul>
                            `,
                            resources: [
                                { type: 'video', title: 'Install Python Tutorial', url: 'https://www.youtube.com/watch?v=YYXdXT2l-Gg' },
                                { type: 'video', title: 'Setup VS Code for Python', url: 'https://www.youtube.com/watch?v=W--_EOzdTHk' }
                            ]
                        },
                        {
                            id: 'lesson-3',
                            title: 'Your First Python Program',
                            content: `
                                <h3>Hello World in Python</h3>
                                <p>Python is incredibly simple! Here's your first program:</p>
                                
                                <pre><code class="language-python">print("Hello, World!")</code></pre>
                                
                                <p>That's it! Just one line. Compare this to C++ which needs 6 lines!</p>
                                
                                <h4>Understanding the Code:</h4>
                                <ul>
                                    <li><code>print()</code> - Function that displays output</li>
                                    <li><code>"Hello, World!"</code> - String (text) to display</li>
                                    <li>No semicolons needed!</li>
                                    <li>No main() function required!</li>
                                </ul>
                                
                                <h4>Try More Examples:</h4>
                                <pre><code class="language-python"># Print multiple lines
print("Hello, World!")
print("Welcome to Python!")
print("Let's learn programming!")

# Print numbers
print(42)
print(3.14)

# Print calculations
print(10 + 5)
print(20 * 3)</code></pre>
                                
                                <h4>Comments in Python:</h4>
                                <pre><code class="language-python"># This is a single-line comment

"""
This is a
multi-line comment
"""

print("This code runs")  # Comment after code</code></pre>
                            `,
                            resources: [
                                { type: 'video', title: 'First Python Program', url: 'https://www.youtube.com/watch?v=kqtD5dpn9C8' },
                                { type: 'interactive', title: 'Practice Python', url: 'https://www.programiz.com/python-programming/online-compiler/' },
                                { type: 'article', title: 'Python Print Function', url: 'https://realpython.com/python-print/' }
                            ]
                        }
                    ],
                    quiz: {
                        passingScore: 70,
                        questions: [
                            {
                                id: 'q1',
                                question: 'What function is used to display output in Python?',
                                options: ['cout', 'print()', 'display()', 'show()'],
                                correct: 1,
                                explanation: 'print() is the built-in function to display output in Python.'
                            },
                            {
                                id: 'q2',
                                question: 'How do you write a comment in Python?',
                                options: ['// comment', '/* comment */', '# comment', '<!-- comment -->'],
                                correct: 2,
                                explanation: '# is used for single-line comments in Python.'
                            },
                            {
                                id: 'q3',
                                question: 'Does Python require semicolons at the end of statements?',
                                options: ['Yes, always', 'No', 'Only sometimes', 'Only in functions'],
                                correct: 1,
                                explanation: 'Python does not require semicolons. It uses indentation instead.'
                            },
                            {
                                id: 'q4',
                                question: 'What is the correct way to print "Hello" in Python?',
                                options: [
                                    'print(Hello)',
                                    'print("Hello")',
                                    'cout << "Hello"',
                                    'System.out.print("Hello")'
                                ],
                                correct: 1,
                                explanation: 'print("Hello") is correct. Strings must be in quotes.'
                            },
                            {
                                id: 'q5',
                                question: 'Which version of Python should you use for new projects?',
                                options: ['Python 1.x', 'Python 2.x', 'Python 3.x', 'Any version'],
                                correct: 2,
                                explanation: 'Python 3.x is the current version. Python 2 is no longer supported.'
                            }
                        ]
                    }
                }
            ]
        }
    }
};


// ============================================
// JAVASCRIPT LEVEL 1
// ============================================
learningContent.javascript = {
    level1: {
        modules: [
            {
                id: 'js-l1-m1',
                title: 'Getting Started with JavaScript',
                lessons: [
                    {
                        id: 'lesson-1',
                        title: 'What is JavaScript?',
                        content: `
                            <h3>Welcome to JavaScript!</h3>
                            <p>JavaScript is the programming language of the web. It runs in every browser and powers interactive websites.</p>
                            
                            <h4>Why Learn JavaScript?</h4>
                            <ul>
                                <li><strong>Universal:</strong> Runs everywhere - browsers, servers, mobile apps</li>
                                <li><strong>In-Demand:</strong> Most popular language for web development</li>
                                <li><strong>Versatile:</strong> Frontend, backend, mobile, desktop apps</li>
                                <li><strong>Easy to Start:</strong> No installation needed, use browser console</li>
                                <li><strong>Great Community:</strong> Millions of developers and resources</li>
                            </ul>
                            
                            <h4>What Can You Build?</h4>
                            <ul>
                                <li>Interactive websites and web apps</li>
                                <li>Backend servers with Node.js</li>
                                <li>Mobile apps with React Native</li>
                                <li>Desktop apps with Electron</li>
                                <li>Games and animations</li>
                                <li>Browser extensions</li>
                            </ul>
                        `,
                        resources: [
                            { type: 'video', title: 'JavaScript in 100 Seconds', url: 'https://www.youtube.com/watch?v=DHjqpvDnNGE' },
                            { type: 'article', title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' }
                        ]
                    },
                    {
                        id: 'lesson-2',
                        title: 'Your First JavaScript Program',
                        content: `
                            <h3>Hello World in JavaScript</h3>
                            <p>JavaScript is incredibly easy to start! You can run it right in your browser.</p>
                            
                            <h4>Method 1: Browser Console</h4>
                            <ol>
                                <li>Open your browser (Chrome, Firefox, etc.)</li>
                                <li>Press F12 or right-click → Inspect</li>
                                <li>Go to Console tab</li>
                                <li>Type: <code>console.log("Hello, World!")</code></li>
                                <li>Press Enter</li>
                            </ol>
                            
                            <h4>Method 2: HTML File</h4>
                            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;My First JS&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;JavaScript Demo&lt;/h1&gt;
    
    &lt;script&gt;
        console.log("Hello, World!");
        alert("Welcome to JavaScript!");
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                            
                            <h4>Understanding the Code</h4>
                            <ul>
                                <li><code>console.log()</code> - Prints to browser console</li>
                                <li><code>alert()</code> - Shows popup message</li>
                                <li>No compilation needed!</li>
                                <li>Runs immediately in browser</li>
                            </ul>
                        `,
                        resources: [
                            { type: 'video', title: 'JavaScript Basics', url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk' },
                            { type: 'interactive', title: 'Try JavaScript', url: 'https://playcode.io/javascript' }
                        ]
                    }
                ],
                quiz: {
                    passingScore: 70,
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is JavaScript primarily used for?',
                            options: ['Desktop applications', 'Web development', 'Mobile games only', 'Database management'],
                            correct: 1,
                            explanation: 'JavaScript is primarily used for web development, making websites interactive.'
                        },
                        {
                            id: 'q2',
                            question: 'How do you print to the console in JavaScript?',
                            options: ['print()', 'console.log()', 'cout <<', 'System.out.println()'],
                            correct: 1,
                            explanation: 'console.log() is used to print output to the browser console.'
                        },
                        {
                            id: 'q3',
                            question: 'Does JavaScript need to be compiled?',
                            options: ['Yes, always', 'No, it\'s interpreted', 'Only for production', 'Only on servers'],
                            correct: 1,
                            explanation: 'JavaScript is an interpreted language that runs directly in browsers.'
                        },
                        {
                            id: 'q4',
                            question: 'Where can JavaScript run?',
                            options: ['Only in browsers', 'Only on servers', 'Browsers and servers', 'Only on mobile'],
                            correct: 2,
                            explanation: 'JavaScript runs in browsers (frontend) and servers (Node.js backend).'
                        },
                        {
                            id: 'q5',
                            question: 'What does alert() do in JavaScript?',
                            options: ['Prints to console', 'Shows a popup', 'Creates a variable', 'Stops the program'],
                            correct: 1,
                            explanation: 'alert() displays a popup message box in the browser.'
                        }
                    ]
                }
            },
            {
                id: 'js-l1-m2',
                title: 'Variables and Data Types',
                lessons: [
                    {
                        id: 'lesson-1',
                        title: 'JavaScript Variables',
                        content: `
                            <h3>Variables in JavaScript</h3>
                            <p>Variables store data that you can use and change in your program.</p>
                            
                            <h4>Three Ways to Declare Variables</h4>
                            <pre><code>// let - can be changed
let age = 25;
age = 26; // OK

// const - cannot be changed
const name = "John";
// name = "Jane"; // Error!

// var - old way (avoid)
var city = "NYC";</code></pre>
                            
                            <h4>Data Types</h4>
                            <pre><code>// Number
let age = 25;
let price = 19.99;

// String
let name = "Alice";
let message = 'Hello!';

// Boolean
let isStudent = true;
let hasLicense = false;

// Array
let colors = ["red", "green", "blue"];

// Object
let person = {
    name: "John",
    age: 30
};</code></pre>
                            
                            <h4>Best Practices</h4>
                            <ul>
                                <li>Use <code>const</code> by default</li>
                                <li>Use <code>let</code> when value will change</li>
                                <li>Avoid <code>var</code> (old syntax)</li>
                                <li>Use meaningful names</li>
                            </ul>
                        `,
                        resources: [
                            { type: 'video', title: 'JavaScript Variables', url: 'https://www.youtube.com/watch?v=9WIJQDvt4Us' },
                            { type: 'article', title: 'MDN Variables', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables' }
                        ]
                    }
                ],
                quiz: {
                    passingScore: 70,
                    questions: [
                        {
                            id: 'q1',
                            question: 'Which keyword should you use for values that won\'t change?',
                            options: ['var', 'let', 'const', 'static'],
                            correct: 2,
                            explanation: 'const is used for values that should not be reassigned.'
                        },
                        {
                            id: 'q2',
                            question: 'What data type is "Hello"?',
                            options: ['Number', 'String', 'Boolean', 'Array'],
                            correct: 1,
                            explanation: 'Text in quotes is a String data type.'
                        },
                        {
                            id: 'q3',
                            question: 'What is true or false called?',
                            options: ['String', 'Number', 'Boolean', 'Binary'],
                            correct: 2,
                            explanation: 'Boolean is the data type for true/false values.'
                        },
                        {
                            id: 'q4',
                            question: 'Can you change a const variable?',
                            options: ['Yes', 'No', 'Sometimes', 'Only numbers'],
                            correct: 1,
                            explanation: 'const variables cannot be reassigned after declaration.'
                        },
                        {
                            id: 'q5',
                            question: 'Which is the modern way to declare variables?',
                            options: ['var', 'let and const', 'variable', 'dim'],
                            correct: 1,
                            explanation: 'let and const are the modern ES6 way to declare variables.'
                        }
                    ]
                }
            }
        ]
    }
};

// ============================================
// JAVA LEVEL 1
// ============================================
learningContent.java = {
    level1: {
        modules: [
            {
                id: 'java-l1-m1',
                title: 'Getting Started with Java',
                lessons: [
                    {
                        id: 'lesson-1',
                        title: 'What is Java?',
                        content: `
                            <h3>Welcome to Java Programming!</h3>
                            <p>Java is a powerful, object-oriented programming language used by millions of developers worldwide.</p>
                            
                            <h4>Why Learn Java?</h4>
                            <ul>
                                <li><strong>Popular:</strong> One of the most used languages in the world</li>
                                <li><strong>Platform Independent:</strong> Write once, run anywhere</li>
                                <li><strong>Enterprise Ready:</strong> Used by major companies</li>
                                <li><strong>Android Development:</strong> Official language for Android apps</li>
                                <li><strong>High Salary:</strong> Java developers are well-paid</li>
                            </ul>
                            
                            <h4>What Can You Build?</h4>
                            <ul>
                                <li>Android mobile applications</li>
                                <li>Enterprise web applications</li>
                                <li>Big data processing systems</li>
                                <li>Cloud applications</li>
                                <li>Desktop applications</li>
                                <li>Games and simulations</li>
                            </ul>
                            
                            <h4>Companies Using Java</h4>
                            <p>Google, Amazon, Netflix, LinkedIn, Uber, Airbnb, and thousands more!</p>
                        `,
                        resources: [
                            { type: 'video', title: 'Java in 100 Seconds', url: 'https://www.youtube.com/watch?v=l9AzO1FMgM8' },
                            { type: 'article', title: 'Java Official Tutorial', url: 'https://docs.oracle.com/javase/tutorial/' }
                        ]
                    },
                    {
                        id: 'lesson-2',
                        title: 'Your First Java Program',
                        content: `
                            <h3>Hello World in Java</h3>
                            <p>Let's write your first Java program!</p>
                            
                            <pre><code>public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java!");
    }
}</code></pre>
                            
                            <h4>Understanding Each Part</h4>
                            <ul>
                                <li><code>public class HelloWorld</code> - Defines a class named HelloWorld</li>
                                <li><code>public static void main</code> - The entry point of the program</li>
                                <li><code>String[] args</code> - Command line arguments</li>
                                <li><code>System.out.println()</code> - Prints text to console</li>
                                <li>Every statement ends with semicolon <code>;</code></li>
                            </ul>
                            
                            <h4>Important Rules</h4>
                            <ul>
                                <li>Class name must match filename</li>
                                <li>Java is case-sensitive</li>
                                <li>Every program needs a main method</li>
                                <li>Code goes inside curly braces <code>{}</code></li>
                            </ul>
                        `,
                        resources: [
                            { type: 'video', title: 'Java Hello World', url: 'https://www.youtube.com/watch?v=eIrMbAQSU34' },
                            { type: 'interactive', title: 'Try Java Online', url: 'https://www.programiz.com/java-programming/online-compiler/' }
                        ]
                    }
                ],
                quiz: {
                    passingScore: 70,
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is the entry point of a Java program?',
                            options: ['start()', 'begin()', 'main()', 'run()'],
                            correct: 2,
                            explanation: 'main() is the entry point where Java programs start execution.'
                        },
                        {
                            id: 'q2',
                            question: 'How do you print in Java?',
                            options: ['print()', 'console.log()', 'System.out.println()', 'cout <<'],
                            correct: 2,
                            explanation: 'System.out.println() is used to print output in Java.'
                        },
                        {
                            id: 'q3',
                            question: 'Must the class name match the filename?',
                            options: ['Yes', 'No', 'Sometimes', 'Only for public classes'],
                            correct: 0,
                            explanation: 'In Java, the public class name must match the filename.'
                        },
                        {
                            id: 'q4',
                            question: 'Is Java case-sensitive?',
                            options: ['Yes', 'No', 'Sometimes', 'Only for variables'],
                            correct: 0,
                            explanation: 'Java is case-sensitive. Main and main are different.'
                        },
                        {
                            id: 'q5',
                            question: 'What does "Write once, run anywhere" mean?',
                            options: [
                                'Java code works on any platform',
                                'You only write code once',
                                'Java is easy to learn',
                                'Java runs fast'
                            ],
                            correct: 0,
                            explanation: 'Java code can run on any platform with a JVM (Java Virtual Machine).'
                        }
                    ]
                }
            }
        ]
    }
};

// ============================================
// C# LEVEL 1
// ============================================
learningContent.csharp = {
    level1: {
        modules: [
            {
                id: 'cs-l1-m1',
                title: 'Getting Started with C#',
                lessons: [
                    {
                        id: 'lesson-1',
                        title: 'What is C#?',
                        content: `
                            <h3>Welcome to C# Programming!</h3>
                            <p>C# (C-Sharp) is a modern, object-oriented programming language developed by Microsoft.</p>
                            
                            <h4>Why Learn C#?</h4>
                            <ul>
                                <li><strong>Unity Game Development:</strong> #1 language for game development</li>
                                <li><strong>Modern Syntax:</strong> Clean, easy to read and write</li>
                                <li><strong>.NET Framework:</strong> Powerful libraries and tools</li>
                                <li><strong>Cross-Platform:</strong> Windows, Mac, Linux with .NET Core</li>
                                <li><strong>High Demand:</strong> Great career opportunities</li>
                            </ul>
                            
                            <h4>What Can You Build?</h4>
                            <ul>
                                <li>Video games with Unity</li>
                                <li>Windows desktop applications</li>
                                <li>Web applications with ASP.NET</li>
                                <li>Mobile apps with Xamarin</li>
                                <li>Cloud services with Azure</li>
                                <li>APIs and microservices</li>
                            </ul>
                        `,
                        resources: [
                            { type: 'video', title: 'C# in 100 Seconds', url: 'https://www.youtube.com/watch?v=ravLFzIguCM' },
                            { type: 'article', title: 'C# Documentation', url: 'https://docs.microsoft.com/en-us/dotnet/csharp/' }
                        ]
                    },
                    {
                        id: 'lesson-2',
                        title: 'Your First C# Program',
                        content: `
                            <h3>Hello World in C#</h3>
                            
                            <pre><code>using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
        Console.WriteLine("Welcome to C#!");
    }
}</code></pre>
                            
                            <h4>Understanding the Code</h4>
                            <ul>
                                <li><code>using System;</code> - Imports System namespace</li>
                                <li><code>class Program</code> - Defines a class</li>
                                <li><code>static void Main()</code> - Entry point of program</li>
                                <li><code>Console.WriteLine()</code> - Prints to console</li>
                            </ul>
                            
                            <h4>Modern C# (Simplified)</h4>
                            <pre><code>// C# 10+ Top-level statements
Console.WriteLine("Hello, World!");
Console.WriteLine("Welcome to C#!");</code></pre>
                            
                            <p>Modern C# allows you to write code without the class boilerplate!</p>
                        `,
                        resources: [
                            { type: 'video', title: 'C# Tutorial', url: 'https://www.youtube.com/watch?v=GhQdlIFylQ8' },
                            { type: 'interactive', title: 'Try C# Online', url: 'https://dotnetfiddle.net/' }
                        ]
                    }
                ],
                quiz: {
                    passingScore: 70,
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is C# primarily used for?',
                            options: ['Web only', 'Games and applications', 'Databases only', 'Mobile only'],
                            correct: 1,
                            explanation: 'C# is versatile, used for games (Unity), desktop apps, web, and more.'
                        },
                        {
                            id: 'q2',
                            question: 'How do you print in C#?',
                            options: ['print()', 'Console.WriteLine()', 'cout <<', 'System.out.println()'],
                            correct: 1,
                            explanation: 'Console.WriteLine() is used to print output in C#.'
                        },
                        {
                            id: 'q3',
                            question: 'What is the most popular use of C#?',
                            options: ['Web scraping', 'Game development with Unity', 'Data science', 'Mobile only'],
                            correct: 1,
                            explanation: 'C# is the #1 language for Unity game development.'
                        },
                        {
                            id: 'q4',
                            question: 'Who created C#?',
                            options: ['Google', 'Microsoft', 'Apple', 'Facebook'],
                            correct: 1,
                            explanation: 'C# was created by Microsoft as part of the .NET initiative.'
                        },
                        {
                            id: 'q5',
                            question: 'Can C# run on Mac and Linux?',
                            options: ['No, Windows only', 'Yes, with .NET Core', 'Only on Mac', 'Only in browsers'],
                            correct: 1,
                            explanation: 'With .NET Core/.NET 5+, C# runs on Windows, Mac, and Linux.'
                        }
                    ]
                }
            }
        ]
    }
};

console.log('✅ Learning content loaded for: C++, Python, JavaScript, Java, C#');
