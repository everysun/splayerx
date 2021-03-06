<template>
  <div
    v-hidden="showAllWidgets"
    :data-component-name="$options.name"
    :class="{ 'darwin-titlebar': isDarwin, titlebar: !isDarwin }"
    @dblclick.stop="handleDbClick">
    <div class="win-icons" v-if="!isDarwin">
      <Icon class="title-button no-drag"
        @click.native="handleMinimize"
        type="titleBarWinExitFull">
      </Icon>
      <Icon class="title-button no-drag"
        @click.native="handleWinFull"
        v-show="middleButtonStatus === 'maximize'"
        type="titleBarWinFull">
      </Icon>
      <Icon class="title-button no-drag"
        @click.native="handleRestore"
        type="titleBarWinRestore"
        v-show="middleButtonStatus === 'restore'">
      </Icon>
      <Icon class="title-button no-drag"
        @click.native="handleFullscreenExit"
        v-show="middleButtonStatus === 'exit-fullscreen'"
        type="titleBarWinResize">
      </Icon>
      <Icon class="title-button no-drag"
        @click.native="handleClose"
        type="titleBarWinClose">
      </Icon>
    </div>
    <div class="mac-icons" v-if="isDarwin"
         @mouseover="handleMouseOver"
         @mouseout="handleMouseOut">
      <Icon id="close" class="title-button no-drag"
            type="titleBarClose"
            :state="state"
            @click.native="handleClose">
      </Icon>
      <Icon id="minimize" class="title-button no-drag"
            type="titleBarExitFull"
            @click.native="handleMinimize"
            :class="{ disabled: middleButtonStatus === 'exit-fullscreen' }"
            :state="state"
            :isFullScreen="middleButtonStatus">
      </Icon>
      <Icon id="maximize" class="title-button no-drag"
            :type="itemType"
            @click.native="handleMacFull"
            v-show="middleButtonStatus !== 'exit-fullscreen'"
            :state="state"
            :style="{ transform: itemType === this.itemTypeEnum.MAXSCREEN ? 'rotate(45deg)' : ''}">
      </Icon>
      <Icon id="restore" class="title-button no-drag"
            @click.native="handleFullscreenExit"
            v-show="middleButtonStatus === 'exit-fullscreen'"
            type="titleBarRecover"
            :state="state">
      </Icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from './BaseIconContainer.vue';

export default {
  name: 'titlebar',
  data() {
    return {
      isDarwin: process.platform === 'darwin',
      state: 'default',
      itemTypeEnum: {
        FULLSCREEN: 'titleBarFull',
        MAXSCREEN: 'titleBarClose',
      },
      itemType: 'titleBarFull',
      keyAlt: false,
      keyOver: false,
    };
  },
  props: {
    currentView: String,
    showAllWidgets: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Icon,
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 18) {
        this.keyAlt = true;
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 18) {
        this.keyAlt = false;
      }
    });
  },
  watch: {
    keyAlt(val) {
      if (!val || !this.keyOver) {
        this.itemType = this.itemTypeEnum.FULLSCREEN;
      } else if (!this.isFullScreen) {
        this.itemType = this.itemTypeEnum.MAXSCREEN;
      }
    },
    keyOver(val) {
      if (!val || !this.keyAlt) {
        this.itemType = this.itemTypeEnum.FULLSCREEN;
      } else if (!this.isFullScreen) {
        this.itemType = this.itemTypeEnum.MAXSCREEN;
      }
    },
  },
  methods: {
    handleDbClick() {
      if (!this.isMaximized) {
        this.$electron.ipcRenderer.send('callCurrentWindowMethod', 'maximize');
      } else {
        this.$electron.ipcRenderer.send('callCurrentWindowMethod', 'unmaximize');
      }
    },
    handleMouseOver() {
      this.keyOver = true;
      this.state = 'hover';
    },
    handleMouseOut() {
      this.keyOver = false;
      this.state = 'default';
    },
    // Methods to handle window behavior
    handleMinimize() {
      this.$electron.ipcRenderer.send('callCurrentWindowMethod', 'minimize');
    },
    handleWinFull() {
      this.$electron.ipcRenderer.send('callCurrentWindowMethod', 'maximize');
    },
    handleClose() {
      this.$electron.ipcRenderer.send('callCurrentWindowMethod', 'close');
    },
    handleRestore() {
      this.$electron.ipcRenderer.send('callCurrentWindowMethod', 'unmaximize');
    },
    handleFullscreenExit() {
      this.$electron.ipcRenderer.send('callCurrentWindowMethod', 'setFullScreen', [false]);
    },
    // OS-specific methods
    handleMacFull() {
      if (this.itemType === this.itemTypeEnum.FULLSCREEN) {
        this.$electron.ipcRenderer.send('callCurrentWindowMethod', 'setFullScreen', [true]);
      } else if (this.isMaximized) {
        this.$electron.ipcRenderer.send('callCurrentWindowMethod', 'unmaximize');
      } else {
        this.$electron.ipcRenderer.send('callCurrentWindowMethod', 'maximize');
      }
    },
  },
  computed: {
    ...mapGetters([
      'isMaximized',
      'isFullScreen',
    ]),
    middleButtonStatus() {
      return this.isFullScreen ? 'exit-fullscreen' : this.isMaximized ? 'restore' : 'maximize'; // eslint-disable-line no-nested-ternary
    },
  },
};
</script>

<style lang="scss">
.titlebar {
  position: absolute;
  top: 0;
  border-radius: 10px;
  width: 100%;
  -webkit-app-region: drag;
  height: 28px;
  z-index: 6;
  .win-icons {
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    right: 5px;
    .title-button {
      margin: 0px 2px 2px 0px;
      width: 45px;
      height: 28px;
      background-color: rgba(255,255,255,0);
      transition: background-color 200ms;
    }
    .title-button:hover {
      background-color: rgba(221, 221, 221, 0.2);
    }
    .title-button:active {
      background-color: rgba(221, 221, 221, 0.5);
    }
  }
}
.darwin-titlebar {
  position: absolute;
  z-index: 6;
  box-sizing: content-box;
  height: 36px;
  width: 100%;
  .mac-icons {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    flex-wrap: nowrap;
  }
  .title-button {
    width: 12px;
    height: 12px;
    margin-right: 8px;
    background-repeat: no-repeat;
    -webkit-app-region: no-drag;
    border-radius: 100%;
  }
  #minimize {
    &.disabled {
      pointer-events: none;
      opacity: 0.25;
    }
  }
  #maximize {
    &.disabled {
      pointer-events: none;
      opacity: 0.25;
    }
  }
}
</style>
