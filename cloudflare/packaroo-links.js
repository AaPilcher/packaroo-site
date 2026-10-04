// Deployed to the packaroo-links Worker, custom domain links.packaroo.app.
export default {
  async fetch(request) {
    const path = new URL(request.url).pathname;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    if (path === '/.well-known/apple-app-site-association') {
      return new Response(request.method === 'HEAD' ? null : JSON.stringify({
        applinks: { details: [{
          appIDs: ['DVX2BBZ68X.com.matic.packaroo-iphone'],
          components: [{ '/': '/postcards' }, { '/': '/postcards/' }]
        }] }
      }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' } });
    }
    if (path === '/postcards' || path === '/postcards/') {
      return Response.redirect('https://packaroo.app/postcards/?open=gallery', 302);
    }
    return new Response('Not found', { status: 404 });
  }
};
