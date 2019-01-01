import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute
} from '@/libs/util'
import routers from '@/router/routers'
export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: getHomeRoute(routers),
    local: '',
    richEditorDef: { // 富文本编辑器配置
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          // ['blockquote', 'code-block'],
          [{
            list: 'ordered'
          }, {
            list: 'bullet'
          }],
          // [{ script: 'sub' }, { script: 'super' }],
          [{
            indent: '-1'
          }, {
            indent: '+1'
          }],
          // [{ direction: 'rtl' }],
          [{
            size: ['small', false, 'large', 'huge']
          }],
          // [{ header: [1, 2, 3, 4, 5, 6, false] }],
          // [{ font: [] }],
          [{
            color: []
          }, {
            background: []
          }],
          [{
            align: []
          }],
          ['clean'],
          // ['link', 'image', 'video']
          ['image']
        ]
      },
      placeholder: '请输入详情信息...',
      theme: 'snow'
    },
    simpleRichEditorDef: { // 简单富文本编辑器
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{
            list: 'ordered'
          }, {
            indent: '-1'
          }, {
            indent: '+1'
          }],
          ['clean']
        ]
      },
      placeholder: '请输入详情信息...',
      theme: 'snow'
    }
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access)
  },
  mutations: {
    setBreadCrumb (state, routeMetched) {
      state.breadCrumbList = getBreadCrumbList(routeMetched)
    },
    setTagNavList (state, list) {
      if (list) {
        state.tagNavList = [...list]
        setTagNavListInLocalstorage([...list])
      } else state.tagNavList = getTagNavListFromLocalstorage()
    },
    addTag (state, item, type = 'unshift') {
      if (state.tagNavList.findIndex(tag => tag.name === item.name) < 0) {
        if (type === 'push') state.tagNavList.push(item)
        else state.tagNavList.unshift(item)
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal (state, lang) {
      state.local = lang
    }
  }
}
