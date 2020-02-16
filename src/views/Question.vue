<template>
  <v-container
    class="fill-height"
    @touchstart="handleTouchStart($event)"
    @touchmove="nextQuestion($event)"
  >
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <QuestionCard/>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import QuestionCard from '~c/QuestionCard';
  import {handleTouchStart, handleTouchMove} from '~h/swipe'

  export default {
    components: {
			QuestionCard
    },
    computed: {
      ...mapState({
        quizData: state => state.quiz.quizData
      }),
      ...mapGetters({
				itemInd: 'quiz/oneItemInd'
			}),
      id(){
				return this.$route.params.id;
      },
      ind(){
        return this.itemInd(this.id)
      },
      nextId(){
        return this.quizData[this.ind + 1].id; 
      }
    },
    methods:{
      handleTouchStart,
      handleTouchMove,
      nextQuestion(e){
        let swipe = this.handleTouchMove(e);
        if(swipe && swipe.left){
          if(this.ind!==this.quizData.length-1){
            this.$router.push({ name: 'question', params: {id: this.nextId}});
          } else {
            this.$store.dispatch('quiz/submitAnswers');
            this.$router.push({ name: 'stats'});
          }
        } 
        if(swipe && swipe.right){
          if(this.ind!==0){
            this.$router.back();
          }
        }
      }
    }
  }
</script>