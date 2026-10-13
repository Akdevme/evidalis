import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CATEGORIES = [
  'Product Feedback',
  'Customer Service',
  'Fraud and Scam',
  'Operational Issues',
];

export const CLUSTERS = {
  'Product Feedback': [
    { id: 'PF-101', name: 'Mobile Checkout & Payment Flow Latency', urgency: 'high', rootCause: 'WebKit PaymentSession callback deadlock on Safari iOS.' },
    { id: 'PF-102', name: 'Defects, Replacements & Build Quality', urgency: 'high', rootCause: 'Batch quality variance in hardware enclosure sealing.' },
    { id: 'PF-103', name: 'Feature Usability & Search Filters', urgency: 'medium', rootCause: 'Complex multi-layered nested filter menus without default reset indicators.' },
  ],
  'Customer Service': [
    { id: 'CS-201', name: 'Unresponsive Support & Queue Latency (>48h)', urgency: 'high', rootCause: 'Tier-1 ticket routing bottleneck without automated severity triage.' },
    { id: 'CS-202', name: 'Rapid Resolution & Helpful Agents', urgency: 'low', rootCause: 'High CSAT rating on live chat interactions resolved within first contact.' },
    { id: 'CS-203', name: 'Billing Discrepancies & Refund Delays', urgency: 'high', rootCause: 'Manual finance approval pipeline for subscription pro-rata reversals.' },
  ],
  'Fraud and Scam': [
    { id: 'FS-301', name: 'Seller Extortion & Additional Payment Demands', urgency: 'high', rootCause: 'Malicious sellers requesting off-platform payments via messaging.' },
    { id: 'FS-302', name: 'Fraudulent Sellers & Non-Delivery Scams', urgency: 'high', rootCause: 'Insufficient merchant KYC verification prior to store activation.' },
    { id: 'FS-303', name: 'Counterfeit Goods & Account Impersonation', urgency: 'high', rootCause: 'Brand trademark spoofing and cloned profile pictures.' },
  ],
  'Operational Issues': [
    { id: 'OI-401', name: 'Shipping, Logistics & Delivery Delays', urgency: 'high', rootCause: 'Last-mile logistics tracking sync gap between regional hubs and app.' },
    { id: 'OI-402', name: 'Website Checkout, Cart & Order Errors', urgency: 'high', rootCause: 'Database connection exhaustion during scheduled batch sync jobs.' },
    { id: 'OI-403', name: 'Notification Delays & Order Status Sync', urgency: 'medium', rootCause: 'Email worker queue latency during peak transaction hours.' },
  ],
};

let cachedDataset = null;

function assignCluster(text, category, idx) {
  const lower = text.toLowerCase();
  const clusters = CLUSTERS[category] || CLUSTERS['Product Feedback'];

  if (category === 'Product Feedback') {
    if (lower.includes('defect') || lower.includes('broken') || lower.includes('replace') || lower.includes('damaged')) return clusters[1];
    if (lower.includes('search') || lower.includes('filter') || lower.includes('usability') || lower.includes('find')) return clusters[2];
    return clusters[0];
  }
  if (category === 'Customer Service') {
    if (lower.includes('unresponsive') || lower.includes('slow') || lower.includes('wait') || lower.includes('rude')) return clusters[0];
    if (lower.includes('helpful') || lower.includes('quick') || lower.includes('resolved') || lower.includes('great')) return clusters[1];
    return clusters[2];
  }
  if (category === 'Fraud and Scam') {
    if (lower.includes('additional payment') || lower.includes('extra fee') || lower.includes('extort') || lower.includes('demanding')) return clusters[0];
    if (lower.includes('never sent') || lower.includes('fake seller') || lower.includes('took my money')) return clusters[1];
    return clusters[2];
  }
  if (category === 'Operational Issues') {
    if (lower.includes('delivery') || lower.includes('delayed') || lower.includes('late') || lower.includes('shipping')) return clusters[0];
    if (lower.includes('website') || lower.includes('error') || lower.includes('cart') || lower.includes('checkout')) return clusters[1];
    return clusters[2];
  }
  return clusters[idx % clusters.length];
}

function parseCSV(content) {
  const lines = content.split(/\r\n|\n|\r/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const items = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    let review = '';
    let category = '';

    if (line.startsWith('"')) {
      const quoteEnd = line.lastIndexOf('",');
      if (quoteEnd !== -1) {
        review = line.substring(1, quoteEnd).replace(/""/g, '"');
        category = line.substring(quoteEnd + 2).trim();
      } else {
        const parts = line.split(',');
        category = parts.pop()?.trim() || '';
        review = parts.join(',').replace(/^"|"$/g, '');
      }
    } else {
      const parts = line.split(',');
      if (parts.length >= 2) {
        category = parts.pop()?.trim() || '';
        review = parts.join(',').trim();
      } else {
        review = line;
      }
    }

    category = category.replace(/^["']|["']$/g, '').trim();
    if (!CATEGORIES.includes(category)) {
      if (category.toLowerCase().includes('product')) category = 'Product Feedback';
      else if (category.toLowerCase().includes('service')) category = 'Customer Service';
      else if (category.toLowerCase().includes('fraud')) category = 'Fraud and Scam';
      else if (category.toLowerCase().includes('operation')) category = 'Operational Issues';
      else category = CATEGORIES[i % 4];
    }

    const cluster = assignCluster(review, category, i);

    items.push({
      _id: i,
      customer_id: `usr_${1000 + (i % 4890)}`,
      review,
      feedback_text: review,
      category,
      cluster_id: cluster.id,
      cluster: cluster.name,
      urgency: cluster.urgency,
      created_at: new Date(Date.now() - (7000 - i) * 60000 * 1.4).toISOString(),
    });
  }

  return items;
}

export function loadServerDataset() {
  if (cachedDataset && cachedDataset.length > 0) {
    return cachedDataset;
  }

  const possiblePaths = [
    path.resolve(__dirname, '../../dataset.csv'),
    path.resolve(process.cwd(), 'dataset.csv'),
    path.resolve(process.cwd(), 'server/dataset.csv'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        const content = fs.readFileSync(p, 'utf-8');
        cachedDataset = parseCSV(content);
        console.log(`[DatasetService] Successfully loaded ${cachedDataset.length} rows from ${p}`);
        return cachedDataset;
      } catch (err) {
        console.error(`[DatasetService] Error reading ${p}:`, err);
      }
    }
  }

  console.warn('[DatasetService] dataset.csv not found, generating initial empty state');
  cachedDataset = [];
  return cachedDataset;
}

export function getDatasetStats() {
  const dataset = loadServerDataset();
  const counts = {
    'Product Feedback': 0,
    'Customer Service': 0,
    'Fraud and Scam': 0,
    'Operational Issues': 0,
  };

  dataset.forEach((row) => {
    if (counts[row.category] !== undefined) {
      counts[row.category]++;
    }
  });

  return {
    totalRecords: dataset.length,
    categoryCounts: counts,
  };
}

export function addFeedbackRow(entry) {
  const dataset = loadServerDataset();
  const newRow = {
    _id: Date.now(),
    ...entry,
    created_at: entry.created_at || new Date().toISOString(),
  };
  dataset.unshift(newRow);
  return newRow;
}
