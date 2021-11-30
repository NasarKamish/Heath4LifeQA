<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Communities</h4>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          clearable
          append-icon="mdi-magnify"
          label="Search community"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <AddArea @click="addArea(row.item.id)"/>
      </v-card-title>
      <v-data-table 
        :items-per-page="5"
        :headers="headers" 
        :search="search"
        :items="places"
      >
      <template v-slot:item="row">
        <tr>
          <td>{{row.item.area}}</td>
            <td>
              <v-icon
                class="mx-2"
                color="black" 
                @click="dialog = true" 
                v-on:click="areaData(row.item.id)"
                dark
              >
                mdi-pencil
              </v-icon>
              <v-dialog
                :retain-focus="false"
                v-model="dialog"
                max-width="500"
              >
              <!-- Update -->
                <v-card>
                  <v-card-title class="headline">
                    Update an Community
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      label="Community Name*"
                      required
                      v-model="place.area"
                    ></v-text-field>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="updateArea(update_id)"
                      >
                        Save
                      </v-btn>
                      <v-btn
                        color="red darken-1"
                        text
                        v-on:click="update_id = null"
                        @click="dialog = false"
                      >
                        Cancel
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- Delete -->
                <v-icon dark
                  class="mx-2" color="red"
                  @click="confirm = true"
                  v-on:click="areaDataDel(row.item.id)"
                >
                  mdi-trash-can
                </v-icon>
                <v-dialog
                  :retain-focus="false"
                  v-model="confirm"
                  max-width="500"
                >
                  <v-card>
                    <v-card-title class="text-h5">
                      Delete Community?
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
import AddArea from '../adminButtons/addArea'
export default {
  name: "Areas",
  components: { AddArea },
    data() {
      return {
        dialog: false,
        confirm: false,
        search : '',
        overlay: false,
        zIndex: 0,
        disruption: false,
        no_data: false,
        headers: [
          { text: 'Community Name', value: 'name'},
          { text: 'Action', value: 'action'},
        ],
        places : [],
        update_id : null,
        del_id: null,
        place : {},
    }
  },
  methods: {
   handleDelete(id) {
     this.deleteArea(id);
     this.confirm = false;
   },
   updateArea(id){
     this.overlay = true;
      let URL = `https://health4life-api.herokuapp.com/api/areas/${id}`;
      let token = window.localStorage.getItem("hct-token");
      fetch(URL, {
          method:"PUT",   
          body:  JSON.stringify(this.place),
          mode: 'cors',
          headers: {
            "Content-type": "application/json",
            "h4l-token": token
          }
      })
      .then(response => response.json())
          .then(json => {
            if(json.errors){
              this.overlay = false;
              this.disruption = true;
            } else {
                this.dialog = false;
                this.overlay = false;
              }
            }
          )
          .catch(err => console.log('err: ',err))
    },
    deleteArea(id){
      this.overlay = true;
      let URL = `https://health4life-api.herokuapp.com/api/areas/${id}`;
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
              if(json.errors){
                this.overlay = false;
                this.disruption = true;
              } else {
                  this.overlay = false;
                }
              }
          )
          .catch(err => console.log('err: ',err))
    },
    getAreas(){
      let URL = "https://health4life-api.herokuapp.com/api/areas";
      let token = window.localStorage.getItem("hct-token");
      fetch(URL, {
          method:"GET",   
          mode: 'cors',
          headers: {
            "h4l-token": token
          }
      })
      .then(response => response.json())
          .then(async json => {
            if(json.errors){
              this.overlay = false;
              this.no_data = true;
            } else {
                this.places = await json.sort(function(a, b) {
                  var AA = a.area.toUpperCase(); // ignore upper and lowercase
                  var AB = b.area.toUpperCase(); // ignore upper and lowercase
                  if (AA < AB) {
                    return -1;
                  }
                  if (AA > AB) {
                    return 1;
                  }

                  // names must be equal
                  return 0;
                });
                this.overlay = false;
            } 
          })
          .catch(err => console.log('err: ', err))
    },
    dynamicSort(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          /* next line works with strings and numbers, 
          * and you may want to customize it to your needs
          */
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
    },
    areaDataDel(id){
      this.del_id = id;
    },
    areaData(id){
      this.update_id = id;
      this.getArea(id);
    },
    getArea(id){
      let URL = `https://health4life-api.herokuapp.com/api/areas/${id}`;
      let token = window.localStorage.getItem("hct-token");
      fetch(URL, {
          method:"GET",   
          mode: 'cors',
          headers: {
            "h4l-token": token
          }
      })
      .then(response => response.json())
        .then(json => {
            if(json.errors){
            this.overlay = false;
            this.no_data = true;
          } else {
            this.place = json;
          }
        })
        .catch(err => console.log('err: ',err))
    }
  },
  created(){
    this.overlay = true;
    this.getAreas();
  },
  updated(){
    this.getAreas();
  }
}

</script>

<style  scoped>
.myTable table .tr:hover{
  background: #F6E1E1;
}
</style>