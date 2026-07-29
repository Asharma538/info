function setMeta(selector, attribute, value) {
  const element = document.head.querySelector(selector)
  if (!element) return
  element.setAttribute(attribute, value)
}

export function setSeo({ title, description, keywords, canonicalPath, ogTitle, ogDescription }) {
  document.title = title
  setMeta('meta[name="description"]', 'content', description)
  setMeta('meta[name="keywords"]', 'content', keywords)
  setMeta('meta[property="og:title"]', 'content', ogTitle || title)
  setMeta('meta[property="og:description"]', 'content', ogDescription || description)
  setMeta('meta[property="og:url"]', 'content', canonicalPath)
  setMeta('meta[name="twitter:title"]', 'content', ogTitle || title)
  setMeta('meta[name="twitter:description"]', 'content', ogDescription || description)
  setMeta('link[rel="canonical"]', 'href', canonicalPath)
}
