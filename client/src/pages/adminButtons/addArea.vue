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
         Add an Community
        </v-card-title>

        <v-card-text>
             <v-text-field
                label="Community Name*"
                required
                v-model="add.area"
              ></v-text-field>
            </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="saveArea()"
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
        add : { area : ""}
      }
    },
    
    methods : {
      saveArea(){
          let URL = "https://health4life-api.herokuapp.com/api/areas";
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
              // Added accurate validation (leaked data)
              console.log(json);
              this.dialog = false
          })
          .catch((err) => console.log("err: ", err));
      }
    }
  }
</script>