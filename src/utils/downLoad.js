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
