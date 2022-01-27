<template>
  <div class="d-flex justify-content-center align-items-center">
    <div v-for="char in keyboard" :key="char" class="p-2 border" @click="keydown(char)">
      <div>
        {{ char }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Keyboard",
  data() {
    return {
      keyboard: [
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        "delete",
        "enter",
      ],
    };
  },
  methods: {
    keydown(e) {
      // if (e === 'enter') {
			// 	this.$emit('enter');
			// }
			// else if (e === 'delete') {
			// 	this.$emit('delete');
			// }
			// else {
				this.$emit('input', e);
			// }
    },
  },
};
</script>

<style></style>
