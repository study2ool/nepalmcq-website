import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string;
  jsonLd?: Record<string, any>;
}

export function useSEO({
  title,
  description,
  canonicalPath,
  keywords,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title.includes("Nepal MCQ")
      ? title
      : `${title} | Nepal MCQ`;
    document.title = fullTitle;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // 3. Update Keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    // 4. Update OG Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", fullTitle);

    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    if (ogDescription) ogDescription.setAttribute("content", description);

    // 5. Update Twitter Title & Description
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", fullTitle);

    const twitterDesc = document.querySelector(
      'meta[name="twitter:description"]',
    );
    if (twitterDesc) twitterDesc.setAttribute("content", description);

    // 6. Update Canonical link
    if (typeof window !== "undefined") {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      const canonicalHref = canonicalPath
        ? `${window.location.origin}${canonicalPath}`
        : window.location.href;
      canonicalLink.setAttribute("href", canonicalHref);
    }

    // 7. Inject Dynamic Page-Specific JSON-LD Structured Data
    if (jsonLd) {
      const scriptId = "dynamic-page-jsonld";
      let script = document.getElementById(
        scriptId,
      ) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);

      return () => {
        const el = document.getElementById(scriptId);
        if (el) el.remove();
      };
    }
  }, [title, description, canonicalPath, keywords, jsonLd]);
}

export default useSEO;
