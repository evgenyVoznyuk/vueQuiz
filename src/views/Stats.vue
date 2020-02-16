<template>
  <v-container class="fill-height">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card min-width="300">
            <v-card-title>
                Статистика пользователей
            </v-card-title>
            <v-card-text>
              <v-list>
                <template v-for="(item, i) in quizData">
                  <v-list-item :key="item.id">
                    <v-list-item-content>
                      <v-list-item-title>
                        Вопрос # {{item.id}}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{item.question}} 
                      </v-list-item-subtitle>
                      <v-progress-linear
                        :value="selectedPercentage(i)"
                        height="40"
                        v-if="yourAnswer(i)"
                      >
                        <strong> 
                          {{yourAnswer(i).text}} 
                          ({{yourAnswer(i).cnt}} / {{total(i)}})
                        </strong>
                      </v-progress-linear>
                      <strong v-else>Ответ не выбран!</strong>             
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider
                    :key="item.question"
                    v-if="i < quizData.length-1"
                  ></v-divider>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
 import {mapState, mapGetters} from 'vuex';
  export default {
    computed: {
      ...mapState({
        quizData: state => state.quiz.quizData
      }),
      ...mapGetters({
        yourAnswer: 'quiz/yourAnswer',
        total: 'quiz/totalAnswersCnt'
      }),
      selectedPercentage(){
        return function(ind){
          return (this.yourAnswer(ind).cnt/this.total(ind))*100;
        }
      } 
    }
  }
</script>
