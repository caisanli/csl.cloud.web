import React from 'react';
import ReactDOM from 'react-dom';
import { getOffset } from '@/utils';
import styles from './index.module.less';
interface IProps {
  selector: string; // 需要选中的元素
  scrollSelector: string | Element | HTMLElement; // 滚动元素
  onSelect?: (selected: ISelect[]) => void; // 监听
  [key: string]: any;
}
interface ISelect {
  index: number;
  left: number;
  top: number;
  [key: string]: number;
}
interface IState {
  width: number;
  height: number;
  top: number;
  left: number;
  [key: string]: any;
}

export default class Selecting extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    };
    this.onMouseDown = this.onMouseDown.bind(this);
  }
  public elem;
  public scrollElem;
  public elemOffset = {
    left: 0,
    top: 0,
  };
  // 开始X坐标
  public startX = 0;
  // 开始Y坐标
  public startY = 0;
  // 记录上次的left
  public prevLeft = 0;
  // 记录上次的top
  public prevTop = 0;
  // 记录上次的scrollTop
  public prevScrollTop = 0;
  // 记录选中的元素
  public elemList: ISelect[] = [];
  // 是否可以move
  public isDown = false;
  // 解决click和mousedown冲突的定时器
  public timer;
  setEleList() {
    this.elemList = [...this.elem.querySelectorAll(this.props.selector)].map(
      (elem, i) => {
        let offset = getOffset(elem);
        return {
          index: i,
          height: elem.offsetHeight,
          width: elem.offsetWidth,
          ...offset,
        };
      },
    );
  }
  // mousedown
  onMouseDown(e) {
    let { clientY, clientX } = e;
    this.timer = setTimeout(() => {
      let left = clientX - this.elemOffset.left;
      let top = clientY - this.elemOffset.top + this.scrollElem.scrollTop;
      this.isDown = true;
      this.startX = clientX;
      this.startY = clientY;
      this.prevScrollTop = this.scrollElem.scrollTop;
      this.setEleList();
      this.prevLeft = left;
      this.prevTop = top;
      this.setState({ top, left });
    }, 200);
  }
  // mousemove
  mouseMove(e) {
    if (this.isDown) {
      let { clientX, clientY } = e;
      let width = clientX - this.startX;
      let height =
        clientY - this.startY + this.scrollElem.scrollTop - this.prevScrollTop;
      let { top, left } = this.state;
      if (width < 0) {
        left = this.prevLeft + width;
        width = Math.abs(width);
      }
      if (height < 0) {
        top = this.prevTop + height;
        height = Math.abs(height);
      }
      this.setState(
        {
          width,
          height,
          top,
          left,
        },
        this.selecting,
      );
    }
  }
  selecting() {
    let { top, height, left, width } = this.state;
    top += this.elemOffset.top;
    let selectElem: ISelect[] = [];
    this.elemList.forEach(elem => {
      if (
        elem.top + elem.height >= top &&
        elem.top <= top + height &&
        elem.left + elem.width >= left &&
        elem.left <= left + width
      ) {
        selectElem.push(elem);
      }
    });
    if (this.props.onSelect) this.props.onSelect(selectElem);
  }
  // mouseup
  mouseUp() {
    this.isDown = false;
    clearTimeout(this.timer);
    this.setState({
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    });
  }
  componentDidMount() {
    this.elem = ReactDOM.findDOMNode(this) as Element;
    document.addEventListener('mousemove', this.mouseMove.bind(this));
    document.addEventListener('mouseup', this.mouseUp.bind(this));
    setTimeout(() => {
      this.elemOffset = getOffset(this.elem);
    }, 0);
  }
  setScrollSelector() {
    const scrollSelector = this.props.scrollSelector;
    if (!scrollSelector) return;
    this.scrollElem =
      typeof scrollSelector === 'string'
        ? document.querySelector(scrollSelector)
        : scrollSelector;
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
    this.setState = (state, callback) => {
      return;
    };
  }
  componentDidUpdate() {
    if (!this.scrollElem) this.setScrollSelector();
  }
  render() {
    let { width, height, top, left } = this.state;
    let frameStyle = {
      top: top + 'px',
      left: left + 'px',
      width: width + 'px',
      height: height + 'px',
    };
    return (
      <div className={styles.selecting} onMouseDown={this.onMouseDown}>
        <div
          className={[styles.frame, this.isDown ? styles.active : ''].join(' ')}
          style={frameStyle}
        ></div>
        {this.props.children}
      </div>
    );
  }
}
