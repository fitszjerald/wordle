<template>
  <div class="d-flex flex-column justify-content-around align-items-center">
    <div>
      <div
        v-for="word in words"
        :key="word.step"
        class="d-flex flex-row justify-content-center"
      >
        <div
          v-for="(i, index) in length"
          :key="index"
          style="font-size: 2rem"
          class="char-box d-flex flex-column justify-content-center align-items-center"
          :class="getClass(word.word[index])"
        >
          <template v-if="word.word[index]">
            {{ word.word[index] ? word.word[index].char : "_" }}
          </template>
        </div>
      </div>
    </div>

    <my-keyboard @check="check" v-model:keys="keyboards" class="p-5" />
  </div>
</template>

<script>
import MyKeyboard from "@/components/Keyboard";
import { useToast } from "vue-toastification";

export default {
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
  name: "HelloWorld",
  components: {
    MyKeyboard,
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
      length: 5,
      solution: null,
      arrayOfSolution: [
        "baker",
        "apple",
        "peach",
        "awake",
        "grade",
        "quiet",
        "total",
        "paste",
        "sleep",
        "queen",
        "silly",
        "smoke",
        "funny",
        "bully",
        "novel",
        "silly",
        "alarm",
        "short",
        "puppy",
        "pizza",
        "anime",
        "await",
        "press",
        "bleep",
        "stuff",
        "email",
        "anger",
        "punch",
        "woman",
        "chess",
        "chain",
        "occur",
        "metro",
        "virus",
        "flask",
        "limbo",
        "omega",
        "feast",
        "drank",
        "freak",
        "which",
        "among",
        "laugh",
        "fault",
        "fifty",
        "skill",
        "knock",
        "speak",
        "stoop",
        "turbo",
        "nomad",
        "empty",
        "reach",
        "agile",
        "apply",
        "timer",
        "shift",
        "canon",
        "gangs",
        "jerky",
        "scrum",
        "cobra",
        "ratio",
        "drama",
        "worse",
        "krill",
        "gypsy",
        "melon",
        "dress",
        "local",
        "kiosk",
        "title",
        "march",
        "brain",
        
      ],
      keyboards: [
        { char: "q", notCorrect: false },
        { char: "w", notCorrect: false },
        { char: "e", notCorrect: false },
        { char: "r", notCorrect: false },
        { char: "t", notCorrect: false },
        { char: "y", notCorrect: false },
        { char: "u", notCorrect: false },
        { char: "i", notCorrect: false },
        { char: "o", notCorrect: false },
        { char: "p", notCorrect: false },
        { char: "a", notCorrect: false },
        { char: "s", notCorrect: false },
        { char: "d", notCorrect: false },
        { char: "f", notCorrect: false },
        { char: "g", notCorrect: false },
        { char: "h", notCorrect: false },
        { char: "j", notCorrect: false },
        { char: "k", notCorrect: false },
        { char: "l", notCorrect: false },
        { char: "enter", notCorrect: false },
        { char: "z", notCorrect: false },
        { char: "x", notCorrect: false },
        { char: "c", notCorrect: false },
        { char: "v", notCorrect: false },
        { char: "b", notCorrect: false },
        { char: "n", notCorrect: false },
        { char: "m", notCorrect: false },
        { char: "delete", notCorrect: false },
      ],
    };
  },
  mounted() {
    const solution = JSON.parse(localStorage.getItem("solution"));
    if (solution) {
      this.solution = solution;
    } else {
      this.solution =
        this.arrayOfSolution[
          Math.floor(Math.random() * this.arrayOfSolution.length)
        ];
      localStorage.setItem("solution", JSON.stringify(this.solution));
    }

    const suggestion = JSON.parse(localStorage.getItem("suggestion"));
    if (suggestion && suggestion.length) {
      suggestion.forEach((i, index) => {
        const splitWord = i.split("");
        splitWord.forEach((j) => {
          this.words[index].word.push({
            char: j,
            correct: false,
            exist: false,
          });
        });

        // this.step = index
        this.findWord(this.words[index]);
      });
    }
  },
  methods: {
    check(input) {
      const findStep = this.words.find((i) => i.step == this.step);
      if (findStep) {
        if (findStep.word.length < this.length) {
          if (input == "delete") {
            findStep.word.pop();
          } else if (input !== "enter" && input !== "delete") {
            const sample = {
              char: input,
              correct: false,
              exist: false,
            };

            findStep.word.push(sample);
          }
        } else if (findStep.word.length == this.length && input === "enter") {
          this.findWord(findStep, true);
        } else if (input == "delete") {
          findStep.word.pop();
        }
      }
    },

    findWord(findStep, set) {
      // check word is in array of solution
      const word = findStep.word.map((i) => i.char).join("");
      if (!this.arrayOfSolution.includes(word)) {
        return this.toast("Not in word list");
      }

      let solution = this.solution.split("");

      findStep.word.forEach((i, index) => {
        if (i.char == this.solution[index]) {
          i.correct = true;
          solution[index] = "-";
        }
      });

      findStep.word.forEach((i) => {
        if (!i.correct && solution.includes(i.char)) {
          i.exist = true;
          const index = solution.indexOf(i.char);
          solution[index] = "-";
        }
      });

      solution = solution.join("");

      findStep.word.forEach((i) => {
        if (!this.solution.includes(i.char)) {
          const findKey = this.keyboards.find((key) => key.char == i.char);
          findKey.notCorrect = true;
        }
      });
      if (set) {
        this.setItem(word);
      }
      // else finish the game

      if (solution == "-".repeat(this.length)) {
        this.finishGame();
        return this.toast.success("WINNER");
      } else if (this.step == 4) {
        this.finishGame();
        return this.toast.danger("YOU ARE LOSER");
      }
      this.step++;
    },
    finishGame() {
      localStorage.removeItem("suggestion");
      localStorage.removeItem("solution");
      this.step = 5;
    },
    setItem(word) {
      const suggestion = JSON.parse(localStorage.getItem("suggestion")) || [];
      localStorage.setItem("suggestion", JSON.stringify([...suggestion, word]));
    },
    getClass(word) {
      if (word) {
        if (word.correct) return "bg-success";
        else if (word.exist) return "bg-warning";
      }
    },
  },
};
</script>
