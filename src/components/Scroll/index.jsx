import React from 'react';
import PropTypes from 'prop-types';
// 样式
import style from './index.module.less';
class Scroll extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      yt: 0, // y轴移动距离
      yh: 0, // y轴高度
      xl: 0, // x轴移动距离
      xw: 0, // x轴宽度
      mr: 0,
    };
    // 绑定函数
    this._events = this._events.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._onResize = this._onResize.bind(this);
    this._getBarWidth = this._getBarWidth.bind(this);
    this._onMouseup = this._onMouseup.bind(this);
    this._setThumbWidthHeight = this._setThumbWidthHeight.bind(this);
    this._onXMouseDown = this._onXMouseDown.bind(this);
    this._onXMouseMove = this._onXMouseMove.bind(this);
    this._onYMouseDown = this._onYMouseDown.bind(this);
    this._onYMouseMove = this._onYMouseMove.bind(this);
    // 绑定变量
    this.$content = React.createRef();
    this.$horizontalThumb = React.createRef();
    this.observer = null;
    this.prevTop = 0;
    // 事件处理时的参数
    this.eventOption = {
      verticalOffset: 0,
      isVerticalDown: false,
      horizontalOffset: 0,
      isHorizontalDown: false,
      startY: 0,
      startX: 0,
      ty: 0,
      tx: 0,
      boxWidth: 0,
      boxHeight: 0,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      // 挂载完成
      this.scrollBarWidth = this._getBarWidth();
      this._events();
      this._setThumbWidthHeight();
      if (typeof this.props.onRef === 'function')
        this.props.onRef(this.$content.current);
      if (this.props.center) this._setScrollCenter();
    }, 0);
  }
  componentWillUnmount() {
    // 销毁之前
    // let { x, y } = this.props;
    document.removeEventListener('mousemove', this._onXMouseMove);
    document.removeEventListener('mousemove', this._onYMouseMove);
    document.removeEventListener('mouseup', this._onMouseup);
    window.removeEventListener('resize', this._onResize);
    this.observer.disconnect();
  }
  _setScrollCenter() {
    // 设置
    let { scrollWidth, scrollHeight } = this.$content.current;
    let { boxWidth, boxHeight } = this.eventOption;
    let top = 0,
      left = 0;
    top = (scrollHeight - boxHeight) / 2;
    left = (scrollWidth - boxWidth) / 2;
    this.$content.current.scrollTop = top;
    this.$content.current.scrollLeft = left;
  }
  appendChild(elem) {
    // 添加
    this.$content.appendChild(elem);
  }
  innerHTML(html) {
    // 设置
    this.$content.innerHTML = html;
  }
  removeChild() {
    // 删除
    let elem = this.$content.firstChild;
    if (elem) this.$content.removeChild(elem);
  }
  _events() {
    // 事件列表
    this.eventOption.boxHeight = this.$content.current.offsetHeight;
    this.eventOption.boxWidth =
      this.$content.current.offsetWidth + this.scrollBarWidth;
    // 初始化配置
    const config = {
      childList: true,
      subtree: true,
    };
    if (window.MutationObserver && !this.observer) {
      this.observer = new MutationObserver(() => {
        this._setThumbWidthHeight();
        console.log('内容更新...');
        if (typeof this.props.onChange === 'function') {
          let { scrollTop, scrollLeft } = this.$content.current;
          this.props.onChange({
            scrollTop,
            scrollLeft,
            isDown: true,
            isBottom: this._isBottom(),
          });
        }
      });
      this.observer.observe(this.$content.current, config);
    }

    window.addEventListener('resize', this._onResize.bind(this));
    // y轴滚动
    this.props.y &&
      document.addEventListener('mousemove', this._onYMouseMove.bind(this));
    // x轴滚动
    this.props.x &&
      document.addEventListener('mousemove', this._onXMouseMove.bind(this));
    // mouseup 事件
    document.addEventListener('mouseup', this._onMouseup.bind(this));
  }
  _onResize() {
    // 监听窗口变化
    if (!this.$content.current) return;
    this.eventOption.boxHeight = this.$content.current.offsetHeight;
    this.eventOption.boxWidth = this.$content.current.offsetWidth;
    this._setThumbWidthHeight();
    this._onScroll();
  }
  // 是否到底
  _isBottom() {
    let { scrollTop, scrollHeight, clientHeight } = this.$content.current;
    return clientHeight >= scrollHeight - scrollTop;
  }
  _onScroll() {
    // 监听滚动事件
    let {
      scrollTop,
      scrollLeft,
      scrollHeight,
      scrollWidth,
    } = this.$content.current;
    let { onScroll } = this.props;
    let heightScale = scrollTop / scrollHeight;
    let widthScale = scrollLeft / scrollWidth;
    let top = heightScale * this.eventOption.boxHeight;
    let left = widthScale * this.eventOption.boxWidth;
    this.eventOption.ty = top;
    this.eventOption.tx = left;
    let is = this.prevTop - scrollTop < 0 ? true : false;
    this.prevTop = scrollTop;
    if (typeof onScroll === 'function') {
      onScroll({
        scrollLeft,
        scrollTop,
        isBottom: this._isBottom(),
        isDown: is,
      });
    }
    this.setState({
      yt: top,
      xl: left,
    });
  }
  _onMouseup(e) {
    if (this.eventOption.isVerticalDown)
      this.eventOption.isVerticalDown = false;
    if (this.eventOption.isHorizontalDown)
      this.eventOption.isHorizontalDown = false;
  }
  _onYMouseDown(e) {
    this.eventOption.verticalOffset = this.eventOption.ty;
    this.eventOption.isVerticalDown = true;
    this.eventOption.startY = e.pageY;
    this.eventOption.boxHeight = this.$content.current.offsetHeight;
  }
  _onYMouseMove(e) {
    if (!this.eventOption.isVerticalDown) return;
    e.preventDefault();
    let endY = e.pageY;
    let top = endY - this.eventOption.startY + this.eventOption.verticalOffset;
    top =
      (top * this.$content.current.scrollHeight) / this.eventOption.boxHeight;
    this.$content.current.scrollTop = top;
  }
  _onXMouseDown(e) {
    this.eventOption.horizontalOffset = this.eventOption.tx;
    this.eventOption.isHorizontalDown = true;
    this.eventOption.startX = e.pageX;
  }
  _onXMouseMove(e) {
    if (!this.eventOption.isHorizontalDown) return;
    e.preventDefault();
    let endX = e.pageX;
    let left =
      endX - this.eventOption.startX + this.eventOption.horizontalOffset;
    let scrollWidth = this.$content.current.scrollWidth;
    left =
      (left * this.$content.current.scrollWidth) / this.eventOption.boxWidth;
    this.$content.current.scrollLeft = left;
    return;
    let scale = left / scrollWidth;
    let x = scale * this.eventOption.boxWidth;
    let xw = this.state.xw;
    x =
      x < 0
        ? 0
        : this.eventOption.boxWidth > xw + x
        ? x
        : this.eventOption.boxWidth - xw;
    this.eventOption.tx = x;
    this.setState({
      xl: x,
    });
  }
  _getOffsetTop(elem) {
    // 获取offset
    let top = elem.offsetTop;
    let parent = elem.offsetParent;
    while (parent) {
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return top;
  }
  _setThumbWidthHeight() {
    // 设置滚动条的高度和宽度
    let heightScale =
      (this.$content.current.clientHeight * 100) /
      this.$content.current.scrollHeight;
    let right = -this.scrollBarWidth;
    if (heightScale >= 100) {
      heightScale = 0;
      right = 0;
    }
    this.setState({ mr: right });
    if (this.props.y) this.setState({ yh: heightScale });
    if (this.props.x) {
      let widthScale =
        (this.$content.current.clientWidth * 100) /
        this.$content.current.scrollWidth;
      if (widthScale >= 100) widthScale = 0;
      this.setState({ xw: widthScale });
    }
  }
  _getBarWidth() {
    // 获取不同浏览器下滚动条的宽度
    let box = document.createElement('div');
    let body = document.body;
    box.style.overflow = 'scroll';
    box.style.position = 'absolute';
    box.style.top = '9999px';
    box.style.height = '20px';
    // box.style.width = '20px'
    body.appendChild(box);
    let children = document.createElement('div');
    children.style.height = '30px';
    box.appendChild(children);
    let width = box.offsetWidth;
    body.removeChild(box);
    return width;
  }
  render() {
    // 生成dom
    let { yt, yh, xl, xw, mr } = this.state;
    let { x, y, visible } = this.props;
    return (
      <div
        className={[style.scrollBox, !visible ? style.hoverThumb : ''].join(
          ' ',
        )}
      >
        {/* 竖向滚动条 */}
        {y && (
          <div className={style.scrollVerticalBarBox}>
            <div className={style.scrollVerticalBar}>
              <div
                onMouseDown={this._onYMouseDown}
                style={{
                  transform: 'translateY(' + yt + 'px)',
                  height: yh + '%',
                }}
                className={style.scrollVerticalThumb}
              ></div>
            </div>
          </div>
        )}
        {/* 横向滚动条 */}
        {x && (
          <div className={style.scrollHorizontalBarBox}>
            <div className={style.scrollHorizontalBar}>
              <div
                onMouseDown={this._onXMouseDown}
                style={{
                  transform: 'translateX(' + xl + 'px)',
                  width: xw + '%',
                }}
                className={style.scrollHorizontalThumb}
              ></div>
            </div>
          </div>
        )}

        {/* 内容 */}
        <div className={style.scrollContent}>
          <div
            className={style.scrollWarp}
            style={{
              overflowX: x ? 'auto' : 'hidden',
              overflowY: y ? 'auto' : 'hidden',
            }}
            onScroll={this._onScroll}
            ref={this.$content}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
Scroll.propTypes = {
  x: PropTypes.bool,
  y: PropTypes.bool,
  center: PropTypes.bool,
  visible: PropTypes.bool,
  onRef: PropTypes.func,
};
Scroll.defaultProps = {
  x: true,
  y: true,
  center: false,
  visible: true,
};
export default Scroll;
