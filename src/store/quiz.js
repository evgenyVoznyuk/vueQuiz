export default {
	namespaced: true,
	state: {
		quizData: getQuizData()
  },
  getters: {
		oneItem: ({quizData}, getters) => (itemId) => {
      let ind = getters.oneItemInd(itemId);
			return ind !== -1 ? quizData[ind] : null;
    },
    oneItemInd: ({quizData}) => (itemId) => {
			return quizData.findIndex((item) => item.id == itemId);
    },
    yourAnswer: ({quizData}) => (itemInd) => {
      let selectedAnswer = quizData[itemInd].answers.find((a) => a.selected === true);
      return selectedAnswer ? selectedAnswer : null;
    },
    totalAnswersCnt: ({quizData}) => (itemInd) => {
      return quizData[itemInd].answers.reduce((t, a) => {
        return t + a.cnt
      }, 0);
    }
  },
  mutations: {
		selectAnswer({quizData}, {itemInd, answerInd}){
      let answer = quizData[itemInd].answers[answerInd]; 
      answer.selected = true;
    },
    clearSelect({quizData}, {itemInd}){
      let answers = quizData[itemInd].answers;
      if(answers){
        answers.forEach((a) => a.selected = false);
      }
    },
    changeTotals({quizData}){
      quizData.forEach((item) => {
        item.answers.forEach((a) => {
          if(a.selected){
            a.cnt++;
          }
        })
      });
    }
	},
	actions: {
		selectAnswerById(store, {itemId, answerInd}){
      let itemInd = store.getters.oneItemInd(itemId);
      store.commit('clearSelect', {itemInd});
      store.commit('selectAnswer', {itemInd, answerInd});
    },
    submitAnswers(store){
      store.commit('changeTotals');
    }
	}
};

function getQuizData(){
	return [
    {
      id:1,
      question: 'Как дела?',
      answers:[
        {
          text: 'Супер!',
          cnt: 6,
          selected: false
        },
        {
          text: 'Лучше не спрашивай',
          cnt: 4,
          selected: false
        }
      ]
    },
    {
      id:2,
      question: 'Сколько можно?',
      answers:[
        {
          text: 'Еще чуть-чуть',
          cnt: 7,
          selected: false
        },
        {
          text: 'Сколько нужно!',
          cnt: 3,
          selected: false
        }
      ]
    },
    {
      id:3,
      question: 'Быть или не быть?',
      answers:[
        {
          text: 'Быть',
          cnt: 5,
          selected: false
        },
        {
          text: 'Не быть!',
          cnt: 5,
          selected: false
        }
      ]
    },
    {
      id:4,
      question: 'Возьмете на работу?',
      answers:[
        {
          text: 'Да',
          cnt: 0,
          selected: false
        },
        {
          text: 'Нет!',
          cnt: 10,
          selected: false
        }
      ]
    }
  ]
}