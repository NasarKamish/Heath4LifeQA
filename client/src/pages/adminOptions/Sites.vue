<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Sites</h4>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          clearable
          append-icon="mdi-magnify"
          label="Search sites"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <AddSite @click="addSite(row.item)"/>
      </v-card-title>
      <v-data-table 
        :items-per-page="5"
      :headers="headers" 
      :search="search"
      :items="sites">
        <template v-slot:item="row">
            <tr>
              <td>{{row.item.site_name}}</td>
              <td>{{row.item.type}}</td>
              <td>{{row.item.district}}</td>
              <td>{{row.item.site_code}}</td>
              <td>{{row.item.code_number}}</td>
              <td>
                  <!-- Update icon  -->
                  <v-icon 
                    class="mx-2" fab dark color="black" 
                    @click.stop="dialog = true" 
                    v-on:click="siteData(row.item.id)">
                    mdi-pencil
                  </v-icon>
                  <v-dialog
                    v-model="dialog"
                    max-width="500"
                  >
                  <!-- Update modal -->
                    <v-card>
                      <v-card-title class="headline">
                        Update  Site
                      </v-card-title>
                      <v-card-text>
                        <v-text-field
                          label="Site Name*"
                          required
                          v-model="site.site_name"
                        ></v-text-field>
                        <v-text-field
                          label="Site District*"
                          required
                          v-model="site.district"
                        ></v-text-field>
                        <v-select
                          label="Site Type*"
                          required
                          :items="['Community','School']"
                          v-model="site.type"
                        ></v-select>
                        <v-text-field
                          label="Last Site Number*"
                          required
                          v-model="site.site_code"
                        ></v-text-field>
                        <v-text-field
                          label="Last Site Number*"
                          required
                          v-model="site.code_number"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="green darken-1"
                          text
                          @click="updateSite(update_id)"
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
                    v-on:click="siteDataDel(row.item.id)"
                  > mdi-trash-can
                  </v-icon>
                  <v-dialog
                    :retain-focus="false"
                    v-model="confirm"
                    max-width="500"
                  >
                  <v-card>
                    <v-card-title class="text-h5">
                      Delete Site?
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
import AddSite from '../adminButtons/addSite'
export default {
  name: "Site",
  components : { AddSite },
    data(){
      return {
        dialog : false,
        confirm: false,
        search : '',
        zIndex: 0,
        overlay: false,
        disruption: false,
        no_data: false,
        headers: [
                { text: 'Site Name', value: 'site'},
                { text: 'Site Type', value: 'type'},
                { text: 'Site District', value: 'disctrict'},
                { text: 'Site Code', value: 'site_code'},
                { text: 'Site Number', value: 'site_number'},
                { text: 'Action', value: 'action'},
            ],
        sites : [],
        surveys: [],
        site : {},
        update_id : null,
        del_id: null
    }
  },
    methods: {
    handleDelete(id) {
      this.deleteSite(id);
      this.confirm = false;
    },
    siteDataDel(id){
      this.del_id = id;
    },
    updateSite(id){
      this.overlay = true;
      let token = window.localStorage.getItem("hct-token");
      let URL = `https://health4life-api.herokuapp.com/api/sites/${id}`;
      fetch(URL, {
        method:"PUT",   
        body:  JSON.stringify(this.site),
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
              this.disruption = false;
            }
          }
        )
        .catch(err => console.log('err->',err))
    },
    deleteSite(id){
      this.overlay = true;
      let URL = `https://health4life-api.herokuapp.com/api/sites/${id}`;
      let token = window.localStorage.getItem("hct-token");
      fetch(URL, {
          method: "DELETE",   
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
    getSites(){
      let URL = "https://health4life-api.herokuapp.com/api/sites";
      let token = window.localStorage.getItem("hct-token");
      fetch (URL, {
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
                  this.sites = json.sort(function(a, b) {
                    var AA = a.site_name.toUpperCase(); // ignore upper and lowercase
                    var AB = b.site_name.toUpperCase(); // ignore upper and lowercase
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
            .catch(err => console.log('err: ',err))
    },
    siteData(id) {
      this.update_id = id;
      this.getSite(id);
    },
    getSite(id){
      this.overlay = true;
      let URL = `https://health4life-api.herokuapp.com/api/sites/${id}`;
      let token = window.localStorage.getItem("hct-token");
      fetch (URL, {
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
                  this.site = json;
                }
            })
            .catch(err => console.log('err: ',err))
    },
  },
  created() {
    this.overlay = true;
    this.getSites();
  },
  // updated(){
  //   this.getSites();
  // },
  // mounted(){
  //  this.getSites();
  // // 
  // },
}
</script>