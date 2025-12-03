// ============================================
// EXTENDED LEARNING CONTENT
// Go, Rust, PHP, Swift, Kotlin, TypeScript, R
// ============================================

// GO (GOLANG) LEVEL 1
learningContent.go = {
    level1: {
        modules: [
            {
                id: 'go-l1-m1',
                title: 'Getting Started with Go',
                lessons: [
                    {
                        id: 'lesson-1',
                        title: 'What is Go?',
                        content: `
                            <h3>Welcome to Go Programming!</h3>
                            <p>Go (Golang) is a modern programming language created by Google for building fast, reliable software.</p>
                            
                            <h4>Why Learn Go?</h4>
                            <ul>
                                <li><strong>Simple:</strong> Easy to learn, clean syntax</li>
                                <li><strong>Fast:</strong> Compiled language with great performance</li>
                                <li><strong>Concurrent:</strong> Built-in support for concurrent programming</li>
                                <li><strong>Cloud Native:</strong> Perfect for microservices and cloud apps</li>
                                <li><strong>Growing:</strong> Used by Google, Uber, Docker, Kubernetes</li>
                            </ul>
                            
                            <h4>What Can You Build?</h4>
                            <ul>
                                <li>Cloud services and APIs</li>
                                <li>Microservices</li>
                                <li>Command-line tools</li>
                                <li>Web servers</li>
                                <li>DevOps tools</li>
                                <li>Network applications</li>
                            </ul>
                        `,
                        resources: [
                            { type: 'video', title: 'Go in 100 Seconds', url: 'https://www.youtube.com/watch?v=446E-r0rXHI' },
                            { type: 'article', title: 'Go Official Tour', url: 'https://go.dev/tour/' }
                        ]
                    },
                    {
                        id: 'lesson-2',
                        title: 'Your First Go Program',
                        content: `
                            <h3>Hello World in Go</h3>
                            <pre><code>package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    fmt.Println("Welcome to Go!")
}</code></pre>
                            
                            <h4>Understanding the Code</h4>
                            <ul>
                                <li><code>package main</code> - Every Go program starts with a package</li>
                                <li><code>import "fmt"</code> - Imports formatting package</li>
                                <li><code>func main()</code> - Entry point of the program</li>
                                <li><code>fmt.Println()</code> - Prints to console</li>
                            </ul>
                        `,
                        resources: [
                            { type: 'interactive', title: 'Go Playground', url: 'https://go.dev/play/' }
                        ]
                    }
                ],
                quiz: {
                    passingScore: 70,
                    questions: [
                        { id: 'q1', question: 'Who created Go?', options: ['Microsoft', 'Google', 'Apple', 'Facebook'], correct: 1, explanation: 'Go was created by Google in 2009.' },
                        { id: 'q2', question: 'What is Go also called?', options: ['Golang', 'GoLang', 'Both A and B', 'None'], correct: 2, explanation: 'Go is also called Golang.' },
                        { id: 'q3', question: 'How do you print in Go?', options: ['print()', 'fmt.Println()', 'console.log()', 'cout <<'], correct: 1, explanation: 'fmt.Println() is used to print in Go.' },
                        { id: 'q4', question: 'Is Go compiled or interpreted?', options: ['Compiled', 'Interpreted', 'Both', 'Neither'], correct: 0, explanation: 'Go is a compiled language.' },
                        { id: 'q5', question: 'What is Go best for?', options: ['Games', 'Cloud services', 'Mobile apps', 'Desktop apps'], correct: 1, explanation: 'Go excels at cloud services and microservices.' }
                    ]
                }
            }
        ]
    }
};


