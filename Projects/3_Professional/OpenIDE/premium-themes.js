// Premium Themes Collection

const premiumThemes = {
    'dracula': {
        name: 'Dracula',
        colors: {
            background: '#282a36',
            foreground: '#f8f8f2',
            selection: '#44475a',
            comment: '#6272a4',
            red: '#ff5555',
            orange: '#ffb86c',
            yellow: '#f1fa8c',
            green: '#50fa7b',
            purple: '#bd93f9',
            cyan: '#8be9fd',
            pink: '#ff79c6'
        }
    },
    'monokai': {
        name: 'Monokai',
        colors: {
            background: '#272822',
            foreground: '#f8f8f2',
            selection: '#49483e',
            comment: '#75715e',
            red: '#f92672',
            orange: '#fd971f',
            yellow: '#e6db74',
            green: '#a6e22e',
            purple: '#ae81ff',
            cyan: '#66d9ef',
            pink: '#f92672'
        }
    },
    'nord': {
        name: 'Nord',
        colors: {
            background: '#2e3440',
            foreground: '#d8dee9',
            selection: '#434c5e',
            comment: '#616e88',
            red: '#bf616a',
            orange: '#d08770',
            yellow: '#ebcb8b',
            green: '#a3be8c',
            purple: '#b48ead',
            cyan: '#88c0d0',
            pink: '#b48ead'
        }
    },
    'synthwave': {
        name: 'Synthwave 84',
        colors: {
            background: '#262335',
            foreground: '#f92aad',
            selection: '#463465',
            comment: '#848bbd',
            red: '#fe4450',
            orange: '#f97e72',
            yellow: '#fede5d',
            green: '#72f1b8',
            purple: '#b362ff',
            cyan: '#36f9f6',
            pink: '#ff7edb'
        }
    },
    'cyberpunk': {
        name: 'Cyberpunk',
        colors: {
            background: '#000b1e',
            foreground: '#00ff9f',
            selection: '#0a2463',
            comment: '#3e92cc',
            red: '#ff006e',
            orange: '#fb5607',
            yellow: '#ffbe0b',
            green: '#00ff9f',
            purple: '#8338ec',
            cyan: '#00d9ff',
            pink: '#ff006e'
        }
    },
    'ocean': {
        name: 'Ocean',
        colors: {
            background: '#1b2b34',
            foreground: '#c0c5ce',
            selection: '#343d46',
            comment: '#65737e',
            red: '#ec5f67',
            orange: '#f99157',
            yellow: '#fac863',
            green: '#99c794',
            purple: '#c594c5',
            cyan: '#5fb3b3',
            pink: '#c594c5'
        }
    }
};

class ThemeManager {
    constructor() {
        this.currentTheme = 'vs-dark';
        this.customThemes = this.loadCustomThemes();
    }

    loadCustomThemes() {
        const saved = localStorage.getItem('custom-themes');
        return saved ? JSON.parse(saved) : {};
    }

    applyPremiumTheme(themeName) {
        const theme = premiumThemes[themeName];
        if (!theme) return;

        // Apply to Monaco Editor
        monaco.editor.defineTheme(themeName, {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: theme.colors.comment.substring(1) },
                { token: 'keyword', foreground: theme.colors.purple.substring(1) },
                { token: 'string', foreground: theme.colors.yellow.substring(1) },
                { token: 'number', foreground: theme.colors.orange.substring(1) },
                { token: 'function', foreground: theme.colors.green.substring(1) }
            ],
            colors: {
                'editor.background': theme.colors.background,
                'editor.foreground': theme.colors.foreground,
                'editor.selectionBackground': theme.colors.selection,
                'editorCursor.foreground': theme.colors.cyan
            }
        });
        monaco.editor.setTheme(themeName);

        // Apply to IDE UI
        document.documentElement.style.setProperty('--bg-primary', theme.colors.background);
        document.documentElement.style.setProperty('--bg-secondary', this.lighten(theme.colors.background, 10));
        document.documentElement.style.setProperty('--text-primary', theme.colors.foreground);
        document.documentElement.style.setProperty('--accent-color', theme.colors.purple);

        this.currentTheme = themeName;
        toastManager.show(`Theme changed to ${theme.name}`, 'success');
    }

    lighten(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }

    showThemeGallery() {
        const panel = document.createElement('div');
        panel.className = 'command-palette active';
        panel.style.width = '800px';
        panel.style.maxWidth = '90%';
        
        panel.innerHTML = `
            <div style="padding: 20px;">
                <h2 style="margin-bottom: 20px; color: #667eea;">🎨 Theme Gallery</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; max-height: 500px; overflow-y: auto;">
                    ${Object.entries(premiumThemes).map(([key, theme]) => `
                        <div class="theme-card" onclick="applyThemeFromGallery('${key}')" 
                             style="background: ${theme.colors.background}; 
                                    border: 2px solid ${theme.colors.selection}; 
                                    border-radius: 8px; 
                                    padding: 15px; 
                                    cursor: pointer; 
                                    transition: all 0.3s;
                                    position: relative;
                                    overflow: hidden;">
                            <div style="color: ${theme.colors.foreground}; font-weight: 600; margin-bottom: 10px;">
                                ${theme.name}
                            </div>
                            <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                                ${Object.values(theme.colors).slice(3).map(color => `
                                    <div style="width: 20px; height: 20px; background: ${color}; border-radius: 3px;"></div>
                                `).join('')}
                            </div>
                            <div class="theme-hover-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
                                 background: rgba(102, 126, 234, 0.1); opacity: 0; transition: opacity 0.3s;"></div>
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-secondary" onclick="this.closest('.command-palette').remove()" 
                        style="margin-top: 20px; width: 100%;">Close</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Add hover effects
        panel.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.querySelector('.theme-hover-overlay').style.opacity = '1';
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
            });
            card.addEventListener('mouseleave', () => {
                card.querySelector('.theme-hover-overlay').style.opacity = '0';
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
        });
    }

    createCustomTheme() {
        const name = prompt('Theme name:');
        if (!name) return;

        const theme = {
            name,
            colors: {
                background: prompt('Background color:', '#1e1e1e') || '#1e1e1e',
                foreground: prompt('Text color:', '#d4d4d4') || '#d4d4d4',
                accent: prompt('Accent color:', '#667eea') || '#667eea'
            }
        };

        this.customThemes[name.toLowerCase().replace(/\s+/g, '-')] = theme;
        localStorage.setItem('custom-themes', JSON.stringify(this.customThemes));
        toastManager.show(`Custom theme "${name}" created!`, 'success');
    }
}

let themeManager;

function initializeThemeManager() {
    themeManager = new ThemeManager();
    
    // Add theme commands
    if (commandPalette) {
        commandPalette.commands.push(
            { name: 'Theme Gallery', icon: '🎨', shortcut: '', action: () => themeManager.showThemeGallery() },
            { name: 'Create Custom Theme', icon: '🖌️', shortcut: '', action: () => themeManager.createCustomTheme() }
        );
        commandPalette.renderCommands();
    }
}

function applyThemeFromGallery(themeName) {
    themeManager.applyPremiumTheme(themeName);
    document.querySelector('.command-palette').remove();
}
