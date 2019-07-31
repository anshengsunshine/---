// pages/my/my.js
import {
  ClassicModel
} from "../../models/classic.js";

import {
  BookModel
} from "../../models/book.js";

import{
  promisic
}from "../../util/common.js"

const classicModel = new ClassicModel();
const bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: "",
    myBooksCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.userAuthorized2();
    this.getMyBookCount();
    this.getMyFavor();
  },

  //获取喜欢的期刊
  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },

  //获取喜欢的书籍数量
  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          myBooksCount: res.count
        })
      })
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  userAuthorized1() {
    promisic(wx.getSetting)()
      .then(data => {
        if (data.authSetting['scope.userInfo']) {
          return promisic(wx.getUserInfo)()
        }
        return false;
      })
      .then(data => {
        if (!data) return;
        this.setData({
          authorized: true,
          userInfo: data.userInfo
        })
      })
  },

  async userAuthorized2() {
    const data = await promisic(wx.getSetting)();
    if (data.authSetting['scope.userInfo']) {
      const res = await promisic(wx.getUserInfo)();
      const userInfo = res.userInfo;
      this.setData({
        authorized: true,
        userInfo
      })
    }
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  }


})