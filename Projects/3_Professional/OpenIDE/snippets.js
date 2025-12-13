// Language-specific snippets and autocomplete configurations
const languageSnippets = {
    javascript: {
        snippets: [
            {
                label: 'log',
                insertText: 'console.log(${1:message});',
                documentation: 'Log to console'
            },
            {
                label: 'func',
                insertText: 'function ${1:name}(${2:params}) {\n\t${3:// code}\n}',
                documentation: 'Function declaration'
            },
            {
                label: 'arrow',
                insertText: 'const ${1:name} = (${2:params}) => {\n\t${3:// code}\n};',
                documentation: 'Arrow function'
            },
            {
                label: 'class',
                insertText: 'class ${1:ClassName} {\n\tconstructor(${2:params}) {\n\t\t${3:// code}\n\t}\n}',
                documentation: 'Class declaration'
            },
            {
                label: 'if',
                insertText: 'if (${1:condition}) {\n\t${2:// code}\n}',
                documentation: 'If statement'
            },
            {
                label: 'for',
                insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t${3:// code}\n}',
                documentation: 'For loop'
            },
            {
                label: 'foreach',
                insertText: '${1:array}.forEach((${2:item}) => {\n\t${3:// code}\n});',
                documentation: 'ForEach loop'
            },
            {
                label: 'map',
                insertText: '${1:array}.map((${2:item}) => ${3:item})',
                documentation: 'Map array'
            },
            {
                label: 'filter',
                insertText: '${1:array}.filter((${2:item}) => ${3:condition})',
                documentation: 'Filter array'
            },
            {
                label: 'reduce',
                insertText: '${1:array}.reduce((${2:acc}, ${3:item}) => ${4:acc + item}, ${5:0})',
                documentation: 'Reduce array'
            },
            {
                label: 'promise',
                insertText: 'new Promise((resolve, reject) => {\n\t${1:// code}\n})',
                documentation: 'Promise'
            },
            {
                label: 'async',
                insertText: 'async function ${1:name}(${2:params}) {\n\t${3:// code}\n}',
                documentation: 'Async function'
            },
            {
                label: 'try',
                insertText: 'try {\n\t${1:// code}\n} catch (${2:error}) {\n\t${3:// handle error}\n}',
                documentation: 'Try-catch block'
            }
        ]
    },
    python: {
        snippets: [
            {
                label: 'print',
                insertText: 'print(${1:message})',
                documentation: 'Print to console'
            },
            {
                label: 'def',
                insertText: 'def ${1:function_name}(${2:params}):\n\t${3:pass}',
                documentation: 'Function definition'
            },
            {
                label: 'class',
                insertText: 'class ${1:ClassName}:\n\tdef __init__(self, ${2:params}):\n\t\t${3:pass}',
                documentation: 'Class definition'
            },
            {
                label: 'if',
                insertText: 'if ${1:condition}:\n\t${2:pass}',
                documentation: 'If statement'
            },
            {
                label: 'for',
                insertText: 'for ${1:item} in ${2:iterable}:\n\t${3:pass}',
                documentation: 'For loop'
            },
            {
                label: 'while',
                insertText: 'while ${1:condition}:\n\t${2:pass}',
                documentation: 'While loop'
            },
            {
                label: 'try',
                insertText: 'try:\n\t${1:pass}\nexcept ${2:Exception} as ${3:e}:\n\t${4:pass}',
                documentation: 'Try-except block'
            },
            {
                label: 'with',
                insertText: 'with open(${1:filename}, ${2:mode}) as ${3:f}:\n\t${4:pass}',
                documentation: 'With statement'
            },
            {
                label: 'list',
                insertText: '[${1:item} for ${1:item} in ${2:iterable}]',
                documentation: 'List comprehension'
            },
            {
                label: 'dict',
                insertText: '{${1:key}: ${2:value} for ${1:key}, ${2:value} in ${3:iterable}}',
                documentation: 'Dict comprehension'
            }
        ]
    },
    html: {
        snippets: [
            {
                label: 'html5',
                insertText: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Document}</title>\n</head>\n<body>\n\t${2}\n</body>\n</html>',
                documentation: 'HTML5 boilerplate'
            },
            {
                label: 'div',
                insertText: '<div class="${1:className}">\n\t${2}\n</div>',
                documentation: 'Div element'
            },
            {
                label: 'link',
                insertText: '<link rel="stylesheet" href="${1:style.css}">',
                documentation: 'Link stylesheet'
            },
            {
                label: 'script',
                insertText: '<script src="${1:script.js}"></script>',
                documentation: 'Script tag'
            },
            {
                label: 'img',
                insertText: '<img src="${1:image.jpg}" alt="${2:description}">',
                documentation: 'Image tag'
            },
            {
                label: 'a',
                insertText: '<a href="${1:url}">${2:text}</a>',
                documentation: 'Anchor tag'
            },
            {
                label: 'button',
                insertText: '<button type="${1:button}">${2:Click me}</button>',
                documentation: 'Button element'
            },
            {
                label: 'form',
                insertText: '<form action="${1:}" method="${2:post}">\n\t${3}\n</form>',
                documentation: 'Form element'
            }
        ]
    },
    css: {
        snippets: [
            {
                label: 'flex',
                insertText: 'display: flex;\njustify-content: ${1:center};\nalign-items: ${2:center};',
                documentation: 'Flexbox layout'
            },
            {
                label: 'grid',
                insertText: 'display: grid;\ngrid-template-columns: ${1:repeat(3, 1fr)};\ngap: ${2:20px};',
                documentation: 'Grid layout'
            },
            {
                label: 'transition',
                insertText: 'transition: ${1:all} ${2:0.3s} ${3:ease};',
                documentation: 'Transition property'
            },
            {
                label: 'animation',
                insertText: 'animation: ${1:name} ${2:1s} ${3:ease} ${4:infinite};',
                documentation: 'Animation property'
            },
            {
                label: 'gradient',
                insertText: 'background: linear-gradient(${1:135deg}, ${2:#667eea} 0%, ${3:#764ba2} 100%);',
                documentation: 'Linear gradient'
            },
            {
                label: 'shadow',
                insertText: 'box-shadow: ${1:0} ${2:4px} ${3:12px} rgba(0, 0, 0, ${4:0.3});',
                documentation: 'Box shadow'
            }
        ]
    },
    java: {
        snippets: [
            {
                label: 'main',
                insertText: 'public static void main(String[] args) {\n\t${1:// code}\n}',
                documentation: 'Main method'
            },
            {
                label: 'class',
                insertText: 'public class ${1:ClassName} {\n\t${2:// code}\n}',
                documentation: 'Class declaration'
            },
            {
                label: 'sout',
                insertText: 'System.out.println(${1:message});',
                documentation: 'Print to console'
            },
            {
                label: 'for',
                insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n\t${3:// code}\n}',
                documentation: 'For loop'
            },
            {
                label: 'if',
                insertText: 'if (${1:condition}) {\n\t${2:// code}\n}',
                documentation: 'If statement'
            },
            {
                label: 'try',
                insertText: 'try {\n\t${1:// code}\n} catch (${2:Exception} ${3:e}) {\n\t${4:// handle}\n}',
                documentation: 'Try-catch block'
            }
        ]
    }
};

// Register language-specific autocomplete
function registerLanguageProviders(monaco) {
    Object.keys(languageSnippets).forEach(language => {
        monaco.languages.registerCompletionItemProvider(language, {
            provideCompletionItems: (model, position) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn
                };

                const suggestions = languageSnippets[language].snippets.map(snippet => ({
                    label: snippet.label,
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: snippet.insertText,
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: snippet.documentation,
                    range: range
                }));

                return { suggestions };
            }
        });
    });
}
