<template>
  <div class="keyboard-wrapper text-center">
    <!-- <div class="d-flex justify-content-center align-items-center flex-wrap"> -->
    <!-- <div
        v-for="key in keys"
        :key="key.char"
        class="keyboard-box d-flex flex-column justify-content-center align-items-center"
        :class="{ 'bg-danger': key.notCorrect }"
        @click="keydown(key)"
      >
        <span>
          {{ key.char }}
        </span>
      </div> -->

    <div class="row no-gutters justify-content-around flex-nowrap">
      <div class="col pointer" v-for="i in 10" :key="i" @click="keydown(keys[i - 1])">
        <div
          :class="{ 'bg-danger': keys[i - 1].notCorrect }"
          class="pointer keyboard-box d-flex flex-column justify-content-center align-items-center"
        >
          <div>
            {{ keys[i - 1].char }}
          </div>
        </div>
      </div>
    </div>

    <div class="row no-gutters justify-content-around flex-nowrap">
      <div class="col" style="flex:.5">
      </div>
      <div class="col pointer" v-for="i in getNumbers(11, 20)" :key="i" @click="keydown(keys[i - 1])">
        <div
          :class="{ 'bg-danger': keys[i - 1].notCorrect }"
          class="keyboard-box d-flex flex-column justify-content-center align-items-center"
        >
          <div>
            {{ keys[i - 1].char }}
          </div>
        </div>
      </div>
      <div class="col" style="flex:.5"></div>
    </div>

    <div class="row no-gutters justify-content-around flex-nowrap">
      <div class="col pointer" v-for="i in getNumbers(20, 29)" :key="i" @click="keydown(keys[i - 1])">
        <div
          :class="{ 'bg-danger': keys[i - 1].notCorrect }"
          class="pointer keyboard-box d-flex flex-column justify-content-center align-items-center"
        >
          <div>
            {{ keys[i - 1].char }}
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "Keyboard",
  props: {
    keys: { type: Array, default: () => {} },
  },
  methods: {
    getNumbers(start, stop) {
      return new Array(stop - start).fill(start).map((n, i) => n + i);
    },
    keydown(e) {
      if (e.notCorrect) {
        return;
      }
      this.$emit("check", e.char);
    },
  },
};
</script>

<style></style>
