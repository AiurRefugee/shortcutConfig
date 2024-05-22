

import gsap from "gsap";
import { ref, onMounted, onUnmounted } from 'vue'

export class EventBus {
  constructor() {
    this.events = {};
  }
  emit(eventName, data) {
    if (this.events[eventName]) {
      return this.events[eventName](data)
    }
  }
  on(eventName, fn) {
    this.events[eventName] = fn;
  }

}

export function copyToClipboard(text) {
  try {
    navigator.clipboard.writeText(text)
      .then(() => {
        ElMessage({
          type: 'success',
          message: '复制成功',
          grouping: true,
        })
        console.log('Text copied to clipboard:', text);
        // 可以在这里执行成功复制到剪贴板后的操作
      })
      .catch(err => {

        ElMessage({
          type: 'error',
          message: error,
          grouping: true,
        })
        // 复制失败时的处理
      });
  } catch (err) {
    ElMessage({
      type: 'error',
      message: err,
      grouping: true,
    })
  }
}




export function useCalScroll() {

  const height = ref(0)
  const threshold = ref(0)

  function calScroll(event) {
    const scrollTitle = document.querySelector("#scrollTitle");
    height.value = scrollTitle.getBoundingClientRect().bottom;


    const title = document.querySelector("header");
    threshold.value = title.getBoundingClientRect().bottom

    if (height.value < threshold.value) {
      gsap.to('header h1', { duration: 0.1, opacity: 1, ease: "power1.inOut" });
      gsap.to(scrollTitle, { duration: 0.2, opacity: 0, ease: "power1.inOut" });
    } else {
      gsap.to('header h1', { duration: 0.1, opacity: 0, ease: "power1.inOut" });
      gsap.to(scrollTitle, { duration: 0.2, opacity: 1, ease: "power1.inOut" });
      // showed = false
    }
  }
  onMounted(() => window.addEventListener('scroll', calScroll))
  onUnmounted(() => window.removeEventListener('scroll', calScroll))

  return { height, threshold }
}

export function calScroll() {
  const scrollTitle = document.querySelector("#scrollTitle");
  const height = scrollTitle.getBoundingClientRect().bottom;


  const title = document.querySelector("header");
  const threshold = title.getBoundingClientRect().bottom

  if (height < threshold) {
    gsap.to('header h1', { duration: 0.1, opacity: 1, ease: "power1.inOut" });
    gsap.to(scrollTitle, { duration: 0.2, opacity: 0, ease: "power1.inOut" });
  } else {
    gsap.to('header h1', { duration: 0.1, opacity: 0, ease: "power1.inOut" });
    gsap.to(scrollTitle, { duration: 0.2, opacity: 1, ease: "power1.inOut" });
    // showed = false
  }
}


export function deleteParam(shortcut, index) {
  props.shortcut.params.splice(index, 1);
}

export function deleteTempNodeParam(shortcut, index) {
  props.shortcut.tempNodes.splice(index, 1)
}


export function hideLastButton(button) {
  gsap.to(button, {
    width: 0,
    marginRight: '0',
    duration: 0.3,
    // ease: "power1.inOut",
  });
}

function toogleButton(button) {
  if (button.clientWidth > 0) {
    gsap.to(button, {
      width: 0,
      duration: 0.3,
      marginRight: '0',
      // ease: "power1.inOut",
    });
  } else {
    gsap.to(button, {
      width: "4rem",
      marginRight: '0.5rem',
      duration: 0.3,
      // ease: "power1.inOut",
    });
  }
}

var lastAdd, lastDelete
export function showOpt(wrapper, canAdd) {
  hideLastButton(lastAdd);
  hideLastButton(lastDelete);
  const deleteButton = wrapper.querySelector("#delete");
  if (canAdd) {
    const addButton = wrapper.querySelector('#add')
    if (addButton) {
      toogleButton(addButton);
      lastAdd = addButton;
    }
  }

  if (deleteButton) {
    toogleButton(deleteButton);
    lastDelete = deleteButton;
  }
}

export function filterValue(originObject, queryInput) {
  // console.log(queryInput)
  if (queryInput === "") {
    return true;
  }
  if (
    originObject.shortcutName &&
    originObject.shortcutName
      .toString()
      .toLowerCase()
      .includes(queryInput.toLowerCase())
  ) {
    originObject.showShortcut = true;
    return true;
  }

  if (
    originObject.key &&
    originObject.key
      .toString()
      .toLowerCase()
      .includes(queryInput.toLowerCase())
  ) {
    originObject.showWidget = true;
    return true;
  }
  // 如果值包含关键词
  if (
    originObject.value &&
    originObject.value
      .toString()
      .toLowerCase()
      .includes(queryInput.toLowerCase())
  ) {
    originObject.showWidget = true;
    // console.log(originObject)
    return true;
  }
  if (originObject.params) {
    for (const item of originObject.params) {
      if (filterValue(item, queryInput)) {
        return true;
      }
    }
  }
  return false;
}