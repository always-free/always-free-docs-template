const path = require('path');

function getCloudSidebar() {
  return [
    {
      title: 'Cloud',
      collapsable: false,
      children: ['', 'upstash', 'redislabs']
    }
  ];
}

function getServerSidebar() {
  return [
    {
      title: 'Servers',
      collapsable: false,
      children: ['']
    },
    {
      title: 'Database',
      collapsable: false,
      children: ['database/', 'database/postgres']
    },
    {
      title: 'Cache',
      collapsable: false,
      children: ['cache/', 'cache/redis']
    }
  ];
}

module.exports = {
  title: 'Always Free',
  description:
    'Goodness of open source stack technologies and probable free hosting solution',
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
      }
    ],
    ...googleAnalytics('G-Z07GXXXXXX')
  ],
  themeConfig: {
    lastUpdated: 'Last Updated',
    activeHeaderLinks: true,
    nextLinks: true,
    prevLinks: true,
    smoothScroll: true,
    displayAllHeaders: true,
    search: true,
    searchMaxSuggestions: 5,
    nav: [
      { text: 'Apps', link: '/apps/' },
      { text: 'Servers', link: '/servers/' },
      { text: 'Cloud', link: '/cloud/' },
      { text: 'Blogs', link: '/blogs/' }
    ],
    sidebar: {
      '/apps/': 'auto',
      '/servers/': getServerSidebar(),
      '/cloud/': getCloudSidebar(),
      '/blogs/': 'auto',
      '/': ['']
    },
    sidebarDepth: 2
  },
  markdown: {
    lineNumbers: true,
    toc: { includeLevel: [1, 2] }
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['vuepress-plugin-code-copy', true]
  ]
};

function googleAnalytics(measurementId) {
  return process.env.NODE_ENV === 'development'
    ? []
    : [
        [
          'script',
          {
            async: true,
            src: `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
          }
        ],
        [
          'script',
          {},
          `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}', { 'anonymize_ip': true });
router.afterEach(function (to) {
gtag('set', 'page', router.app.$withBase(to.fullPath))
gtag('send', 'pageview')
})
`
        ]
      ];
}
