<template>
  <v-card min-width="300" v-if="isFind">
    <v-card-title>
      <v-row align="center" justify="center">
        Вопрос # {{ id }}
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <p class="text-center display-1">
            {{ item.question }}
          </p>
        </v-col>
        <v-btn-toggle
          v-model="answerInd"
          class="answers"
          tile
          borderless
          active-class="success"
          :mandatory="isSelected"
        >
          <v-btn 
            v-for="answer in item.answers"
            :key="answer.text"
            class="answer"
            min-width = "270"
          >
            {{answer.text}}
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-card-text>
  </v-card>
  <e-404 v-else></e-404>
</template>

<script>
  import { mapGetters } from 'vuex';
  import E404 from '~v/E404';
  
	export default {
    components: {
			E404
		},
		computed: {
      ...mapGetters({
				itemProxy: 'quiz/oneItem'
			}),
      id(){
				return this.$route.params.id;
      },
      item(){
				return this.itemProxy(this.id);
      },
      indOfSelected(){
        let ind = this.item.answers.findIndex((a) => a.selected === true);
        return ind !== -1 ? ind : null;
      },
      isSelected(){
        return this.indOfSelected !== null;
      },
      isFind(){
				return this.item !== null;
			},
      answerInd: {
        get(){
          return this.indOfSelected;
        },
        set(ind){
          let index = this.indOfSelected;
          if(ind < this.item.answers.length && ind !== 'undefined'){
            index = ind;
          };
          this.$store.dispatch('quiz/selectAnswerById', {
            itemId: this.id, 
            answerInd: index
          });
      }
      }
    }
	}
</script>

<style scoped>
  .answers {
    flex-direction: column;
  }
</style>