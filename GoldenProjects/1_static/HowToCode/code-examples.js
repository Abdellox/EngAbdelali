// Code examples for different languages
const codeExamples = {
    // Hello World Examples
    helloWorld: {
        cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    cout << "Welcome to C++ Programming!" << endl;
    return 0;
}`,
        python: `# Python Hello World
print("Hello, World!")
print("Welcome to Python Programming!")

# Try changing the message
name = "Programmer"
print(f"Hello, {name}!")`,
        javascript: `// JavaScript Hello World
console.log("Hello, World!");
console.log("Welcome to JavaScript Programming!");

// Try changing the message
const name = "Programmer";
console.log(\`Hello, \${name}!\`);`,
        java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java Programming!");
    }
}`
    },
    
    // Variables Examples
    variables: {
        cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Different data types
    int age = 25;
    double height = 5.9;
    char grade = 'A';
    bool isPassing = true;
    string name = "Alice";
    
    // Output
    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "Height: " << height << " feet" << endl;
    cout << "Grade: " << grade << endl;
    cout << "Passing: " << (isPassing ? "Yes" : "No") << endl;
    
    return 0;
}`,
        python: `# Python Variables and Data Types

# Different data types
age = 25
height = 5.9
grade = 'A'
is_passing = True
name = "Alice"

# Output
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height} feet")
print(f"Grade: {grade}")
print(f"Passing: {'Yes' if is_passing else 'No'}")

# Python is dynamically typed
age = "Twenty Five"  # Can change type!
print(f"Age as string: {age}")`,
        javascript: `// JavaScript Variables and Data Types

// Different data types
let age = 25;
const height = 5.9;
let grade = 'A';
let isPassing = true;
let name = "Alice";

// Output
console.log(\`Name: \${name}\`);
console.log(\`Age: \${age}\`);
console.log(\`Height: \${height} feet\`);
console.log(\`Grade: \${grade}\`);
console.log(\`Passing: \${isPassing ? 'Yes' : 'No'}\`);

// JavaScript is dynamically typed
age = "Twenty Five";  // Can change type!
console.log(\`Age as string: \${age}\`);`
    },
    
    // Loops Examples
    loops: {
        cpp: `#include <iostream>
using namespace std;

int main() {
    // For loop
    cout << "Counting 1 to 5:" << endl;
    for(int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl << endl;
    
    // While loop
    cout << "Countdown from 5:" << endl;
    int count = 5;
    while(count > 0) {
        cout << count << " ";
        count--;
    }
    cout << endl << endl;
    
    // Do-while loop
    cout << "Do-while example:" << endl;
    int num = 1;
    do {
        cout << num << " ";
        num++;
    } while(num <= 3);
    cout << endl;
    
    return 0;
}`,
        python: `# Python Loops

# For loop with range
print("Counting 1 to 5:")
for i in range(1, 6):
    print(i, end=" ")
print("\\n")

# While loop
print("Countdown from 5:")
count = 5
while count > 0:
    print(count, end=" ")
    count -= 1
print("\\n")

# For loop with list
print("Loop through list:")
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# List comprehension (Python special!)
squares = [x**2 for x in range(1, 6)]
print(f"Squares: {squares}")`,
        javascript: `// JavaScript Loops

// For loop
console.log("Counting 1 to 5:");
for(let i = 1; i <= 5; i++) {
    console.log(i);
}

// While loop
console.log("\\nCountdown from 5:");
let count = 5;
while(count > 0) {
    console.log(count);
    count--;
}

// For...of loop (modern JavaScript)
console.log("\\nLoop through array:");
const fruits = ["apple", "banana", "cherry"];
for(const fruit of fruits) {
    console.log(fruit);
}

// forEach method
console.log("\\nUsing forEach:");
fruits.forEach(fruit => console.log(fruit));

// Map method (functional programming)
const squares = [1, 2, 3, 4, 5].map(x => x ** 2);
console.log("Squares:", squares);`
    }
};

// Initialize code playground and examples
function initializeCodePlayground() {
    // Wait for Monaco to load
    loadMonacoEditor().then(() => {
        // Create main playground
        codeEditor.createPlayground('cpp', 'code-playground');
        
        // Initialize Hello World examples
        setTimeout(() => {
            codeEditor.createInlineEditor('editor-cpp-hello', 'cpp', codeExamples.helloWorld.cpp);
            codeEditor.createInlineEditor('editor-python-hello', 'python', codeExamples.helloWorld.python);
            codeEditor.createInlineEditor('editor-javascript-hello', 'javascript', codeExamples.helloWorld.javascript);
            codeEditor.createInlineEditor('editor-java-hello', 'java', codeExamples.helloWorld.java);
            
            // Initialize Variables examples
            codeEditor.createInlineEditor('editor-cpp-vars', 'cpp', codeExamples.variables.cpp);
            codeEditor.createInlineEditor('editor-python-vars', 'python', codeExamples.variables.python);
            codeEditor.createInlineEditor('editor-javascript-vars', 'javascript', codeExamples.variables.javascript);
            
            // Initialize Loops examples
            codeEditor.createInlineEditor('editor-cpp-loops', 'cpp', codeExamples.loops.cpp);
            codeEditor.createInlineEditor('editor-python-loops', 'python', codeExamples.loops.python);
            codeEditor.createInlineEditor('editor-javascript-loops', 'javascript', codeExamples.loops.javascript);
        }, 500);
    }).catch(err => {
        console.error('Failed to initialize code playground:', err);
        // Fallback to regular code blocks
        showNotification('Code editor failed to load. Using static examples.', 'warning');
    });
}

// Show example tab
function showExampleTab(tabId) {
    // Hide all example contents
    document.querySelectorAll('.example-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.example-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected content
    const selectedContent = document.getElementById(tabId);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Initialize when practice section is visible
document.addEventListener('DOMContentLoaded', () => {
    // Check if practice section exists
    const practiceSection = document.getElementById('practice');
    if (practiceSection) {
        // Use Intersection Observer to load editor when section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeCodePlayground();
                    observer.disconnect(); // Load only once
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(practiceSection);
    }
});

// Add fullscreen toggle
function toggleFullscreen() {
    const playground = document.querySelector('.code-playground');
    if (playground) {
        playground.classList.toggle('fullscreen');
        
        // Trigger resize for Monaco
        setTimeout(() => {
            codeEditor.editors.forEach(editor => {
                editor.layout();
            });
        }, 100);
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        codeEditor.runCode();
    }
    
    // F11 for fullscreen
    if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
    }
    
    // Ctrl/Cmd + S to save (copy code)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        codeEditor.copyCode();
    }
});
