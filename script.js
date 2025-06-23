const input = document.getElementById('url');
const iframe = document.getElementById('browser-view');
const toggle = document.getElementById('darkToggle');
const back = document.getElementById('back');
const reload = document.getElementById('reload');
const settings = document.getElementById('settings');
const newTabBtn = document.getElementById('newTab');
const tabsContainer = document.querySelector('.tabs');

// 🌐 Navigate to URL
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    let url = input.value.trim();
    if (!url.startsWith('http')) url = 'https://' + url;
    iframe.src = url;
    updateTabTitle(url);
  }
});

// 🔄 Reload
reload.addEventListener('click', () => {
  iframe.src = iframe.src;
});

// 🔙 Back
back.addEventListener('click', () => {
  try {
    iframe.contentWindow.history.back();
  } catch (err) {
    console.warn("Back failed", err);
  }
});

// 🌙 Dark Mode
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// ⚙️ Settings (Temporary Alert)
settings.addEventListener('click', () => {
  alert("Settings panel coming soon!");
});

// ➕ New Tab (Basic Simulation)
newTabBtn.addEventListener('click', () => {
  const newTab = document.createElement('div');
  newTab.className = 'tab';
  newTab.textContent = 'New Tab';
  newTab.addEventListener('click', () => {
    setActiveTab(newTab);
  });
  tabsContainer.insertBefore(newTab, newTabBtn);
  setActiveTab(newTab);
  iframe.src = 'https://www.google.com'; // Default for new tab
  input.value = 'https://www.google.com';
});

// 🧠 Helper: Make tab active
function setActiveTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
}

// 🧠 Helper: Update tab title with URL
function updateTabTitle(url) {
  const activeTab = document.querySelector('.tab.active');
  if (activeTab) {
    activeTab.textContent = new URL(url).hostname.replace("www.", "");
  }
}

// 🧠 Auto-fill URL input when page loads
iframe.addEventListener('load', () => {
  input.value = iframe.src;
});
