export type PortfolioCategory =
  | "Japanese"
  | "Black & Grey"
  | "Color"
  | "Anime"
  | "Minimal"
  | "Geometric";

export type PortfolioProject = {
  id: string;
  title: string;
  kicker: string;
  categories: PortfolioCategory[];
  placement: string;
  cover: string;
  images: string[];
  featured?: boolean;
  aspect?: "portrait" | "tall" | "wide";
};

export const categories: ("All" | PortfolioCategory)[] = [
  "All",
  "Japanese",
  "Black & Grey",
  "Color",
  "Anime",
  "Minimal",
  "Geometric",
];

export const portfolio: PortfolioProject[] = [
  {
    id: "oni-mask-rose",
    title: "Mask & Rose",
    kicker: "Blackwork with red accents",
    categories: ["Japanese", "Black & Grey", "Color"],
    placement: "Forearm",
    cover: "/images/tattoos/hero-mask-tiny.webp",
    images: ["/images/tattoos/hero-mask-tiny.webp"],
    featured: true,
    aspect: "tall",
  },
  {
    id: "hannya-waves",
    title: "Hannya & Waves",
    kicker: "Japanese composition",
    categories: ["Japanese", "Black & Grey", "Color"],
    placement: "Forearm",
    cover: "/images/tattoos/hannya-1-tiny.webp",
    images: [
      "/images/tattoos/hannya-1-tiny.webp",
      "/images/tattoos/hannya-2-tiny.webp",
      "/images/tattoos/hannya-3-tiny.webp",
    ],
    featured: true,
    aspect: "tall",
  },
  {
    id: "zoro",
    title: "Three Swords",
    kicker: "Anime portrait sleeve",
    categories: ["Anime", "Black & Grey"],
    placement: "Upper arm",
    cover: "/images/tattoos/zoro-1-tiny.webp",
    images: [
      "/images/tattoos/zoro-1-tiny.webp",
      "/images/tattoos/zoro-2-tiny.webp",
    ],
    featured: true,
    aspect: "tall",
  },
  {
    id: "classical-sculpture",
    title: "Fractured Classic",
    kicker: "Illustrative black & grey",
    categories: ["Black & Grey"],
    placement: "Forearm",
    cover: "/images/tattoos/classical-tiny.webp",
    images: ["/images/tattoos/classical-tiny.webp"],
    featured: true,
    aspect: "tall",
  },
  {
    id: "athena-color",
    title: "Warrior Bloom",
    kicker: "Full-color illustrative",
    categories: ["Color"],
    placement: "Thigh",
    cover: "/images/tattoos/athena-color-tiny.webp",
    images: ["/images/tattoos/athena-color-tiny.webp"],
    aspect: "tall",
  },
  {
    id: "samurai-study",
    title: "Samurai Study",
    kicker: "Fine-line warrior composition",
    categories: ["Japanese", "Black & Grey"],
    placement: "Upper arm",
    cover: "/images/tattoos/samurai-1-tiny.webp",
    images: [
      "/images/tattoos/samurai-1-tiny.webp",
      "/images/tattoos/samurai-2-tiny.webp",
    ],
    aspect: "portrait",
  },
  {
    id: "dove-rose",
    title: "Dove & Rose",
    kicker: "Soft-shaded black & grey",
    categories: ["Black & Grey"],
    placement: "Upper arm",
    cover: "/images/tattoos/dove-rose-tiny.webp",
    images: ["/images/tattoos/dove-rose-tiny.webp"],
    aspect: "portrait",
  },
  {
    id: "game-day-rooster",
    title: "Game Day Rooster",
    kicker: "Full-color custom collage",
    categories: ["Color"],
    placement: "Forearm",
    cover: "/images/tattoos/gambling-rooster-tiny.webp",
    images: ["/images/tattoos/gambling-rooster-tiny.webp"],
    aspect: "tall",
  },
  {
    id: "red-sun-warrior",
    title: "Red Sun Warrior",
    kicker: "Japanese-inspired color accents",
    categories: ["Japanese", "Black & Grey", "Color"],
    placement: "Upper arm",
    cover: "/images/tattoos/sun-samurai-tiny.webp",
    images: ["/images/tattoos/sun-samurai-tiny.webp"],
    aspect: "tall",
  },
  {
    id: "minimal-script",
    title: "Fine Script",
    kicker: "Small personal lettering",
    categories: ["Minimal"],
    placement: "Lower torso",
    cover: "/images/tattoos/minimal-script-tiny.webp",
    images: ["/images/tattoos/minimal-script-tiny.webp"],
    aspect: "portrait",
  },
  {
    id: "geometric-band",
    title: "Geometric Band",
    kicker: "Bold repeating geometry",
    categories: ["Geometric", "Black & Grey"],
    placement: "Forearm",
    cover: "/images/tattoos/geometric-armband-tiny.webp",
    images: ["/images/tattoos/geometric-armband-tiny.webp"],
    aspect: "portrait",
  },
  {
    id: "floral-shoulder",
    title: "Floral Line",
    kicker: "Fine floral colorwork",
    categories: ["Minimal", "Color"],
    placement: "Shoulder",
    cover: "/images/tattoos/floral-shoulder-tiny.webp",
    images: ["/images/tattoos/floral-shoulder-tiny.webp"],
    aspect: "portrait",
  },
];
