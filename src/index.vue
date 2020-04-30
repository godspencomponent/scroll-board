<template>
  <div class="component">
    <component
      v-if="componentName"
      :is="componentName"
      :config="config"
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
          return [
            ['<span style="color:#37a2da;">行1列1</span>', '行1列2', '行1列3'],
            ['行2列1', '<span style="color:#32c5e9;">行2列2</span>', '行2列3'],
            ['行3列1', '行3列2', '<span style="color:#67e0e3;">行3列3</span>'],
            ['行4列1', '<span style="color:#9fe6b8;">行4列2</span>', '行4列3'],
            ['<span style="color:#ffdb5c;">行5列1</span>', '行5列2', '行5列3'],
            ['行6列1', '<span style="color:#ff9f7f;">行6列2</span>', '行6列3'],
            ['行7列1', '行7列2', '<span style="color:#fb7293;">行7列3</span>'],
            ['行8列1', '<span style="color:#e062ae;">行8列2</span>', '行8列3'],
            ['<span style="color:#e690d1;">行9列1</span>', '行9列2', '行9列3'],
            ['行10列1', '<span style="color:#e7bcf3;">行10列2</span>', '行10列3']
          ]
        },
        editor: {
          ignore: true
        }
      },
      info: {
        type: Object,
        default () {
          return {
            rowNum: 5,
            waitTime: 2000,
            headerHeight: 35,
            carousel: 'single',
            header: '',
            headerString: '列1, 列2, 列3',
            headerBGC: '#00BAFF',
            oddRowBGC: '#003B51',
            evenRowBGC: '#0A2732',
            columnWidth: [],
            align: [],
            index: true,
            indexHeader: '#',
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
        let data = this.data
        console.log(data, '---111--')
        if (this.datasourcekey) {
          const dataStr = this.dataHubGet && this.dataHubGet(this.datasourcekey)
          try {
            data = JSON.parse(dataStr)
          } catch (e) {
            console.log('error Scroll-Board', '获取数据解析json对象异常')
            data = []
          }
        }
        if (this.info.headerString) {
          const arr = /,/.test(this.info.headerString) ? this.info.headerString.split(',') : this.info.headerString.split('，')
          this.info.header = this.info.headerString ? arr : ''
        }
        console.log(data, '-----')
        return {
          ...this.info,
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
