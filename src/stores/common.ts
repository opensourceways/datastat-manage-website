import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';

export const useCommon = defineStore('common', () => {
  const lang = ref('zh');
  const changeLang = (state: string) => {
    lang.value = state;
    const app = document.querySelector('html');
    app && (app.lang = state);
  };

  const theme = ref('light');
  const selectAsideItem = ref('/contributor');
  const community = ref('openeuler');
  const commonParams = ref({
    org: [''],
    start: 0,
    end: 0,
  });
  return {
    lang,
    changeLang,
    theme,
    selectAsideItem,
    community,
    commonParams,
  };
});

/**
 * @callback store 将store返回，使用解构赋值接受
 */
export function useCommonData() {
  const counter = useCommon();
  const stores = storeToRefs(counter);
  return stores;
}
