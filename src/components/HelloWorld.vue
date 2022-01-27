<template>
  <div>
    <div>
      <div v-for="word in words" :key="word.step" class="d-flex flex-row justify-content-center">
        <div v-for="(i, index) in length" :key="index" class="border p-5">
          {{ word.word[index]}}
        </div>
      </div>
    </div>

    <my-keyboard @input="check" />
  </div>
</template>

<script>
import MyKeyboard from '@/components/Keyboard' 

export default {
  name: "HelloWorld",
  components: {
    MyKeyboard
  },
  data() {
    return {
      words: [
        {
          word: [],
          step: 0,
        },
        {
          word: [],
          step: 1,
        },
        {
          word: [],
          step: 2,
        },
        {
          word: [],
          step: 3,
        },
        {
          word: [],
          step: 4,
        },
      ],
      step: 0,
      length: 5
    };
  },
  methods: {
    check(input) {
      const findStep = this.words.find((i) => i.step == this.step);
      if (findStep.word.length < this.length) {
        if (input == 'delete') {
          findStep.word.pop()
        }
        else  {
          findStep.word.push(input);
        }
      } 
      else if (input == 'enter') {
        this.findWord(findStep)
      }
    },
    findWord() {
      this.step++;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
