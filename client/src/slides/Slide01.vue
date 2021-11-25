<template>
  <v-stepper-content step="1">
    <v-form ref="form" class="form" v-model="valid">
      <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
        >
        <label>{{ questions[4].label }}:<span class="required">*</span></label>
        <Txt :fields="questions[4]" :rule="textField" />
      </v-col>
      <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
        >
        <label>{{ questions[3].label }}:<span class="required">*</span></label>
        <Select :fields="questions[3]" :intersect="intersect" />
      </v-col>
      <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
        >
        <label>{{ questions[0].label }}:<span class="required">*</span></label>
        <Select :fields="questions[0]" :intersect="intersect" />
      </v-col>
      <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
        >
        <label>{{ questions[1].label }}:<span class="required">*</span></label>
        <Select :fields="questions[1]" :intersect="intersect" />
      </v-col>
      <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
        >
        <label>{{ questions[2].label }}:</label>
        <v-text-field
          :value="questions[2].text"
          v-model="questions[2].text"
          :rules="textField"
          rounded
          class="sub_district"
          outlined
          disabled
          color="#770000"
          background="#F6E1E1"
          :label="questions[2].label"
        >
        </v-text-field>
      </v-col>
    </v-form>
  </v-stepper-content>
</template>

<script>
import Txt from '../components/inputs/Text';
import Select from '../components/inputs/Select';

import { getPublicSites } from '../store/api/sites';
import { getPublicCounsellors } from '../store/api/counsellors';

export default {
  components: {
    Txt,
    Select
  },
  data() {
    return {
      textField: [
        v => !!v || "This field is required",
        v => /^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/.test(v) || 'No special character or numbers or blank spaces'
      ],
      all_sites: [],
      communities: [],
      schools: [],
      valid: true,
    }
  },
  beforeUpdate() {
    // Sets sites
    if (this.questions[0].selected === 'Community') {
      let outter = this;
      setTimeout(function() {
        outter.questions[1].answers = outter.communities;
      }, 1000);
    }
    if (this.questions[0].selected === 'School') {
      let outter = this;
      setTimeout(function() {
        outter.questions[1].answers = outter.schools;
      }, 1000)
    }
    if(this.questions[1].selected) {
      this.validate();
      // Auto sets District
      if (this.all_sites.length > 0){
        let district = this.all_sites.filter((site) => {
          return site.site_name === this.questions[1].selected
        })
        this.questions[2].text = district[0].district;
      }
    }
    // Checking Validation
    if (this.page === 1) {
      if (this.questions[4].text 
      && this.questions[3].selected 
      && this.questions[0].selected 
      && this.questions[1].selected 
      && this.questions[2].text
      && this.valid) {
        this.validation_fail = false;
      } else {
        this.validation_fail = true;
      }
    }
  },
  created() {
    // Checking Validation
    if (this.page == 1) {
      if (this.questions[4].text 
      && this.questions[3].selected 
      && this.questions[0].selected 
      && this.questions[1].selected 
      && this.questions[2].text 
      && this.valid) {
        this.validation_fail = false;
      } else {
        this.validation_fail = true;
      }
    }
    this.handleGetSites();
    this.handleGetCounsellers();
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    intersect() {
      this.$forceUpdate();
    },
    handleGetSites() {
      getPublicSites().then(data => {
        this.all_sites = data;
        this.getSitebyTypes(this.all_sites);
      })
    },
    handleGetCounsellers() {
      if(navigator.onLine) {
        getPublicCounsellors().then(data => {
          let counsellors = [];
          for (let i = 0; i < data.length; i++) {
            counsellors.push(data[i].fullname);
          }
          counsellors.splice(counsellors.indexOf('Admin'), 1);
          localStorage.setItem('counsellors', JSON.stringify(counsellors));
          this.questions[3].answers = counsellors;
        })
      } else {
        let counsellors = JSON.parse(localStorage.getItem('counsellors'));
        this.questions[3].answers = counsellors;
      }
    },
    async getSitebyTypes(data) {
        if(navigator.onLine) {
          const communityFilter = await data.filter(site => {
            return site.type == 'Community'
          });
          const schoolFilter = await data.filter(site => {
            return site.type == 'School'
          });
          let communityArr = [];
          for (let i = 0; i < communityFilter.length; i++){
              communityArr.push(communityFilter[i].site_name);
          }
  
          let schoolArr = [];
          for (let i = 0; i < schoolFilter.length; i++){
              schoolArr.push(schoolFilter[i].site_name);
          }
  
          this.communities = communityArr.sort();
          localStorage.setItem('communities', JSON.stringify(communityArr.sort()));
  
          this.schools = schoolArr.sort();
          localStorage.setItem('schools', JSON.stringify(schoolArr.sort()));

        } else {
          let _all_sites = JSON.parse(localStorage.getItem('all-sites'));
          this.all_sites = _all_sites;
          let _communities = JSON.parse(localStorage.getItem('communities'));
          let _schools = JSON.parse(localStorage.getItem('schools'));
          this.communities = _communities;
          this.schools = _schools;
        }
    },
  },
  computed: {
    page() {
      return this.$store.state.page;
    },
    validation_fail: {
      get() {
        return this.$store.state.validation_fail;
      }, 
      set(value) {
        this.$store.commit('VALIDATION_TOGGLE', value);
      }
    },
    questions: {
      get() {
        return this.$store.state.slide01.questions;
      },
      set(value) {
        this.$store.slide01.commit('UPDATE_QUESTIONS', value);
      }
    }
  }
}
</script>

<style scoped>
.sub_district {
  margin-top: 15px;
}
</style>