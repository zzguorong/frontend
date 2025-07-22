// 把 Blob URL 转成 base64 字符串
export async function blobUrlToBase64(blobUrl) {
  // 使用 fetch 请求 Blob URL，fetch 返回的是 Response 对象
  const res = await fetch(blobUrl);

  // 从 Response 中读取 Blob 对象
  const blob = await res.blob();

  // 调用自定义函数，将 Blob 转成 base64
  return blobToBase64(blob);
}

// 把 Blob 对象转换成 base64 字符串的函数，返回 Promise
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // 读取完成后的回调，结果是 base64 字符串
    reader.onloadend = () => resolve(reader.result);

    // 读取出错时的回调，调用 reject 传出错误
    reader.onerror = reject;

    // 读取 Blob 对象为 DataURL（base64）格式
    reader.readAsDataURL(blob);
  });
}
