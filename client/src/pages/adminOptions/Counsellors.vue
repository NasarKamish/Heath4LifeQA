<template>
  <div>
    <v-card>
        <v-card-title>
            <h4>Counsellors</h4>
            <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            clearable
            append-icon="mdi-magnify"
            label="Search counsellor"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <AddCounsellor />
        </v-card-title>
        <v-data-table 
          :items="counsellors"
          :items-per-page="5"
          :headers="headers" 
          :search="search"
        >
        <template v-slot:item="row">
            <tr class=".myTable" >
              <td>{{row.item.fullname}}</td>
              <td>{{row.item.email}}</td>
              <td>{{row.item.role}}</td>
              <td>
                  <v-icon 
                  class="mx-2" dark color="black" @click.stop="dialog = true" v-on:click="userData(row.item.id)"
                  >mdi-account-edit</v-icon>
              
                  <v-dialog
                    :retain-focus="false"
                    v-model="dialog"
                    max-width="500"
                  >
                  <!-- Update -->
                    <v-card>
                      <v-card-title class="headline">
                        Update counsellor 
                      </v-card-title>

                      <v-card-text>
                        <v-text-field
                          label="Legal fullname*"
                          required
                          v-model="user.fullname"
                        ></v-text-field>
                        <v-text-field
                          label="Email*"
                          required
                          v-model="user.email"
                        ></v-text-field>

                        <v-select
                          label="Position*"
                          required
                          :items="['Counsellor','Admin']"
                          v-model="user.role"
                        ></v-select>
                          <v-text-field
                            label="Password*"
                            required
                            v-model="password"
                          ></v-text-field>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          color="green darken-1"
                          text
                          @click="updateUser(update_id)"
                        >
                          Save
                        </v-btn>

                        <v-btn
                          color="red darken-1"
                          text
                          @click.stop="dialog = false"
                        >
                          Cancel
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!-- Delete -->
                  <v-icon 
                    class="mx-2" dark color="red" 
                    @click="confirm = true"
                    v-on:click="userDataDel(row.item.id)"
                  >mdi-trash-can
                  </v-icon>
                  <v-dialog
                    :retain-focus="false"
                    v-model="confirm"
                    max-width="500"
                  >
                  <v-card>
                    <v-card-title class="text-h5">
                      Delete User?
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="confirm = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="handleDelete(del_id)"
                      >
                        Confirm
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-row justify="center" style="position: absolute">
      <v-overlay
        :z-index="zIndex"
        :value="overlay"
      >
        <v-progress-circular
            :size="75"
            color="#000"
            indeterminate
        ></v-progress-circular>
      </v-overlay>
    </v-row>
    <v-snackbar v-model="no_data">
      Something went wrong, Can't fetch data.
      <template  v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="no_data = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="disruption">
      Something went wrong, check for invalid inputs.
      <template  v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="disruption = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import AddCounsellor from '../adminButtons/addCounsellor'
export default {
  name: "Counsellor",
  components : { AddCounsellor },
    data(){
        return{
           dialog : false,
           confirm: false,
           search : '',
           overlay: false,
           disruption: false,
           no_data: false,
           zIndex: 0,
           headers: [
                    { text: 'Counsellor Name', value: 'fullname'},
                    { text: 'Email', value: 'email'},
                    { text: 'Position', value: 'role'},
                    { text: 'Action', value: 'action'},
                ],
            counsellors : [],
            user : {},
            update_id: null,
            del_id: null,
            password: ''
    }
  },
    methods: {
    handleDelete(id) {
      this.deleteUser(id);
      this.confirm = false;
    },
    userDataDel(id){
      this.del_id = id;
    },
    updateUser(id){
      this.overlay = true;
      let URL = `https://health4life-api.herokuapp.com/api/admin/${id}`;
      this.user.password = this.password;
      let token = window.localStorage.getItem("hct-token");

      fetch(URL, {
        method:"PUT",   
        body:  JSON.stringify(this.user),
        mode: 'cors',
        headers: {
          "Content-type": "application/json",
          "h4l-token": token
        }
      })
      .then(response => response.json())
          .then(json => {
            if(json.id){
                this.overlay = false;
                this.dialog = false;
              } else {
                this.overlay = false;
                this.disruption = true;
              }
            }
          )
          .catch(err => console.log('err: ',err))
    },
     deleteUser(id){
      this.overlay = true;
      let URL = `https://health4life-api.herokuapp.com/api/admin/${id}`;
      let token = window.localStorage.getItem("hct-token");
        fetch(URL, {
          method:"DELETE",   
          body:  JSON.stringify(this.item),
          mode: 'cors',
          headers: {
            "Content-type": "application/json",
            "h4l-token": token
          }
        })
        .then(response => response.json())
            .then(json => {
                if(json.errors || json.msg){
                this.overlay = false;
                this.disruption = true;
              } else {
                  this.overlay = false;
                }
              }
            )
            .catch(err => console.log('err: ',err))
    },
    areaDataDel(id){
      this.del_id = id;
    },
    getUsers(){
      let URL = "https://health4life-api.herokuapp.com/api/admin";
      let token = window.localStorage.getItem("hct-token");
      fetch(URL, {
        method:"GET",   
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'h4l-token': token
        }
      })
      .then(response => response.json())
          .then(json => {
            if(json.errors || json.msg){
            this.overlay = false;
            this.no_data = true;
          } else {
              this.overlay = false;
              console.log(json)
              this.counsellors = json.sort(function(a, b) {
                  var AA = a.fullname.toUpperCase(); // ignore upper and lowercase
                  var AB = b.fullname.toUpperCase(); // ignore upper and lowercase
                  if (AA < AB) {
                    return -1;
                  }
                  if (AA > AB) {
                    return 1;
                  }

                  // names must be equal
                  return 0;
                });
            }
          })
          .catch(err => console.log('err->',err))
    },
    userData(id){
      this.update_id = id;
      this.getUser(id);
    },
    getUser(id){
      this.overlay = true;
      let URL = `https://health4life-api.herokuapp.com/api/admin/${id}`;
      let token = window.localStorage.getItem("hct-token");
      fetch(URL, {
        method:"GET",   
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "h4l-token": token
        }
      })
      .then(response => response.json())
          .then(json => {
            if(json.errors || json.msg){
                this.overlay = false;
                this.no_data = true;
              } else {
                  this.overlay = false;
                  this.user = json;
                }
          })
          .catch(err => console.log('err->',err))
    },
  },
  created(){
    this.overlay = true;
    this.getUsers();
  },
}
</script>

<style>
.myTable {
  background: #F6E1E1;
}
</style>