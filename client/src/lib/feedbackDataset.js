/**
 * Evidalis — Evidence & Decision Intelligence Platform
 * Developed by: AkDev (คภкเՇ ɠยקՇค)
 * Portfolio: https://akdevme.netlify.app
 * Search on Google: "ak dev uix"
 * 
 * 7001 Feedback Pool & Live Streaming Engine
 * 4 Core Categories: Product Feedback, Customer Service, Fraud and Scam, Operational Issues
 */

export const TOTAL_FEEDBACK_POOL = 7001;

export const CATEGORIES = [
  'Product Feedback',
  'Customer Service',
  'Fraud and Scam',
  'Operational Issues',
];

export const CLUSTERS = {
  'Product Feedback': [
    { id: 'PF-101', name: 'Mobile Checkout & Payment Flow', urgency: 'high', sentiment: 'negative' },
    { id: 'PF-102', name: 'Data Export & Multi-Format Encoding', urgency: 'medium', sentiment: 'negative' },
    { id: 'PF-103', name: 'Dashboard Navigation & UI Clarity', urgency: 'low', sentiment: 'neutral' },
    { id: 'PF-104', name: 'Third-Party Webhooks & API Keys', urgency: 'medium', sentiment: 'neutral' },
  ],
  'Customer Service': [
    { id: 'CS-201', name: 'First-Response Wait Time & Queue Latency', urgency: 'high', sentiment: 'negative' },
    { id: 'CS-202', name: 'Technical Support Escalation Bottleneck', urgency: 'medium', sentiment: 'negative' },
    { id: 'CS-203', name: 'Billing Confusion & Invoice Discrepancies', urgency: 'high', sentiment: 'negative' },
    { id: 'CS-204', name: 'Self-Serve Help Center Documentation', urgency: 'low', sentiment: 'neutral' },
  ],
  'Fraud and Scam': [
    { id: 'FS-301', name: 'Phishing Attempts & Suspicious Direct Links', urgency: 'high', sentiment: 'negative' },
    { id: 'FS-302', name: 'Unauthorized Account Login & Session Hijacking', urgency: 'high', sentiment: 'negative' },
    { id: 'FS-303', name: 'Stolen Card Chargeback & Payment Fraud', urgency: 'high', sentiment: 'negative' },
    { id: 'FS-304', name: 'Impersonation & Fake Verified Merchant Profiles', urgency: 'medium', sentiment: 'negative' },
  ],
  'Operational Issues': [
    { id: 'OI-401', name: 'Server Gateway Outage & HTTP 502/504 Errors', urgency: 'high', sentiment: 'negative' },
    { id: 'OI-402', name: 'Database Replication & Sync Lag', urgency: 'medium', sentiment: 'negative' },
    { id: 'OI-403', name: 'API Rate Limiting & Sudden 429 Throttling', urgency: 'medium', sentiment: 'negative' },
    { id: 'OI-404', name: 'Global CDN Static Asset Delivery Delay', urgency: 'low', sentiment: 'neutral' },
  ],
};

