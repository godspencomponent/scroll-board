<template>
  <div class="component">
    <component
      v-if="componentName"
      :is="componentName"
      :config="config"
      style="width:500px;height:220px"
      @click='click'
    >
    </component>
  </div>
</template>

<script>
  import {VueExtend} from 'godspen-lib'
  import {scrollBoard} from '@jiaminghi/data-view'

  export default {
    mixins: [VueExtend.mixin],
    name: 'scroll-board',
    label: process.env.LABEL,
    style: process.env.STYLE,
    data () {
      return {
        componentName: ''
      }
    },
    props: {
      datasourcekey: {
        type: String,
        default: '',
        editor: {
          ignore: true
        }
      },
      data: {
        type: Array,
        default () {
          return []
        },
        editor: {
          ignore: true
        }
      },
      info: {
        type: Object,
        default () {
          return {
          }
        },
      }
    },
    mounted () {
      // 纯属演示异步加载js资源，与本组件无关； loadJs返回一个promise实例 可以用async 或者 then 来处理回调
      window.Vue.use(scrollBoard)
      this.componentName = 'DvScrollBoard'
    },
    computed: {
      config () {
        let {info, data} = this
        if (this.datasourcekey) {
          const dataStr = this.dataHubGet && this.dataHubGet(this.datasourcekey)
          try {
            data = JSON.parse(dataStr)
          } catch (e) {
            console.log('error Scroll-Board', '获取数据解析json对象异常')
            data = []
          }
        }
        const arr = /,/.test(info.headerString) ? info.headerString.split(',') : info.headerString.split('，')
        info.header = info.headerString ? arr : ''
        return {
          ...info,
          data: data,
        }
      }
    },
    editorMethods: {
    },
    methods: {
      click (res) {
        console.log(res, '轮播表行点击')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .component {
    width: 100%;
    height: 100%;
  }
</style>
