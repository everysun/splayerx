<template>
<base-info-card class="card"
  :borderRadius="7"
  :contentMinHeight="119"
  :contentMinWidth="170"
  :style="{
    cursor: 'default',
    height: this.readyShow === 'mainMenu' ? menuCardHeight : this.readyShow === 'subMenu' ? subtitleCardHeight : audioCardHeight,
    transition: 'height 100ms linear',
    fontWeight: '900',
  }">
  <transition :name="this.readyShow === 'mainMenu' ? 'setUp' : 'setUpLeft'">
    <div class="mainItems" v-show="readyShow === 'mainMenu'"
      :style="{
        bottom: readyShow === 'mainMenu' ? '' : '0px',
      }">
      <div class="playSpeed"
        @click.left="handleClick"
        @mouseenter="handleMouseenter(1)"
        @mouseleave="handleMouseleave()"
        :style="{
          height: speedHeight,
          transition: 'height 100ms linear',
        }">
        <transition name="arrow">
          <div class="hoverBack" v-show="!speedChosen && hoverIndex === 1" :style="{ height: speedHeight }"></div>
        </transition>
        <advance-row-items :lists="numList" :item="itemSpeedName" :winWidth="winWidth" :isChosen="speedChosen" :color="hoverIndex === 1 && !speedChosen ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)'"></advance-row-items>
      </div>
      <div class="subtitleControl"
        @mouseenter="handleMouseenter(2)"
        @mouseleave="handleMouseleave()"
        @click.left="handleSubClick">
        <transition name="arrow">
          <div class="hoverSubBack" v-show="hoverIndex === 2"></div>
        </transition>
        <div class="subContainer"
          :style="{ cursor: 'pointer'}">
          <div class="item2"
            :style="{
              color: hoverIndex === 2 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)',
              transition: 'color 300ms',
            }">
            <div>{{ this.$t('advance.subMenu') }}</div>
            <transition name="arrow">
              <Icon type="rightArrow" v-show="hoverIndex === 2"></Icon>
            </transition>
          </div>
        </div>
      </div>
      <div class="audioItems"
        @mouseenter="handleMouseenter(3)"
        @mouseleave="handleMouseleave()"
        @click.left="handleAudioClick"
        :style="{ cursor: 'pointer' }">
        <transition name="arrow">
          <div class="hoverAudioBack" v-show="hoverIndex === 3"></div>
        </transition>
        <div class="audioContainer">
          <div class="item3"
            :style="{
              color: hoverIndex === 3 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)',
              transition: 'color 300ms',
            }">
            <div>{{ this.$t('advance.audioMenu') }}</div>
            <transition name="arrow">
              <Icon type="rightArrow" v-show="hoverIndex === 3"></Icon>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <transition :name="this.readyShow === 'mainMenu' ? 'setUp' : 'setUpLeft'">
    <div class="mainItems1" v-show="readyShow === 'subMenu'"
      :style="{
        bottom: readyShow === 'subMenu' ? '' : '0px',
      }">
      <div class="topContainer"
        @click.left="handleSubBackClick"
        @mouseenter="handleSubBackEnter"
        @mouseleave="handleSubBackLeave">
        <div class="topContent">
          <Icon :type="backSubHover ? 'leftArrowHover' : 'leftArrow'"></Icon>
          <div class="text"
            :style="{
              color: backSubHover ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
            }">{{ this.$t('advance.subMenu') }}</div>
        </div>
      </div>
      <div class="itemSize" @click.left="handleSizeClick"
        @mouseenter="handleSubMouseenter(1)"
        @mouseleave="handleSubMouseleave()"
        :style="{
          height: subSizeHeight,
          transition: 'height 100ms linear',
        }">
        <transition name="arrow">
          <div class="hoverBack" v-show="!subSizeChosen && hoverSubIndex === 1" :style="{ height: subSizeHeight }"></div>
        </transition>
        <advance-row-items :lists="textList" :item="itemFontName" :winWidth="winWidth" :isChosen="subSizeChosen" :color="hoverSubIndex === 1 && !subSizeChosen ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)'"></advance-row-items>
      </div>
      <div class="subtitleStyle" @click.left="handleColorClick"
        @mouseenter="handleSubMouseenter(2)"
        @mouseleave="handleSubMouseleave()"
        :style="{
          height: subColorHeight,
          transition: 'height 100ms linear',
        }">
        <transition name="arrow">
          <div class="hoverBack" v-show="!subColorChosen && hoverSubIndex === 2" :style="{ height: subColorHeight }"></div>
        </transition>
        <advance-color-items :item="itemColorName" :winWidth="winWidth" :isChosen="subColorChosen" :color="hoverSubIndex === 2 && !subColorChosen ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)'"></advance-color-items>
      </div>
      <div class="subtitleDelay" @click.left="handleDelayClick"
        @mouseenter="handleSubMouseenter(3)"
        @mouseleave="handleSubMouseleave()"
        :style="{
          height: subDelayHeight,
          transition: 'height 100ms linear',
        }">
        <transition name="arrow">
          <div class="hoverBack" v-show="!subDelayChosen && hoverSubIndex === 3" :style="{ height: subDelayHeight }"></div>
        </transition>
        <advance-selected-items :item="itemDelayName" :winWidth="winWidth" :isChosen="subDelayChosen" :color="hoverSubIndex === 3 && !subDelayChosen ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)'"></advance-selected-items>
      </div>
    </div>
  </transition>

  <transition :name="this.readyShow === 'mainMenu' ? 'setUp' : 'setUpLeft'">
    <div class="mainItems2" v-show="readyShow === 'audioMenu'"
      :style="{
        bottom: readyShow === 'audioMenu' ? '' : '0px',
      }">
      <div class="topContainer"
        @click.left="handleAudioBackClick"
        @mouseenter="handleAudioBackEnter"
        @mouseleave="handleAudioBackLeave">
        <div class="topContent">
          <Icon :type="backAudioHover ? 'leftArrowHover' : 'leftArrow'"></Icon>
          <div class="text"
            :style="{
              color: backAudioHover ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
            }">{{ this.$t('advance.audioMenu') }}</div>
        </div>
      </div>
      <div class="audioDelay"
        @click.left="1"
        @mouseenter="handleAudioMouseenter(1)"
        @mouseleave="handleAudioMouseleave()"
        :style="{
          height: audioDelayHeight,
          transition: 'height 100ms linear',
        }"><!--disable temporarily-->
        <transition name="arrow">
          <!--<div class="hoverBack" v-show="!showDelay && hoverAudioIndex === 1" :style="{ height: audioDelayHeight }"></div>-->
        </transition>
        <advance-selected-items :item="audioDelayName" :winWidth="winWidth" :isChosen="showDelay" :color="hoverAudioIndex === 1 && !showDelay ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.2)'"></advance-selected-items>
      </div>
      <div class="changeTrack" @click.left="handleTrackClick"
        @mouseenter="handleAudioMouseenter(2)"
        @mouseleave="handleAudioMouseleave()"
        :style="{
          height: changeTrackHeight,
          transition: 'height 100ms linear',
        }">
        <transition name="arrow">
          <div class="hoverBack" v-show="!showTrack && hoverAudioIndex === 2" :style="{ height: changeTrackHeight }"></div>
        </transition>
        <div class="trackContainer">
        <transition name="audioTransIn">
          <div class="item2" v-show="!showTrack"
            :style="{ cursor: 'pointer' }">
            <div :style="{
              color: hoverAudioIndex === 2 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)',
              transition: 'color 300ms',
            }">{{ this.$t('advance.changeTrack') }}</div>
            <div class="trackDetail"
              :style="{
                color: 'rgba(255, 255, 255, 0.6)',
              }">{{ currentAudioTrack }}</div>
          </div>
        </transition>
        </div>
        <transition name="audioTransOut">
          <advance-column-items :item="itemTrack" :winWidth="winWidth" v-show="showTrack"></advance-column-items>
        </transition>
      </div>
    </div>
  </transition>
