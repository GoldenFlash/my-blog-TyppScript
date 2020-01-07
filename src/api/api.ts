/**
 * api
 * @author 王伟
 *time:2018-10-2
 */

import request from "./request";
function faceBook() {
  let data = {};
  var key = "faceBook";
  var time = 60;
  return request(
    "https://facebook.github.io/react-native/movies.json",
    data,
    "GET",
    key,
    time
  );
}
function post(url: string, data?: {} | undefined, key?: any, time?: any) {
  return request(
    `/blog/api/${url}`,
    data,
    "POST",
    key ? key : "",
    time ? time : ""
  );
}
function get(url: string, data?: {} | undefined, key?: any, time?: any) {
  return request(
    `/blog/api/${url}`,
    data,
    "GET",
    key ? key : "",
    time ? time : ""
  );
}
function getArticleList() {
  return get("article/getHotArticle");
}
function getHotArticleList() {
  return get("article/getHotArticle");
}

function login(account: string | undefined, passWord: string | undefined) {
  return post("users/login", {
    account,
    passWord
  });
}
export default {
  get,
  post,
  getArticleList,
  login,
  getHotArticleList
};
