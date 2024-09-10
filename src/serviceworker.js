self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('favicon.ico')) {
    // Intercept the request and do nothing (effectively blocking it)
    event.respondWith(
      new Response(null, { status: 404, statusText: 'Not Found' })
    );
  } else {
    // Allow other requests to proceed
    event.respondWith(fetch(event.request));
  }
});
