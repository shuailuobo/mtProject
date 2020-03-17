import axios from 'axios'
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : '/api/'; // 默认地址    
let url = process.env.NODE_ENV === 'production' ? '/api/' : '/api/'; // 默认地址 
const request = axios.create({
  baseURL: url,
})

// request.interceptors.request.use(config => {

//     if (token) {
//       //将token放到请求头发送给服务器,将tokenkey放在请求头中
//       config.headers.accessToken = token;
//       return config;
//     }
//     // return config
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

// 添加请求拦截器
request.interceptors.request.use(config => {
  // 在发送请求之前做某事，比如说 设置token
  let token = location.href.split('#')[0].split('/')[2].split('.')[0];
  if (token) {
    //将token放到请求头发送给服务器,将tokenkey放在请求头中
    config.headers['X-HOST'] = token;
    return config;
  }
}, error => {
  // 请求错误时做些事
  return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做些事
  if (response.status === 200) {
    // window.console.log(response)
    if (response.status || response.data.status === 200) {
      window.console.log('成功')
      // response.data.data.value = '我是返回成功' // 在请求成功后可以对返回的数据进行处理，再返回到前台
    } else {
      window.console.log('返回到登录...')
    }
  }
  return response;
}, error => {
  return Promise.reject(error.response.data); // 返回接口返回的错误信息
})

export default request