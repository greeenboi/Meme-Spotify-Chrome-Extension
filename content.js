chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'audioPlaying') {
    var coverArtImage = document.querySelector('img[data-testid="cover-art-image"]');

    if (coverArtImage) {
      coverArtImage.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjdpOHpjcGR4aWJpNjh6YnY4dzJxZnI3NWR3dXBodTlkcXUydXZ1eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Q5Ra0QQUpPYdlFmFrj/giphy.gif';
      console.log('Image found and src changed.'); // Log a message when the image is found
    } else {
      console.log('Image not found.'); // Log a message when the image is not found
    }
  }
});