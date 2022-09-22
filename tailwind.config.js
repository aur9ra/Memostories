module.exports = {
  content: [
    './index.html',
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}'
  ],

  theme: {
    extend: {
      dropShadow: {
        'header': '0 3px 3px rgba(0, 0, 0, 0.45)',
        
      }
    }
  }
}