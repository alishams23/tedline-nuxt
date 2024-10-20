<template>
  <v-container>
    <v-card  elevation="0" class="d-flex justify-center bg-blue rounded-xl py-10 e" color="blue-grey-darken-3">
      
      <div class="rtl d-flex flex-column text-white justify-center align-center mx-6">
        <div class="font-weight-light  ">
          زمان باقی مانده 
        </div>
        <div class="text-h6 font-weight-bold ">{{
            formattedTime
          }}</div>
      </div>
      <div  class="text-center">
        <v-progress-circular
          :model-value="progress"
          :size="80"
          bg-color="blue-grey-darken-1"
          :width="10"
          color="auto"
        >
          
        </v-progress-circular>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ["examTime", "elapsedTime"],
  emits: ["timeUp"],
  data() {
    return {
      timeLeft: this.examTime * 60,
      timer: null,
      totalSeconds: 0,
    };
  },
  computed: {
    progress() {
      return (this.timeLeft / (this.examTime * 60)) * 100;
    },
    formattedTime() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    },
  },
  methods: {
    timeToSeconds(timeString) {
      if (timeString) {
        const [hours, minutes, seconds] = timeString.split(":");

        this.totalSeconds =
          parseInt(hours) * 3600 +
          parseInt(minutes) * 60 +
          parseInt(seconds.split(".")[0]);
      } else {
        console.log("error");
      }
    },
    startTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.totalSeconds++;
          this.timeLeft = this.examTime * 60 - this.totalSeconds;
        } else {
          clearInterval(this.timer);
          this.$emit("timeUp");
        }
      }, 1000);
    },
  },
  mounted() {
    this.timeToSeconds(this.elapsedTime);
    this.startTimer();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style scoped>
.v-progress-circular {
  position: relative;
}
.v-progress-circular > span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
