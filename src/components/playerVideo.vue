<template>
  <div clas="row" id="videoPlayer">
    <div>
      <h1>The Real Player</h1>
      <video ref="player" preload="metadata" id="player" width="auto" @click="togglePlayPause()">
        <source src="static/video/big_buck_bunny.mp4" type="video/mp4">
        <!-- Text for users who can not see vdeo balise -->
        Please install a REAL like browser chrome or firefox or update yours !
      </video>
    </div>
    <br>
    <div>

      <!-- methods/ utility bars -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Controles name</span>
          <br>
          </div>
          <div class="text item">
<el-input v-model="this.time" :disabled="true" placeholder=""></el-input>
      <div class="slider player__progress-bar">
<el-slider v-model="seekbar" type="range" v-on:change="changeTime()" ></el-slider>
<el-button @click="restartPlayer()" type="primary" icon="fa fa-refresh"></el-button>
      <el-button v-if="playing === false" @click="togglePlayPause()" type="primary" icon="fa fa-play"></el-button>
      <el-button v-if="playing === true" @click="togglePlayPause()" type="primary" icon="fa fa-stop"></el-button>
      <el-button @click="toggleFullScreen()" type="primary" icon="fa fa-arrows-alt"></el-button>
      <el-button v-if="isMute === true" @click="toggleMute()" type="primary" icon="fa fa-volume-off"></el-button>
      <el-button v-if="isMute === false" @click="toggleMute()" type="primary" icon="fa fa-volume-up"></el-button>
            <el-button  @click="toggleTest()" type="primary" icon="fa fa-volume-up"></el-button>
        <!-- <input v-model="seekbar" type="range" step="0.1" v-on:change="changeTime()">
        <label>{{this.time}}</label>-->
      </div>
          </div>
          </el-card>
    </div>
    <br>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'videoPlayer',
  data () {
    return {
      vid: {},
      isMute: false,
      playing: false,
      seekbar: 0,
      time: 0
    }
  },
  watch: {
    vid: function () {
      this.seekbar = this.vid.currentTime
    }
  },
  methods: {
    // last testwith buffering time
    toggleTest () {
      console.log('Start: ' + this.vid.buffered.start(0) + ' End: ' + this.vid.buffered.end(0))
    },
    togglePlayPause () {
      console.log(this.vid)
      if (this.playing === false) {
        this.vid.play(true)
        this.playing = true
      } else {
        this.vid.pause()
        this.playing = false
      }
      this.updateTime()
    },
    restartPlayer () {
      this.seekbar = 0
      this.vid.load()
      this.togglePlayPause()
    },
    toggleFullScreen () {
      if (this.vid.mozRequestFullScreen) {
        this.vid.mozRequestFullScreen()
      } else if (this.vid.webkitRequestFullScreen) {
        this.vid.webkitRequestFullScreen()
      }
    },
    toggleMute () {
      this.isMute = this.vid.muted
      if (this.vid.muted === true) {
        this.isMute = false
        this.vid.muted = false
      } else if (this.vid.muted === false) {
        this.isMute = true
        this.vid.muted = true
      }
    },
    changeTime () {
      this.vid.currentTime = this.seekbar / 100 * this.vid.duration
    },
    updateTime () {
      var self = this
      self.seekbar = (self.vid.currentTime / self.vid.duration) * 100
      self.time = self.vid.currentTime.toFixed(1)
      setInterval(self.updateTime, 1000)
    }
  },
  mounted () {
    this.vid = document.getElementById('player')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.box-card{
  min-width: 25;
max-width: 25;
margin: 1em 25em 1em 25em;

}
</style>
