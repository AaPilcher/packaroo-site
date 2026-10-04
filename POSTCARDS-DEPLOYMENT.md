# Coffee-shop postcard link

QR destination: https://packaroo.app/postcards/

This change adds one static install page and the Apple association file. It does not send email, store postcards, or require a backend.

## Release checklist

1. Release the app version containing Gallery postcard creation, `packaroo://postcards`, and `applinks:packaroo.app`. Confirm Associated Domains is enabled for the app identifier and the distribution signing profile includes it.
2. Confirm the signed application's application-identifier matches `DVX2BBZ68X.com.matic.packaroo-iphone` before publishing the association file.
3. Deploy this website branch through the existing GitHub Pages workflow. The `.nojekyll` file ensures `.well-known` is published as static content.
4. Verify `https://packaroo.app/.well-known/apple-app-site-association` returns 200 directly, with no redirects, and `Content-Type: application/json`. If GitHub Pages returns a different type, configure a Cloudflare response-header transform rule for this exact path to set it to `application/json`; the hostname must be proxied for Cloudflare's rule to apply. Leave unrelated paths and DNS records unchanged.
5. Verify `/postcards/` returns the install page. No automatic App Store redirect: the page remains useful for returning users and devices that cannot run Packaroo.
6. Test a real QR scan on iPhone and iPad with the released app installed (cold and warm launch), and without it installed. Allow for Apple's association-file cache. Test fresh onboarding and a scan while another screen is open.
7. After installation, scan again or return to the page and tap Open Gallery. This version does not implement deferred deep linking across installation.

Do not print the sign until the live link and released app work together. Website files are prepared locally; no deployment is performed by this change.
