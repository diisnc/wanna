<template>
  <div class="container-full">
    <div class="login-wrap">
      <div class="login-html">
        <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
        <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
        

				<div class="login-form">
          <div class="sign-in-htm">
            <div class="group">
              <label for="user" class="label">Email</label>
              <input id="user" v-model="email" type="email" class="input">

            </div>
            <div class="group">
              <label for="pass" class="label">Password</label>
              <input id="pass" v-model="password" type="password" class="input" data-type="password">
            </div>
            <div class="group">
              <input id="check" type="checkbox" class="check" checked>
              <label for="check"><span class="icon"></span> Ficar ligado</label>
            </div>
            <div class="group">
              <input type="submit" class="button" v-on:click="mylogin()" value="Sign In">
            </div>
            <div>
              <br/>
              <button class="loginBtn loginBtn--facebook">
              Login com Facebook
              </button>

              <button class="loginBtn loginBtn--google">
              Login com Google
              </button>
            </div>
          </div>
          
					
					<div class="sign-up-htm">
            <div style="width: 50%; float: left; padding-right: 10px;">     

              <div class="group">
                <label for="first_name" class="label">Primeiro Nome</label>
                <input id="firstname" v-model="fname" type="text" class="input">
              </div>
              <div class="group">
                <label for="user_name" class="label">Usermame</label>
                <input id="username" v-model="username" type="text" class="input">
              </div>
            </div>
              
            <div style="width: 50%; float: right; padding-left: 10px;">
              <div class="group">
                <label for="last_name" class="label">Último Nome</label>
                <input id="lastname" v-model="lname" type="text" class="input">
              </div>
              <div class="group">
                <label for="local" class="label">Localização</label>
                <input id="location" v-model="location" type="text" class="input">
              </div>
            </div> 
                
            <div class="group">
              <label for="e_mail" class="label">Email</label>
              <input id="email" v-model="email" type="email" class="input">
            </div>
            <div class="group">
                <label for="pass_" class="label">Password</label>
                <input id="pass__" v-model="password" type="password" class ="input" data-type="password" style="margin-bottom: 30px;">
            </div>
            <div class="group">
              <input type="submit" class="button" v-on:click="myregister()" value="Sign Up">
            </div>
          
          </div>

				</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueAxios from 'vue-axios';
