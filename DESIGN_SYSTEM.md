# 🎨 Portfolio Visual Design Guide

## Color Palette

### Primary Colors
- **Navy Dark**: `#0f172a` - Background deep tone
- **Navy Medium**: `#1a2f5a` - Panel backgrounds
- **Navy Light**: `#1e293b` - Alternative backgrounds

### Accent Colors
- **Blue Primary**: `#3b82f6` (59, 130, 246) - Main CTA
- **Blue Light**: `#60a5fa` (96, 165, 250) - Accents
- **Blue Sky**: `#0ea5e9` - Secondary accent
- **Blue Lighter**: `#93c5fd` - Hover states

### Supporting Colors
- **Purple**: `#8b5cf6` - Secondary gradient
- **Pink**: `#ec4899` - Tertiary accent
- **Accent Dark**: Darker blue variant

### Text Colors
- **Text Primary**: Dark on light, light on dark
- **Muted**: Secondary text, reduced opacity
- **Border**: Subtle dividers with transparency

## Typography

### Font Family
- **Primary**: Inter (sans-serif)
- **Weights**: 400, 500, 600, 700, 800, 900

### Heading Hierarchy
- **H1** (Hero): 40px-64px, weight 950, clamp responsive
- **H2** (Section): 36px-52px, weight 950, gradient text
- **H3** (Cards): 18px-32px, weight 900, letter-spacing -0.5px
- **H4-H6**: Adjusted sizes with proper hierarchy

### Body Text
- **Paragraph**: 16px-18px, weight 500, line-height 1.7-1.8
- **Muted**: Reduced opacity (50-70%), smaller sizes
- **Tags**: 13px-15px, uppercase, letter-spacing 0.5px

## Spacing System

### Base Unit: 8px
- **XS**: 4px
- **S**: 8px
- **M**: 16px
- **L**: 24px
- **XL**: 32px
- **2XL**: 48px
- **3XL**: 64px
- **4XL**: 80px
- **5XL**: 120px

### Section Spacing
- **Section Padding**: 80px-120px (clamp responsive)
- **Container Gap**: 40px-80px
- **Card Gap**: 16px-32px
- **Element Gap**: 8px-16px

## Component Styling

### Navigation Bar
- **Background**: `rgba(255,255,255,0.85)` with backdrop-filter blur(20px)
- **Dark Mode**: `rgba(15,23,42,0.85)`
- **Height**: ~70px (sticky)
- **Border**: 1px solid rgba(59,130,246,0.1)
- **Shadow**: 0 4px 20px rgba(0,0,0,0.05)

### Hero Section
- **Layout**: Grid 1.2fr 0.8fr on desktop, 1fr on mobile
- **Background**: Radial gradient orbs with animations
- **Typography**: Large gradient text with animation
- **CTA**: Flex layout with gap 16px

### Section Headers
- **Alignment**: Center with max-width 800px
- **Decoration**: Top gradient line (100px width)
- **Title**: Gradient text with underline decoration
- **Subtitle**: Muted color, larger line-height
- **Margin**: 0 auto 80px

### Buttons
- **Primary**: Gradient background with overlay effect on hover
- **Ghost**: Transparent with border, hover with background
- **Size**: Clamp padding for responsiveness
- **Shadow**: 0 8px 22px rgba(59,130,246,0.3)
- **Hover**: translateY(-4px) scale(1.05)
- **Border Radius**: 12px (no border-radius)

### Cards
- **Background**: Semi-transparent panel color
- **Border**: Gradient borders or left accent lines
- **Padding**: 24px-48px (clamp responsive)
- **Shadow**: Subtle 0 4px 20px rgba(0,0,0,0.06)
- **Transitions**: 0.3s-0.4s cubic-bezier(0.34, 1.56, 0.64, 1)

## Animation System

### Keyframe Animations
- **fadeInUp**: Fade in with Y translate
- **slideDown**: Header entrance
- **floatIn**: Hero floating effect
- **liftIn**: Text lift animation
- **float**: Continuous floating motion
- **pulse**: Pulsing opacity effect
- **rotatingStar**: Rotation animation
- **spin**: Full rotation
- **gradientShift**: Background position shift

### Transition Timing
- **Quick**: 0.2s ease
- **Standard**: 0.3s ease
- **Smooth**: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)
- **Slow**: 0.6s ease

### Interactive Effects
- **Hover Scale**: 1.02 - 1.05
- **Hover Translate**: translateY(-2px to -6px)
- **Press Scale**: 0.98
- **Press Translate**: translateY(0 to -1px)

## Layout Patterns

### Grid Layouts
- **About**: 1.2fr 1fr 1fr (asymmetric, staggered)
- **Featured**: 1.3fr 1fr (bento-box)
- **Skills**: 4 columns, 2 on mobile
- **Projects**: auto-fit minmax(320px, 1fr)
- **FAQ**: 2 columns, 1 on mobile

### Responsive Breakpoints
- **Mobile**: < 600px
- **Tablet**: 600px - 900px
- **Desktop**: > 900px
- **Large**: > 1400px

## Dark Mode Support

### Implementation
- **Body Class**: `.light` for light mode, dark mode as default
- **Color Variables**: CSS custom properties with dark overrides
- **Selector**: `body:not(.light)` for dark mode styles
- **Glassmorphism**: Enhanced in dark mode with rgba overlays

### Dark Mode Specific
- **Background**: Navy gradient (#0f172a to #1e293b)
- **Panel**: rgba(255,255,255,0.03) with backdrop blur
- **Text**: Light colors for contrast
- **Borders**: Lighter rgba colors for visibility

## Accessibility Features

### Visual
- **Contrast Ratio**: WCAG AAA compliant
- **Focus States**: Visible keyboard navigation
- **Color**: Not sole means of information
- **Text Sizing**: Responsive with clamp

### Semantic HTML
- **Landmarks**: Header, main, section, footer
- **Headings**: Proper hierarchy h1-h6
- **Links**: Clear and descriptive
- **Images**: Alt text provided

### Interactive
- **Buttons**: Proper button elements
- **Forms**: Labels and ARIA attributes
- **Skip Link**: Skip to main content
- **Keyboard**: Full keyboard navigation support

## Performance Optimization

### CSS Performance
- **Animation**: Transform and opacity only (GPU accelerated)
- **Media Queries**: Mobile-first approach
- **Variables**: Reduced repetition with custom properties
- **Specificity**: Optimized selector chains

### Image Optimization
- **Format**: WebP with PNG fallback
- **Responsive**: srcset for different sizes
- **Loading**: Lazy loading for non-critical images
- **Compression**: Optimized file sizes

## Browser Support

### Modern Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### CSS Features Required
- ✅ CSS Grid
- ✅ CSS Flexbox
- ✅ CSS Variables (Custom Properties)
- ✅ Backdrop Filter
- ✅ Clip-path
- ✅ CSS Gradients

---

**Design System Version**: 2.0
**Last Updated**: Current Session
**Status**: Production Ready ✅
