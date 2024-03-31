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
    touchPointx: 0,
    size: calWindowSize(),

  }),
  getters: {
    // double: (state) => state.count * 2,
  },
  actions: {
    updateSize() {
      this.size = calWindowSize();
    }
    // increment() {
    //   this.count++
    // },
  },
})