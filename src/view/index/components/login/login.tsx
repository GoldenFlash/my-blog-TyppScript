import React from "react";
import { connect } from "react-redux";
import {
  Modal,
  Input,
  Button,
  Icon,
  Alert,
  Avatar,
  Dropdown,
  Menu
} from "antd";
import { login as loginAction } from "@/redux/user/action";
import { logout as logoutAction } from "@/redux/user/action";

interface IProps {
  isLogin: boolean;
  userInfo: object;
  [propName: string]: any;
}
interface IState {
  visible: boolean;
  account: string | undefined;
  password: string | undefined;
  errMessage: string | undefined;
  loading: boolean;
}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: false,
      account: "",
      password: "",
      errMessage: "",
      loading: false
    };
  }

  check = (
    account: string | undefined,
    passWord: string | undefined
  ): boolean => {
    let flag = true;
    if (!account && !passWord) {
      flag = false;
    }
    if (!account || !passWord) {
      if (account) {
        this.setState({
          errMessage: "密码不能为空"
        });
      }
      if (passWord) {
        this.setState({
          errMessage: "账号不能为空"
        });
      }
      flag = false;
    }
    return flag;
  };

  login = () => {
    var account = this.state.account;
    var passWord = this.state.password;
    this.setState({
      errMessage: ""
    });

    if (!this.check(account, passWord)) {
      return;
    }

    this.setState({
      loading: true
    });

    this.props.loginAction(account, passWord).then((res: any) => {
      let errMessage;
      if (res.error) {
        errMessage = res.message;
        this.setState({
          loading: false,
          errMessage
        });
      } else {
        this.setState({
          loading: false,
          visible: false
        });
      }
    });
  };

  logout = () => {
    this.props.logoutAction();
  };

  hideModal = () => {
    this.setState({
      visible: false
    });
  };

  _renderLoginModel = () => {
    let visible = this.state.visible;
    return (
      <Modal
        title="登陆"
        centered
        visible={visible}
        onOk={this.hideModal}
        onCancel={this.hideModal}
        footer={null}
      >
        <div>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            size="large"
            placeholder="user name"
            onChange={(e: any) => {
              let account = e.target.value;
              this.setState({
                account
              });
            }}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <Input.Password
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            size="large"
            placeholder="password"
            onChange={(e: any) => {
              let password = e.target.value;
              this.setState({
                password
              });
            }}
          />
        </div>
        {this.state.errMessage && (
          <Alert
            style={{ marginTop: 20 }}
            closable
            banner
            message={this.state.errMessage}
            type="error"
            onClose={() => {
              this.setState({
                errMessage: ""
              });
            }}
          />
        )}

        <div style={{ marginTop: 20 }}>
          <Button
            loading={this.state.loading}
            onClick={this.login}
            type="primary"
            block
          >
            登陆
          </Button>
        </div>
      </Modal>
    );
  };
  render() {
    let isLogin = this.props.isLogin;
    const menu = (
      <Menu>
        <Menu.Item onClick={this.logout}>
          <span>退出登陆</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <>
        {this._renderLoginModel()}
        <div style={{ marginRight: 20, marginLeft: 30, fontSize: 14 }}>
          {isLogin ? (
            <Dropdown overlay={menu} placement="bottomCenter">
              <Avatar
                size="large"
                icon="user"
                style={{ backgroundColor: "#87d068" }}
              />
            </Dropdown>
          ) : (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.setState({
                  visible: true
                });
              }}
            >
              <span>登录</span>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default connect(
  (state: any) => {
    return state.user;
  },
  { loginAction, logoutAction }
)(Login);
