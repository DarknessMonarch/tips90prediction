export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/page/football',
          '/page/about',
          '/page/terms',
          '/page/contact',
          '/page/banker',
          '/page/basketball',
          '/page/straight',
          '/page/winning',
          '/page/dashboard',
          '/page/vip',
        ],
        disallow: [
          '/',  
          '/authentication/*',
          '/api/*',
          '/page/payment/*',
          '/page/settings/*',
          '/not-found',
          '/*.json$', 
          '/private/',
        ],
        crawlDelay: 2
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/']
      },
      {
        userAgent: 'CCBot',
        disallow: ['/']
      }
    ],
    sitemap: 'https://tips90predict.com/sitemap.xml',
    host: 'https://tips90predict.com/'
  }
}