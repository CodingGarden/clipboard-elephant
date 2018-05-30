const { clipboard } = require('electron');
const Vue = require('vue/dist/vue.js');

const audio = new Audio('./elephant_sound.mp3');

const App = new Vue({
  el: '#app',
  data: {
    title: '🐘 Clipboard Elephant 🎉',
    history: [],
  },
  mounted() {
    this.history.push({
      text: clipboard.readText(),
      clipped: new Date()
    });
    setInterval(this.checkClipboard, 500);
  },
  computed: {
    historyReversed() {
      return this.history.slice().reverse();
    }
  },
  methods: {
    checkClipboard() {
      const text = clipboard.readText();
      if (this.history[this.history.length - 1].text !== text) {
        this.history.push({
          text,
          clipped: new Date()
        });
        audio.currentTime = 0;
        audio.play();
      }
    },
    itemClicked(item) {
      const index = this.history.indexOf(item);
      this.history.splice(index, 1);
      clipboard.writeText(item.text);
      window.scrollTo(0, 0);
    }
  }
});
