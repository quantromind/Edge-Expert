// Utility functions for enhanced sharing with thumbnails

export const shareWithThumbnail = (title, description, url, image) => {
  const shareData = {
    title: title || document.title,
    text: description || "Check this out!",
    url: url || window.location.href,
  };

  if (navigator.share) {
    return navigator.share(shareData);
  } else {
    // Fallback - copy to clipboard
    navigator.clipboard.writeText(shareData.url);
    return Promise.resolve("Link copied to clipboard!");
  }
};

export const shareToSocial = (platform, title, description, url, image) => {
  const encodedUrl = encodeURIComponent(url || window.location.href);
  const encodedTitle = encodeURIComponent(title || document.title);
  const encodedText = encodeURIComponent(description || "Check this out!");

  const urls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=Edge Expert,RealEstate`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  if (urls[platform]) {
    window.open(urls[platform], "_blank", "width=600,height=400");
  }
};

export const copyToClipboard = async (url) => {
  try {
    await navigator.clipboard.writeText(url || window.location.href);
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
};