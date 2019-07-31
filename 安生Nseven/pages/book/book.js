// pages/book/book.js

import {
  BookModel
} from '../../models/book.js';

import {
  random
} from '../../util/common.js';

const bookModel = new BookModel();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const books = await bookModel.getHotList();
    this.setData({
      books
    })
  },

  // 点击出现搜素
  onSearching(event) {
    this.setData({
      searching: true
    })
  },

  //点击取消可以关闭搜索
  onCancel(event) {
    this.setData({
      searching: false
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      more: random(16)
    })
  },

})