<template>
  <div :data-component-name="$options.name">
    <div class="advanceControl">
      <transition name="advance-trans-l">
      <div class="advanced" v-show="showAttached"
        :style="{
          transition: showAttached ? '80ms cubic-bezier(0.17, 0.67, 0.17, 0.98)' : '150ms cubic-bezier(0.17, 0.67, 0.17, 0.98)'
        }">
        <transition name="setUp">
          <advance-main-menu class="mainMenu" :clearState="showAttached"></advance-main-menu>
        </transition>
      </div>
      </transition>
      <div ref="adv" @mouseup.left="toggleAdvMenuDisplay" @mousedown.left="handleDown" @mouseenter="handleEnter" @mouseleave="handleLeave">
        <lottie v-on:animCreated="handleAnimation" :options="defaultOptions" lot="advance"></lottie>
      </div>
    </div>
  </div>
</template>

<script>
import lottie from '@/components/lottie.vue';
import animationData from '@/assets/advance.json';
import AdvanceMainMenu from './AdvanceControlFunctionalities/AdvanceMainMenu.vue';

export default {
  name: 'advance-control',
  components: {
    lottie,
    'advance-main-menu': AdvanceMainMenu,
  },
  props: {
    showAttached: Boolean,
  },
  data() {
    return {
      isAcitve: false,
      defaultOptions: { animationData },
      animationSpeed: 1,
      anim: {},
      animFlag: true,
      mouseDown: false,
      validEnter: false,
      clicks: 0,
      showFlag: false,
      mainShow: true,
      subShow: false,
      audioShow: false,
    };
  },
  computed: {
    mousedownCurrentTarget() {
      return this.$store.state.Input.mousedownTarget;
    },
    mouseupCurrentTarget() {
      return this.$store.state.Input.mouseupTarget;
    },
  },
  watch: {
    showAttached(val) {
      if (!val) {
        this.animFlag = true;
        if (!this.validEnter) {
          this.anim.playSegments([68, 89], false);
        } else {
          this.showFlag = true;
          this.anim.playSegments([68, 83], false);
          setTimeout(() => { this.showFlag = false; }, 250);
        }
      }
    },
    mousedownCurrentTarget(val) {
      if (val !== this.$options.name && this.showAttached) {
        this.anim.playSegments([37, 41], false);
        if (this.mouseupCurrentTarget !== this.$options.name) {
          this.$emit('update:showAttached', false);
        }
      }
    },
    mouseupCurrentTarget(val) {
      if (val !== this.$options.name && this.showAttached) {
        this.$emit('update:showAttached', false);
      }
    },
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim;
    },
    handleDown() {
      this.mouseDown = true;
      if (!this.showAttached) {
        this.anim.playSegments([17, 21], false);
      } else {
        this.anim.playSegments([37, 41], false);
      }
      document.addEventListener('mouseup', (e) => {
        if (e.button === 0) {
          if (!this.showAttached) {
            if (this.validEnter) {
              this.anim.playSegments([23, 36], false);
            } else if (this.mousedownCurrentTarget === this.$options.name) {
              this.anim.playSegments([105, 109], false);
            }
          }
          this.mouseDown = false;
        }
      });
    },
    handleEnter() {
      if (this.animFlag && !this.showAttached) {
        if (!this.mouseDown) {
          this.anim.playSegments([3, 7], false);
        } else {
          this.anim.playSegments([95, 99], false);
        }
      }
      this.showFlag = false;
      this.validEnter = true;
      this.animFlag = false;
    },
    handleLeave() {
      if (!this.showAttached) {
        if (this.mouseDown) {
          this.anim.playSegments([90, 94], false);
        } else if (this.showFlag) {
          this.anim.addEventListener('complete', () => {
            this.anim.playSegments([10, 14], false);
            this.showFlag = false;
            this.anim.removeEventListener('complete');
          });
        } else {
          this.anim.playSegments([10, 14], false);
        }
        this.animFlag = true;
      }
      this.validEnter = false;
    },
    toggleAdvMenuDisplay() {
      this.clicks = this.showAttached ? 1 : 0;
      this.clicks += 1;
      switch (this.clicks) {
        case 1:
          this.$emit('update:showAttached', true);
          this.$emit('conflict-resolve', this.$options.name);
          break;
        case 2:
          this.$emit('update:showAttached', false);
          this.clicks = 0;
          break;
        default:
          this.clicks = 0;
          break;
      }
    },
  },
  created() {
    this.$bus.$on('isdragging-mouseup', () => {
      if (this.showAttached) {
        this.anim.playSegments([68, 73]);
      }
    });
    this.$bus.$on('isdragging-mousedown', () => {
      if (this.showAttached) {
        this.anim.playSegments([37, 41], false);
      }
    });
    this.$bus.$on('change-menu-list', (changedLevel) => {
      this.menuList = changedLevel;
      this.$_fitMenuSize();
    });
  },
};
</script>

<style lang="scss" scoped>
button {
  border: none;
}
button:focus {
  outline: none;
}
button:hover {
  cursor: pointer;
}
.advance-trans-l-enter, .advance-trans-l-enter-active {
  transform: translateY(0px);
}
.advance-trans-l-enter, .advance-trans-l-leave-active {
  transform: translateY(20px);
}
.advanced {
  position: absolute;
  z-index: 100;
  transition-property: opacity, transform;
  @media screen and (min-width: 320px) and (max-width: 512px) {
    display: none;
  }
  @media screen and (min-width: 513px) and (max-width: 854px) {
    bottom: 32px;
    right: 3px;
  }
  @media screen and (min-width: 855px) and (max-width: 1920px) {
    bottom: 44px;
    right: 3px;
  }
  @media screen and (min-width: 1921px) {
    bottom: 70px;
    right: 7px;
  }
  .mainMenu, .subtitleSetup, .audioItems {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
.advance-trans-l-enter-active, .advance-trans-l-leave {
  opacity: 1;
}
.advance-trans-l-enter, .advance-trans-l-leave-active {
  opacity: 0;
}
.advance-trans-l-leave-active {
  position: absolute;
}
</style>
