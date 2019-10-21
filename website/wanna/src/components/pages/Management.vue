<template>  
  <div>
    <!--  NAVBAR DO VITOR
    <NavbarToOffcanvasAdmin v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvasAdmin>
    -->
    <div class="container-full">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        
        <div style="width: 25%; float:left">
            <div class="wrapper">
              <form>
                <hr/>
                <div class="group">
                  <input type="text" v-model="team_name" required="required"/><span class="highlight"></span><span class="bar"></span>
                  <label>Insert New Team</label>
                </div>

                <br/>

                <div class="btn-box">
                  <button type="button" class="btn btn-submit" v-on:click="postTeam()">Submit</button>
                </div>

              </form>
            </div>
          </div>

          <div style="width: 75%; float:right;" id="events">
            <h3 style="text-align: left; padding-top: 3.5px;"> Teams' List </h3>
            <hr id="hr"/>
            <div class="container" style="padding-top:3%">
              <div class="row">
                <div class="col-12 col-sm-8 col-lg-5" style="min-width: 70%; margin:auto;">
                  <ul class="list-group">
                    
                    <li v-for="team in $store.state.teams.teams" :key="team.team_id" class="list-group-item d-flex justify-content-between align-items-center" style="color: gray; text-align: center;">
                      <center>{{team.team_id}}</center>
                      <center>{{team.name}}</center>

                      <div>
                        <mdb-btn color="primary" @click.native="modal = true"><i class="fa fa-times"></i></mdb-btn>
                        <mdb-modal removeBackdrop side position="top-right" :show="modal" @close="modal = false">
                            <mdb-modal-header>
                                <mdb-modal-title>Delete Team</mdb-modal-title>
                            </mdb-modal-header>
                            <mdb-modal-body>Are you sure you want to delete this item?</mdb-modal-body>
                            <mdb-modal-footer>
                                <mdb-btn color="secondary" @click.native="modal = false">Close</mdb-btn>
                                <mdb-btn color="primary" v-on:click="remove(team.team_id); modal = false;">Save changes</mdb-btn>
                            </mdb-modal-footer>
                        </mdb-modal>
                      </div>  

                       <button class="btn" v-on:click="remove(team.team_id)"><i class="fa fa-times"></i></button> 
                    </li>
                  
                  </ul>
                </div>
              </div>
            </div>
          </div>
        
    </div> 
  </div>
</template>

<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn } from 'mdbvue';
// import NavbarToOffcanvasAdmin from '../components/NavBarToOffcanvasAdmin'    NAVBAR DO VITOR
export default {
  name: 'Management',
  data () {
    return {
      modal: false,
      team_name: '' 
    }

  },
  /*
  created () {
    this.$store.dispatch('teams/getTeams').then((response) => {
      //console.log(JSON.stringify(this.$store.state.teams))
      console.log(JSON.stringify(response))
    })    
  },
  methods: {
    postTeam () {
      if (this.team_name === '') {
        alert('Please insert team name.')
      } else {
        this.$store.dispatch('teams/postTeam', {
          name: this.team_name
        }).then((response) => {
          // algo a fazer no final do pedido
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    remove ( id ) {
      this.$store.dispatch('teams/removeTeam', {
        team_id: id
      }).then(response => {
        // fazer alguma coisa depois do delete ser feito com sucesso
      }).catch((error) => {
        console.log(error)
      })
    }
  },
*/
  components: {
   // NavbarToOffcanvasAdmin,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn
  }
}
</script>

<style scoped>

.container-full { 
  background-color: black;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  background-size: cover;
  overflow: hidden;
  height: 100vh;
  padding-top: 5%;
}

#hr { display: block; height: 1px;
    border: 0; border-top: 1px solid #ccc;
    margin: 1em 0; padding: 0; }


 /* Style buttons */
.btn {
  background-color: gray; /* Blue background */
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: 12px 16px; /* Some padding */
  font-size: 16px; /* Set a font size */
  cursor: pointer; /* Mouse pointer on hover */
}

/* Darker background on mouse-over */
.btn:hover {
  background-color: orange !important;
} 

#events {
  padding: 15px;
  margin: auto;
}

.card-body {
  color: black
  
}

.col-sm-4 {
  padding: 7px;
}

.border-warning {
    border-width:3px !important;
}

*,
:before,
:after {
  box-sizing: border-box;
}

body {
  background: #424242;
}

form {
  width: 320px;
  margin: 45px auto;
}
form h1 {
  font-size: 3em;
  font-weight: 300;
  text-align: center;
  color: orange;
}
form h5 {
  text-align: center;
  text-transform: uppercase;
  color: #c6c6c6;
}

.group {
  position: relative;
  margin: 45px 0;
}

textarea {
  resize: none;
}

input,
textarea {
  background: none;
  color: #c6c6c6;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 320px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #c6c6c6;
}
input:focus,
textarea:focus {
  outline: none;
}
input:focus ~ label, input:valid ~ label,
textarea:focus ~ label,
textarea:valid ~ label {
  top: -14px;
  font-size: 12px;
  color: orange;
}
input:focus ~ .bar:before,
textarea:focus ~ .bar:before {
  width: 320px;
}

input[type="password"] {
  letter-spacing: 0.3em;
}

label {
  color: #6b6b6b;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
}

.bar {
  position: relative;
  display: block;
  width: 320px;
}
.bar:before {
  content: '';
  height: 2px;
  width: 0;
  bottom: 0px;
  position: absolute;
  background: orange;
  transition: 300ms ease all;
  left: 0%;
}

.btn {
  background: #fff;
  color: #959595;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  letter-spacing: 0.06em;
  text-decoration: none;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.btn:hover {
  color: #8b8b8b;
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.18), 0 5px 5px rgba(0, 0, 0, 0.12);
}
.btn.btn-link {
  background: #2196F3;
  color: #d3eafd;
}
.btn.btn-link:hover {
  background: #0d8aee;
  color: #deeffd;
}
.btn.btn-submit {
  background: black;
  color: orange;
  border: solid orange; 
  border-width: 1px 1px 1px 1px;
  float: right;
}
.btn.btn-submit:hover {
  background: orange;
  color: black;
}
.btn.btn-cancel {
  background: #eee;
}
.btn.btn-cancel:hover {
  background: #e1e1e1;
  color: #8b8b8b;
}

.btn-box {
  text-align: center;
  margin: 50px 0;
}

.list-group{
    min-height: 400px;
    background-color: white;
    max-height: 400px;
    margin-bottom: 10px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}

</style>
