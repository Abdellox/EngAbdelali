let currentSummary = '';

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  
  if (tab === 'pdf') {
    document.querySelector('.tab:first-child').classList.add('active');
    document.getElementById('pdf-tab').classList.add('active');
  } else {
    document.querySelector('.tab:last-child').classList.add('active');
    document.getElementById('title-tab').classList.add('active');
  }
}

async function summarizePDF() {
  const fileInput = document.getElementById('pdfFile');
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Please select a PDF file');
    return;
  }

  const formData = new FormData();
  formData.append('pdf', file);

  showLoading();

  try {
    const response = await fetch('/api/summarize-pdf', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    
    if (response.ok) {
      displaySummary(data.summary);
    } else {
      alert('Error: ' + data.error);
      hideLoading();
    }
  } catch (error) {
    alert('Error: ' + error.message);
    hideLoading();
  }
}

async function summarizeTitle() {
  const titleInput = document.getElementById('bookTitle');
  const title = titleInput.value.trim();
  
  if (!title) {
    alert('Please enter a book title');
    return;
  }

  showLoading();

  try {
    const response = await fetch('/api/summarize-title', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    const data = await response.json();
    
    if (response.ok) {
      displaySummary(data.summary);
    } else {
      alert('Error: ' + data.error);
      hideLoading();
    }
  } catch (error) {
    alert('Error: ' + error.message);
    hideLoading();
  }
}

function showLoading() {
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('result').classList.add('hidden');
}

function hideLoading() {
  document.getElementById('loading').classList.add('hidden');
}

function displaySummary(summary) {
  currentSummary = summary;
  document.getElementById('summary').textContent = summary;
  document.getElementById('result').classList.remove('hidden');
  hideLoading();
  
  // Scroll to result
  document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}

function copyToClipboard() {
  navigator.clipboard.writeText(currentSummary).then(() => {
    alert('Summary copied to clipboard!');
  });
}

function downloadSummary() {
  const blob = new Blob([currentSummary], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'book-summary.txt';
  a.click();
  URL.revokeObjectURL(url);
}
