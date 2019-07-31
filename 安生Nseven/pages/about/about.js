// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgData: ['https://img-blog.csdnimg.cn/20190726222426956.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Fuc2hlbmcwMg==,size_16,color_FFFFFF,t_70', 'https://img-blog.csdnimg.cn/20190726222447734.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Fuc2hlbmcwMg==,size_16,color_FFFFFF,t_70', 'https://img-blog.csdnimg.cn/201907262225016.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Fuc2hlbmcwMg==,size_16,color_FFFFFF,t_70']
  },

  // 点击图片可预览
  previewImage(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imgData
    })
  }

})