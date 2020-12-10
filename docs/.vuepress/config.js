module.exports = {
  themeConfig: {
    logo: '/logo.png',
    sidebar: [
      ['/', 'Homepage'],
      {
        title: 'Classes',   // required
        path: '/classes/DotApp',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: false,
        sidebarDepth: 1,
        children: [
          ['/classes/DotApp', 'DotApp']
        ]
      },
    ]
  },
}