export default {
  methods: {
    showTitle (item) {
      return ((item.meta && item.meta.title) || item.name)
    },
    showChildren (item) {
      if (item.meta.isMenu) {
        return item.children && item.children.length > 1
      } else {
        return item.children && item.children.length > 0
      }
    },
    getNameOrHref (item, children0) {
      return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)
    }
  }
}
