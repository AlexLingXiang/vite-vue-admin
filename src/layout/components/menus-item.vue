<template>
  <div v-if="!item.hidden" :class="{ _submenu: collapse }">
    <el-submenu
      :index="item.name"
      v-if="item.children && item.children.length > 1"
    >
      <template #title>
        <div
          :style="{
            overflowX: collapse ? 'visible' : 'hidden',
            width: '100%',
            textOverflow: 'ellipsis',
          }"
        >
          <i :class="[item.meta.icon, 'viteIcon']"></i>
          <span class="metaTitle" v-show="!collapse">
            {{ t((item.meta && item.meta.locale) || "null") }}
          </span>
        </div>
      </template>
      <!-- <template v-for="(each) in item.children" :key="each.name"> -->
      <!-- <el-menu-item-group
          v-if="!each.hidden"
          class="children"
        > -->
      <menusItem
        :collapse="collapse"
        v-for="each in item.children"
        :key="each.name"
        :item="each"
        :count="count + 1"
      ></menusItem>
      <!-- <el-menu-item :index="_index + '-' + idx">
            <i :class="[each.meta.icon, 'viteIcon']"></i>
            {{ each.meta && each.meta.title }}</el-menu-item
          > -->
      <!-- </el-menu-item-group> -->
      <!-- </template> -->
    </el-submenu>

    <el-menu-item
      :data-count="count"
      :index="(item.children && item.children[0].name) || item.name"
      :style="{ paddingLeft: count * 20 + 'px' }"
      v-else
    >
      <a
        :href="
          (item.children && item.children[0].meta.url) ||
          (item.meta && item.meta.url)
        "
        target="_black"
        v-if="
          (item.children && item.children[0].meta.url) ||
          (item.meta && item.meta.url)
        "
      >
        <i
          :class="[
            (item.children && item.children[0].meta.icon) ||
              (item.meta && item.meta.icon) ||
              '',
            'viteIcon',
          ]"
        ></i>
        <span class="metaTitle" v-show="!collapse">
          {{
            t(
              (item.children && item.children[0].meta.locale) ||
                item.meta.locale ||
                "null"
            )
          }}
        </span>
      </a>

      <router-link
        v-else
        :to="{ name: (item.children && item.children[0].name) || item.name }"
        :style="{ overflowX: collapse ? 'visible' : 'hidden' }"
      >
        <i
          :class="[
            (item.children && item.children[0].meta.icon) ||
              (item.meta && item.meta.icon) ||
              '',
            'viteIcon',
          ]"
        ></i>
        <span class="metaTitle" v-show="!collapse">
          {{
            t(
              (item.children && item.children[0].meta.locale) ||
                item.meta.locale ||
                "null"
            )
          }}
        </span>
      </router-link>
    </el-menu-item>
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: 'menusItem',
  props: {
    item: {
      type: Object,
      default: () => { },
    },
    index: {
      type: [Number, String],
      default: 0
    },
    // 组件层次
    count: {
      type: Number,
      default: 1
    },
    collapse: {
      type: Boolean,
      default: true
    },
  },
  emits: ['update:activeIndex'],
  setup (props, context) {
    // let parentIdx = ref(props.activeIndex)

    // function getIndex(){
    //   context.emit('update:activeIndex',props.parentIndex)
    //   parentIdx.value = props.parentIndex
    // }

    // watch(parentIdx,(val)=>{
    //   context.emit('update:activeIndex',val)
    // })

    // return{
    //   parentIdx,
    //   getIndex
    // }
  }
});
</script>

<style scoped>
._submenu :deep() .el-submenu__icon-arrow {
  display: none;
}

.metaTitle {
  margin-left: 6px;
}
</style>