const appGrid = document.getElementById('app-grid');

const defaultApps = [
  { name: 'Google', url: 'https://www.google.com' },
  { name: 'YouTube', url: 'https://www.youtube.com' },
  { name: 'Facebook', url: 'https://www.facebook.com' },
  { name: 'Twitter', url: 'https://www.twitter.com' },
  { name: 'GitHub', url: 'https://www.github.com' },
  { name: 'Reddit', url: 'https://www.reddit.com' },
  { name: 'Netflix', url: 'https://www.netflix.com' },
  { name: 'Amazon', url: 'https://www.amazon.com' },
];

function getFaviconUrl(url) {
  try {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`;
  } catch (e) {
    console.error("Invalid URL for favicon:", url, e);
    return '';
  }
}

function renderApps(apps) {
  appGrid.innerHTML = '';
  apps.forEach(app => {
    const appIcon = document.createElement('div');
    appIcon.className = 'app-icon';
    appIcon.addEventListener('click', () => {
      window.location.href = app.url;
    });

    const appIconImage = document.createElement('img');
    appIconImage.src = getFaviconUrl(app.url);
    appIconImage.alt = app.name;

    const appIconName = document.createElement('p');
    appIconName.textContent = app.name;

    appIcon.appendChild(appIconImage);
    appIcon.appendChild(appIconName);
    appGrid.appendChild(appIcon);
  });
}

function loadApps() {
  chrome.storage.sync.get({ apps: defaultApps }, (data) => {
    renderApps(data.apps);
  });
}

document.addEventListener('DOMContentLoaded', loadApps);

const editButton = document.getElementById('edit-button');
const editModal = document.getElementById('edit-modal');
const closeButton = document.querySelector('.close-button');
const editForm = document.getElementById('edit-form');
const formAppList = document.getElementById('form-app-list');
const addAppButton = document.getElementById('add-app-button');

function openModal() {
  chrome.storage.sync.get({ apps: defaultApps }, (data) => {
    formAppList.innerHTML = '';
    data.apps.forEach(app => {
      addAppToForm(app);
    });
    editModal.style.display = 'block';
  });
}

function closeModal() {
  editModal.style.display = 'none';
}

function addAppToForm(app = { name: '', url: '' }) {
  const appEntry = document.createElement('div');
  appEntry.className = 'form-app-entry';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Name';
  nameInput.value = app.name;
  nameInput.className = 'app-name-input';

  const urlInput = document.createElement('input');
  urlInput.type = 'url';
  urlInput.placeholder = 'URL';
  urlInput.value = app.url;
  urlInput.className = 'app-url-input';

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.textContent = 'Remove';
  removeButton.className = 'remove-app-button';
  removeButton.addEventListener('click', () => {
    appEntry.remove();
  });

  appEntry.appendChild(nameInput);
  appEntry.appendChild(urlInput);
  appEntry.appendChild(removeButton);
  formAppList.appendChild(appEntry);
}

editButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
addAppButton.addEventListener('click', () => addAppToForm());

window.addEventListener('click', (event) => {
  if (event.target === editModal) {
    closeModal();
  }
});

editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newApps = [];
  const appEntries = formAppList.querySelectorAll('.form-app-entry');

  appEntries.forEach(entry => {
    const name = entry.querySelector('.app-name-input').value.trim();
    const url = entry.querySelector('.app-url-input').value.trim();
    if (name && url) {
      newApps.push({ name, url });
    }
  });

  chrome.storage.sync.set({ apps: newApps }, () => {
    renderApps(newApps);
    closeModal();
  });
});
