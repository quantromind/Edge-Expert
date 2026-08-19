import { useState, useCallback } from "react";
import metadata from "../metaData";

export const useComponentSharing = (route) => {
  const [isSharing, setIsSharing] = useState(false);
  const meta = metadata[route];

  const shareToSocial = useCallback((platform) => {
    if (!meta) return;

    const encodedUrl = encodeURIComponent(meta.url);
    const encodedTitle = encodeURIComponent(meta.title);
    const encodedText = encodeURIComponent(meta.description);

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=Edge Expert,RealEstate`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  }, [meta]);

  const copyLink = useCallback(async () => {
    if (!meta) return false;
    
    try {
      await navigator.clipboard.writeText(meta.url);
      return true;
    } catch (err) {
      console.error("Failed to copy link:", err);
      return false;
    }
  }, [meta]);

  const nativeShare = useCallback(async () => {
    if (!meta) return false;

    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share({
          title: meta.title,
          text: meta.description,
          url: meta.url,
        });
        return true;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Error sharing:", err);
        }
        return false;
      } finally {
        setIsSharing(false);
      }
    }
    return false;
  }, [meta]);

  const generateShareableLink = useCallback((platform = null) => {
    if (!meta) return "";
    
    if (platform) {
      return shareToSocial(platform);
    }
    
    return meta.url;
  }, [meta, shareToSocial]);

  return {
    meta,
    isSharing,
    shareToSocial,
    copyLink,
    nativeShare,
    generateShareableLink,
    isSupported: !!meta,
  };
};

export default useComponentSharing;