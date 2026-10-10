'use strict';
const scenarios = {
  cancel: ['The postcard stays ready.', 'Creating the link used the free allowance. The saved link can still be shared for free; cancelling the share sheet does not use the correction.'],
  typo: ['Use the one free correction.', 'Reopen the original free postcard and edit it. Confirm before creating the replacement link. There is no correction deadline, and the earlier link still shows the earlier version.'],
  again: ['Share the existing link for free.', 'Open the saved postcard and tap Share. While the link is valid, no new upload or allowance is needed. Its original expiry date stays the same.'],
  third: ['A subscription is required.', 'After the free original and its one correction, creating another version requires a subscription. Existing unexpired links remain free to share.'],
  'expired-sub': ['Keep sharing the saved link.', 'Subscription expiry does not invalidate postcards already created. Reshare a saved link for free until its own expiry date. Creating another card requires an available creation entitlement.'],
  failure: ['Keep the draft and the allowance.', 'Only a validated successful creation response consumes the allowance. A failed upload can be retried; it does not spend the original free card or the correction.'],
  sample: ['The same allowance still applies.', 'Recreating or revisiting the Sample Trip does not reset the local allowance. This closes the ordinary repeat-demo path without introducing account-wide anti-abuse checks.']
};
const scenarioSelect = document.getElementById('scenario');
const scenarioResult = document.getElementById('scenario-result');
scenarioSelect.addEventListener('change', () => {
  const [title, body] = scenarios[scenarioSelect.value];
  scenarioResult.querySelector('h3').textContent = title;
  scenarioResult.querySelector('p').textContent = body;
});
const viewer = document.getElementById('image-viewer');
const largeImage = document.getElementById('large-image');
const caption = document.getElementById('large-caption');
document.querySelectorAll('.shot').forEach(button => {
  button.addEventListener('click', () => {
    largeImage.src = button.dataset.image;
    largeImage.alt = button.querySelector('img').alt;
    caption.textContent = button.dataset.caption;
    viewer.showModal();
  });
});
viewer.addEventListener('click', event => {
  if (event.target === viewer) {
    const bounds = viewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
  }
});
