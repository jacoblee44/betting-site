/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './composables/**/*.{js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'action-button-color': 'var(--action-button-color)',
        'listing-button-color': 'var(--listing-button-color)',
        'secondary-button-color': 'var(--secondary-button-color)',
        'primary-links-color': 'var(--primary-links-color)',
        'secondary-links-color': 'var(--secondary-links-color)',
        'success-alert-color': 'var(--company-success-alert-color)',
        'error-alert-color': 'var(--company-error-alert-color)',
        'warning-alert-color': 'var(--company-warning-alert-color)',
        'information-alert-color': 'var(--company-information-alert-color)',
        primary: {
          500: '#cd6215',
        },
        'logo-accent': {
          '50': '#fef8ee',
          '100': '#fdf0d7',
          '200': '#faddae',
          '300': '#f6c37b',
          '400': '#f2a045',
          '500': '#ee8521',
          '600': '#cd6215',
          '700': '#b95115',
          '800': '#934019',
          '900': '#773717',
          '950': '#401a0a',
        },
      },
      fontSize: {
        h1: '28px',
      },
      spacing: {
        '5px': '5px',
        '10px': '10px',
        '30px': '30px',
        '60px': '60px',
      },

      lineHeight: {
        '22px': '22px',
        '19px': '19px',
        '42px': '42px',
      },
      screens: {
        md2: '866px',
        lg2: '1061px',
        xl2: '1480px',
      },
    },
    letterSpacing: {
      '0.84': '0.84px',
      '0.72': '0.72px',
      '0.6': '0.6px',
      '0.63': '0.63px',
      '0.48': '0.40px',
      '0.42': '0.42px',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      '3px': '3px',
    },
    fontFamily: {
      sans: ['Open Sans Pro', 'system-ui'],
    },
  },

  plugins: [require('@tailwindcss/forms')],
};
