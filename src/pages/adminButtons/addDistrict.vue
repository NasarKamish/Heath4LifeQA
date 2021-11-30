<template>
  <v-row justify="center">
    <v-btn
     class="mx-2" left
     fab dark small color="#770000"
      @click.stop="dialog = true"
    >
       <v-icon dark>mdi-plus-thick</v-icon> 
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline">
          Add A District
        </v-card-title>

        <v-card-text>
           <v-text-field
            label="District Name*"
            v-model="add.district"
            required
          ></v-text-field>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="saveDistrict()"
          >
            Save
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        add : { district: "" }
      }
    },
    methods : {
      getDistrict(){
      let URL = "https://health4life-api.herokuapp.com/api/districts";
      fetch(URL, {
        method:"GET",   
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
          .then(json => {
              this.districts = json;
      })
      .catch(err => console.log('err->',err))
    },
    saveDistrict(){
          let URL = "https://health4life-api.herokuapp.com/api/districts";
          let token = window.localStorage.getItem("hct-token");
          fetch(URL, {
              method: "POST",
              body: JSON.stringify(this.add),
              mode: "cors",
              headers: {
                "Content-type": "application/json",
                "h4l-token": token
              },
          })
              .then((response) => response.json())
              .then((json) => {
                  console.log("response: ", json);
                  this.dialog = false;
                  this.getDistrict();
              })
            .catch((err) => console.log("err->", err));
    }}
  }
</script>