export default {
  name: 'Auth',
  data () {
    return {
    email: '',      /*login & register */
    password: '',   /*login & register */
    fname: '',   
    lname: '',   
    username: '',
    location: '',
    self: null
    }
  },
  mounted () {
    this.self = this
  },
  methods: {
    mylogin () {
      axios.post('http://infernoo.duckdns.org:8000/v1/auth/login', {
        email: this.email,
        password: this.password})
      .then(response => {
       
        if (response.status == 200) {
          let a_token = response.data.tokens.refreshToken;
          let r_token = response.data.tokens.accessToken;

          localStorage.setItem('a_token', a_token);
          localStorage.setItem('r_token', r_token);
          
          if (this.email === 'admin@wanna.pt') {
            this.self.$router.push({path: '/manageposts'})
          } else {
            // mudar esta rota para nome de utilizador
            this.self.$router.push({path: '/inspire'})
          }
        }
      })
      .catch((error) => {
        alert(error.response.data.message)
      });
		},
		myregister () {
      axios.post('http://infernoo.duckdns.org:8000/v1/auth/register', {
        firstName: this.fname,
        lastName: this.lname,
        username: this.username,
        location: this.location,
        email: this.email,
        password: this.password
      })
      .then(response => {
        this.$router.go()
      })
      .catch(error => {
        console.log(error.response)
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body{
	margin:0;
	color:#6a6f8c;
	background:#c8c8c8;
	font:600 16px/18px 'Open Sans',sans-serif;
}

.container-full { 
  padding: 5% 5%;
  height: 100%;
  width: 100%;
  background-image: url("../../assets/login-back.png");
  background-size: cover;
  position: fixed;
  left: 0px;
  top: 0px;
  overflow: hidden;
}


*,:after,:before{box-sizing:border-box}
.clearfix:after,.clearfix:before{content:'';display:table}
.clearfix:after{clear:both;display:block}
a{color:inherit;text-decoration:none}

/* ORIGINAL: max-width:525px*/
.login-wrap{  
  text-align: center;
	width:100%;
  border-radius: 25px;
	margin: auto;
	max-width:450px;
	min-height:100%; 
	position:relative;
  /* CHANGE THIS BACKGROUND */
	background:url("../../assets/black-back.jpg") no-repeat center;
	/* background-color: blue; */
  box-shadow:0 12px 15px 0 rgba(0, 0, 0, 0.068),0 17px 50px 0 rgba(0, 0, 0, 0.075);
} 
.login-html{
	width:100%;
	height:100%;
	position:absolute;
	padding:50px 40px 50px 40px;
} 
.login-html .sign-in-htm,
.login-html .sign-up-htm{
	top:0;
	left:0;
	right:0;
	bottom:0; 
	position:absolute;
	transform:rotateY(180deg);
	backface-visibility:hidden;
	transition:all .4s linear;
}
.login-html .sign-in,
.login-html .sign-up,
.login-form .group .check{
	display:none;
}
.login-html .tab,
.login-form .group .label,
.login-form .group .button{
	text-transform:uppercase;
}
.login-html .tab{
	font-size:22px;
	margin-right:15px;
	padding-bottom:5px;
	margin:0 15px 10px 0;
	display:inline-block;
	border-bottom:2px solid transparent;
}
.login-html .sign-in:checked + .tab,
.login-html .sign-up:checked + .tab{
	color: rgba(255, 255, 255, 0.918);
	border-color:#55abf2;
}
.login-html .sign-in:not(:checked) + .tab,
.login-html .sign-up:not(:checked) + .tab{
  color: #aaa;
}
.login-form{
	min-height:345px;
	position:relative;
	perspective:1000px;
	transform-style:preserve-3d;
}
.login-form .group{
	margin-bottom:15px;
  margin-top: 10px;
}
.login-form .group .label,
.login-form .group .input,
.login-form .group .button{
	width:100%;
	color:#fff;
	display:block;
}
.login-form .group .button:focus{
  outline: none;
}

.login-form .group .button:hover,
.login-form .group .button:focus {
  background-color: #55b8f2f1;
}

.login-form .sign-up-htm .group .input,
.login-form .group .button{
	border:none;
	padding:5px 20px;
	border-radius:25px;
	background:rgba(255,255,255,.1);
}

.login-form .sign-in-htm .group .input,
.login-form .group .button{
	border:none;
	padding:15px 20px;
	border-radius:25px;
	background:rgba(255,255,255,.1);
}

.login-form .group input[data-type="password"]{
	text-security:circle;
	-webkit-text-security:circle;
}
.login-form .group .label{
	color:#aaa;
	font-size:12px;
}
.login-form .group .button{
	background:#55abf2;
}
.login-form .group label .icon{
	width:15px;
	height:15px;
	border-radius:2px;
	position:relative;
	display:inline-block;
	background:rgba(255,255,255,.1);
}
.login-form .group label .icon:before,
.login-form .group label .icon:after{
	content:'';
	width:10px;
	height:2px;
	background:#fff;
	position:absolute;
	transition:all .2s ease-in-out 0s;
}
.login-form .group label .icon:before{
	left:3px;
	width:5px;
	bottom:6px;
	transform:scale(0) rotate(0);
}
.login-form .group label .icon:after{
	top:6px;
	right:0;
	transform:scale(0) rotate(0);
}
.login-form .group .check:checked + label{
	color:#fff;
}
.login-form .group .check:checked + label .icon{
	background:#55abf2;
}
.login-form .group .check:not(checked) + label{
	color:#aaa;
}
.login-form .group .check:checked + label .icon:before{
	transform:scale(1) rotate(45deg);
}
.login-form .group .check:checked + label .icon:after{
	transform:scale(1) rotate(-45deg);
}
.login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
	transform:rotate(0);
}
.login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
	transform:rotate(0);
}
.login-form .group .input:focus {
  outline: none;
}

.hr{
	height:2px;
	margin:60px 0 50px 0;
	background:rgba(255,255,255,.2);
}
.foot-lnk{
	text-align:center;
}


/* --------------------------- Log in with facebook / google --------------------------- */

/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}


/* Facebook */
.loginBtn--facebook {
  display: inline-block;
  width: 210px;
  text-align: center;
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}


/* Google */
.loginBtn--google {
  display: inline-block;
  width: 210px;
  text-align: center;
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #DD4B39;
}
.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}

</style>
