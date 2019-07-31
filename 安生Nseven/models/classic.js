import {
  HTTP
} from '../util/http.js';

class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res);
        this._setLatestIndex(res.index);
        let key = this._getKey(res.index);
        wx.setStorageSync(key, res)
      }
    })
  }

  //获取下一期期刊数据
  getClassic(index, nextOrPrevious, sCallback) {
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    let classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        // url: 'classic/' + index + '/' + nextOrPrevious,
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }
  }

  //判断是否是第一期
  isFirst(index) {
    return index == 1 ? true : false;
  }

  //判断是不是当前最新一期
  isLatest(index) {
    let LatestIndex = this._getLatestIndex(index);
    return LatestIndex == index ? true : false;
  }

  //获取喜欢的期刊
  getMyFavor(success) {
    const params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
  }

  //获取最新期刊的期刊号index值并缓存
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index);
  }

  //读取最新期刊的期刊号index值的缓存
  _getLatestIndex() {
    let index = wx.getStorageSync('latest');
    return index;
  }

  //获取自定义key
  _getKey(index) {
    let key = 'classic-' + index;
    return key;
  }

}

export {
  ClassicModel
}