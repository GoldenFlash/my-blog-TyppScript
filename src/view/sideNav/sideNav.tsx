import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Divider, Calendar } from "antd";
import CustomCanlendar from "@/components/calendar";
import styles from "./sideNav.module.scss";
import calendar_img from "@/assets/calendar.svg";
import api from "@/api/api";

interface IProps {}
interface IState {
  hotArticle: Array<object>;
  tags: Array<object>;
  timeLine: Array<object>;
  labelsClass: Array<string>;
  loading:boolean
}
export default class LeftNav extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
        loading:false,
      hotArticle: [],
      tags: [],
      timeLine: [],
      labelsClass: [
        "ant-tag-magenta",
        "ant-tag-blue",
        "ant-tag-red",
        "ant-tag-volcano",
        "ant-tag-orange",
        "ant-tag-gold",
        "ant-tag-lime",
        "ant-tag-green",
        "ant-tag-cyan",
        "ant-tag-geekblue",
        "ant-tag-purple",
        "ant-tag-lime"
      ]
    };
  }

  componentDidMount() {
    this.getTags();
    this.getTimeLine();
    this.getArticlesList();
  }

  getTags() {
    api.get("tags/getTags").then((res:any) => {
      this.setState({
        tags: res.data
      });
    });
  }

  getTimeLine = () => {
    api.get("article/getTimeLine").then((res:any) => {
      if (res.data) {
        this.setState({
          timeLine: res.data,
          loading: false
        });
      }
    });
  };

  getArticlesList() {
    api.getHotArticleList().then((res: any) => {
      if (res.data) {
        this.setState({
          hotArticle: res.data.slice(0, 5)
        });
      }
    });
  }

  render = () => {
    var { hotArticle, tags, timeLine, labelsClass } = this.state;
    return (
      <div className={styles.leftNav}>
        <CustomCanlendar></CustomCanlendar>
        <div style={{ marginTop: 10, width: "100%" }}>
          <Divider orientation="left">最热</Divider>
          <div className={styles.hotArticle}>
            {hotArticle.map((item:any, i) => {
              return (
                <div key={i} className={styles.article}>
                  <Link to={{ pathname: `/article/${item._id}` }}>
                    {item.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 10, width: "100%" }}>
          <Divider orientation="left">文章归档</Divider>
          <div className={styles.hotArticle}>
            {timeLine.map((item:any, i) => {
              let time = item.time.match(/(\d{4})年(\d{2})月/);
              return (
                <div key={i} className={styles.timeLine}>
                  <img src={calendar_img} alt="" className={styles.image} />
                  <Link
                    to={{
                      pathname: `/timeline/${time[1]}${time[2]}`
                    }}
                  >
                    {item.time}({item.num})
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <Divider orientation="left">标签</Divider>
          <div className={styles.lables}>
            {tags &&
              tags.map((item:any, i) => {
                return (
                  <Link
                    to={{ pathname: `/tag/${item.title}` }}
                    key={i}
                    className={`item ant-tag ${
                      i < 12 ? labelsClass[i] : labelsClass[i - 11]
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    );
  };
}