// Seed message templates for each cluster
const TEMPLATES = {
  'PF-101': [
    'Checkout crashes every time on Safari mobile when tapping Apple Pay.',
    'Payment button stays disabled after entering shipping address on mobile.',
    'Apple Pay initialization fails with a spinning loader on iPhone 15.',
    'Card payment screen times out without confirming if my order went through.',
    'Cannot complete purchase on mobile web; modal freezes at authorization.',
  ],
  'PF-102': [
    'CSV export button truncates foreign UTF-8 characters into question marks.',
    'Exported customer report has scrambled accents when opened in Excel.',
    'Large data exports time out before the download link is generated.',
    'Missing column headers when downloading the monthly transaction CSV.',
    'Excel says the exported CSV file is corrupt due to missing BOM headers.',
  ],
  'PF-103': [
    'Would be really helpful if we could save customized dashboard filter views.',
    'The new sidebar navigation collapses too quickly on tablet screens.',
    'Table pagination resets back to page 1 whenever I apply a tag filter.',
    'Please add dark mode contrast adjustments for low-light trading sessions.',
    'Search bar doesn’t auto-focus when opening the feedback inspection modal.',
  ],
  'PF-104': [
    'Webhook delivery fails silently when our receiving endpoint returns 204.',
    'Need support for signing webhook payloads with HMAC-SHA256 headers.',
    'API documentation for custom webhook callbacks is outdated.',
    'Zapier integration stopped syncing new contacts after the recent update.',
    'Please increase rate limit thresholds for enterprise webhook payloads.',
  ],
  'CS-201': [
    'Waited over 48 hours for a reply to our critical billing ticket.',
    'Live chat support bot loops continuously and never routes to a human agent.',
    'Support response time has degraded significantly over the last two weeks.',
    'No one has responded to our urgent inquiry regarding disabled accounts.',
    'Ticket was marked as resolved automatically before anyone answered.',
  ],
  'CS-202': [
    'Tier 1 support representative didn’t understand the database sync issue.',
    'Escalated to engineering three days ago but received no status update.',
    'Support agent kept asking for logs we had already uploaded to the ticket.',
    'Need direct access to a technical account manager for enterprise incidents.',
    'Ticket bounced between three different departments without resolution.',
  ],
  'CS-203': [
    'Charged twice for our annual seat subscription renewal last Monday.',
    'Invoice shows incorrect VAT calculation for our EU registered entity.',
    'Refund was promised 10 business days ago but still has not reflected in bank.',
    'Upgraded plan mid-month but were billed full price for both tiers.',
    'Cannot remove expired corporate credit card without contacting support.',
  ],
  'CS-204': [
    'Help center article on SSO integration references deprecated endpoints.',
    'Video tutorial links in onboarding documentation return 404 errors.',
    'Search function in help docs fails to return relevant API setup guides.',
    'Need step-by-step documentation for configuring SAML 2.0 with Okta.',
    'Troubleshooting steps for error code ERR_AUTH_809 are missing from docs.',
  ],
  'FS-301': [
    'Received suspicious email claiming our account was suspended with a fake link.',
    'Phishing site mimicking your login portal is circulating via SMS.',
    'Someone tried resetting our password from an unrecognized IP in Eastern Europe.',
    'Fake security alert prompt asked for my 2FA authentication code.',
    'Fraudulent invoice notification directed us to an unverified payment domain.',
  ],
  'FS-302': [
    'Unrecognized login detected from Chrome on Linux while I was asleep.',
    'Session was hijacked and unauthorized API tokens were generated.',
    'Two-factor authentication SMS was intercepted or delayed by several hours.',
    'My account email address was changed without any confirmation email sent.',
    'Suspicious API calls were made using our compromised developer key.',
  ],
  'FS-303': [
    'Spike in unauthorized transactions from prepaid cards across international IPs.',
    'Customer disputing charge claimed card details were stolen in a credential breach.',
    'Multiple failed payment attempts using sequential card numbers detected.',
    'Need automated velocity rules to block fraudulent repeated micro-charges.',
    'Chargeback fee levied without providing opportunity to submit proof of delivery.',
  ],
  'FS-304': [
    'Spotted a fraudulent merchant account copying our exact brand logo and name.',
    'Fake profile is collecting customer deposits under our company name.',
    'Unauthorized seller account claiming to be our official reseller.',
    'Impersonator contacting our users offering discounted software keys.',
    'Identity verification failed to catch a falsified business registration document.',
  ],
  'OI-401': [
    'API returning HTTP 504 Gateway Timeout during morning peak traffic hours.',
    'Cloudflare error page 502 Bad Gateway displayed for over 15 minutes.',
    'Intermittent 500 Internal Server Errors when querying transaction history.',
    'Production backend was unreachable between 09:15 and 09:35 UTC today.',
    'Load balancer dropped incoming WebSocket connections across US-East cluster.',
  ],
  'OI-402': [
    'Database replica lag reached 120 seconds, causing stale analytics views.',
    'New customer signups not appearing in dashboard for up to 30 minutes.',
    'Database connection pool exhausted during scheduled batch migration.',
    'Real-time sync between web and mobile app is delayed by several minutes.',
    'Search indexing pipeline stalled, preventing newly added items from showing.',
  ],
  'OI-403': [
    'Our service was blocked with HTTP 429 Too Many Requests despite being within quota.',
    'Rate limiter headers (X-RateLimit-Remaining) are missing from API responses.',
    'Sudden throttling on analytics endpoints during standard reporting export.',
    'API rate limit window reset calculation appears inconsistent across endpoints.',
    'Need temporary rate limit burst allowance during quarterly audit runs.',
  ],
  'OI-404': [
    'Static CSS and JavaScript assets failing to load in Southeast Asia region.',
    'CDN cache purge took over 45 minutes to invalidate outdated frontend bundle.',
    'User avatars and uploaded attachments returning HTTP 403 from S3 CDN origin.',
    'High asset latency over 2.4 seconds observed on edge servers in Tokyo.',
    'Font files blocked by CORS policy on secondary asset distribution domain.',
  ],
};

