import request from './index'

export default {
  GoodsPublish(data) { //发布商品
    return request.post('/group/goods/publish', data)
  },
  GetCategory(data) { //查询子类别信息
    return request.post('/group/goods/category', data)
  },
  firstRes(that) { //获取code
    window.console.log(that.$cookies.get("userid"));
    if (that.$cookies.get("userid") == null || that.$cookies.get("userid") == '' || that.$cookies.get("userid") == undefined) {
      let code = this.getUrlParam("code");
      let local = encodeURIComponent(window.location.href);
      if (code == null || code == "") {
        let scope = "snsapi_userinfo"; //snsapi_userinfo   //获取微信信息
        let appid = "wxd2dabcb848f0aa1a";
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${local}&response_type=code&scope=${scope}&state=1#wechat_redirect`;
      } else {
        this.getopenid_data(code, that);
      }
    }

  },
  // 请求openid的方法，需要后端写法
  getopenid_data(data, that) {
    return request.get('/member/open_id?code=' + data).then(res => {
        window.console.log(res.data);
        if (res.data.err_code == 0) {
          this.user_info(res.data.data.open_id, res.data.data.head_img_url, res.data.data.nickname, that);
        } else {
          window.console.log(res.data.err_msg);
        }
      })
      .catch(err => {
        window.console.log(err);
        // alert("请求失败");
      });
  },
  // 注册 open_id,phone,username,email
  register(open_id, head_img_url, nickname, that) {
    let data = {
      open_id: open_id,
      head_img_url: head_img_url,
      nickname: nickname
    };
    return request.post('/member/register', data).then(res => {
        window.console.log(res);
        if (res.data.err_code == 0) {
          that.$cookies.set("userid", res.data.data.id); //return this
          localStorage.setItem("head_img_url", res.data.data.head_img_url);
          localStorage.setItem("nickname", res.data.data.nickname);
        }
      })
      .catch(err => {
        window.console.log(err);
      });
  },
  //查询是否注册
  user_info(open_id, head_img_url, nickname, that) {
    let data = {
      open_id: open_id
    };
    return request.post('/member/info', data).then(res => {
        window.console.log(res.data);
        if (res.data.err_code == 1) {
          this.register(open_id, head_img_url, nickname, that);
        } else if (res.data.err_code == 0) {
          that.$cookies.set("userid", res.data.data.id); //return this
          localStorage.setItem("head_img_url", res.data.data.head_img_url);
          localStorage.setItem("nickname", res.data.data.nickname);
        }
      })
      .catch(err => {
        window.console.log(err);
      });
  },
  getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let url = window.location.href.split("#")[0];
    let search = url.split("?")[1];
    if (search) {
      var r = search.substr(0).match(reg);
      if (r !== null) return unescape(r[2]);
      return null;
    } else {
      return null;
    }
  }
}