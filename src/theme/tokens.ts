export const salibayTokens = {
  colors: {
    // Primary Brand
    primary: {
      DEFAULT: '#E6007E',
      50: '#FDF2F8',
      100: '#FCE7F3',
      200: '#FBCFE8',
      300: '#F9A8D4',
      400: '#F472B6',
      500: '#E6007E',
      600: '#DB2777',
      700: '#BE185D',
      800: '#9D174D',
      900: '#831843',
    },
    // Trust / M-Pesa / Local Green
    success: {
      DEFAULT: '#22C55E',
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
    },
    // Global / Express Cargo Blue
    info: {
      DEFAULT: '#2563EB',
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    },
    // Surface & Neutrals
    background: {
      app: '#FAFAFA',
      card: '#FFFFFF',
      subtle: '#F4F4F5',
      dark: '#09090B',
    },
    border: {
      light: '#F4F4F5',
      subtle: '#E4E4E7',
      DEFAULT: '#D4D4D8',
      dark: '#27272A',
    },
    text: {
      primary: '#09090B',
      secondary: '#71717A',
      muted: '#A1A1AA',
      inverted: '#FFFFFF',
    }
  },
  typography: {
    fontFamily: {
      display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      hero: ['32px', { lineHeight: '38px', fontWeight: '800' }],
      h1: ['24px', { lineHeight: '30px', fontWeight: '800' }],
      h2: ['20px', { lineHeight: '26px', fontWeight: '700' }],
      h3: ['16px', { lineHeight: '22px', fontWeight: '700' }],
      h4: ['14px', { lineHeight: '20px', fontWeight: '600' }],
      body: ['14px', { lineHeight: '20px', fontWeight: '400' }],
      bodySm: ['12px', { lineHeight: '16px', fontWeight: '400' }],
      caption: ['11px', { lineHeight: '14px', fontWeight: '500' }],
      tiny: ['9px', { lineHeight: '12px', fontWeight: '600' }],
      priceLg: ['22px', { lineHeight: '26px', fontWeight: '800' }],
      priceMd: ['16px', { lineHeight: '20px', fontWeight: '700' }],
      priceSm: ['13px', { lineHeight: '16px', fontWeight: '700' }],
    }
  },
  spacing: {
    screenX: '16px',
    sectionY: '20px',
    cardInner: '14px',
    gridGap: '10px',
  },
  radii: {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px',
  },
  shadows: {
    subtle: '0 1px 3px rgba(15, 23, 42, 0.05)',
    card: '0 2px 8px -2px rgba(15, 23, 42, 0.08), 0 1px 4px -1px rgba(15, 23, 42, 0.04)',
    elevated: '0 10px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
    stickyBar: '0 -4px 16px rgba(15, 23, 42, 0.08)',
  }
};

export function formatKsh(amount?: number | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'KSh 0';
  }
  return `KSh ${amount.toLocaleString('en-KE')}`;
}