// RUST LEVEL 1
learningContent.rust = {
    level1: {
        modules: [{
            id: 'rust-l1-m1',
            title: 'Getting Started with Rust',
            lessons: [{
                id: 'lesson-1',
                title: 'What is Rust?',
                content: `<h3>Welcome to Rust!</h3>
                <p>Rust is a systems programming language focused on safety, speed, and concurrency.</p>
                <h4>Why Learn Rust?</h4>
                <ul>
                    <li><strong>Memory Safe:</strong> No null pointers or data races</li>
                    <li><strong>Fast:</strong> Performance like C/C++</li>
                    <li><strong>Modern:</strong> Great tooling and package manager</li>
                    <li><strong>Growing:</strong> Most loved language on Stack Overflow</li>
                </ul>`,
                resources: [
                    { type: 'video', title: 'Rust in 100 Seconds', url: 'https://www.youtube.com/watch?v=5C_HPTJg5ek' },
                    { type: 'article', title: 'Rust Book', url: 'https://doc.rust-lang.org/book/' }
                ]
            }, {
                id: 'lesson-2',
                title: 'Your First Rust Program',
                content: `<h3>Hello World in Rust</h3>
                <pre><code>fn main() {
    println!("Hello, World!");
    println!("Welcome to Rust!");
}</code></pre>
                <h4>Understanding the Code</h4>
                <ul>
                    <li><code>fn main()</code> - Main function</li>
                    <li><code>println!</code> - Macro for printing (note the !)</li>
                </ul>`,
                resources: [{ type: 'interactive', title: 'Rust Playground', url: 'https://play.rust-lang.org/' }]
            }],
            quiz: {
                passingScore: 70,
                questions: [
                    { id: 'q1', question: 'What is Rust known for?', options: ['Speed only', 'Memory safety', 'Easy syntax', 'Web only'], correct: 1, explanation: 'Rust is known for memory safety without garbage collection.' },
                    { id: 'q2', question: 'How do you print in Rust?', options: ['print()', 'println!()', 'console.log()', 'fmt.Println()'], correct: 1, explanation: 'println! is a macro (note the !) used for printing.' },
                    { id: 'q3', question: 'Is Rust compiled?', options: ['Yes', 'No', 'Sometimes', 'Interpreted'], correct: 0, explanation: 'Rust is a compiled language.' },
                    { id: 'q4', question: 'What makes Rust special?', options: ['Easy to learn', 'Memory safety', 'No syntax', 'Slow'], correct: 1, explanation: 'Rust provides memory safety without garbage collection.' },
                    { id: 'q5', question: 'Rust is good for?', options: ['Web only', 'Systems programming', 'Mobile only', 'Games only'], correct: 1, explanation: 'Rust excels at systems programming.' }
                ]
            }
        }]
    }
};


// PHP LEVEL 1
learningContent.php = {
    level1: {
        modules: [{
            id: 'php-l1-m1',
            title: 'Getting Started with PHP',
            lessons: [{
                id: 'lesson-1',
                title: 'What is PHP?',
                content: `<h3>Welcome to PHP!</h3>
                <p>PHP is a server-side scripting language designed for web development. It powers 77% of websites!</p>
                <h4>Why Learn PHP?</h4>
                <ul>
                    <li><strong>Popular:</strong> Powers WordPress, Facebook, Wikipedia</li>
                    <li><strong>Easy:</strong> Simple syntax, easy to learn</li>
                    <li><strong>Jobs:</strong> High demand for PHP developers</li>
                    <li><strong>Frameworks:</strong> Laravel, Symfony, CodeIgniter</li>
                </ul>`,
                resources: [
                    { type: 'video', title: 'PHP in 100 Seconds', url: 'https://www.youtube.com/watch?v=a7_WFUlFS94' },
                    { type: 'article', title: 'PHP Manual', url: 'https://www.php.net/manual/en/' }
                ]
            }, {
                id: 'lesson-2',
                title: 'Your First PHP Program',
                content: `<h3>Hello World in PHP</h3>
                <pre><code>&lt;?php
echo "Hello, World!";
echo "Welcome to PHP!";
?&gt;</code></pre>
                <h4>Understanding the Code</h4>
                <ul>
                    <li><code>&lt;?php</code> - PHP opening tag</li>
                    <li><code>echo</code> - Outputs text</li>
                    <li><code>?&gt;</code> - PHP closing tag (optional at end)</li>
                </ul>`,
                resources: [{ type: 'interactive', title: 'PHP Online', url: 'https://www.programiz.com/php/online-compiler/' }]
            }],
            quiz: {
                passingScore: 70,
                questions: [
                    { id: 'q1', question: 'What is PHP used for?', options: ['Desktop apps', 'Web development', 'Mobile apps', 'Games'], correct: 1, explanation: 'PHP is primarily used for server-side web development.' },
                    { id: 'q2', question: 'How do you print in PHP?', options: ['print()', 'echo', 'console.log()', 'printf()'], correct: 1, explanation: 'echo is the most common way to output in PHP.' },
                    { id: 'q3', question: 'What powers WordPress?', options: ['Python', 'PHP', 'Java', 'Ruby'], correct: 1, explanation: 'WordPress is built with PHP.' },
                    { id: 'q4', question: 'PHP code starts with?', options: ['<php>', '<?php', '<script>', '<?'], correct: 1, explanation: 'PHP code starts with <?php tag.' },
                    { id: 'q5', question: 'Is PHP server-side or client-side?', options: ['Server-side', 'Client-side', 'Both', 'Neither'], correct: 0, explanation: 'PHP runs on the server, not in the browser.' }
                ]
            }
        }]
    }
};


