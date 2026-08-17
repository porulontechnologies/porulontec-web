// 500+ Curated Color Theme Palettes for Admin Panel & Live Website

const baseCategories = {
  violet: [
    { name: 'Quantum Violet', primary: '#7c3aed', secondary: '#3cddc7', badge: 'Brand Default' },
    { name: 'Electric Amethyst', primary: '#8b5cf6', secondary: '#06b6d4', badge: 'Neon Purple' },
    { name: 'Royal Plum', primary: '#6b21a8', secondary: '#38bdf8', badge: 'Deep Royalty' },
    { name: 'Deep Lavender', primary: '#a855f7', secondary: '#10b981', badge: 'Soft Luminescence' },
    { name: 'Indigo Velvet', primary: '#4338ca', secondary: '#34d399', badge: 'Executive' },
    { name: 'Neon Orchid', primary: '#d946ef', secondary: '#00f5d4', badge: 'Cyber Orchid' },
    { name: 'Midnight Purple', primary: '#581c87', secondary: '#f43f5e', badge: 'Obsidian Glow' },
    { name: 'Purple Haze', primary: '#7e22ce', secondary: '#facc15', badge: 'Vibrant' },
    { name: 'Berry Electric', primary: '#be185d', secondary: '#38bdf8', badge: 'Berry Pulse' },
    { name: 'Cyber Lavender', primary: '#c084fc', secondary: '#2dd4bf', badge: 'Pastel Cyber' },
  ],
  blue: [
    { name: 'Royal Sapphire', primary: '#2563eb', secondary: '#38bdf8', badge: 'Corporate Tech' },
    { name: 'Cyberpunk Cyan', primary: '#06b6d4', secondary: '#f43f5e', badge: 'Futuristic AI' },
    { name: 'Deep Oceanic', primary: '#1e40af', secondary: '#2dd4bf', badge: 'Deep Sea' },
    { name: 'Sky Electric', primary: '#0284c7', secondary: '#a855f7', badge: 'Vibrant Sky' },
    { name: 'Midnight Cobalt', primary: '#1e3a8a', secondary: '#34d399', badge: 'Executive Navy' },
    { name: 'Aqua Pulse', primary: '#0891b2', secondary: '#f59e0b', badge: 'Bright Aqua' },
    { name: 'Neon Turquoise', primary: '#00f5d4', secondary: '#7c3aed', badge: 'Ultra Neon' },
    { name: 'Iceberg Blue', primary: '#38bdf8', secondary: '#10b981', badge: 'Cool Frost' },
    { name: 'Steel Blue Tech', primary: '#475569', secondary: '#38bdf8', badge: 'Minimal Industrial' },
    { name: 'Azure Cyber', primary: '#0077b6', secondary: '#9b5de5', badge: 'Futuristic Azure' },
  ],
  green: [
    { name: 'Emerald Matrix', primary: '#10b981', secondary: '#06b6d4', badge: 'Eco & Bio Tech' },
    { name: 'Futuristic Lime', primary: '#84cc16', secondary: '#10b981', badge: 'Next-Gen AI' },
    { name: 'Jade Luminescence', primary: '#059669', secondary: '#34d399', badge: 'Deep Jade' },
    { name: 'Forest Cyber', primary: '#047857', secondary: '#facc15', badge: 'Evergreen' },
    { name: 'Mint Electric', primary: '#34d399', secondary: '#7c3aed', badge: 'Fresh Mint' },
    { name: 'Neon Toxic Green', primary: '#39ff14', secondary: '#00f5d4', badge: 'Hyper Cyber' },
    { name: 'Sage Minimal', primary: '#15803d', secondary: '#38bdf8', badge: 'Natural Sage' },
    { name: 'Olive Gold', primary: '#65a30d', secondary: '#f59e0b', badge: 'Organic Tech' },
    { name: 'Teal Matrix', primary: '#0d9488', secondary: '#a855f7', badge: 'Clean Teal' },
    { name: 'Bio Neon Green', primary: '#22c55e', secondary: '#06b6d4', badge: 'Bio Tech' },
  ],
  amber: [
    { name: 'Sunset Amber', primary: '#f59e0b', secondary: '#ef4444', badge: 'High Energy' },
    { name: 'Midnight Gold', primary: '#eab308', secondary: '#f97316', badge: 'Prestige Metallic' },
    { name: 'Solar Flare', primary: '#f97316', secondary: '#06b6d4', badge: 'Solar Fire' },
    { name: 'Champagne Gold', primary: '#d97706', secondary: '#10b981', badge: 'Luxury Elegance' },
    { name: 'Bronze Cyber', primary: '#b45309', secondary: '#38bdf8', badge: 'Bronze Metallic' },
    { name: 'Neon Amber', primary: '#ffb703', secondary: '#fb5607', badge: 'Warm Glow' },
    { name: 'Copper Tech', primary: '#ca8a04', secondary: '#a855f7', badge: 'Industrial Copper' },
    { name: 'Topaz Electric', primary: '#e11d48', secondary: '#f59e0b', badge: 'Gemstone' },
    { name: 'Saffron Sun', primary: '#fbbf24', secondary: '#ec4899', badge: 'Vibrant Saffron' },
    { name: 'Goldenrod Luminary', primary: '#854d0e', secondary: '#34d399', badge: 'Deep Gold' },
  ],
  red: [
    { name: 'Crimson Velvet', primary: '#e11d48', secondary: '#fb7185', badge: 'Premium Luxury' },
    { name: 'Ruby Cyber', primary: '#dc2626', secondary: '#38bdf8', badge: 'Deep Ruby' },
    { name: 'Rose Gold', primary: '#f43f5e', secondary: '#34d399', badge: 'Blush Gold' },
    { name: 'Scarlet Neon', primary: '#ff0054', secondary: '#00f5d4', badge: 'Neon Crimson' },
    { name: 'Coral Horizon', primary: '#ff6b6b', secondary: '#4ecdc4', badge: 'Pastel Coral' },
    { name: 'Flamingo Pink', primary: '#ec4899', secondary: '#06b6d4', badge: 'Vibrant Magenta' },
    { name: 'Wine Velvet', primary: '#9f1239', secondary: '#facc15', badge: 'Bordeaux Royalty' },
    { name: 'Fiery Infrared', primary: '#b91c1c', secondary: '#a855f7', badge: 'Infrared' },
    { name: 'Cherry Pulse', primary: '#f43f5e', secondary: '#7c3aed', badge: 'Sweet Cherry' },
    { name: 'Volcano Red', primary: '#991b1b', secondary: '#f97316', badge: 'Magma Glow' },
  ]
};

