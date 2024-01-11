
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
