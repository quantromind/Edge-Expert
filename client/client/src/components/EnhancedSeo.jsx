// src/components/EnhancedSeo.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const EnhancedSeo = ({
  title,
  description,
  image,
  url,
  componentName,
  type = "website",
  siteName = "Edge Expert",
}) => {
  const fullUrl = url || window.location.href;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`edge expert, real estate, ${componentName}, property, india`}
      />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@edgeexpert" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${componentName} - ${title}`} />

      {/* Robots & Author */}
      <meta name="author" content={siteName} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#3BAFDA" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: fullTitle,
          description: description,
          url: fullUrl,
          image: image,
          publisher: {
            "@type": "Organization",
            name: siteName,
            url: "https://edgeexpert.com",
          },
        })}
      </script>
    </Helmet>
  );
};

export default EnhancedSeo;
