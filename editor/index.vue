<template>
  <div class="component-editor">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>列表数据</span>
        </div>
        <el-form ref="form" label-width="60px" size="mini">
          <el-form-item label="使用数据源:" label-width="100px">
            <el-checkbox border size="mini" v-model="usedatasource"></el-checkbox>
          </el-form-item>
          <el-form-item v-if="usedatasource" label="数据源:" label-width="100px">
            <el-input placeholder="填写数据总线的key" v-model="componentInfo.datasourcekey"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基础配置</span>
        </div>
        <el-form ref="form" label-width="100px" label-position="right" size="mini">
          <el-form-item label="表头数据:">
            <el-input v-model="componentInfo.info.headerString" placeholder="以英文逗号分隔数据"></el-input>
          </el-form-item>
          <el-form-item label="表头高度:" v-if='componentInfo.info.headerString'>
            <el-input v-model.number="componentInfo.info.headerHeight" type='number'></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="轮播方式:">
                <el-select v-model="componentInfo.info.carousel" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if='componentInfo.info.header'>
              <el-form-item label="表头背景色:" label-width="150px">
                <el-color-picker v-model="componentInfo.info.headerBGC" show-alpha></el-color-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="奇数行背景色:" label-width="150px">
                <el-color-picker v-model="componentInfo.info.oddRowBGC" show-alpha></el-color-picker>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="偶数行背景色:" label-width="150px">
                <el-color-picker v-model="componentInfo.info.evenRowBGC" show-alpha></el-color-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="表展示行数:" label-width="100px">
            <el-input v-model.number="componentInfo.info.rowNum" type="number"></el-input>
          </el-form-item>
          <el-form-item label="轮播时间间隔(ms):" label-width="140px">
            <el-input v-model.number="componentInfo.info.waitTime" type="number"></el-input>
          </el-form-item>
          <el-form-item label="是否显示行号:" label-width="100px">
            <el-switch
              v-model="componentInfo.info.index"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
          <el-form-item label="行号表头文案:" v-if='componentInfo.info.header'>
            <el-input v-model="componentInfo.info.indexHeader"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'maliangeditor',
    props: {
      componentInfo: { // 固定字段，收集所有属性值
        type: [Object],
        default () {
          return {
            datasourcekey: '',
            data: [],
            info: {}
          }
        }
      }
    },
    data () {
      return {
        usedatasource: false,
        options: [{
          value: 'single',
          label: '单条滚动'
        }, {
          value: 'page',
          label: '整页滚动'
        }]
      }
    },
    computed: {
      data2 () {
        return this.componentInfo.data
      }
    },
    watch: {
      'usedatasource': {
        handler (v) {
          if (!v) {
            this.componentInfo.datasourcekey = ''
          }
        },
        immediate: true
      },
      'componentInfo.data': {
        handler (v) {
          if (v && v.length != 0) {
            // data变化不引起视图改变，改变其他属性实现
            this.componentInfo.info.sort = !this.componentInfo.info.sort
            this.$nextTick(_ => {
              this.componentInfo.info.sort = !this.componentInfo.info.sort
            })
          }
        },
        deep: true
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .box-card {
    margin-top: 30px;

    .tag {
      padding-right: 80px;
      position: relative;
      margin-bottom: 5px;

      .el-color-picker {
        position: absolute;
        right: 30px;
        top: 0;
      }

      i {
        display: none;
        position: absolute;
        right: 0;
        top: 5px;
        color: #F56C6C;
        cursor: pointer;
      }

      &:hover {
        i {
          display: block;
        }
      }
    }
  }
</style>
