import api from "../../api/api";
var action = (userInfo: {}, isLogin: boolean, type: string) => {
  return {
    type: type,
    content: {
      userInfo,
      isLogin: isLogin
    }
  };
};
export const login = (
  account: string | undefined,
  passWord: string | undefined
) => {
  return (dispatch:(action:object)=>void) => {
    return api.login(account, passWord).then((res: any) => {
      if (!res.error) {
        localStorage.setItem("token", res.data.token);
        dispatch(action(res.data, true, "login"));
      }
      return res;
    });
  };
};

export const logout = () => {
  return (dispatch:(action:object)=>void) => {
    return api.post("users/logout").then((res: any) => {
      if (!res.err) {
        dispatch(action({}, false, "logout"));
      }
    });
  };
};
