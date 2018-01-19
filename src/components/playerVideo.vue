<template>
  <div class="row" id="videoPlayer">
    <div class="el-card__body">
      <h1 class="title"> Vue Video Player</h1>
      <video ref="player" preload="metadata" id="player" height="100%" width="auto" @click="togglePlayPause()">
        <source src="static/video/big_buck_bunny.mp4" type="video/mp4">
        <!-- Text for users who can not see vdeo balise -->
        Please install a REAL like browser chrome or firefox or update yours !
      </video>
    </div>
    <div>
      <!-- conditionals alerts -->
      <el-alert class="alertFix" v-if="this.time > 15 " title="La vidéo a atteint 25% de progression" type="succes" :closable="true"
        show-icon>
      </el-alert>
      <el-alert class="alertFix" v-if="this.time > 30  " title="La vidéo a atteint 50% de progression" type="succes" :closable="true"
        show-icon>
      </el-alert>
      <el-alert class="alertFix" v-if="this.time > 45  " title="La vidéo a atteint 75% de progression" type="succes" :closable="true"
        show-icon>
      </el-alert>
      <el-alert class="alertFix" v-if="vid.ended" title="La vidéo est finie " type="succes" :closable="true" show-icon>
      </el-alert>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Controles name</span>
          <br>
          <el-input-number v-model="this.time" :disabled="true"></el-input-number>
          <!-- View time -->
          <br>: {{this.time}} s
        </div>
        <div class="text item">
          <!-- pop over content -->
          <el-popover ref="restartPlayer" placement="top" width="10rem" trigger="hover" content="Click to restart the video"></el-popover>
          <el-popover ref="togglePlayPause" placement="top" width="10rem" trigger="hover" content="Click to to play or pause the video"></el-popover>
          <el-popover ref="toggleFullScreen" placement="top" width="10rem" trigger="hover" content="Click for fullScreen mode"></el-popover>
          <el-popover ref="toggleMute" placement="top" width="10rem" trigger="hover" content="Click to Mute/Unmute "></el-popover>
          <el-button v-popover:restartPlayer @click="restartPlayer()" type="primary" icon="fa fa-refresh"></el-button>
          <el-button v-popover:togglePlayPause label="viewTime" v-if="playing === false" @click="togglePlayPause()" type="primary"
            icon="fa fa-play"></el-button>
          <el-button v-popover:togglePlayPause v-if="playing === true" @click="togglePlayPause()" type="primary" icon="fa fa-stop"></el-button>
          <el-button v-popover:toggleFullScreen @click="toggleFullScreen()" type="primary" icon="fa fa-arrows-alt"></el-button>
          <el-button v-popover:toggleMute v-if="isMute === true" @click="toggleMute()" type="primary" icon="fa fa-volume-off"></el-button>
          <el-button v-popover:toggleMute v-if="isMute === false" @click="toggleMute()" type="primary" icon="fa fa-volume-up"></el-button>
          <!-- TimeSlider -->
          <el-slider type="range" v-on:change="changeTime()" v-model="seekbar">
          </el-slider>
        </div>
      </el-card>
      <!-- native HTMLprogressBar -->
      <!-- <div class="slider player__progress-bar">
          <input v-model="seekbar" type="range" step="0.1" v-on:change="changeTime()">
          <label v-if="this.time > 5">{{this.time}}</label>
        </div> -->
      <!-- <label v-if="this.time > 0">{{this.time}}</label> -->
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
    togglePlayPause () {
      if (this.playing === false) {
        this.updateTime()
        this.vid.play(true)
        this.playing = true
      } else {
        this.vid.pause()
        this.playing = false
      }
    },
    restartPlayer () {
      this.seekbar = 0
      this.vid.load()
      this.togglePlayPause()
      this.vid.currentTime = 0
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
      self.time = self.vid.currentTime.toFixed(0)
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
max-width: 50em;
margin: 1em 33em 1em 33em;

}

</style>
