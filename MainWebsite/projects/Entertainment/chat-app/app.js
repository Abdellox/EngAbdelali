let messages=JSON.parse(localStorage.getItem('chatMessages'))||[];function sendMessage(){const input=document.getElementById('messageInput');const text=input.value.trim();if(!text)return;messages.push({id:Date.now(),text,sender:'user',time:new Date().toISOString()});save();render();input.value='';setTimeout(()=>{const responses=['Hey! How are you?','That sounds great!','Tell me more!','Interesting!','I see what you mean','Cool!','Awesome!','Got it!'];const response=responses[Math.floor(Math.random()*responses.length)];messages.push({id:Date.now(),text:response,sender:'bot',time:new Date().toISOString()});save();render()},1000)}function render(){const container=document.getElementById('messages');container.innerHTML=messages.map(m=>`
<div class="message ${m.sender}">
<div class="message-content">${m.text}</div>
<div class="message-time">${new Date(m.time).toLocaleTimeString()}</div>
</div>
`).join('');container.scrollTop=container.scrollHeight}function save(){localStorage.setItem('chatMessages',JSON.stringify(messages))}render();console.log('💬 Chat App Ready');
