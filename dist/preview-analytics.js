(() => {
  const projectToken = 'phc_CKqJzCEznC9an7XcqCaTszib2cwqEWZNRNxXi6s5SJvo';
  const endpoint = 'https://us.i.posthog.com/i/v0/e/';
  const preview = new URLSearchParams(window.location.search).get('preview');

  if (!projectToken || preview !== 'bookkeeping-outreach') return;

  const event = {
    api_key: projectToken,
    event: 'bookkeeping_preview_opened',
    distinct_id: crypto.randomUUID(),
    properties: {
      preview,
      $process_person_profile: false,
      $geoip_disable: true,
    },
  };

  void fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    keepalive: true,
  }).catch(() => {
    // Analytics must never interrupt the preview.
  });
})();
