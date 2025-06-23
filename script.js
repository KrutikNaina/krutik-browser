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


newTabBtn.addEventListener('click', () => {
  const newTab = document.createElement('div');
  newTab.className = 'tab';

  const tabTitle = document.createElement('span');
  tabTitle.textContent = 'New Tab';

  const closeBtn = document.createElement('span');
  closeBtn.textContent = ' ❌';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.marginLeft = '8px';
  closeBtn.title = 'Close Tab';

  // Handle tab closing
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent triggering the tab click

    const isActive = newTab.classList.contains('active');
    newTab.remove();

    if (isActive) {
      const nextTab = document.querySelector('.tab:not(#newTab)');
      if (nextTab) {
        setActiveTab(nextTab);
        iframe.src = 'https://www.google.com';
        input.value = 'https://www.google.com';
      } else {
        iframe.src = 'about:blank';
        input.value = '';
      }
    }
  });

  newTab.appendChild(tabTitle);
  newTab.appendChild(closeBtn);

  newTab.addEventListener('click', () => {
    setActiveTab(newTab);
    iframe.src = 'https://www.google.com';
    input.value = 'https://www.google.com';
  });

  tabsContainer.insertBefore(newTab, newTabBtn);
  setActiveTab(newTab);
});
