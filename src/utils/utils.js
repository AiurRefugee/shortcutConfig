

import gsap from "gsap"; 

export class EventBus {
  constructor() {
    this.events = {};
  }
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName](data)
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
 



export function calScroll(scrollView, event) {
  var showed = false
  const height = event.target.scrollTop;
  const scrollTitle = scrollView
    .querySelector("#scrollTitle")
  var rect = null
  if (!scrollTitle) {
    console.log('g')
    return false
  }
  rect = scrollTitle.getClientRects()[0];
  const threshold = (rect.bottom + rect.top) * 0.5  
  const header = scrollView.querySelector("header");
  const title = header.querySelector("h1"); 
  if (threshold < height) {
    if (!showed) {
      gsap.to(title, { duration: 0.1, opacity: 1, ease: "power1.inOut" });
      // gsap.to('#left', { duration: 0.1, opacity: 1, ease: "power1.inOut" });
      // gsap.to('#right', { duration: 0.1, opacity: 1, ease: "power1.inOut" });
      gsap.to(scrollTitle, { duration: 0.2, opacity: 0, ease: "power1.inOut" });
      // header.style.background = 'linear-gradient(to bottom, var(--bgLight_Primary) 50%, transparent 100%)'
      showed = true
    }

  } else {

    gsap.to(title, { duration: 0.1, opacity: 0, ease: "power1.inOut" });
    // gsap.to('#left', { duration: 0.1, opacity: 0, ease: "power1.inOut" });
      // gsap.to('#right', { duration: 0.1, opacity: 0, ease: "power1.inOut" });
    gsap.to(scrollTitle, { duration: 0.2, opacity: 1, ease: "power1.inOut" });
    // header.style.background = 'var(--bgLight_Primary)'
    showed = false
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