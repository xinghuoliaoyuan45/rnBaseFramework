/**
 * 网络请求地址
 *
 * */
//export const server = 'http://www.bhaupu.polyhome.net/mobile';
//mock
export const server = 'http://114.112.96.30:25022/mobile';
export const API = {
	// 登录
	login: server + '/api/v1/us/users/login',
	//添加附件
	addAttachmentReturn: server + '/api/v1/common/attachment/addReturn',
  //通过id获取用户
  getUserById: server + '/api/v1/us/users/get',
}
