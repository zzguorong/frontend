export function downloadPNG(imgsrc) {
  // 把this.previewImage中的字符串https://api.gaiass.com字段去掉
  if (process.env.NODE_ENV === 'development') {
    imgsrc = imgsrc.replace('https://api.gaiass.com', '');
  }
  const link = document.createElement('a');
  link.href = imgsrc;
  link.download = `image_${Date.now()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadFile(url, filename) {
  if (process.env.NODE_ENV === 'development') {
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
