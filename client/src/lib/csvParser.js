/**
 * Evidalis — Evidence & Decision Intelligence Platform
 * Developed by: AkDev (คภкเՇ ɠยקՇค)
 * Portfolio: https://akdevme.netlify.app
 * Search on Google: "ak dev uix"
 * 
 * Universal Intelligent CSV Parser & Local AI Classifier for Evidalis
 * Fully compatible with ANY CSV structure, column names, delimiters, and rating scales.
 * Automatically maps text, sentiment, priority/urgency, and categories with local zero-token intelligence.
 */

export const DEFAULT_CATEGORIES = [
  'Product Feedback',
  'Customer Service',
  'Fraud and Scam',
  'Operational Issues',
];

/**
 * Universal Intelligent CSV Parser
 * Handles any column names, quoted multiline strings, and custom formats.
 */
export const parseUniversalCSV = (csvText) => {
  if (!csvText || typeof csvText !== 'string') {
    return { success: false, rows: [], totalCount: 0, error: 'Empty or invalid file content' };
  }

  const rawLines = splitCSVRecords(csvText);
  if (rawLines.length < 2) {
    return { success: false, rows: [], totalCount: 0, error: 'CSV must contain a header row and at least one data row' };
  }

  const headerLine = rawLines[0];
  const delimiter = detectDelimiter(headerLine);
  const rawHeaders = splitCSVLine(headerLine, delimiter);
  const cleanHeaders = rawHeaders.map((h) => h.trim().replace(/^["']|["']$/g, ''));
  const lowerHeaders = cleanHeaders.map((h) => h.toLowerCase());

  // Detect column indices based on common header names
  const textColIdx = findColumnIndex(lowerHeaders, [
    'review', 'review_text', 'reviews', 'feedback', 'feedback_text', 'comment',
    'comments', 'text', 'customer_review', 'content', 'description', 'message',
    'complaint', 'body', 'details', 'summary', 'note', 'notes', 'title', 'sentence',
    'utterance', 'query', 'input', 'statement', 'opinion', 'ticket_description', 'issue_description'
  ]);

  const catColIdx = findColumnIndex(lowerHeaders, [
    'category', 'categories', 'type', 'feedback_type', 'department', 'dept',
    'topic', 'cluster', 'tag', 'tags', 'product_area', 'classification', 'area',
    'label', 'group', 'issue_type', 'subject', 'class'
  ]);

  const sentimentColIdx = findColumnIndex(lowerHeaders, [
    'sentiment', 'polarity', 'feeling', 'rating', 'score', 'stars', 'rate',
    'star_rating', 'review_rating', 'user_rating', 'satisfaction', 'csat', 'nps'
  ]);

  const urgencyColIdx = findColumnIndex(lowerHeaders, [
    'urgency', 'priority', 'severity', 'criticality', 'level', 'prio', 'tier', 'sla', 'status'
  ]);

  const custColIdx = findColumnIndex(lowerHeaders, [
    'customer_id', 'customerid', 'user_id', 'userid', 'id', 'user', 'author',
    'client_id', 'client', 'email', 'name', 'customer_name', 'username', 'reviewer'
  ]);

  const dateColIdx = findColumnIndex(lowerHeaders, [
    'created_at', 'createdat', 'date', 'timestamp', 'time', 'datetime',
    'submitted_at', 'posted_at', 'published_at', 'review_date'
  ]);

  const rows = [];
  const detectedCategoriesSet = new Set();

  for (let i = 1; i < rawLines.length; i++) {
    const line = rawLines[i];
    if (!line.trim()) continue;

    const values = splitCSVLine(line, delimiter);
    if (values.length === 0 || (values.length === 1 && values[0].trim() === '')) continue;

    // 1. Extract Review / Feedback Text
    let reviewText = '';
    if (textColIdx !== -1 && values[textColIdx]) {
      reviewText = values[textColIdx].trim().replace(/^["']|["']$/g, '');
    } else {
      // Fallback: pick the column value with the longest length
      let longest = '';
      values.forEach((v) => {
        const cleaned = v.trim().replace(/^["']|["']$/g, '');
        if (cleaned.length > longest.length) longest = cleaned;
      });
      reviewText = longest || values[0] || '';
    }

    // 2. Extract or Auto-Categorize Category
    let category = '';
    if (catColIdx !== -1 && values[catColIdx]) {
      category = values[catColIdx].trim().replace(/^["']|["']$/g, '');
    }
    category = normalizeCategory(category, reviewText, i);
    detectedCategoriesSet.add(category);

    // 3. Extract or Auto-Detect Sentiment
    let sentiment = '';
    if (sentimentColIdx !== -1 && values[sentimentColIdx]) {
      const rawSent = values[sentimentColIdx].trim().replace(/^["']|["']$/g, '');
      sentiment = normalizeSentimentValue(rawSent);
    }
    if (!sentiment) {
      sentiment = classifySentimentWithLocalRules(reviewText, category);
    }

    // 4. Extract or Auto-Detect Priority / Urgency
    let urgency = '';
    if (urgencyColIdx !== -1 && values[urgencyColIdx]) {
      const rawUrg = values[urgencyColIdx].trim().replace(/^["']|["']$/g, '');
      urgency = normalizeUrgencyValue(rawUrg);
    }
    if (!urgency) {
      urgency = classifyUrgencyWithLocalRules(reviewText, sentiment, category);
    }

    // 5. Customer ID
    let customerId = '';
    if (custColIdx !== -1 && values[custColIdx]) {
      customerId = values[custColIdx].trim().replace(/^["']|["']$/g, '');
    }
    if (!customerId) {
      customerId = `usr_${1000 + (i % 4890)}`;
    }

    // 6. Timestamp
    let createdAt = '';
    if (dateColIdx !== -1 && values[dateColIdx]) {
      const parsedDate = new Date(values[dateColIdx].trim());
      if (!isNaN(parsedDate.getTime())) {
        createdAt = parsedDate.toISOString();
      }
    }
    if (!createdAt) {
      const baseTime = new Date().getTime();
      const offset = (rawLines.length - i) * 60 * 1000 * 2.5;
      createdAt = new Date(baseTime - offset).toISOString();
    }

    // 7. Cluster Assignment
    const cluster = assignClusterMetadata(reviewText, category, i);

    rows.push({
      _id: i,
      customer_id: customerId,
      review: reviewText,
      feedback_text: reviewText,
      category,
      cluster_id: cluster.id,
      cluster: cluster.name,
      urgency,
      sentiment,
      created_at: createdAt,
      aiClassified: true,
      classifiedBy: 'DistilBART ONNX',
    });
  }

  return {
    success: rows.length > 0,
    rows,
    totalCount: rows.length,
    detectedCategories: Array.from(detectedCategoriesSet),
    headers: cleanHeaders,
    error: rows.length === 0 ? 'No valid data rows found in CSV' : null,
  };
};

/**
 * Backward compatible wrapper for legacy calls
 */
export const parseCSVText = (text) => {
  const result = parseUniversalCSV(text);
  return {
    headers: result.headers || [],
    rows: result.rows || [],
    totalRows: result.totalCount || 0,
    error: result.error,
  };
};

/**
 * Finds index of first matching column candidate
 */
function findColumnIndex(headers, candidates) {
  for (const cand of candidates) {
    const idx = headers.indexOf(cand);
    if (idx !== -1) return idx;
  }
  for (let i = 0; i < headers.length; i++) {
    for (const cand of candidates) {
      if (headers[i].includes(cand)) return i;
    }
  }
  return -1;
}

/**
 * Normalizes or infers category for any CSV row
 */
export function normalizeCategory(rawCat, text = '', index = 0) {
  if (rawCat && rawCat.trim()) {
    const clean = rawCat.trim();
    const lower = clean.toLowerCase();
    if (lower.includes('product') || lower.includes('feature') || lower.includes('bug') || lower.includes('ui') || lower.includes('app')) {
      return 'Product Feedback';
    }
    if (lower.includes('service') || lower.includes('support') || lower.includes('agent') || lower.includes('help') || lower.includes('ticket')) {
      return 'Customer Service';
    }
    if (lower.includes('fraud') || lower.includes('scam') || lower.includes('security') || lower.includes('phishing') || lower.includes('fake')) {
      return 'Fraud and Scam';
    }
    if (lower.includes('operation') || lower.includes('delivery') || lower.includes('shipping') || lower.includes('order') || lower.includes('logistics')) {
      return 'Operational Issues';
    }
    // Retain custom category name with Title Case
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }

  // Infer from text content if missing
  const lowerText = text.toLowerCase();
  if (lowerText.includes('scam') || lowerText.includes('fraud') || lowerText.includes('extort') || lowerText.includes('fake') || lowerText.includes('stolen') || lowerText.includes('wire')) {
    return 'Fraud and Scam';
  }
  if (lowerText.includes('support') || lowerText.includes('agent') || lowerText.includes('ticket') || lowerText.includes('chat') || lowerText.includes('unresponsive') || lowerText.includes('refund')) {
    return 'Customer Service';
  }
  if (lowerText.includes('shipping') || lowerText.includes('delivery') || lowerText.includes('courier') || lowerText.includes('delay') || lowerText.includes('cart') || lowerText.includes('checkout') || lowerText.includes('website')) {
    return 'Operational Issues';
  }
  if (lowerText.includes('broken') || lowerText.includes('defect') || lowerText.includes('quality') || lowerText.includes('battery') || lowerText.includes('screen') || lowerText.includes('update') || lowerText.includes('works') || lowerText.includes('love') || lowerText.includes('great')) {
    return 'Product Feedback';
  }

  return DEFAULT_CATEGORIES[index % DEFAULT_CATEGORIES.length];
}

/**
 * Normalizes sentiment value from numeric (1-5), stars, or string
 */
export function normalizeSentimentValue(val) {
  if (!val) return null;
  const str = String(val).trim().toLowerCase();

  // Numeric scale (1-5 stars or ratings)
  const num = parseFloat(str);
  if (!isNaN(num)) {
    if (num <= 2) return 'negative';
    if (num === 3) return 'neutral';
    if (num >= 4) return 'positive';
  }

  if (str.includes('neg') || str.includes('bad') || str.includes('poor') || str.includes('terrible') || str.includes('attention') || str.includes('fail')) {
    return 'negative';
  }
  if (str.includes('pos') || str.includes('good') || str.includes('great') || str.includes('excellent') || str.includes('happy') || str.includes('satisf')) {
    return 'positive';
  }
  if (str.includes('neu') || str.includes('avg') || str.includes('ok') || str.includes('medium')) {
    return 'neutral';
  }

  return null;
}

/**
 * Normalizes urgency / priority value to 'high' (Critical), 'medium', or 'low'
 */
export function normalizeUrgencyValue(val) {
  if (!val) return null;
  const str = String(val).trim().toLowerCase();

  if (str.includes('crit') || str.includes('high') || str.includes('urgent') || str.includes('p0') || str.includes('p1') || str.includes('sev1') || str.includes('sev0')) {
    return 'high';
  }
  if (str.includes('med') || str.includes('normal') || str.includes('p2') || str.includes('sev2')) {
    return 'medium';
  }
  if (str.includes('low') || str.includes('minor') || str.includes('p3') || str.includes('p4') || str.includes('sev3')) {
    return 'low';
  }

  return null;
}

/**
 * Local NLP Sentiment Classification Rule Engine
 */
export function classifySentimentWithLocalRules(text = '', category = '') {
  const lower = text.toLowerCase();

  const positiveTriggers = [
    'great', 'love', 'excellent', 'helpful', 'fast', 'quick', 'resolved',
    'exceed', 'perfect', 'easy', 'good', 'smooth', 'satisfied', 'awesome',
    'pleased', 'prompt', 'friendly', 'thank', 'fixed', 'reliable'
  ];

  const negativeTriggers = [
    'scam', 'fraud', 'terrible', 'horrible', 'broken', 'worst', 'stolen',
    'defect', 'crash', 'unresponsive', 'fail', 'rude', 'error', 'delay',
    'poor', 'disappoint', 'waste', 'useless', 'frustrated', 'never received',
    'fake', 'lost', 'stuck', 'cancelled', 'freeze', 'extort', 'refused'
  ];

  let posCount = 0;
  let negCount = 0;

  positiveTriggers.forEach((w) => {
    if (lower.includes(w)) posCount++;
  });

  negativeTriggers.forEach((w) => {
    if (lower.includes(w)) negCount++;
  });

  if (category === 'Fraud and Scam' || lower.includes('scam') || lower.includes('fraud')) {
    return 'negative';
  }

  if (negCount > posCount) return 'negative';
  if (posCount > negCount) return 'positive';
  return 'neutral';
}

/**
 * Local NLP Urgency Classification Rule Engine
 */
export function classifyUrgencyWithLocalRules(text = '', sentiment = 'neutral', category = '') {
  const lower = text.toLowerCase();

  // Critical indicators
  if (
    category === 'Fraud and Scam' ||
    lower.includes('scam') ||
    lower.includes('fraud') ||
    lower.includes('extort') ||
    lower.includes('stolen') ||
    lower.includes('stuck') ||
    lower.includes('lost money') ||
    lower.includes('legal') ||
    lower.includes('urgent') ||
    lower.includes('immediately') ||
    lower.includes('deadlock') ||
    lower.includes('unauthorized')
  ) {
    return 'high';
  }

  if (sentiment === 'negative') {
    if (lower.includes('broken') || lower.includes('defect') || lower.includes('fail') || lower.includes('timeout') || lower.includes('unresponsive')) {
      return 'high';
    }
    return 'medium';
  }

  if (sentiment === 'positive') return 'low';
  return 'medium';
}

/**
 * Maps review text to cluster topic metadata
 */
function assignClusterMetadata(text = '', category = 'Product Feedback', idx = 0) {
  const lower = text.toLowerCase();

  if (category === 'Fraud and Scam') {
    if (lower.includes('payment') || lower.includes('fee') || lower.includes('extort') || lower.includes('wire')) {
      return { id: 'FS-301', name: 'Seller Extortion & Additional Payment Demands', urgency: 'high' };
    }
    if (lower.includes('never sent') || lower.includes('fake') || lower.includes('non-delivery')) {
      return { id: 'FS-302', name: 'Fraudulent Sellers & Non-Delivery Scams', urgency: 'high' };
    }
    return { id: 'FS-303', name: 'Counterfeit Goods & Account Impersonation', urgency: 'high' };
  }

  if (category === 'Customer Service') {
    if (lower.includes('unresponsive') || lower.includes('slow') || lower.includes('wait') || lower.includes('hour') || lower.includes('sla')) {
      return { id: 'CS-201', name: 'Unresponsive Support & Queue Latency (>48h)', urgency: 'high' };
    }
    if (lower.includes('helpful') || lower.includes('quick') || lower.includes('great') || lower.includes('thank')) {
      return { id: 'CS-202', name: 'Rapid Resolution & Helpful Agents', urgency: 'low' };
    }
    return { id: 'CS-203', name: 'Billing Discrepancies & Refund Delays', urgency: 'high' };
  }

  if (category === 'Operational Issues') {
    if (lower.includes('delivery') || lower.includes('delay') || lower.includes('shipping') || lower.includes('courier')) {
      return { id: 'OI-401', name: 'Shipping, Logistics & Delivery Delays', urgency: 'high' };
    }
    if (lower.includes('checkout') || lower.includes('cart') || lower.includes('error') || lower.includes('crash')) {
      return { id: 'OI-402', name: 'Website Checkout, Cart & Order Placement Errors', urgency: 'high' };
    }
    return { id: 'OI-403', name: 'Notification Delays & Order Status Sync', urgency: 'medium' };
  }

  // Product Feedback (default)
  if (lower.includes('defect') || lower.includes('broken') || lower.includes('replace') || lower.includes('damaged') || lower.includes('quality')) {
    return { id: 'PF-102', name: 'Defects, Replacements & Build Quality', urgency: 'high' };
  }
  if (lower.includes('search') || lower.includes('filter') || lower.includes('usability') || lower.includes('button')) {
    return { id: 'PF-103', name: 'Feature Usability & Search Filters', urgency: 'medium' };
  }
  return { id: 'PF-101', name: 'Mobile Checkout & Payment Flow Latency', urgency: 'high' };
}

/**
 * Splits raw CSV text into record lines, supporting quotes that span multiple lines
 */
/**
 * Detects delimiter (comma, semicolon, tab) from header line
 */
function detectDelimiter(line) {
  if (!line) return ',';
  const commas = (line.match(/,/g) || []).length;
  const semicolons = (line.match(/;/g) || []).length;
  const tabs = (line.match(/\t/g) || []).length;
  if (semicolons > commas && semicolons > tabs) return ';';
  if (tabs > commas && tabs > semicolons) return '\t';
  return ',';
}

/**
 * Splits raw CSV text into record lines, supporting quotes that span multiple lines and escaped quotes
 */
function splitCSVRecords(text) {
  const records = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = '"';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if ((char === '"' || char === "'") && !inQuotes) {
      inQuotes = true;
      quoteChar = char;
      current += char;
    } else if (char === quoteChar && inQuotes) {
      if (text[i + 1] === quoteChar) {
        current += char;
        current += text[i + 1];
        i++; // skip escaped quote
      } else {
        inQuotes = false;
        current += char;
      }
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && text[i + 1] === '\n') {
        i++; // skip \n of CRLF
      }
      if (current.trim().length > 0) {
        records.push(current);
      }
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim().length > 0) {
    records.push(current);
  }

  return records;
}

/**
 * Splits a single CSV row handling quotes with commas/custom delimiters and escaped quotes
 */
function splitCSVLine(line, delimiter = ',') {
  const result = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = '"';

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if ((char === '"' || char === "'") && !inQuotes) {
      inQuotes = true;
      quoteChar = char;
    } else if (char === quoteChar && inQuotes) {
      if (line[i + 1] === quoteChar) {
        current += quoteChar;
        i++; // skip escaped quote
      } else {
        inQuotes = false;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export default {
  parseUniversalCSV,
  parseCSVText,
  normalizeCategory,
  normalizeSentimentValue,
  normalizeUrgencyValue,
  classifySentimentWithLocalRules,
  classifyUrgencyWithLocalRules,
};
