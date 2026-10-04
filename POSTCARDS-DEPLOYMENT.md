# Coffee-shop postcard link

QR destination: https://packaroo.app/postcards/

The GitHub Pages site provides the install page. The Cloudflare Worker `packaroo-links`, with custom domain `links.packaroo.app`, serves the association file and browser fallback. Its deployed source is maintained in `cloudflare/packaroo-links.js`.

## Routing

- The QR opens Gallery when a compatible app is installed; otherwise it opens the install page.
- The website's Open Gallery link uses https://links.packaroo.app/postcards/ to allow an app handoff from the main website domain.
- Without an app handoff, the Worker redirects to https://packaroo.app/postcards/?open=gallery. This displays installation guidance instead of another Open Gallery link.
- After installation, open Packaroo and choose Send a Postcard on the welcome screen. Universal Links do not preserve the original action across App Store installation.
- No email, postcard storage, or deferred-link service is used.

## Deployment and verification

1. Publish website changes to the GitHub Pages `main` branch.
2. Deploy `cloudflare/packaroo-links.js` to the `packaroo-links` Worker with custom domain `links.packaroo.app`.
3. Verify both domains' `/.well-known/apple-app-site-association` endpoints return 200 directly, valid JSON, and `Content-Type: application/json`. The apex uses the Cloudflare Apple association JSON header transform; the Worker sets its own header.
4. Install a signed app build containing both associated domains (`applinks:packaroo.app` and `applinks:links.packaroo.app`) and Gallery routing. Its application identifier must match `DVX2BBZ68X.com.matic.packaroo-iphone`.
5. Test real QR scans and the website Open Gallery link on iPhone and iPad, with and without the compatible app. Account for Apple's association cache. Test cold/warm launch and fresh onboarding.

The public App Store build must contain this functionality before printing the coffee-shop sign. The existing QR URL does not need to change.
