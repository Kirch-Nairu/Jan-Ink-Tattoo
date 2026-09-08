# Jan Ink Tattoo — Site Plan

## 1. Product position

Jan Ink Tattoo should behave like an artist portfolio first and a lead-generation site second. It should not look like a generic tattoo-shop template. The artwork is the product, so photography gets the largest visual weight and UI chrome stays restrained.

Primary conversion path:

**See the work → understand John's range → build a useful tattoo brief → continue the conversation on the Jan Ink Tattoo Facebook page.**

The Facebook Page is the primary business contact. John's personal Facebook is secondary.

## 2. Information architecture

### Hero
Large editorial split-screen hero using a rotating selection of the strongest tattoo projects. The copy stays short: brand, artist, positioning statement, Portfolio CTA, and Booking CTA.

### Selected Work
Curated project grid rather than a raw photo dump. Multiple photos of one tattoo should be grouped into one project with alternate views in a lightbox. Categories: Japanese, Black & Grey, Color, Anime, Minimal, Geometric.

### Styles
Short descriptions of the styles the supplied portfolio actually demonstrates. Avoid claiming specialties or experience that John has not confirmed.

### Artist
Use the supplied photo of John actively tattooing. This is stronger than a generic portrait because it shows the real working environment and connects the portfolio to the artist.

### Process
Four-stage client flow: send the idea, shape the piece, confirm details, tattoo session. Exact deposit, cancellation, and scheduling policies remain unset until John supplies them.

### Inquiry Builder
Interactive form that asks for name, tattoo idea, placement, approximate size, style, and preferred schedule. It generates a formatted message, copies it to the clipboard, and opens the Jan Ink Tattoo Facebook page. Reference images are then attached directly in Messenger.

### FAQ
Only answer confirmed/general questions. Do not invent shop hours, prices, years of experience, deposit rules, or a physical address.

### Footer
Fast links to work, artist, booking, Facebook Page, and John's personal Facebook.

## 3. Visual system

The direction is **dark editorial / ink studio / Japanese print influence**, not neon cyberpunk and not a red-and-black gaming aesthetic.

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#0A0908` | Main background |
| Ink Soft | `#11100E` | Secondary dark surfaces |
| Surface | `#171411` | Form controls/cards |
| Bone | `#F0E8DC` | Primary text / warm paper contrast |
| Bone Muted | `#B9AA99` | Secondary text |
| Vermilion | `#C64A34` | Primary accent / CTA / active states |
| Brass | `#B79B6B` | Small secondary accent |
| Hairline | `rgba(240,232,220,.14)` | Borders / grid system |

Vermilion is intentionally used sparingly. The tattoos supply most of the color.

### Typography
Use a very condensed, heavy display face for large editorial headings and a neutral grotesk/sans-serif for interface and body copy. Typography should feel closer to a magazine spread, poster, or tattoo flash book than a SaaS landing page.

### Texture
A low-opacity grain layer gives the otherwise clean digital layout a slightly printed/physical quality. It must remain subtle enough not to reduce image or text clarity.

## 4. Motion and dynamic behavior

Motion supports browsing and conversion rather than becoming decoration.

- Scroll progress indicator.
- Rotating hero project with manual project indicators.
- Image crossfades and restrained slow-scale transitions.
- Scroll reveal for major sections.
- Animated category filtering with layout transitions.
- Project lightbox with keyboard Escape / previous / next behavior.
- FAQ accordion.
- Live inquiry-message preview.
- Copy-to-clipboard state feedback.
- Mobile sticky Portfolio / Book action dock.
- Respect `prefers-reduced-motion`.

No WebGL or heavy 3D is required for V1. The photography should remain the visual spectacle.

## 5. Content model

Portfolio content is data-driven rather than hard-coded into individual UI sections. Each tattoo project stores:

```ts
{
  id,
  title,
  kicker,
  categories,
  placement,
  cover,
  images,
  featured,
  aspect
}
```

This allows new tattoos to be added without redesigning the page and lets multiple angles belong to one piece.

Initial curated projects from the supplied photographs:

- Oni Mask — Japanese / Black & Grey / Color
- Hannya & Waves — Japanese / Color
- Three Swords — Anime / Black & Grey
- Fractured Classic — Black & Grey
- Warrior Bloom — Color

The remaining supplied photos should be curated into additional projects after duplicates and alternate angles are grouped.

## 6. Mobile strategy

Assume a large share of traffic arrives from Facebook on a phone.

- Artwork remains full-bleed and readable.
- Horizontal category chips instead of cramped wrapped controls.
- Portfolio cards become large vertical canvases.
- Lightbox uses nearly the full viewport.
- Navigation collapses to a full-screen menu.
- Sticky bottom Portfolio / Book CTA remains reachable with one thumb.
- Forms use native mobile-friendly inputs and no tiny text.

## 7. Technical architecture

Production application:

- Next.js App Router
- TypeScript
- Framer Motion for restrained interaction/motion
- Next Image for responsive image optimization
- Local data model for V1 portfolio content
- Vercel deployment

A database is unnecessary for V1. If John later needs to upload work himself, add a small CMS/admin layer without changing the public portfolio architecture.

## 8. Image handling

Do not ship the raw social-media files directly at full size. Create optimized WebP/AVIF derivatives, preserve high-quality masters, supply responsive dimensions, and use meaningful alt text. Hero and first-viewport images get priority; gallery images lazy-load.

Duplicate photos are not duplicate cards. They become alternate views under the same tattoo project.

## 9. SEO / sharing

Initial metadata targets the Jan Ink Tattoo brand and John Salceda by name. Location-based SEO should only be added after the exact studio/service location is confirmed. Open Graph sharing should use one of the strongest portfolio images.

## 10. Missing business facts before final launch

The site can be developed without these, but they must be confirmed before claiming them publicly: exact displayed Facebook Page/business name if different from Jan Ink Tattoo, studio/service location, phone number if public, operating hours, booking/deposit policy, cancellation/reschedule policy, accepted payment methods, aftercare wording, and John's preferred biography / years of experience.

## 11. Release gates

V1 is ready for public launch when the curated image set is optimized, every external contact link is verified, mobile and desktop layouts are checked, the inquiry workflow works, metadata/social preview is correct, all unconfirmed business claims are removed, and Vercel production build is green.
