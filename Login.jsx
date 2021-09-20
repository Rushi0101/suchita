import React from "react";
import mystore from "./store";
class Login extends React.Component {

    constructor(props)
    {
   super(props);
    this.state={
          uid:"",
          pwd:"",
          customer:{},
          truckowner:{},
          loginerr:"",
          uidError: "",
          pwdError: "",
    }  
     
  }

  handleChange=(e)=>{
const nm=e.target.name;
const val=e.target.value;
this.setState({[nm] :val});

  }

  
submitInfo=(event)=>{
  event.preventDefault();
  alert("called");
const requestOptions={
method:'POST',
headers : {

  'Content-Type' :'application/JSON'
},
body : JSON.stringify({
    uid:this.state.uid,
    pwd:this.state.pwd
    
})
};
fetch("http://localhost:8080/Login",requestOptions)
.then(res=> res.text())
.then(data=>{ 
  
  if(data.length != 0)
    {
    const json=JSON.parse(data);
    if(json.login_id.role=="customer")
     { this.setState({customer:json});
    localStorage.setItem("loggedinuser",JSON.stringify(this.state.customer));
    mystore.dispatch({type:"LOGGEDIN"});
    this.props.history.push("/customerhome");
     }
    else 
      {this.setState({truckowner:json});
      localStorage.setItem("loggedinuser",JSON.stringify(this.state.customer));
        mystore.dispatch({type:"LOGGEDIN"});
        this.props.history.push("/truckownerhome");}  
    }
    else
    
      {  this.setState({loginerr:"wrongID/PWD"});}
});
}


valid(){
        if(this.state.uid.includes("@") && this.state.pwd.length < 5) {
            this.setState(
                {uidError:"Invaid Uid", pwdError:"Required More Then 5"}
            )
        }
        else if(this.state.uid.includes("@")) {
            this.setState(
                {uidError:"Invalid Uid"}
            )
        }
        else if(this.state.pwd.length < 5) {
            this.setState(
                {pwdError:"Required More Than 5"}
            )
        }
        else {
            return true
        }
    }

    submitInfo() {
        this.setState(
            {uidError: "", pwdError: ""}
        )
        if(this.valid()) {
            alert("form has been submited")
        }
    }
 
render()
{
return(
   <div>
    <h1> Login Page</h1>
    <form>
    Enter Username : <input type="text" name="uid" onChange={this.handleChange}/>
    <br/>
        <p style={{color:"red", fontSize:"14px"}}> {this.state.uidError} </p>
    Enter Password : <input type="password" name="pwd" onChange={this.handleChange}/>
    <br/>
        <p style={{color:"red", fontSize:"14px"}}> {this.state.pwdError} </p>
    <input type="button" onClick={this.submitInfo} value="LOGIN"/>
    </form>
    <br/>
    <p>{this.state.loginerr}</p>

   </div>
);

}

}
export default Login;