/**
 * Procedurally generates a consistent feedback item for any index in [0, 7000]
 */
export const getFeedbackByIndex = (index) => {
  const safeIdx = Math.abs(index % TOTAL_FEEDBACK_POOL);
  const categoryIndex = safeIdx % CATEGORIES.length;
  const category = CATEGORIES[categoryIndex];
  const clusterList = CLUSTERS[category];
  const clusterIndex = Math.floor(safeIdx / CATEGORIES.length) % clusterList.length;
  const cluster = clusterList[clusterIndex];

  const templates = TEMPLATES[cluster.id] || TEMPLATES['PF-101'];
  const templateIndex = (Math.floor(safeIdx / (CATEGORIES.length * clusterList.length)) + safeIdx) % templates.length;
  const feedbackText = templates[templateIndex];

  // Procedural timestamp in recent days
  const baseTime = new Date('2026-10-11T12:00:00Z').getTime();
  const offsetMs = (TOTAL_FEEDBACK_POOL - safeIdx) * 60 * 1000 * 2.5;
  const createdAt = new Date(baseTime - offsetMs).toISOString();

  return {
    _id: safeIdx + 1,
    pool_index: safeIdx,
    customer_id: `usr_${1000 + (safeIdx % 4890)}`,
    category,
    cluster_id: cluster.id,
    cluster: cluster.name,
    feedback_text: feedbackText,
    urgency: cluster.urgency,
    sentiment: cluster.sentiment,
    created_at: createdAt,
  };
};

/**
 * Returns a live review using Math.random() from the 7001 pool with current timestamp
 */
export const getRandomLiveReview = () => {
  const randomIndex = Math.floor(Math.random() * TOTAL_FEEDBACK_POOL);
  const review = getFeedbackByIndex(randomIndex);
  return {
    ...review,
    _id: Math.floor(Math.random() * 900000) + 100000, // Unique runtime ID
    created_at: new Date().toISOString(),
    is_live_arrival: true,
  };
};

/**
 * Returns an initial seed set of reviews (e.g. 25 historical reviews)
 */
export const getInitialFeedbackSeed = (count = 24) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    // Pick diverse items from different categories
    const idx = (i * 293 + 47) % TOTAL_FEEDBACK_POOL;
    items.push(getFeedbackByIndex(idx));
  }
  return items;
};

// LocalStorage Base64 persistence helpers
const STORAGE_KEY = 'evidalis_live_feed_b64';
const LEGACY_STORAGE_KEY = 'insightflow_live_feed_b64';

export const savePersistedFeed = (reviews) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const jsonStr = JSON.stringify(reviews.slice(0, 100)); // Persist top 100 recent
    const b64Str = btoa(unescape(encodeURIComponent(jsonStr)));
    window.localStorage.setItem(STORAGE_KEY, b64Str);
  } catch (err) {
    console.warn('[Evidalis] Could not save feed to localStorage:', err);
  }
};

export const loadPersistedFeed = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const b64Str = window.localStorage.getItem(STORAGE_KEY) || window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!b64Str) return null;
    const jsonStr = decodeURIComponent(escape(atob(b64Str)));
    const parsed = JSON.parse(jsonStr);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch (err) {
    console.warn('[Evidalis] Could not load feed from localStorage:', err);
    return null;
  }
};
