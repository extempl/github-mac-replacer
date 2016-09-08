(function () {
  "use strict"

  var _process = function () {
    var links = document.querySelectorAll("a[href^=github-mac]")

    if (!links.length) {
      return
    }

    chrome.storage.sync.get(['base', 'template'], function (storage) {
      if (!storage.base || !storage.template) {
        return // chrome.runtime.openOptionsPage()
      }

      var base = storage.base
      var template = storage.template.replace('%base%', base)

      links.forEach(function (link) {
        var href = link.getAttribute('href')
        var matched = href.replace('%2F', '/').match(/([\w-]+)\?.*&filepath=([\w.\-\/]+)$/)
        if (!matched || matched.length < 3) {
          return
        }

        var newHref = template.replace('%projectname%', matched[1]).replace('%filepath%', matched[2])
        link.setAttribute('href', newHref)
      })
    })
  }

  _process()

  document.addEventListener("pjax:end", _process)

})()
