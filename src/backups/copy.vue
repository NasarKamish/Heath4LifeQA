<template>
    <div>
           <v-stepper-content v-for="(item, idx) in survey" :key="idx" :step="idx + 1" class="step-window">
                <!--<h2>Content {{ idx + 1 }}</h2>-->
                <div v-for="question in item.section" :key="question">
                  {{ question.label}}
                  <!--option for input text response-->
                  <v-text-field 
                    v-if="question.type == 'input-text'"
                    v-model="response"
                    label=""
                    filled
                    ></v-text-field>
                    <!--option for a dropdown response-->
                    <v-select
                    v-if="question.type == 'select-input'"
                    :items="answer in question.answers"
                    filled
                    label=""
                    ></v-select>
                    <!--option for a radio group response-->
                    <v-radio-group 
                    v-if="question.type == 'radio-button'">
                    <v-radio
                        v-for="answer in question.answers" :key="answer"
                        :label="answer.text"
                        :value="answer.text"
                    ></v-radio>
                    </v-radio-group>
                    <!--option for checkbox response-->
                    <v-checkbox
                      v-if="question.type == check-box"
                      v-model="selected"
                      label=""
                      value="John"
                      ></v-checkbox>
                      <!--option for time picker-->
                       <v-menu
                       v-else-if="question.type == 'input-time'"
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="time"
                            label="Picker in menu"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu2"
                          v-model="time"
                          full-width
                          @click:minute="$refs.menu.save(time)"
                        ></v-time-picker>
                      </v-menu>
                      <!--option for date-->
                      <v-menu
                       v-else-if="question.type == 'input-date'"
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Picker in menu"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                      <!--option forr checkboxes-->
                </div>
            </v-stepper-content>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>