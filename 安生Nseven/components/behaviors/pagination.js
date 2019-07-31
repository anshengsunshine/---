const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false
  },
  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray);
      this.setData({
        dataArray: tempArray
      })
    },

    //返回起始记录数
    getCurrentStart() {
      return this.data.dataArray.length;
    },

    //请求数据的总条数
    setTotal(total) {
      this.data.total = total;
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      }
    },

    //是否还有更多的数据需要加载
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    //清空数组
    initialize() {
      this.setData({
        dataArray: [],
        noneResult: false,
        loading:false
      })
      this.data.total = null;
    },

    //是否要锁住，以减少http请求
    isLocked() {
      return this.data.loading ? true : false;
    },

    //加锁
    locked() {
      this.setData({
        loading: true
      })
    },

    //解锁
    unLocked() {
      this.setData({
        loading: false
      })
    },


  }
})

export {
  paginationBev
}