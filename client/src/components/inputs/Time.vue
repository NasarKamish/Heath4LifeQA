<template>
  <div>
    <v-row v-if="editDate">
      <v-col
        cols="12"
        xs="5"
        sm="3"
        md="2"
      >
        <v-select
          v-model="fields.day"
          :items="days"
          rounded
					outlined
          label="Day"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        xs="5"
        sm="3"
        md="2"
      >
        <v-select
          v-model="fields.month"
          :items="months"
          rounded
					outlined
          label="Month"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        xs="5"
        sm="3"
        md="2"
      > 
        <v-select
          v-model="fields.year"
          :items="[new Date().getFullYear(), new Date().getFullYear() - 1]"
          rounded
					outlined
					color="#770000"
          label="Year"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        xs="5"
        sm="3"
        md="2"
      >
        <v-select
          v-model="fields.hour"
          :items="hours"
          rounded
					outlined
          label="Hour"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        xs="5"
        sm="3"
        md="2"
      >
        <v-select
          v-model="fields.minute"
          :items="minutes"
          rounded
					outlined
          label="Minute"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        xs="5"
        sm="3"
        md="2"
      > 
        <v-select
          v-model="fields.period"
          :items="['AM', 'PM']"
          rounded
					outlined
					color="#770000"
          label="AM/PM"
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'clock',
    props: [
        'fields', 'intersect', 'time', 'editDate'
    ],
    data() {
    return { 
        menu: false,
        model: false,
        days: [],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        minutes: [],
        hours: [],
        }
    },
    created() {
        let day = String(this.time.split(' ')[1].replace(',', ''));
        let month = String(this.time.split(' ')[0]);
        let year = Number(this.time.split(' ')[2]);
        let minute = String(this.time.split(' ')[3].split('').splice(-2, 2).join(''));
        let hour = String(this.time.split(' ')[3].split('').splice(0, 2).join(''));
        if (this.time.split(' ')[3].length < 5) {
          hour = ('0' + hour);
          hour = hour.split('');
          hour.pop();
          hour = hour.join('');
        }

        let period = this.time.split(' ')[4]
        
        this.fields.day = day;
        this.fields.month = month;
        this.fields.year = year;
        this.fields.hour = hour;
        this.fields.minute = minute;
        this.fields.period = period;

        for (let i = 1; i <= 31; i++) {
            this.days.push(String(i));
        }
        for (let i = 1; i <= 12; i++) {
          if (i < 10) {
            this.hours.push('0' + i);
          } else {
            this.hours.push(String(i));
          }
        }
        for (let i = 0; i <= 59; i++) {
           if (i < 10) {
             this.minutes.push('0' + i);
            } else {
            this.minutes.push(String(i));
          }
        }
    },
    computed: {
      new_time() {
        return `${this.fields.month} ${this.fields.day}, ${this.fields.year} ${this.fields.hour}:${this.fields.minute} ${this.fields.period}`
      },
      timeIn: {
        get() {
          return this.$store.state.timeIn
        },
        set(value) {
          this.$store.commit('UPDATE_TIMEIN', value)
        }
      },
      timeOut: {
        get() {
          return this.$store.state.timeOut;
        },
        set(value) {
          this.$store.commit('UPDATE_TIMEOUT', value)
        }
      }
    },
    updated(){
      if (this.time !== this.new_time) {
       if (this.fields.label === "Time in") {
          this.timeIn = moment(this.new_time).format();
        }
        if (this.fields.label === "Time out") {
          this.timeOut = moment(this.new_time).format();
        }
      }
      this.intersect();
    }
}

</script>

<style scoped>

</style>