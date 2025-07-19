<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(
          <div class="icon-wrapper">
            <i class={[icon, 'sub-el-icon']} />
          </div>
        )
      } else {
        vnodes.push(
          <div class="icon-wrapper">
            <svg-icon icon-class={icon} />
          </div>
        )
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 5px;
  position: relative;
}

/* 使用绝对定位实现图标完美居中 */
.icon-wrapper .svg-icon,
.icon-wrapper .sub-el-icon {
  position: absolute;
  top: 6px;
  left: -8px;
  width: 18px !important;
  height: 18px !important;
  /* margin: 0 !important; */
  line-height: 1 !important;
}

/* 专门针对home图标的样式 - 让它变大并重新定位 */
.icon-wrapper .svg-icon-home-large {
  width: 30px !important;
  height: 30px !important;
  top: 0px;
  left: -15px;
 
}
</style>
