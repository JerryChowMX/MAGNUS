export const colors = {
  primary: "#000000", // Placeholder, will be updated with design
  accent: "#007AFF",
  textPrimary: "#111111",
  textSecondary: "#666666",
  background: "#FFFFFF",
  surface: "#F5F5F5",
  success: "#34C759",
  error: "#FF3B30",
  backdrop: "rgba(0, 0, 0, 0.5)",
  highlight: "#FFD60A",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 9999,
};

export const shadows = {
  sm: "0 1px 2px rgba(0,0,0,0.1)",
  md: "0 4px 6px rgba(0,0,0,0.1)",
  lg: "0 10px 15px rgba(0,0,0,0.1)",
};

export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
};

export const typography = {
  fontFamily: {
    display: '"Blinker", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  fontSize: {
    // Mobile-first scale
    xs: "0.75rem",   // 12px
    sm: "0.875rem",  // 14px
    md: "1rem",      // 16px
    lg: "1.125rem",  // 18px
    xl: "1.25rem",   // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.75rem",// 28px
    "4xl": "2rem",   // 32px
  },
  lineHeight: {
    tight: 1.1,
    snug: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export const glass = {
  blur: '16px',
  bgLight: 'rgba(255, 255, 255, 0.25)',
  bgDark: 'rgba(0, 0, 0, 0.25)',
  borderLight: 'rgba(255, 255, 255, 0.4)',
  borderDark: 'rgba(255, 255, 255, 0.1)',
  radius: '24px', // radii-xl equivalent
  shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
};