</base-info-card>
</template>

<script>
import { mapGetters } from 'vuex';
import AdvanceRowItems from './AdvanceRowItems.vue';
import BaseInfoCard from '../InfoCard.vue';
import Icon from '../../BaseIconContainer.vue';
import AdvanceColorItems from './AdvanceColorItems.vue';
import AdvanceSelectedItemts from './AdvanceSelectItems.vue';
import AdvanceColumnItems from './AdvanceColumnItems.vue';

export default {
  name: 'AdvanceMainMenu',
  data() {
    return {
      numList: [[0.5], [1], [1.2], [1.5], [2]],
      itemSpeedName: this.$t('advance.rateTitle'),
      speedChosen: false,
      rightArrowSub: false,
      rightArrowMed: false,
      preStyle: 'linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.045) 20%, rgba(255,255,255,0.00) 78%, rgba(255,255,255,0.00) 100%)',
      hoverIndex: -1,
      readyShow: 'mainMenu',
      backSubHover: false,
      textList: this.$t('advance.fontItems'),
      itemFontName: this.$t('advance.fontSize'),
      subSizeChosen: false,
      subColorChosen: false,
      subDelayChosen: false,
      itemColorName: this.$t('advance.fontStyle'),
      itemDelayName: this.$t('advance.subDelay'),
      hoverSubIndex: -1,
      audioDelayName: this.$t('advance.audioDelay'),
      itemTrack: this.$t('advance.changeTrack'),
      showDelay: false,
      showTrack: false,
      hoverAudioIndex: -1,
      backAudioHover: false,
    };
  },
  props: {
    clearState: {
      type: Boolean,
    },
  },
  watch: {
    clearState(val) {
      if (!val) {
        setTimeout(() => {
          this.readyShow = 'mainMenu';
          this.speedChosen = false;
          this.subSizeChosen = false;
          this.subColorChosen = false;
          this.subDelayChosen = false;
          this.showDelay = false;
          this.showTrack = false;
        }, 150);
      }
    },
    trackNum(val) {
      if (val < 1) {
        this.showTrack = false;
      }
    },
  },
  computed: {
    ...mapGetters(['winWidth', 'currentSubtitleId']),
    currentAudioTrack() {
      const track = this.$store.getters.audioTrackList.filter(track => track.enabled)[0];
      if (track) {
        if (track.language === '' || track.language === 'und') {
          return `${this.$t('advance.track')} ${this.$store.getters.audioTrackList.indexOf(track) + 1}`;
        } else if (this.$store.getters.audioTrackList.length === 1) {
          return `${track.language}`;
        }
        return `${track.name}`;
      }
      return this.$t('advance.chosenTrack');
    },
    speedHeight() {
      return this.speedChosen ? `${this.initialSize(74)}px` : `${this.initialSize(37)}px`;
    },
    subSizeHeight() {
      return this.subSizeChosen ? `${this.initialSize(74)}px` : `${this.initialSize(37)}px`;
    },
    subColorHeight() {
      return this.subColorChosen ? `${this.initialSize(74)}px` : `${this.initialSize(37)}px`;
    },
    subDelayHeight() {
      return this.subDelayChosen ? `${this.initialSize(74)}px` : `${this.initialSize(37)}px`;
    },
    audioDelayHeight() {
      return this.showDelay ? `${this.initialSize(74)}px` : `${this.initialSize(37)}px`;
    },
    changeTrackHeight() {
      return this.showTrack ? `${this.initialSize(this.trackHeight)}px` : `${this.initialSize(37)}px`;
    },
    menuCardHeight() {
      return this.speedChosen ? `${this.initialSize(164)}px` : `${this.initialSize(127)}px`;
    },
    subtitleCardHeight() {
      return !this.subColorChosen && !this.subSizeChosen && !this.subDelayChosen ? `${this.initialSize(156)}px` : `${this.initialSize(193)}px`;
    },
    audioCardHeight() {
      if (this.showDelay) {
        return `${this.initialSize(156)}px`;
      } else if (this.showTrack) {
        return `${this.initialSize(this.containerHeight)}px`;
      }
      return `${this.initialSize(119)}px`;
    },
    trackNum() {
      return this.$store.getters.audioTrackList.length;
    },
    containerHeight() {
      if (this.trackNum <= 2) {
        return 133 + (this.trackNum * 27) + ((this.trackNum - 1) * 5);
      }
      return 230;
    },
    trackHeight() {
      if (this.trackNum <= 2) {
        return (51 + (this.trackNum * 27)) + ((this.trackNum - 1) * 5);
      }
      return 142;
    },
  },
  components: {
    'base-info-card': BaseInfoCard,
    'advance-row-items': AdvanceRowItems,
    'advance-color-items': AdvanceColorItems,
    'advance-selected-items': AdvanceSelectedItemts,
    'advance-column-items': AdvanceColumnItems,
    Icon,
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
    handleClick() {
      this.speedChosen = true;
    },
    handleSubClick() {
      this.readyShow = 'subMenu';
      this.speedChosen = false;
    },
    handleAudioClick() {
      this.readyShow = 'audioMenu';
      this.speedChosen = false;
    },
    handleMouseenter(index) {
      this.hoverIndex = index;
    },
    handleMouseleave() {
      this.hoverIndex = -1;
    },
    handleSubBackClick() {
      this.readyShow = 'mainMenu';
      this.subSizeChosen = false;
      this.subDelayChosen = false;
      this.subColorChosen = false;
    },
    handleSubBackEnter() {
      this.backSubHover = true;
    },
    handleSubBackLeave() {
      this.backSubHover = false;
    },
    handleSubMouseenter(index) {
      this.hoverSubIndex = index;
    },
    handleSubMouseleave() {
      this.hoverSubIndex = -1;
    },
    handleSizeClick() {
      this.hoverSubIndex = -1;
      this.subSizeChosen = true;
      this.subDelayChosen = false;
      this.subColorChosen = false;
    },
    handleColorClick() {
      this.hoverSubIndex = -1;
      this.subColorChosen = true;
      this.subSizeChosen = false;
      this.subDelayChosen = false;
    },
    handleDelayClick() {
      this.hoverSubIndex = -1;
      this.subDelayChosen = true;
      this.subSizeChosen = false;
      this.subColorChosen = false;
    },
    handleAudioBackEnter() {
      this.backAudioHover = true;
    },
    handleAudioBackLeave() {
      this.backAudioHover = false;
    },
    handleAudioBackClick() {
      this.readyShow = 'mainMenu';
      this.showDelay = false;
      this.showTrack = false;
    },
    handleAudioMouseenter(index) {
      this.hoverAudioIndex = index;
    },
    handleAudioMouseleave() {
      this.hoverAudioIndex = -1;
    },
    handleAudioDelayClick() {
      this.showDelay = true;
      this.showTrack = false;
    },
    handleTrackClick() {
      if (this.trackNum > 0) {
        this.showDelay = false;
        this.showTrack = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 513px) and (max-width: 854px) {
  .card {
    width: 170px;
  }
  .playSpeed, .hoverBack {
    width: 170px;
  }
  .subtitleControl, .audioItems, .topContainer, .itemSize, .subtitleStyle, .subtitleDelay, .audioDelay, .hoverSubBack, .subContainer, .hoverAudioBack, .audioContainer, .trackContainer {
    width: 170px;
    height: 37px;
  }
  .item2, .item3 {
    font-size: 13px;
    line-height: 15px;
    width: 136px;
    height: 13px;
  }
  .topContent {
    width: 133px;
    height: 12px;
    margin: auto 9px;
  }
  .text {
    font-size: 11px;
    line-height: 13px;
    margin-left: 3px;
  }
  .trackDetail {
    font-size: 11px;
  }
  .setUp-enter-active {
    animation: showP1 .2s;
  }
  .setUp-enter, .setUp-leave-to {
    opacity: 0;
  }
  .setUp-leave-active {
    animation: hideP1 .2s;
  }

  .setUpLeft-enter-active {
    animation: showLeftP1 .2s;
  }
  .setUpLeft-enter, .setUpLeft-leave-to {
    opacity: 0;
  }
  .setUpLeft-leave-active {
    animation: hideLeftP1 .2s;
  }
}
@media screen and (min-width: 855px) and (max-width: 1920px) {
  .card {
    width: 204px;
  }
  .playSpeed, .hoverBack {
    width: 204px;
  }
  .subtitleControl, .audioItems, .topContainer, .itemSize, .subtitleStyle, .subtitleDelay, .audioDelay, .hoverSubBack, .subContainer, .hoverAudioBack, .audioContainer, .trackContainer {
    width: 204px;
    height: 44.4px;
  }
  .item2, .item3 {
    font-size: 15.6px;
    line-height: 18px;
    width: 163.2px;
    height: 15.6px;
  }
  .topContent {
    width: 159.6px;
    height: 14.4px;
    margin: auto 10.8px;
  }
  .text {
    font-size: 13.2px;
    line-height: 15.6px;
    margin-left: 3.6px;
  }
  .trackDetail {
    font-size: 13.2px;
  }
  .setUp-enter-active {
    animation: showP2 .2s;
  }
  .setUp-enter, .setUp-leave-to {
    opacity: 0;
  }
  .setUp-leave-active {
    animation: hideP2 .2s;
  }
  .setUpLeft-enter-active {
    animation: showLeftP2 .2s;
  }
  .setUpLeft-enter, .setUpLeft-leave-to {
    opacity: 0;
  }
  .setUpLeft-leave-active {
    animation: hideLeftP2 .2s;
  }
}
@media screen and (min-width: 1921px) {
  .card {
    width: 285.6px;
  }
  .playSpeed, .hoverBack {
    width: 285.6px;
  }
  .subtitleControl, .audioItems, .topContainer, .itemSize, .subtitleStyle, .subtitleDelay, .audioDelay, .hoverSubBack, .subContainer, .hoverAudioBack, .audioContainer, .trackContainer {
    width: 285.6px;
    height: 62.16px;
  }
  .item2, .item3 {
    font-size: 21.84px;
    line-height: 25.2px;
    width: 228.48px;
    height: 21.84px;
  }
  .topContent {
    width: 223.44px;
    height: 20.16px;
    margin: auto 15.12px;
  }
  .text {
    font-size: 18.48px;
    line-height: 21.84px;
    margin-left: 5.04px;
  }
  .trackDetail {
    font-size: 18.48px;
  }
  .setUp-enter-active {
    animation: showP3 .2s;
  }
  .setUp-enter, .setUp-leave-to {
    opacity: 0;
  }
  .setUp-leave-active {
    animation: hideP3 .2s;
  }
  .setUpLeft-enter-active {
    animation: showLeftP3 .2s;
  }
  .setUpLeft-enter, .setUpLeft-leave-to {
    opacity: 0;
  }
  .setUpLeft-leave-active {
    animation: hideLeftP3 .2s;
  }

}

.card {
  -webkit-app-region: no-drag;
}
.hoverBack {
  background-image: linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.045) 20%, rgba(255,255,255,0.00) 78%, rgba(255,255,255,0.00) 100%);
}
.mainItems {
  display: flex;
  flex-direction: column;
  position: absolute;
  .rightArrow {
    margin: auto 0;
  }
  .playSpeed {
    display: flex;
    margin-top: 8px;
  }
  .subtitleControl {
    display: flex;
    .hoverSubBack {
      background-image: linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.045) 20%, rgba(255,255,255,0.00) 78%, rgba(255,255,255,0.00) 100%);
    }
    .subContainer {
      position: absolute;
      display: flex;
    }
    .item2 {
      margin: auto;
      display: flex;
      justify-content: space-between;
    }
  }
  .audioItems {
    display: flex;
    .audioContainer {
      position: absolute;
      display: flex;
    }
    .hoverAudioBack {
      background-image: linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.045) 20%, rgba(255,255,255,0.00) 78%, rgba(255,255,255,0.00) 100%);
    }
    .item3 {
      margin: auto;
      display: flex;
      justify-content: space-between;
    }
  }
}

