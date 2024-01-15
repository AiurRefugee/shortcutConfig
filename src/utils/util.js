
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