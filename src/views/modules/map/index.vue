<template>
  <div class="app-container">
    <el-card :shadow="defalutData.cardShadow">
      <div class="operate-container">
        <div>
          <i class="viteIcon viteZJ-ditu" style="margin-right: 5px"></i>
          <span>地图</span>
        </div>
      </div>
      <div>
        <el-form :inline="true" style="margin-bottom: 20px">
          <div class="screenForm">
            <el-form-item label="地址：" style="width: 380px">
              <el-input
                v-model="address"
                placeholder="请输入地址"
                style="width: 300px"
                clearable
                @change="addressChange(address, false)"
              ></el-input>
            </el-form-item>
            <el-form-item label="经纬度：" prop="types">
              <div class="grid grid-c-2">
                <el-input
                  v-model="location.value.lng"
                  placeholder="请输入经度"
                  clearable
                  @change="addressChange(location.value, true)"
                ></el-input>
                <el-input
                  v-model="location.value.lat"
                  placeholder="请输入纬度"
                  clearable
                  @change="addressChange(location.value, true)"
                ></el-input>
              </div>
            </el-form-item>
          </div>
        </el-form>
        <div id="container" style="height: 500px; width: 100%"></div>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { ref, reactive, defineComponent, inject, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";

// 组件
import { markerFun, markerDragend, GeocoderFun } from "@/utils/map.js";

export default defineComponent({
  name: "modulesMap",
  setup() {
    let location = reactive<any>({
      value: {
        lat: "39.90923",
        lng: "116.397428",
      },
    });
    let address = ref("中国北京市北京市东城区西长安街1号");

    let marker: any, map: any;

    nextTick(() => {
      let content = new qq.maps.LatLng(39.90923, 116.397428);
      map = new qq.maps.Map(document.getElementById("container"), {
        zoom: 8,
        center: content,
      });

      marker = markerFun(content, map);

      // 拖拽开始;
      markerDragend(marker);
      // 拖拽结束
      qq.maps.event.addListener(marker, "dragend", function (e: any) {
        //getPosition()  返回Marker的位置
        marker.setAnimation(qq.maps.MarkerAnimation.DOWN);
        location.value = marker.getPosition();

        GeocoderFun(true, location.value, marker, map).then((res: any) => {
          address.value = res.detail.address;
          location.value = res.detail.location;
        });
      });
    });

    function addressChange(e: string, type: Boolean) {
      GeocoderFun(type, e, marker, map).then((res: any) => {
        location.value = res.detail.location;
        address.value = res.detail.address;
      });
    }

    return {
      address,
      location,
      // 方法
      addressChange,
    };
  },
});
</script>

<style scoped>
.operate-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