// SWIFT LEVEL 1
learningContent.swift = {
    level1: {
        modules: [{
            id: 'swift-l1-m1',
            title: 'Getting Started with Swift',
            lessons: [{
                id: 'lesson-1',
                title: 'What is Swift?',
                content: `<h3>Welcome to Swift!</h3>
                <p>Swift is Apple's modern programming language for iOS, macOS, watchOS, and tvOS development.</p>
                <h4>Why Learn Swift?</h4>
                <ul>
                    <li><strong>iOS Development:</strong> Build iPhone and iPad apps</li>
                    <li><strong>Modern:</strong> Clean, safe, and fast</li>
                    <li><strong>High Salary:</strong> iOS developers are well-paid</li>
                    <li><strong>Apple Ecosystem:</strong> Mac, iPhone, iPad, Watch, TV</li>
                </ul>`,
                resources: [
                    { type: 'video', title: 'Swift in 100 Seconds', url: 'https://www.youtube.com/watch?v=nAchMctX4YA' },
                    { type: 'article', title: 'Swift Documentation', url: 'https://docs.swift.org/swift-book/' }
                ]
            }, {
                id: 'lesson-2',
                title: 'Your First Swift Program',
                content: `<h3>Hello World in Swift</h3>
                <pre><code>import Foundation

print("Hello, World!")
print("Welcome to Swift!")</code></pre>
                <h4>Understanding the Code</h4>
                <ul>
                    <li><code>import Foundation</code> - Imports basic functionality</li>
                    <li><code>print()</code> - Outputs to console</li>
                    <li>No semicolons needed!</li>
                </ul>`,
                resources: [{ type: 'interactive', title: 'Swift Online', url: 'https://swiftfiddle.com/' }]
            }],
            quiz: {
                passingScore: 70,
                questions: [
                    { id: 'q1', question: 'Who created Swift?', options: ['Google', 'Apple', 'Microsoft', 'Facebook'], correct: 1, explanation: 'Swift was created by Apple.' },
                    { id: 'q2', question: 'What is Swift used for?', options: ['Web only', 'iOS/macOS apps', 'Android apps', 'Games only'], correct: 1, explanation: 'Swift is used for Apple platform development.' },
                    { id: 'q3', question: 'How do you print in Swift?', options: ['echo', 'print()', 'console.log()', 'println()'], correct: 1, explanation: 'print() is used to output in Swift.' },
                    { id: 'q4', question: 'Does Swift need semicolons?', options: ['Yes', 'No', 'Sometimes', 'Always'], correct: 1, explanation: 'Swift does not require semicolons at the end of statements.' },
                    { id: 'q5', question: 'Swift is good for?', options: ['iPhone apps', 'Android apps', 'Web apps', 'All of above'], correct: 0, explanation: 'Swift is primarily for iOS/macOS development.' }
                ]
            }
        }]
    }
};


