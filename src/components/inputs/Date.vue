<template>
    <div>
      <v-row>
        <v-col
          cols="11"
          sm="3"
          md="2"
        >
          <v-select
            v-model="day"
            :items="days"
            rounded
            outlined
            label="Day"
          ></v-select>
        </v-col>
        <v-col
          cols="11"
          sm="3"
          md="2"
        >
          <v-select
            v-model="month"
            :items="months"
            rounded
            outlined
            label="Month"
          ></v-select>
        </v-col>
        <v-col
          cols="11"
          sm="3"
          md="2"
        > 
          <v-select
            v-model="year"
            :items="years"
            rounded
            outlined
            color="#770000"
            label="Year"
          ></v-select>
        </v-col>
      </v-row>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: "calender",
    props: [
      "fields", "intersect", "minDate", "setting"
    ],
    data() {
      return {
        menu: false,
            modal: false,
            day: undefined,
            month: undefined,
            days: [],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            years: [],
            year: undefined
        }
    },
    created(){
      if (this.fields.date){
        const date = moment(this.fields.date).format('ll');
        this.day = Number(date.split(' ')[1].replace(',', ''));
        this.month = date.split(' ')[0];
        this.year = Number(date.split(' ')[2]);
      }
      if (this.setting === 'past') {
          for (let i = 1; i <= 31; i++) {
              this.days.push(i);
          }

          let year = new Date().getFullYear();
          this.years.push(year);
          for (let i = 0; i < 75; i++){
            year = year - 1;
            this.years.push(year);
          }
      } else {
        const today = new Date();
        const dates = [
          moment(today.setDate(today.getDate() + 1)).format('ll'),
          moment(today.setDate(today.getDate() + 1)).format('ll'),
          moment(today.setDate(today.getDate() + 1)).format('ll'),
          moment(today.setDate(today.getDate() + 1)).format('ll'),
          moment(today.setDate(today.getDate() + 1)).format('ll'),
          moment(today.setDate(today.getDate() + 1)).format('ll'),
          moment(today.setDate(today.getDate() + 1)).format('ll'),
          moment(today.setDate(today.getDate() + 1)).format('ll'),
          moment(today.setDate(today.getDate() + 1)).format('ll'),
          moment(today.setDate(today.getDate() + 1)).format('ll')
        ];
  
        let days = [];
        
        let months = [];

        for (let i = 0; i < dates.length; i++) {
          days.push(Number(dates[i].split(' ')[1].replace(',', '')));

          months.push(dates[i].split(' ')[0]);
        }

        this.months = [...new Set(months)];

        this.days = days;

        this.years = [new Date().getFullYear()]
      }
    },
    updated() {
      if (this.day && this.month && this.year) {
        this.fields.date = moment(`${this.month} ${this.day}, ${this.year}`).format();
      }
      this.intersect();
    }
}
</script>