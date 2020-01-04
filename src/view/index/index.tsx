import React, { Component } from 'react';
// import { connect } from "react-redux";
import Loading from "../../components/Loading"
import api from "../../api/api";
// import SideNav from "../sideNav/index"
import List from "./components/list/index"
import Carousel from "./components/carousel/carousel"
interface IProps{

}
interface state{
    list:Array<object>
    loading:boolean
}
export default class ArticalList extends Component<IProps,state> {
   
    constructor(props:any) {
        super(props)
        this.state = {
            list: [],
            // timeLine: [],
            loading: false,
        }
    }
    componentDidMount() {
        this.getArticlesList()
        let a = this.state.a 
    }

    getArticlesList() {
        this.setState({
            loading: true
        })
        api.get(`article/getHotArticle`).then(res => {
            if (res.data) {
                this.setState({
                    list: res.data,
                    loading: false
                });
            }
        });
    }


    render() {
        // let { loading, articleList, searchList } = this.state
        let loading = this.state.loading
        var list = this.state.list
        return (
            loading ? <Loading /> :
                list.length > 0 ?
                    <div style={{ display: "flex", minHeight: "100vh", justifyContent: "center" }}>
                        <div style={styles.articleContent}>
                            <Carousel></Carousel>
                            <List {...this.props} list={list}></List>
                        </div>
                        {/* <SideNav></SideNav> */}
                    </div>
                    : <div>数据为空</div>
        )
    }
}

const styles = {
    articleContent: {
        flex: 1,
        borderRight: "solid #e8e8e8 1px",
        maxWidth: '800px'
    }
}
