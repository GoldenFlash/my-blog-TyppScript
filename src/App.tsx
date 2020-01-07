import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";

import moment from "moment";
import "moment/locale/zh-cn";
import reducers from "./redux/reducers";
import "antd/dist/antd.css";
import { windowWidth as windowAction } from "@/redux/common/action.js";
import ScrollToTop from "@/components/ScrollToTop";

import "./App.css";
import Index from "./view/index/index";

moment.locale("zh-cn");

var store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware // 允许我们 dispatch() 函数
  )
);

store.dispatch(windowAction());
let timer:any = null
window.onresize = () => {
  if(timer){
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    console.log("timer")
    store.dispatch(windowAction());
    timer = null
  }, 1000);
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop>
          <Route path="/">
            <Index></Index>
          </Route>
        </ScrollToTop>




        {/* <Route exact path="/article/:id" component={ArticleContent} />
        <Route exact path="/archive" component={Archive} />
        <Route exact path="/tag/:tag" component={Tag} />
        <Route exact path={`/search/:search`} component={ArticleList} />
        <Route exact path={`/timeline/:time`} component={Timeline} />
        <Route exact path="/" component={ArticleList} />
        <Route path="*" component={NotFound} /> */}

        {/* <Switch>
          <Route path="/edite" component={Edite} />
          <Route path="/" component={Index}></Route>
          <Route path="*" component={NotFound} ></Route>
        </Switch> */}
      </Router>
    </Provider>
  );
};

export default App;
