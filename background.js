let isPlaying = false;

function checkIfSpotify(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    if (tab && tab.url && tab.url.includes('open.spotify.com')) {
      chrome.action.setIcon({path: 'images/on.png', tabId: tab.id});
      if (tab.audible && !isPlaying) {
        isPlaying = true;
        chrome.action.setIcon({path: 'images/playing.png', tabId: tab.id});
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        }).then(() => {
          chrome.tabs.sendMessage(tab.id, {message: 'audioPlaying'});
          console.log('Injected content.js');
        }).catch((error) => {
          console.error('Failed to execute script: ', error);
        });
      } else if (!tab.audible && isPlaying) {
        isPlaying = false;
        chrome.action.setIcon({path: 'images/on.png', tabId: tab.id});
      }
    }
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    checkIfSpotify(tabId);
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  checkIfSpotify(activeInfo.tabId);
});