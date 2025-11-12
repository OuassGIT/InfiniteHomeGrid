const appGrid = document.getElementById('app-grid');

function getFaviconUrl(url) {
  try {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`;
  } catch (e) {
    console.error("Invalid URL for favicon:", url, e);
    return ''; // Return empty string or a default icon path
  }
}

const apps = [
  { name: 'Google', url: 'https://www.google.com' },
  { name: 'YouTube', url: 'https://www.youtube.com' },
  { name: 'Facebook', url: 'https://www.facebook.com' },
  { name: 'Twitter', url: 'https://www.twitter.com' },
  { name: 'GitHub', url: 'https://www.github.com' },
  { name: 'Reddit', url: 'https://www.reddit.com' },
  { name: 'Netflix', url: 'https://www.netflix.com' },
  { name: 'Amazon', url: 'https://www.amazon.com' },
];

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
