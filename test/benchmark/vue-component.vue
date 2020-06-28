<template>
  <div class='some-component'>
    <h1>With some info</h1>
      <p>
          {{ someData }}
      </p>
  </div>
</template>
<script>
  /**
   * @class VueComponent2
   * @desc This component is meant to do this and that
   *
   * @property {Number} someNumber - Un numerito
   * @property {String} someData - Una datica
   *
   * @emits {Object} eventName - Some event description
   */
    export default {
      props: {
        someNumber: {
          type: Number,
          required: true
        },
        someData: {
          type: String,
          required: true
        }
      },
      methods: {
        /**
         * Calculates given pr
         *
         * @function calculatePr
         * @param {Number} prRate
         * @return {Number} the rate
         */
        calculatePr (prRate) {
          return prRate
        }
      }
    }
</script>
<style lang="postcss">
    .some-component {
        color: black;
    }
</style>
