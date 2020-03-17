// import wx from 'weixin-jsapi'
import wx from './jsweixin.js'
import axios from './axios-init.js'
import Vue from 'vue';
import {
  Dialog,
  Toast
} from 'vant';
Vue.use(Toast).use(Dialog);

export default {
  login: function () {
    var url = location.href.split('#')[0]
    axios
      .post("data/wxjs_signature", {
        url: url
      })
      .then(res => {
        window.console.log(res);
        if (res.data.err_code == 0) {
          wx.config({
            debug: false, //这里一般在测试阶段先用ture，等打包给后台的时候就改回false,
            appId: res.data.data.appId,
            timestamp: res.data.data.timestamp,
            nonceStr: res.data.data.nonceStr,
            signature: res.data.data.signature,
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'updateAppMessageShareData',
              'updateTimelineShareData',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'chooseWXPay',
              'getLocation',
            ]
          })
        }
      })
      .catch(err => {
        window.console.log(err);
        // alert("请求失败");
      });
  },
  Share: function (Title, Link, Icon, desc) {
    var ShareInfo = {
      Title: Title,
      Link: Link,
      Icon: Icon,
      desc: desc
    };

    wx.ready(function () {
      if (wx.updateAppMessageShareData) {
        wx.updateTimelineShareData({
          title: ShareInfo.Title, // 分享标题
          link: ShareInfo.Link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: ShareInfo.Icon, // 分享图标
          success: function () {
            // 设置成功
          }
        })
      } else {
        wx.onMenuShareAppMessage({
          title: ShareInfo.Title, // 分享标题
          desc: ShareInfo.desc, // 分享描述
          link: ShareInfo.Link, // 分享链接
          imgUrl: ShareInfo.Icon, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            //分享个人
            //				PlusRV(ProjectCode, "0")
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      }
      //分享给朋友圈
      if (wx.updateTimelineShareData) {
        wx.updateAppMessageShareData({
          title: ShareInfo.Title, // 分享标题
          desc: ShareInfo.desc, // 分享描述
          link: ShareInfo.Link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: ShareInfo.Icon, // 分享图标
          success: function () {
            // 设置成功
          }
        })
      } else {
        wx.onMenuShareTimeline({
          title: ShareInfo.Title, // 分享标题
          link: ShareInfo.Link, // 分享链接
          imgUrl: ShareInfo.Icon, // 分享图标
          success: function () {
            //分享朋友圈
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      }
    });
  },
  // publish: function () { //上传相册 入参：userid,mediaid mediaid	多个图片用逗号隔开 
  //   var url = 'gallery/publish';
  //   var postData = {
  //     userid: localStorage.getItem('userId'),
  //     mediaid: imgArr.join(','),
  //   };
  //   var doSuccess = function (res) {
  //     window.console.log(res)
  //     if (res.errcode == 0) {
  //       Dialog.confirm({
  //         title: '标题',
  //         message: '上传成功'
  //       }).then(() => {
  //         // on confirm
  //         history.go(-2);
  //         location.reload();
  //       }).catch(() => {
  //         // on cancel
  //       });
  //     } else {
  //       $.toast(res.errmsg, 'text');
  //     }
  //   }
  //   //	request(url, postData, doSuccess);
  //   if (imgArr.length > 0) {
  //     // request(url, postData, doSuccess);
  //   } else {
  //     alert('请选择照片')
  //   }
  // }
}

wx.error(function (res) {
  window.console.log(res)
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});