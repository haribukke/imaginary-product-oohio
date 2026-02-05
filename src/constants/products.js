export const MOCK_PRODUCTS = [
    {
      id: 1,
      name: "Professional Wireless Noise-Cancelling Headphones with Premium Audio Quality",
      category: "Electronics > Audio",
      price: 299.99,
      quantity: 2,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_13e126511-1765030295691.png",
      imageAlt: "Black wireless over-ear headphones with silver accents on white background showing premium build quality and cushioned ear cups"
    },
    {
      id: 2,
      name: "Ergonomic Mechanical Gaming Keyboard with RGB Backlight",
      category: "Electronics > Computers",
      price: 149.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1619683322755-4545503f1afa",
      imageAlt: "Modern mechanical keyboard with colorful RGB lighting effects displaying rainbow colors across black keys in dark gaming setup"
    },
    {
      id: 3,
      name: "Ultra-Slim Laptop Stand with Adjustable Height and Cooling Design",
      category: "Electronics > Accessories",
      price: 49.99,
      quantity: 1,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f9ea2001-1764658995251.png",
      imageAlt: "Silver aluminum laptop stand with sleek minimalist design holding MacBook at ergonomic angle on modern white desk"
    },
    {
      id: 4,
      name: "High-Performance Wireless Gaming Mouse with Precision Sensor",
      category: "Electronics > Gaming",
      price: 79.99,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1604080214833-df65352fb97a",
      imageAlt: "Black gaming mouse with blue LED accents and ergonomic grip design positioned on dark gaming mousepad"
    }
  ];

export const MOCK_PRODUCT_DETAIL = {
  id: 101,
  name: "Premium Wireless Earbuds Pro",
  sku: "WEP-2024-001",
  description: `Experience superior audio quality with our Premium Wireless Earbuds Pro. Featuring advanced noise cancellation technology, these earbuds deliver crystal-clear sound whether you're commuting, working out, or relaxing at home. The ergonomic design ensures all-day comfort, while the long-lasting battery provides up to 8 hours of continuous playback on a single charge.\n\nWith IPX7 water resistance, these earbuds can withstand sweat and light rain, making them perfect for active lifestyles. The intuitive touch controls allow you to manage calls, adjust volume, and control playback without reaching for your device.`,
  price: 299.99,
  discount: 15,
  rating: 4.8,
  reviewCount: 1247,
  inStock: true,
  stockCount: 47,
  category: "Electronics",
  images: [
  {
    url: "https://images.unsplash.com/photo-1722040456443-c644d014d43f",
    alt: "Premium white wireless earbuds in charging case with LED indicators on marble surface showing sleek modern design"
  },
  {
    url: "https://img.rocket.new/generatedImages/rocket_gen_img_1a5ccd24c-1767224182191.png",
    alt: "Close-up of wireless earbud showing touch control surface and ergonomic shape with premium matte finish"
  },
  {
    url: "https://images.unsplash.com/photo-1730848750011-4f1df6493f36",
    alt: "Wireless earbuds with charging case open displaying both earbuds and USB-C charging port"
  },
  {
    url: "https://img.rocket.new/generatedImages/rocket_gen_img_103e88a6c-1767281829508.png",
    alt: "Person wearing wireless earbuds during outdoor workout showing secure fit and water-resistant design"
  },
  {
    url: "https://images.unsplash.com/photo-1565267319814-d7591ba84ad9",
    alt: "Wireless earbuds packaging and accessories including charging cable and multiple ear tip sizes"
  }],

  colors: ["Midnight Black", "Pearl White", "Ocean Blue", "Rose Gold"],
  sizes: ["Standard", "Small", "Large"],
  features: [
  "Active Noise Cancellation (ANC) with transparency mode",
  "8 hours playback + 24 hours with charging case",
  "IPX7 water and sweat resistance rating",
  "Bluetooth 5.3 with multipoint connectivity",
  "Touch controls for calls, music, and voice assistant",
  "Fast charging: 15 minutes = 2 hours playback",
  "Premium audio drivers with deep bass response",
  "Ergonomic design with 3 ear tip sizes included"],

  specifications: {
    "Driver Size": "10mm dynamic drivers",
    "Frequency Response": "20Hz - 20kHz",
    "Bluetooth Version": "5.3",
    "Bluetooth Range": "Up to 33 feet (10 meters)",
    "Battery Life": "8 hours (earbuds) + 24 hours (case)",
    "Charging Time": "1.5 hours (full charge)",
    "Charging Port": "USB-C",
    "Water Resistance": "IPX7",
    "Weight": "4.5g per earbud",
    "Microphone": "Dual beamforming microphones",
    "Codec Support": "AAC, SBC",
    "Voice Assistant": "Siri, Google Assistant compatible"
  }
};
