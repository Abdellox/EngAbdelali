let bookmarks=JSON.parse(localStorage.getItem('bookmarks'))||[],currentFilter='all';function addBookmark(){const title=document.getElementById('titleInput').value.trim();const url=document.getElementById('urlInput').value.trim();const category=document.getElementById('categoryInput').value;if(!title||!url){alert('Please fill all fields!');return}bookmarks.push({id:Date.now(),title,url,category,created:new Date().toISOString()});saveBookmarks();renderBookmarks();document.getElementById('titleInput').value='';document.getElementById('urlInput').value=''}function deleteBookmark(id){if(confirm('Delete this bookmark?')){bookmarks=bookmarks.filter(b=>b.id!==id);saveBookmarks();renderBookmarks()}}function filterBookmarks(filter){currentFilter=filter;document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));event.target.classList.add('active');renderBookmarks()}function renderBookmarks(){const list=document.getElementById('bookmarksList');const filtered=currentFilter==='all'?bookmarks:bookmarks.filter(b=>b.category===currentFilter);if(filtered.length===0){list.innerHTML='<div class="no-bookmarks">No bookmarks yet</div>';return}list.innerHTML=filtered.map(b=>`
<div class="bookmark-item">
<div class="bookmark-info">
<div class="bookmark-title">${b.title}</div>
<a href="${b.url}" target="_blank" class="bookmark-url">${b.url}</a>
<span class="bookmark-category">${b.category}</span>
</div>
<button onclick="deleteBookmark(${b.id})" class="btn-delete">Delete</button>
</div>
`).join('')}function saveBookmarks(){localStorage.setItem('bookmarks',JSON.stringify(bookmarks))}renderBookmarks();console.log('🔖 Bookmark Manager Ready');