.mainItems1 {
  display: flex;
  flex-direction: column;
  position: absolute;
  .leftItem {
    letter-spacing: 0.2px;
    margin-top: 1px;
    font-size: 13px;
  }
  .rightItem {
    font-size: 11px;
  }
  .topContainer {
    display: flex;
    cursor: pointer;
    .topContent {
      display: flex;
      justify-content: flex-start;
    }
  }
  .itemSize {
    display: flex;
  }
  .subtitleStyle {
    display: flex;
  }
  .subtitleDelay {
    display: flex;
  }
}

.mainItems2 {
  display: flex;
  flex-direction: column;
  position: absolute;
  .topContainer {
    display: flex;
    cursor: pointer;
    .topContent {
      display: flex;
      justify-content: flex-start;
    }
  }
  .trackContainer {
    display: flex;
    position: absolute;
  }
  .audioDelay {
    display: flex;
  }
  .changeTrack {
    display: flex;
    .item2 {
      display: flex;
      justify-content: space-between;
      margin: auto;
    }
  }
}

.arrow-enter-active, .arrow-leave-active {
  transition: opacity .2s;
}
.arrow-enter, .arrow-leave-to {
  opacity: 0;
}

.audioTransOut-leave-active {
  transition-delay: 80ms;
}
.audioTransOut-enter, .audioTrans-leave-to {
  opacity: 0;
}
.audioTransIn-enter-active {
  transition-delay: 80ms;
}
.audioTransIn-enter, .audioTransIn-leave-to {
  opacity: 0;
}

