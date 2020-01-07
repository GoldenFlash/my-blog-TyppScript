import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Icon, Avatar, Dropdown } from "antd";
import { withRouter } from "react-router";

import search_img from "@/assets/search.svg";
import styles from "./header.module.scss";
import Login from "../login/login";

interface IProps {
  userInfo?:{
    auth?:number|undefined
  }
  windowWidth?:number
  history:{
    push:(key:string)=>void
  }
  [propname:string]:any
}
interface IState {
  menus:Array<object>
}
class Header extends React.Component<IProps, IState> {
  keyWord: any;
  constructor(props: IProps) {
    super(props);
    this.state = {
      menus: [
        { path: "/", title: "首页", type: "home" },
        { path: "/archive", title: "归档", type: "snippets" },
        { path: "/about", title: "关于", type: "user" },
        { path: "/edite", title: "写文章", type: "edit", auth: "0" }
      ]
    };
  }

  onMenuClick = (e: { key: string }) => {
    this.props.history.push(e.key);
  };

  onSearch = () => {
    var keyWord = this.keyWord;
    if (keyWord) {
      this.props.history.push(`/search/${keyWord}`);
    }
  };

  render() {
    let userInfo = this.props;

    return (
      <header className={styles.header}>
        <div className={styles.titleBar_left}>
          <Link className={styles.link} to="/">
            <Icon
              type="home"
              style={{ color: "#333", marginRight: 5, fontSize: 20 }}
            />
            <span style={{ fontSize: "20px" }}>博客</span>
          </Link>
        </div>
        <div className={styles.titleBar_middle}>
          <input
            className={styles.titleBar_input}
            type="text"
            placeholder="输入关键词搜索..."
            onKeyDown={e => {
              if (e.keyCode === 13) {
                this.onSearch();
              }
            }}
            onInput={(e: any) => {
              this.keyWord = e.target.value;
            }}
          />
          <div onClick={this.onSearch} className={styles.titleBar_search}>
            <img
              alt=""
              src={search_img}
              style={{ width: "20px", height: "20px" }}
            />
          </div>
        </div>
        <div className={styles.menu}>
          <Menu
            selectable={false}
            onClick={this.onMenuClick}
            mode="horizontal"
            defaultSelectedKeys={["0"]}
          >
            {this.state.menus.map((item: any) => {
              if (!item.auth) {
                return (
                  <Menu.Item key={item.path}>
                    <Icon type={item.type} style={{ marginRight: 5 }} />
                    <span>{item.title}</span>
                  </Menu.Item>
                );
              } else if (item.auth && item.auth === userInfo.auth) {
                return (
                  <Menu.Item key={item.path}>
                    <Icon type={item.type} style={{ marginRight: 5 }} />
                    <span>{item.title}</span>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
          <Login />
        </div>
      </header>
    );
  }
}

export default withRouter(
  connect(
    (state: { user: object; common: { windowWidth: number } }) => ({
      ...state.user,
      windowWidth: state.common.windowWidth
    })
  )(Header)
);
