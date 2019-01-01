import { getParams } from '@/libs/util'
const USER_MAP = {
  super_admin: {
    name: 'super_admin',
    user_id: '1',
    access: [1],
    token: 'super_admin',
    avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
  },
  admin: {
    name: 'admin',
    user_id: '2',
    access: [2],
    token: 'admin',
    avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  return {
    code: 200,
    data: {token: USER_MAP[req.userName].token},
    msg: ''
  }
}

export const getUserInfo = req => {
  const params = getParams(req.url)
  return {
    code: 200,
    data: USER_MAP[params.token],
    msg: ''
  }
}

export const logout = req => {
  return {
    code: 200,
    data: null,
    msg: ''
  }
}
