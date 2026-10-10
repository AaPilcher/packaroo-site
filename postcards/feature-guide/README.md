# Postcard feature explainer

Open `index.html` in a browser. The page, styles, interactive rule examples, and screenshot viewer work offline with no build step or external dependencies.

This is a product/developer reference for the branch state on October 9, 2026. It distinguishes implemented behavior, known release issues, and recommendations. It is not a public marketing page or a deployment record.

## Screenshots

The app images in `assets/` are actual captures of the running Packaroo app on the iPhone 17 Pro simulator, iOS 26.0.1. They show the trip menu, local postcard list, composer front and back, image menu, framing editor, and landscape layout. They have not been retouched. Sample trip content is used; no production postcard was uploaded to create this explainer.

Sharing states are explained as text rather than fabricated screenshots. Refresh screenshots and update the dated implementation notes when behavior changes. Preserve the distinction between creating a hosted link and actually delivering a message.

## Preview

From the repository root, run `python3 -m http.server 8768 --bind 127.0.0.1` and open `http://127.0.0.1:8768/Docs/postcards/`.

See the developer-reference links within the page for the implementation sources. The allowance is intentionally device-local; the saved-card library does not sync through iCloud. Web crop preservation still needs deployment, and the observed Trips-list rotation dismissal needs follow-up.

`assets/recipient-attribution.jpg` is an actual browser capture of the updated Worker rendered locally with sample artwork. It shows the linked header icon, Figtree heading, attribution footer, and official App Store badge for iPhone and iPad. It is not a live production postcard.

The current walkthrough uses refreshed entry, collection, stamped composer, and refined landscape captures. Additional earlier captures remain as design history. `recipient-stamp.jpg` shows the locally rendered hosted back.

`flows/sender.mmd` and `flows/recipient.mmd` contain editable Mermaid sequence diagrams, also shown as copyable source in the expandable Developer flows section. They do not require a remote JavaScript dependency.