// Programmatically expand hues to generate 500+ distinct color combinations
const generate500Fonts = () => {
  const list = [];
  let id = 1;

  // Base curated themes
  Object.values(baseCategories).forEach((catArr) => {
    catArr.forEach((item) => {
      list.push({ ...item, id: id++ });
    });
  });

  // HSL Color Shift Generation for 500+ unique palettes
  const hues = [
    { name: 'Obsidian Violet', baseH: 270, cat: 'Violet & Purple' },
    { name: 'Cyber Neon', baseH: 190, cat: 'Blue & Cyan' },
    { name: 'Emerald Bio', baseH: 150, cat: 'Green & Emerald' },
    { name: 'Solar Amber', baseH: 40, cat: 'Amber & Gold' },
    { name: 'Infrared Ruby', baseH: 340, cat: 'Red & Coral' },
    { name: 'Deep Space Indigo', baseH: 240, cat: 'Indigo & Tech' },
    { name: 'Quantum Lime', baseH: 90, cat: 'Neon & Cyber' },
    { name: 'Pastel Dream', baseH: 310, cat: 'Pastel & Minimal' }
  ];

  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  hues.forEach((hGroup) => {
    for (let step = 0; step < 55; step++) {
      const primaryH = (hGroup.baseH + step * 6) % 360;
      const secondaryH = (primaryH + 140) % 360;
      const pColor = hslToHex(primaryH, 85, 55);
      const sColor = hslToHex(secondaryH, 80, 52);

      list.push({
        id: id++,
        name: `${hGroup.name} ${step + 1}`,
        primary: pColor,
        secondary: sColor,
        category: hGroup.cat,
        badge: `Theme #${id}`,
      });
    }
  });

  return list;
};

export const COLOR_THEME_PRESETS = generate500Fonts();
