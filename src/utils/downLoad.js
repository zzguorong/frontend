export function downloadPNG(imgsrc) {
  // 把this.previewImage中的字符串https://api.gaiass.com字段去掉
  // imgsrc = imgsrc.replace("https://api.gaiass.com", "");
  this.$message.success("开始下载JPG格式...");
  var image = new Image();
  image.setAttribute("crossOrigin", "anonymous");
  image.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);
    var url = canvas.toDataURL("image/png");
    var a = document.createElement("a");
    var event = new MouseEvent("click");
    a.download = `image${Date.now()}.png`;
    a.href = url;
    a.dispatchEvent(event);
  };
  image.src = imgsrc;
}
