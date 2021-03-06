<template>
  <div class="itemContainer advance-column-items">
    <div class="textContainer" :style="{
      cursor: 'default',
    }">
      <div class="textItem">{{ item }}</div>
    </div>
    <div class="listContainer"
      :style="{
        height: heightSize,
      }">
      <div class="scrollScope"
        :style="{
          overflowY: tracks.length > 2 ? 'scroll' : '',
          height: scopeHeight,
        }">
        <div class="columnContainer">
          <div v-for="(track, index) in tracks"
            class="columnNumDetail"
            @mouseover="handleOver(index)"
            @mouseout="handleOut(index)"
            @click="handleClick(index)"
            :style="{ cursor: track.enabled ? 'default' : 'pointer' }">
            <div class="text"
              :style="{
                color: index === hoverIndex || track.enabled  ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)',
                transition: 'color 300ms',
              }">{{ track.language === 'und' || track.language === '' ? `${$t('advance.track')} ${index + 1}`
              : tracks.length === 1 ? `${$t('advance.track')} ${index + 1} : ${track.language}` : `${$t('advance.track')} ${index + 1} : ${track.name}` }}
            </div>
          </div>
          <div class="card"
            :style="{
              marginTop: cardPos,
              transition: 'all 200ms cubic-bezier(0.17, 0.67, 0.17, 0.98)'
            }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Video as videoActions } from '@/store/actionTypes';

export default {
  name: 'AdvanceColumnItems',
  data() {
    return {
      hoverIndex: -1,
      moveLength: 0,
    };
  },
  props: {
    item: {
      type: String,
    },
    winWidth: {
      type: Number,
    },
    isChosen: {
      type: Boolean,
    },
  },
  watch: {
    audioTrackList(val) {
      val.forEach((item, index) => {
        if (item.id === this.currentAudioTrackId) {
          this.moveLength = index * 32;
        }
      });
    },
  },
  computed: {
    ...mapGetters(['audioTrackList', 'currentAudioTrackId']),
    cardPos() {
      return `${this.initialSize(this.moveLength - (this.tracks.length * 32))}px`;
    },
    heightSize() {
      return this.tracks.length <= 2 ? `${this.initialSize(41 + (32 * (this.tracks.length - 1)))}px` : `${this.initialSize(105)}px`;
    },
    scopeHeight() {
      return this.tracks.length <= 2 ? `${this.initialSize(32 * this.tracks.length)}px` : `${this.initialSize(96)}px`;
    },
    tracks() {
      return this.$store.getters.audioTrackList;
    },
  },
  methods: {
    initialSize(size) {
      if (this.winWidth > 514 && this.winWidth <= 854) {
        return size;
      } else if (this.winWidth > 854 && this.winWidth <= 1920) {
        return size * 1.2;
      }
      return size * 1.2 * 1.4;
    },
    handleOver(index) {
      this.hoverIndex = index;
    },
    handleOut() {
      this.hoverIndex = -1;
    },
    handleClick(index) {
      this.moveLength = index * 32;
      this.$store.dispatch(videoActions.SWITCH_AUDIO_TRACK, this.tracks[index]);
    },
  },
  mounted() {
    this.$bus.$on('switch-audio-track', (index) => {
      this.handleClick(index);
    });
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 513px) and (max-width: 854px) {
  .itemContainer {
    width: 170px;
    .textContainer {
      width: 136px;
      height: 37px;
      font-size: 13px;
      margin: auto auto auto 17px;
    }
    .listContainer {
      height: 37px;
      .scrollScope {
        width: 165px;
        .columnNumDetail {
          width: 136px;
          height: 27px;
          margin: 0 auto 5px 17px;
          .text {
            font-size: 11px;
            margin: auto auto auto 10px;
          }
        }
        .card {
          width: 136px;
          height: 27px;
          margin-left: 17px;
        }
      }
    }
  }
}
@media screen and (min-width: 855px) and (max-width: 1920px) {
  .itemContainer {
    width: 204px;
    .textContainer {
      width: 163.2px;
      height: 44.4px;
      font-size: 15.6px;
      margin: auto auto auto 20.4px;
    }
    .listContainer {
      height: 44.4px;
      .scrollScope {
        width: 198px;
        .columnNumDetail {
          width: 163.2px;
          height: 32.4px;
          margin: 0 auto 6px 20.4px;
          .text {
            font-size: 13.2px;
            margin: auto auto auto 12px;
          }
        }
        .card {
          width: 163.2px;
          height: 32.4px;
          margin-left: 20.4px;
        }
      }
    }
  }
}
@media screen and (min-width: 1921px) {
  .itemContainer {
    width: 285.6px;
    .textContainer {
      width: 228.48px;
      height: 62.16px;
      font-size: 21.84px;
      margin: auto auto auto 28.56px;
    }
    .listContainer {
      height: 62.16px;
      .scrollScope {
        width: 277.2px;
        .columnNumDetail {
          width: 228.48px;
          height: 45.36px;
          margin: 0 auto 8.4px 28.56px;
          .text {
            font-size: 18.48px;
            margin: auto auto auto 16.8px;
          }
        }
        .card {
          width: 228.48px;
          height: 45.36px;
          margin-left: 28.56px;
        }
      }
    }
  }
}
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-thumb {
  border-radius: 1.2px;
  border: 0.5px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.15);
}
.itemContainer {
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  z-index: 10;
  background-image: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.07) 24%, rgba(255,255,255,0.03) 100%);
  clip-path: inset(0 round 8px);
  .textContainer {
    display: flex;
    color: rgba(255, 255, 255, 0.6);
    .textItem {
      letter-spacing: 0.2px;
      margin: auto 0;
    }
  }
  .listContainer {
    cursor: default;
    .columnContainer {
      display: flex;
      flex-direction: column;
      .columnNumDetail {
        position: relative;
        display: flex;
        .text {
          text-shadow: 0px 1px 1px rgba(0, 0, 0, .1);
        }
      }
      .card {
        z-index: -1;
        border-radius: 7px;
        opacity: 0.4;
        border: 0.5px solid rgba(255, 255, 255, 0.20);
        box-shadow: 0px 1px 2px rgba(0, 0, 0, .2);
        background-image: radial-gradient(60% 134%, rgba(255, 255, 255, 0.09) 44%, rgba(255, 255, 255, 0.05) 100%);
      }
    }
  }
}
</style>
