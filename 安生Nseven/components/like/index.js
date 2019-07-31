// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean
    },
    count:{
      type:Number
    },
    readOnly:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: "images/喜欢-拷贝@2x的副本.png", 
    noSrc: "images/喜欢@2x.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event){
      //自定义事件
      if(this.properties.readOnly){
        return
      }
      let like =  this.properties.like;
      let count = this.properties.count;
      count = like?count-1:count+1;
      this.setData({
        count:count,
        like:!like
      })

      // 激活事件
      let behavior = this.properties.like?'like':'cancel'
      this.triggerEvent('like',{
        behavior:behavior
      },{})



    }
  }
})
