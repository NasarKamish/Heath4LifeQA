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
          Add A Site
        </v-card-title>
        <v-card-text>
           <v-text-field
            label="Site Name*"
            required
            v-model="add.site_name"
          ></v-text-field>
          <v-select
            label="Site Type*"
            :items="['Community','School']"
            required
            v-model="add.type"
          ></v-select>
           <v-text-field
            label="Site Code*"
            required
            v-model="add.site_code"
          ></v-text-field>
          <v-text-field
            label="Last Site Number*"
            required
            v-model="add.code_number"
          ></v-text-field>
          <v-text-field
            label="Site District*"
            required
            v-model="add.district"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="saveSites()"
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
        add : {},
      }
    },
    methods : {
       saveSites(){
          let URL = "https://health4life-api.herokuapp.com/api/sites";
          fetch(URL, {
              method: "POST",
              body: JSON.stringify(this.add),
              mode: "cors",
              headers: {
                "Content-type": "application/json",
              },
          })
              .then((response) => response.json())
              .then((json) => {
                  console.log("json->", json);
                  this.dialog = false;
                  
              })
              .catch((err) => console.log("err: ", err));
      }
    }
  }
</script>