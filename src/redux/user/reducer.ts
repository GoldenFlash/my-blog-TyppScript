
var jwt = require('jsonwebtoken');

let defaultUserState = {
	userInfo:{
		account: "",
		auth: "",
		nickName: "",
		userId: ""
	},
	isLogin:false
}
var token = localStorage.getItem("token")
if(token){
	var decoded = jwt.decode(token);
	console.log("decoded", decoded)
}
if (document.cookie) {
	let userInfo = {
		account:"",
		auth:"",
		nickName:"",
		userId:""
	}
	var cookies = document.cookie.split(";")
	console.log("cookies", cookies)
    cookies.forEach((item) => {
        var arr = item.split("=")
		// userInfo[arr[0].trim()] = arr[1]
    })
    var islogin = false
    if(userInfo.userId){
        islogin = true
        defaultUserState.userInfo=userInfo
        defaultUserState.isLogin=islogin
    }
    
}

const userReducer = (state=defaultUserState,action:any)=>{
	switch(action.type){
		case "login":
			return {
				...state,
				...action.content,
				
			}
		case "logout":
			return {
				...state,
				...action.content,
			}

		default: 
			return state

	}
}
export default userReducer