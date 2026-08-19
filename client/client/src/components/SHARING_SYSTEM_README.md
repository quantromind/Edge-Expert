# Component Sharing System

This system enables each component in your Edge Expert application to be shared with its own thumbnail and metadata across social media platforms.

## Features

- ✅ **Component-specific thumbnails** - Each component has its own sharing image
- ✅ **Enhanced SEO** - Comprehensive meta tags for better search engine optimization
- ✅ **Social Media Optimization** - Open Graph, Twitter Cards, and WhatsApp previews
- ✅ **Multiple sharing options** - Facebook, Twitter, LinkedIn, WhatsApp, and native sharing
- ✅ **Easy integration** - Simple wrapper component and custom hook
- ✅ **Floating share button** - Persistent sharing access on each page

## Quick Start

### Method 1: Using ComponentWrapper (Recommended)

```jsx
import ComponentWrapper from "./ComponentWrapper";

const MyComponent = () => {
  return (
    <ComponentWrapper route="/myroute">
      <div>
        {/* Your component content */}
      </div>
    </ComponentWrapper>
  );
};
```

### Method 2: Manual Integration

```jsx
import EnhancedSeo from "./EnhancedSeo";
import ShareButton from "./ShareButton";
import metadata from "../metaData";

const MyComponent = () => {
  const meta = metadata["/myroute"];
  
  return (
    <>
      <EnhancedSeo {...meta} />
      <div className="fixed top-20 right-4 z-50">
        <ShareButton {...meta} />
      </div>
      <div>
        {/* Your component content */}
      </div>
    </>
  );
};
```

### Method 3: Using Custom Hook

```jsx
import useComponentSharing from "../hooks/useComponentSharing";

const MyComponent = () => {
  const { meta, shareToSocial, copyLink, nativeShare } = useComponentSharing("/myroute");
  
  return (
    <div>
      <button onClick={() => shareToSocial("facebook")}>
        Share on Facebook
      </button>
      {/* Your component content */}
    </div>
  );
};
```

## Adding New Components

1. **Add metadata** in `src/metaData.jsx`:
```jsx
"/newcomponent": {
  title: "New Component | Edge Expert",
  description: "Description of the new component functionality.",
  image: `${SITE_URL}/og/newcomponent-thumbnail.png`,
  url: `${SITE_URL}/newcomponent`,
  componentName: "New Component"
}
```

2. **Create thumbnail image** in `public/og/newcomponent-thumbnail.png` (1200x630px)

3. **Wrap your component**:
```jsx
<ComponentWrapper route="/newcomponent">
  {/* Your component */}
</ComponentWrapper>
```

## File Structure

```
src/
├── components/
│   ├── ComponentWrapper.jsx      # Easy wrapper for sharing functionality
│   ├── ShareButton.jsx          # Floating share button component
│   ├── EnhancedSeo.jsx         # Enhanced SEO with comprehensive meta tags
│   └── ShareDemo.jsx           # Demo component showing functionality
├── hooks/
│   └── useComponentSharing.js  # Custom hook for sharing functionality
└── metaData.jsx               # Component metadata configuration

public/
└── og/                        # Thumbnail images folder
    ├── thumbnail.png          # Home page thumbnail
    ├── about-thumbnail.png    # About page thumbnail
    └── ...                    # Other component thumbnails
```

## Components Included

All major components now have sharing functionality:

- ✅ Home Page (`/`)
- ✅ About Us (`/aboutus`)
- ✅ Contact Us (`/contact`)
- ✅ Properties (`/properties`)
- ✅ Services (`/services`)
- ✅ Blog (`/blog`)
- ✅ Developer Package (`/developer`)
- ✅ Broker Package (`/broker`)
- ✅ Owner Package (`/owner`)
- ✅ Housekeeping Services (`/housekeeping`)
- ✅ Interior Design (`/interiordesign`)
- ✅ Featured Properties (`/featuredproperties`)
- ✅ Luxury Properties (`/luxuryproperties`)
- ✅ Affordable Housing (`/affordable`)
- ✅ Commercial Properties (`/commercial`)
- ✅ New Projects (`/projects`)

## Thumbnail Specifications

- **Size**: 1200x630 pixels (optimal for all platforms)
- **Format**: PNG or JPG
- **Content**: Should represent the specific component
- **Branding**: Include Edge Expert logo and component name
- **Quality**: High resolution for crisp display

## Social Media Support

### Facebook
- Uses Open Graph meta tags
- Shows thumbnail, title, and description
- Optimal image size: 1200x630px

### Twitter
- Uses Twitter Card meta tags
- Shows large image preview
- Includes hashtags: #Edge Expert #RealEstate

### LinkedIn
- Uses Open Graph meta tags
- Professional sharing format
- Shows company branding

### WhatsApp
- Shows link preview with thumbnail
- Displays title and description
- Works on mobile and desktop

## Customization

### Share Button Position
```jsx
<ComponentWrapper 
  route="/myroute" 
  shareButtonPosition="fixed bottom-4 right-4 z-50"
>
```

### Disable Share Button
```jsx
<ComponentWrapper 
  route="/myroute" 
  showShareButton={false}
>
```

### Custom Share Button
```jsx
const { shareToSocial } = useComponentSharing("/myroute");

<button onClick={() => shareToSocial("facebook")}>
  Custom Facebook Share
</button>
```

## Testing

1. **Local Testing**: Use browser dev tools to inspect meta tags
2. **Facebook**: Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
3. **Twitter**: Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
4. **LinkedIn**: Share on LinkedIn and check preview
5. **WhatsApp**: Send link in WhatsApp to see preview

## Troubleshooting

### Thumbnail not showing
- Check image exists in `public/og/` folder
- Verify image URL in metadata
- Clear social media cache (Facebook Debugger)

### Wrong metadata
- Check route matches exactly in `metaData.jsx`
- Verify component is wrapped correctly
- Check browser console for warnings

### Share button not working
- Ensure popup blockers are disabled
- Check if component has metadata
- Verify social media URLs are correct

## Performance

- Thumbnails are loaded only when shared (lazy loading)
- Meta tags are rendered server-side for SEO
- Share buttons use minimal JavaScript
- Images are optimized for web delivery