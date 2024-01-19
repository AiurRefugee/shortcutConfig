
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

export function trans(obj) {
  if (obj.params) {
    for (const child of obj.params) {
      trans(child)
    }
    for (const item of obj.params) {
      const key = item.key
      delete (item.key)
      obj[key] = item
    }
    delete obj.params

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

export let adding = false

export function calHeight(object) {
  if (object.type) {
    return 1;
  } else {
    let paramNum = 0;
    let tempNum = 0;
    if (object.params) {
      for (const item of object.params) {
        // console.log(key, subObj)
        paramNum += calHeight(item);
      }
    }
    if (object.tempNodes) {
      for (const subTemp of object.tempNodes) {
        tempNum += calHeight(subTemp);
      }
    }
    return paramNum + tempNum + 1;
  }
}

// 查找节点
export function findItem(element, className, depth) {  
  if (!element || !depth || !className || depth === 0) {
    return;
  }

  if (element && element.classList.contains(className)) {
    return element;
  }

  const parent = element.parentNode;

  const parentRes = findItem(parent, className, depth - 1);
  if (parentRes) {
    return parentRes;
  }

  // 查找子节点中具有指定类名的节点
  const children = Array.from(element.children);
  if (children) {
    for (const child of children) {
      const target = findItem(child, className, depth - 1);
      if (target) {
        return target;
      }
    }
  }

  // 查找兄弟节点中具有指定类名的节点
  let sibling = element.nextElementSibling;
  while (sibling) {
    if (sibling.classList.contains(className)) {
      // 可以在这里进行相关操作，如返回该节点或执行其他逻辑
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }

  
} 