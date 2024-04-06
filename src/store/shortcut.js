import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const breakPointSmall = 628;
const breakPointNormal = 1375;

function calWindowSize() {
  var newSize = "normal";
  const windowSize = window.innerWidth;
  if (windowSize <= breakPointSmall) {
    newSize = "small";
  } else if (windowSize > breakPointSmall && windowSize <= breakPointNormal) {
    newSize = "normal";
  }
  if (windowSize > breakPointNormal) {
    newSize = "large";
  }
  return newSize;
}

export const shortcutStore = defineStore('shortcutStore', {
  state: () => ({
    shortcut: null,
    showDialog: false,
    touchPointx: 0,
    size: calWindowSize(),
    addType: 'param',
    addParamPromise: null,
    addParamResolve: null
  }),
  getters: {
    // double: (state) => state.count * 2,
  },
  actions: {
    async getAddParam(type) {
      this.addType = type;
      this.showDialog = true
      return new Promise((resolve, reject) => {
        this.addParamResolve = resolve;
      })

    },
    updateSize() {
      this.size = calWindowSize(); 
    }
    // increment() {
    //   this.count++
    // },
  },
})