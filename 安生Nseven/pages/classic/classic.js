import {
  ClassicModel
} from '../../models/classic.js';
import {
  LikeModel
} from '../../models/like.js';
let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount:0,
    likeStatus:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicModel.getLatest((res) => {
      this.setData({
        classic: res,
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
  },

  //读取自定义组件like是否被点击
  onLike: function(event) {
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
  },

  // 向右
  onPrevious: function(event) {
    this._updateClassic('previous');
  },

  // 向左
  onNext: function(event) {
    this._updateClassic('next');
  },

  //更新向左向右期刊的数据
  _updateClassic: function (nextOrPrevious) {
    let index = this.data.classic.index;
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id,res.type);
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLatest(res.index)
      })
    })
  },

  //更新like组件的方法
  _getLikeStatus: function (artID, category){
    likeModel.getClassicLikeStatus(artID, category,(res)=>{
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  }

})