import { defineComponent, ref, Transition } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup(props) {
    const store = useStore();
    const router = useRouter()
    const handleNavTo = (e: string) => {
      router.push({
        path: e,
      });
    };

    return () => (
      <div class="item">
        <el-tooltip
          content={'Bug / ' + store.getters.getBugNumber}
          placement="bottom"
        >
          <div class={['item', { isBug: store.getters.getBugNumber !== 0 }]}>
            <i
              class='viteIcon vitebug'
              onClick={(e) => handleNavTo('/log/add-log')}
            ></i>

            <span class="bugNum"></span>
          </div>
        </el-tooltip>
      </div>
    );
  },
});