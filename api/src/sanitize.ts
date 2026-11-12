import sanitizeHtml from 'sanitize-html';

// Layer 1 of 3 (with the sandboxed iframe and its CSP in web/). Anything not listed here is dropped.
// Costs authors: no scripts, forms, embeds, external images or fonts; links only to .zz addresses and #fragments.
const PAGE: sanitizeHtml.IOptions = {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'style', 'details', 'summary'],
  allowedAttributes: {
    '*': ['id', 'class', 'style', 'title', 'lang', 'dir'],
    a: ['href'], // no target: the frame decides where links go
    img: ['src', 'alt', 'width', 'height'],
    td: ['colspan', 'rowspan'],
    th: ['colspan', 'rowspan'],
  },
  allowedSchemes: ['zz'], // scheme-less 'tidepool.zz' and '#frag' pass; http(s), javascript:, data: don't
  allowedSchemesByTag: { img: ['data'] },
  allowProtocolRelative: false,
  // <style> is safe here: CSS can't paint outside the iframe box, and the frame's CSP blocks url() loads.
  allowVulnerableTags: true,
  nonTextTags: ['script', 'textarea', 'option', 'noscript', 'title', 'template'],
};

const TEXT: sanitizeHtml.IOptions = {
  allowedTags: [],
  allowedAttributes: {},
  nonTextTags: ['script', 'style', 'textarea', 'option', 'noscript', 'title', 'template'],
};

/** Author HTML → the HTML we store and serve, plus its plain text for search. */
export function sanitize(input: string): { html: string; text: string } {
  const html = sanitizeHtml(input, PAGE);
  const text = sanitizeHtml(html.replace(/</g, ' <'), TEXT) // space before tags so <p>a</p><p>b</p> → "a b"
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
  return { html, text };
}
