export async function downloadFile(url, filename) {
  if (process.env.NODE_ENV === 'development') {
    // Dev env: 把URL中的字符串https://api.gaiass.com字段去掉
    // 使用proxy解决跨域问题
    url = url.replace('https://api.gaiass.com', '');
  }
  const response = await fetch(url);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(blobUrl); // 释放内存
}
