# Google AdSense Integration Setup

This document provides instructions for setting up Google AdSense with your Global Footprint website.

## 🚀 Quick Setup Guide

### 1. Get Google AdSense Account

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign up for an account or sign in with your existing Google account
3. Add your website domain and verify ownership
4. Wait for approval (can take 24-72 hours)

### 2. Get Your AdSense Codes

Once approved, you'll need to get two important codes:

#### Ad Client ID

- Format: `ca-pub-1234567890123456`
- Found in: AdSense dashboard → Account → Account Information

#### Ad Slot ID

- Format: `1234567890`
- Found in: AdSense dashboard → Ads → Ad units → Create new ad unit

### 3. Update Your Code

Replace the placeholder values in `src/App.tsx`:

```typescript
<AdBanner
  onDismiss={handleDismissAdBanner}
  dismissible={true}
  adClient="ca-pub-YOUR_ACTUAL_CLIENT_ID" // Replace this
  adSlot="YOUR_ACTUAL_SLOT_ID" // Replace this
  adFormat="auto"
/>
```

### 4. Configure Ad Format Options

The AdBanner component supports different ad formats:

```typescript
// Auto-responsive ads (recommended)
adFormat="auto"

// Fixed size rectangle
adFormat="rectangle"
adSize={{ width: 300, height: 250 }}

// Horizontal banner
adFormat="horizontal"
adSize={{ width: 728, height: 90 }}

// Vertical banner
adFormat="vertical"
adSize={{ width: 160, height: 600 }}
```

## 🔧 Component Features

### ✅ Built-in Features

- **Auto-loading**: Automatically loads Google AdSense script
- **Error handling**: Shows fallback content if ads fail to load
- **Loading states**: Displays loading animation while ads load
- **Dismissible**: Users can close the ad banner
- **Responsive**: Adapts to different screen sizes
- **TypeScript**: Fully typed for better development experience

### 🎨 Customization Options

```typescript
interface AdBannerProps {
  className?: string; // Custom CSS classes
  onDismiss?: () => void; // Callback when ad is dismissed
  dismissible?: boolean; // Whether users can dismiss the ad
  adClient?: string; // Your AdSense client ID
  adSlot?: string; // Your ad slot ID
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
  adSize?: {
    // Custom ad dimensions
    width: number;
    height: number;
  };
}
```

## 📊 Ad Performance Tips

### Best Practices

1. **Use auto format**: `adFormat="auto"` provides best performance
2. **Strategic placement**: Bottom center is non-intrusive but visible
3. **Mobile-friendly**: Auto format adapts to mobile screens
4. **Loading fallbacks**: Component shows fallback content during loading

### AdSense Policy Compliance

- ✅ Clear "Advertisement" labeling
- ✅ Dismissible option for user control
- ✅ Doesn't interfere with site functionality
- ✅ Proper error handling and fallbacks

## 🐛 Troubleshooting

### Common Issues

#### Ads Not Showing

1. **Check client ID**: Ensure it starts with `ca-pub-`
2. **Verify slot ID**: Should be numeric only
3. **Domain approval**: Make sure your domain is approved in AdSense
4. **Ad blockers**: Test without ad blockers enabled

#### Console Errors

```javascript
// If you see script loading errors:
// 1. Check your client ID is correct
// 2. Ensure your domain is approved
// 3. Check network connectivity
```

#### Development vs Production

- Ads may not show in localhost/development
- Test on your actual domain after deployment
- Use AdSense's test mode for development testing

## 📱 Mobile Considerations

The component is fully mobile-responsive:

- Uses `fixed` positioning for consistent placement
- Auto format adapts to screen size
- Touch-friendly dismiss button
- Optimized loading for mobile networks

## 🔒 Privacy & GDPR Compliance

Remember to:

- Add privacy policy mentioning ads
- Implement GDPR consent for EU users
- Consider using Google's Consent Management Platform

## 📈 Analytics Integration

Track ad performance:

- Monitor click-through rates in AdSense dashboard
- Use Google Analytics for user behavior
- Track dismiss rates for optimization

---

**Need Help?**

- [Google AdSense Help Center](https://support.google.com/adsense/)
- [AdSense Community](https://support.google.com/adsense/community)
