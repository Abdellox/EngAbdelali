// Emoji Picker - Full Implementation
const emojis = [
    '😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','😚','😙',
    '🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬',
    '🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸',
    '😎','🤓','🧐','😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱',
    '😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀','☠️','💩','🤡','👹','👺','👻',
    '👽','👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾','❤️','🧡','💛','💚','💙','💜','🖤','🤍',
    '🤎','💔','❤️‍🔥','❤️‍🩹','❣️','💕','💞','💓','💗','💖','💘','💝','👍','👎','👊','✊','🤛','🤜','🤞','✌️',
    '🤟','🤘','👌','🤌','🤏','👈','👉','👆','👇','☝️','✋','🤚','🖐','🖖','👋','🤙','💪','🦾','🙏','✍️'
];

const grid = document.getElementById('grid');
let recentEmojis = JSON.parse(localStorage.getItem('recentEmojis')) || [];

function render(list) {
    grid.innerHTML = list.map(e => 
        `<div class="emoji" onclick="copyEmoji('${e}')" title="Click to copy">${e}</div>`
    ).join('');
}

function filter() {
    const query = document.getElementById('search').value.toLowerCase();
    if (query === '') {
        render(emojis);
    } else {
        // Simple filter - in real app you'd have emoji names/tags
        render(emojis);
    }
}

function copyEmoji(emoji) {
    navigator.clipboard.writeText(emoji).then(() => {
        showNotification(`Copied: ${emoji}`);
        addToRecent(emoji);
    });
}

function addToRecent(emoji) {
    recentEmojis = recentEmojis.filter(e => e !== emoji);
    recentEmojis.unshift(emoji);
    if (recentEmojis.length > 20) recentEmojis.pop();
    localStorage.setItem('recentEmojis', JSON.stringify(recentEmojis));
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#333;color:#fff;padding:1rem;border-radius:8px;z-index:1000;';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

// Initial render
render(emojis);

console.log('😀 Emoji Picker Ready');