// KOTLIN LEVEL 1
learningContent.kotlin = {
    level1: {
        modules: [{
            id: 'kotlin-l1-m1',
            title: 'Getting Started with Kotlin',
            lessons: [{
                id: 'lesson-1',
                title: 'What is Kotlin?',
                content: `<h3>Welcome to Kotlin!</h3>
                <p>Kotlin is a modern programming language that runs on the JVM. It's Google's preferred language for Android development.</p>
                <h4>Why Learn Kotlin?</h4>
                <ul>
                    <li><strong>Android:</strong> Official language for Android apps</li>
                    <li><strong>Modern:</strong> Concise, safe, and expressive</li>
                    <li><strong>Java Compatible:</strong> Works with existing Java code</li>
                    <li><strong>Growing:</strong> Used by Google, Netflix, Uber</li>
                </ul>`,
                resources: [
                    { type: 'video', title: 'Kotlin in 100 Seconds', url: 'https://www.youtube.com/watch?v=xT8oP0wy-A0' },
                    { type: 'article', title: 'Kotlin Docs', url: 'https://kotlinlang.org/docs/home.html' }
                ]
            }, {
                id: 'lesson-2',
                title: 'Your First Kotlin Program',
                content: `<h3>Hello World in Kotlin</h3>
                <pre><code>fun main() {
    println("Hello, World!")
    println("Welcome to Kotlin!")
}</code></pre>
                <h4>Understanding the Code</h4>
                <ul>
                    <li><code>fun main()</code> - Main function</li>
                    <li><code>println()</code> - Prints with newline</li>
                    <li>Clean, concise syntax!</li>
                </ul>`,
                resources: [{ type: 'interactive', title: 'Kotlin Playground', url: 'https://play.kotlinlang.org/' }]
            }],
            quiz: {
                passingScore: 70,
                questions: [
                    { id: 'q1', question: 'What is Kotlin used for?', options: ['iOS apps', 'Android apps', 'Web only', 'Desktop only'], correct: 1, explanation: 'Kotlin is Google\'s preferred language for Android development.' },
                    { id: 'q2', question: 'How do you print in Kotlin?', options: ['print()', 'println()', 'console.log()', 'echo'], correct: 1, explanation: 'println() prints with a newline in Kotlin.' },
                    { id: 'q3', question: 'Is Kotlin compatible with Java?', options: ['Yes', 'No', 'Sometimes', 'Never'], correct: 0, explanation: 'Kotlin is fully compatible with Java and runs on the JVM.' },
                    { id: 'q4', question: 'Who prefers Kotlin for Android?', options: ['Apple', 'Google', 'Microsoft', 'Facebook'], correct: 1, explanation: 'Google announced Kotlin as the preferred language for Android.' },
                    { id: 'q5', question: 'Kotlin runs on?', options: ['JVM', 'CLR', 'Browser only', 'Native only'], correct: 0, explanation: 'Kotlin runs on the Java Virtual Machine (JVM).' }
                ]
            }
        }]
    }
};


