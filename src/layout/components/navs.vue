<template>
  <div style="padding: 5px 20px 0 10px" class="navs">
    <div class="left">
      <i
        :class="['vitecaidan', 'viteIcon', collapse ? 'collapse' : '']"
        :style="{ color: themeColor }"
        @click="$emit('isCollapse', (collapse = !collapse))"
      >
      </i>
      <el-breadcrumb separator="/">
        <transition-group name="list">
          <!-- <span v-for="(item,index) in matched" :key='index'>
                    {{item.meta.title}}{{index}}
                </span> -->
          <el-breadcrumb-item
            :to="{ path: item.path }"
            v-for="(item, index) in matched"
            :key="index"
          >
            <span v-if="item.redirect" class="no-redirect">{{
              t(item.meta.locale)
            }}</span>
            <router-link v-else :to="item.redirect || item.path">{{
              t(item.meta.locale)
            }}</router-link>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>

    <navs-right></navs-right>
  </div>
</template>

<script>
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

import navsRight from './navs-right.vue'

export default {
  components: {
    navsRight
  },
  emits: {
    "isCollapse": null
  },
  setup () {
    let route = useRoute()
    let matched = []
    matched = computed(() => {
      let arr = route.matched
      if (arr[0].path !== '/') {
        arr = [{ path: '/', meta: { title: '首页', locale: 'home' } }].concat(route.matched)
      }

      return arr.filter(item => item.meta && item.meta.title && !item.meta.breadcrumb)
    })
    let collapse = ref(true)
    // console.log(matched);

    return {
      matched,
      collapse,
    }
  }
}
</script>

<style lang="scss" scoped>
.navs {
  height: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    > div {
      margin-right: 10px;
    }
    i {
      font-size: 16px;
      margin-right: 5px;
      transition: all 0.4s;
    }
    .collapse {
      transform: rotate(-180deg);
    }
  }
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>