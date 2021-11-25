<template>
  <div class="dashboard">
    <Navbar />
    <div id="content">
      <br>
      <div id="data_collection">
         <v-select
            outlined
            v-model="selected"
            :menu-props="{ bottom: true, offsetY: true }"
            chips
            prepend-inner-icon="mdi-filter"
            style="color: #770000"
            :items="items"
            multiple
            placeholder="Select Collection"
            rounded
        ></v-select>
      </div>
      <div id="main">
        <div class="table" v-if="selected.includes('Counsellors')">
          <Counsellors />
        </div>
        <!-- <v-divider></v-divider> -->
        <div class="table" v-if="selected.includes('Sites')">
          <Sites />
        </div>
        <div class="table" v-if="selected.includes('Communities')">
          <Areas />
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Counsellors from "./adminOptions/Counsellors";
import Sites from "./adminOptions/Sites";
import Areas from "./adminOptions/Areas";
import Footer from "../components/Footer"

export default {
  name: "Dashboard",
  components: { Navbar, Counsellors, Sites, Areas, Footer },
  data() {
    return {
      items : ['Communities', 'Counsellors', 'Sites'],
      selected :[]
    }
  }
};
</script>

<style scoped>

@media (max-width: 480px) {
  #entries {
		position: absolute;
    margin: 0;
    padding: 0;
	}

  #data_collection {
    margin: 5% 5% -5% 5%;
  }

  #content {
    width: 100%;
    margin: 40px 0 !important;
    padding: 0 !important;
  }
}

#content {
  margin: 72px 72px 30px 72px;
}
#main {
  height: 64vh;
  overflow-y: scroll;
}
.table{
  margin: 30px;
  top: 100px;
}
</style>