// TYPESCRIPT LEVEL 1
learningContent.typescript = {
    level1: {
        modules: [{
            id: 'ts-l1-m1',
            title: 'Getting Started with TypeScript',
            lessons: [{
                id: 'lesson-1',
                title: 'What is TypeScript?',
                content: `<h3>Welcome to TypeScript!</h3>
                <p>TypeScript is JavaScript with syntax for types. It's developed by Microsoft and used in large-scale applications.</p>
                <h4>Why Learn TypeScript?</h4>
                <ul>
                    <li><strong>Type Safety:</strong> Catch errors before runtime</li>
                    <li><strong>Better Tools:</strong> Amazing IDE support</li>
                    <li><strong>Popular:</strong> Used by Angular, React, Vue</li>
                    <li><strong>JavaScript++:</strong> All JS code is valid TS</li>
                </ul>`,
                resources: [
                    { type: 'video', title: 'TypeScript in 100 Seconds', url: 'https://www.youtube.com/watch?v=zQnBQ4tB3ZA' },
                    { type: 'article', title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/' }
                ]
            }, {
                id: 'lesson-2',
                title: 'Your First TypeScript Program',
                content: `<h3>Hello World in TypeScript</h3>
                <pre><code>// TypeScript with types
const message: string = "Hello, World!";
console.log(message);

function greet(name: string): void {
    console.log(\`Welcome, \${name}!\`);
}

greet("TypeScript");</code></pre>
                <h4>Understanding the Code</h4>
                <ul>
                    <li><code>: string</code> - Type annotation</li>
                    <li><code>: void</code> - Function returns nothing</li>
                    <li>Types help catch errors!</li>
                </ul>`,
                resources: [{ type: 'interactive', title: 'TS Playground', url: 'https://www.typescriptlang.org/play' }]
            }],
            quiz: {
                passingScore: 70,
                questions: [
                    { id: 'q1', question: 'What is TypeScript?', options: ['New language', 'JavaScript with types', 'Python variant', 'Java variant'], correct: 1, explanation: 'TypeScript is JavaScript with syntax for types.' },
                    { id: 'q2', question: 'Who created TypeScript?', options: ['Google', 'Microsoft', 'Apple', 'Facebook'], correct: 1, explanation: 'TypeScript was created by Microsoft.' },
                    { id: 'q3', question: 'Is JavaScript valid TypeScript?', options: ['Yes', 'No', 'Sometimes', 'Never'], correct: 0, explanation: 'All JavaScript code is valid TypeScript code.' },
                    { id: 'q4', question: 'What does TypeScript add to JavaScript?', options: ['Speed', 'Types', 'Graphics', 'Database'], correct: 1, explanation: 'TypeScript adds static type checking to JavaScript.' },
                    { id: 'q5', question: 'TypeScript is used in?', options: ['Angular', 'React', 'Vue', 'All of above'], correct: 3, explanation: 'TypeScript is widely used in all major frameworks.' }
                ]
            }
        }]
    }
};


// R PROGRAMMING LEVEL 1
learningContent.r = {
    level1: {
        modules: [{
            id: 'r-l1-m1',
            title: 'Getting Started with R',
            lessons: [{
                id: 'lesson-1',
                title: 'What is R?',
                content: `<h3>Welcome to R Programming!</h3>
                <p>R is a programming language for statistical computing and data analysis. It's the go-to language for data scientists.</p>
                <h4>Why Learn R?</h4>
                <ul>
                    <li><strong>Data Science:</strong> Best for statistical analysis</li>
                    <li><strong>Visualization:</strong> Amazing data visualization tools</li>
                    <li><strong>Academia:</strong> Widely used in research</li>
                    <li><strong>Packages:</strong> Thousands of statistical packages</li>
                </ul>`,
                resources: [
                    { type: 'video', title: 'R Programming Tutorial', url: 'https://www.youtube.com/watch?v=_V8eKsto3Ug' },
                    { type: 'article', title: 'R Documentation', url: 'https://www.r-project.org/other-docs.html' }
                ]
            }, {
                id: 'lesson-2',
                title: 'Your First R Program',
                content: `<h3>Hello World in R</h3>
                <pre><code># R Hello World
print("Hello, World!")
print("Welcome to R!")

# Variables in R
name <- "Data Scientist"
age <- 25

cat("Name:", name, "\\n")
cat("Age:", age, "\\n")</code></pre>
                <h4>Understanding the Code</h4>
                <ul>
                    <li><code>print()</code> - Outputs text</li>
                    <li><code><-</code> - Assignment operator</li>
                    <li><code>cat()</code> - Concatenate and print</li>
                    <li><code>#</code> - Comments</li>
                </ul>`,
                resources: [{ type: 'interactive', title: 'R Online', url: 'https://rdrr.io/snippets/' }]
            }],
            quiz: {
                passingScore: 70,
                questions: [
                    { id: 'q1', question: 'What is R used for?', options: ['Web development', 'Data science', 'Mobile apps', 'Games'], correct: 1, explanation: 'R is primarily used for statistical computing and data analysis.' },
                    { id: 'q2', question: 'How do you print in R?', options: ['echo', 'print()', 'console.log()', 'printf()'], correct: 1, explanation: 'print() is used to output in R.' },
                    { id: 'q3', question: 'What is the assignment operator in R?', options: ['=', '<-', ':=', '=='], correct: 1, explanation: '<- is the traditional assignment operator in R.' },
                    { id: 'q4', question: 'R is best for?', options: ['Games', 'Statistics', 'Web design', 'Mobile'], correct: 1, explanation: 'R excels at statistical analysis and data visualization.' },
                    { id: 'q5', question: 'Who uses R?', options: ['Game developers', 'Data scientists', 'Web designers', 'Mobile developers'], correct: 1, explanation: 'R is widely used by data scientists and statisticians.' }
                ]
            }
        }]
    }
};

console.log('✅ Extended learning content loaded for: Go, Rust, PHP, Swift, Kotlin, TypeScript, R');