@keyframes showP1 {
  0% {
    opacity: 0;
    right: 170px;
  }
  100% {
    opacity: 1;
    right: 0;
  }
}
@keyframes hideP1 {
  0% {
    opacity: 1;
    right: 0;
  }
  100% {
    opacity: 0;
    right: -170px;
  }
}
@keyframes showP2 {
  0% {
    opacity: 0;
    right: 204px;
  }
  100% {
    opacity: 1;
    right: 0;
  }
}
@keyframes hideP2 {
  0% {
    opacity: 1;
    right: 0;
  }
  100% {
    opacity: 0;
    right: -204px;
  }
}
@keyframes showP3 {
  0% {
    opacity: 0;
    right: 285.6px;
  }
  100% {
    opacity: 1;
    right: 0;
  }
}
@keyframes hideP3 {
  0% {
    opacity: 1;
    right: 0;
  }
  100% {
    opacity: 0;
    right: -285.6px;
  }
}
@keyframes showLeftP1 {
  0% {
    opacity: 0;
    right: -170px;
  }
  100% {
    opacity: 1;
    right: 0;
  }
}
@keyframes hideLeftP1 {
  0% {
    opacity: 1;
    right: 0;
  }
  100% {
    opacity: 0;
    right: 170px;
  }
}
@keyframes showLeftP2 {
  0% {
    opacity: 0;
    right: -204px;
  }
  100% {
    opacity: 1;
    right: 0;
  }
}
@keyframes hideLeftP2 {
  0% {
    opacity: 1;
    right: 0;
  }
  100% {
    opacity: 0;
    right: 204px;
  }
}
@keyframes showLeftP3 {
  0% {
    opacity: 0;
    right: -285.6px;
  }
  100% {
    opacity: 1;
    right: 0;
  }
}
@keyframes hideLeftP3 {
  0% {
    opacity: 1;
    right: 0;
  }
  100% {
    opacity: 0;
    right: 285.6px;
  }
}
</style>
