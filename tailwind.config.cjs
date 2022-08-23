module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        conic: 'conic-gradient(var(--tw-gradient-stops))',
        'conic-to-t': 'conic-gradient(at top, var(--tw-gradient-stops))',
        'conic-to-b': 'conic-gradient(at bottom, var(--tw-gradient-stops))',
        'conic-to-l': 'conic-gradient(at left, var(--tw-gradient-stops))',
        'conic-to-r': 'conic-gradient(at right, var(--tw-gradient-stops))',
        'conic-to-tl': 'conic-gradient(at top left, var(--tw-gradient-stops))',
        'conic-to-tr': 'conic-gradient(at top right, var(--tw-gradient-stops))',
        'conic-to-bl':
          'conic-gradient(at bottom left, var(--tw-gradient-stops))',
        'conic-to-br':
          'conic-gradient(at bottom right, var(--tw-gradient-stops))',
        radial: 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'radial-at-t':
          'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
        'radial-at-b':
          'radial-gradient(ellipse at bottom, var(--tw-gradient-stops))',
        'radial-at-l':
          'radial-gradient(ellipse at left, var(--tw-gradient-stops))',
        'radial-at-r':
          'radial-gradient(ellipse at right, var(--tw-gradient-stops))',
        'radial-at-tl':
          'radial-gradient(ellipse at top left, var(--tw-gradient-stops))',
        'radial-at-tr':
          'radial-gradient(ellipse at top right, var(--tw-gradient-stops))',
        'radial-at-bl':
          'radial-gradient(ellipse at bottom left, var(--tw-gradient-stops))',
        'radial-at-br':
          'radial-gradient(ellipse at bottom right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require("daisyui"),
    require('tailwindcss-animatecss')({
      // classes: ['animate__animated', 'animate__fadeIn', 'animate__fadeOut', 'animate__fadeInLeft', 'animate__fadeOutRight', 'animate__faster'],
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000
      },
      variants: ['responsive', 'hover', 'reduced-motion'],
    }),],
    // daisyUI config (optional)
      daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: 'light'
      },

}
