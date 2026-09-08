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
    id: "oni-mask",
    title: "Oni Mask",
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
    categories: ["Japanese", "Color"],
    placement: "Forearm",
    cover: "/images/tattoos/hannya-1-tiny.webp",
    images: ["/images/tattoos/hannya-1-tiny.webp"],
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
    images: ["/images/tattoos/zoro-1-tiny.webp"],
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
    kicker: "Full color illustrative",
    categories: ["Color"],
    placement: "Thigh",
    cover: "/images/tattoos/athena-color-tiny.webp",
    images: ["/images/tattoos/athena-color-tiny.webp"],
    aspect: "tall",
  },
];
