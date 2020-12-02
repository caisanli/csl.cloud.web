import React, { ReactElement } from 'react';
import { IContextMenu } from '@/types';
import Selecting from '@/components/Selecting';
import { Checkbox } from 'antd';
import styles from './index.module.less';
export interface IColumn {
  key: string; // 唯一值
  label?: string; // 表头名称
  value?: string; // 对应数据的key
  width?: string | number; // 列宽度
  render?: (data: any) => ReactElement;
  ellipsis?: boolean; // 是否显示省略号
  [key: string]: any;
}

interface IProps {
  columns?: IColumn[]; // 表格列的配置描述 {key, keyMap}
  dataIndex: string; // 唯一值
  dataSource: any[]; // 数据数组
  scrollSelector?: string | HTMLElement | Element; // 滚动区域元素
  select?: boolean; // 是否有选择框
  selecting?: boolean; // 是否框选
  contextMenu?: IContextMenu[] | ((data: any) => IContextMenu[]); // 右键菜单
}
interface IState {
  checked: any[];
  contextMenu: boolean;
  contextMenuLeft: number;
  contextMenuTop: number;
}
const defaultProps = {
  columns: [],
};
export default class Table extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      checked: [], // 记录选中的数据
      contextMenu: false, //
      contextMenuLeft: 0,
      contextMenuTop: 0,
    };
    // 绑定this
    this.onClickCheckAllBtn = this.onClickCheckAllBtn.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  static defaultProps = defaultProps;
  // 记录是否全选
  public checkAll = false;
  // 右键菜单时的data
  public contextMenuData = {};
  // 右键菜单元素
  public contextMenuRef = React.createRef<HTMLDivElement>();
  // 点击全选按钮
  onClickCheckAllBtn() {
    let checked = this.state.checked;
    if (this.checkAll) {
      checked = [];
    } else {
      checked = this.props.dataSource;
    }
    this.checkAll = !this.checkAll;
    this.setState({
      checked,
    });
  }
  // 监听框选
  onSelect(selected: any[]) {
    let checked: any[] = [];
    selected.forEach(sel => {
      checked.push(this.props.dataSource[sel.index]);
    });
    this.setState({
      checked,
    });
  }
  // 监听点击body
  onClickBody() {
    this.setState({
      contextMenu: false,
    });
  }
  // 点击行
  onClickColumn(data: any) {
    let checked = this.state.checked;
    if (this.isChecked(data)) {
      checked = checked.filter(check => check !== data);
    } else {
      checked.push(data);
    }
    this.setState({
      checked,
    });
  }
  // 右键菜单
  onContextMenu(data: any, e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const contextMenu = this.props.contextMenu;
    if (!contextMenu) return;
    const { clientX, clientY } = e;
    e.preventDefault();
    this.contextMenuData = data;
    this.setState(
      {
        contextMenu: true,
      },
      () => {
        const elem = this.contextMenuRef.current;
        let bodyHeight = document.body.clientHeight;
        let bodyWidth = document.body.clientWidth;
        let elemWidth = elem?.clientWidth || 0;
        let elemHeight = elem?.clientHeight || 0;
        let left =
          clientX + elemWidth > bodyWidth ? bodyWidth - elemWidth - 5 : clientX;
        let top =
          clientY + elemHeight > bodyHeight
            ? bodyHeight - elemHeight - 5
            : clientY;
        this.setState({
          contextMenuLeft: left,
          contextMenuTop: top,
        });
      },
    );
  }
  // 点击右键菜单
  onClickContextMenu(item: IContextMenu) {
    if (typeof item.onClick === 'function')
      item.onClick(this.contextMenuData);
  }
  // 生成右键菜单
  createContextMenu() {
    const contextMenus = this.props.contextMenu;
    const { contextMenuLeft, contextMenuTop, contextMenu } = this.state;
    if (!contextMenu) return null;
    let child;
    let createMenu = (menu: IContextMenu[]) => (
      <ul>
        {menu.map((item: IContextMenu) => {
          return (
            <li onClick={() => this.onClickContextMenu(item)} key={item.value}>
              <span className={styles.menuIcon}>{item.icon}</span>
              {item.name}
            </li>
          );
        })}
      </ul>
    );
    if (contextMenus instanceof Array) {
      child = createMenu(contextMenus);
    } else if (typeof contextMenus === 'function') {
      child = createMenu(contextMenus(this.contextMenuData));
    }
    const style = {
      top: contextMenuTop + 'px',
      left: contextMenuLeft + 'px',
    };
    return (
      <div
        className={styles.contextMenu}
        ref={this.contextMenuRef}
        style={style}
      >
        <div className={styles.contextMenuContent}>{child}</div>
      </div>
    );
  }
  // 生成表头
  createHead() {
    const { dataSource, columns } = this.props;
    const { checked } = this.state;
    return (
      <div className={styles.thead}>
        <div className={styles.tr}>
          {this.props.select ? (
            <div className={[styles.th, styles.select].join(' ')}>
              <Checkbox
                onClick={this.onClickCheckAllBtn}
                indeterminate={
                  !!checked.length && checked.length < dataSource.length
                }
                checked={dataSource.length === checked.length}
              />
            </div>
          ) : null}
          {columns &&
            columns.map(col => {
              return (
                <div
                  key={col.key}
                  className={[
                    styles.th,
                    col.ellipsis ? styles.ellipsis : '',
                  ].join(' ')}
                  style={this.columnWidth(col)}
                >
                  {col.label}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
  // 生成body
  createBody() {
    const { columns } = this.props;
    return (
      <div className={styles.tbody}>
        {this.props.dataSource.map(data => {
          return (
            <div
              key={data[this.props.dataIndex]}
              className={styles.tr}
              onClick={() => this.onClickColumn(data)}
              onContextMenu={e => this.onContextMenu(data, e)}
            >
              {this.props.select ? (
                <div className={[styles.td, styles.select].join(' ')}>
                  <Checkbox checked={this.isChecked(data)} />
                </div>
              ) : null}
              {columns &&
                columns.map(col => {
                  return (
                    <div
                      key={col.key}
                      className={[
                        styles.td,
                        col.ellipsis ? styles.ellipsis : '',
                      ].join(' ')}
                    >
                      {col.render ? col.render(data) : data[col.value || '0']}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    );
  }
  // 生成表格
  createTable() {
    const { columns } = this.props;
    if (!columns) return null;
    const fixed = !!columns.find(col => col.ellipsis);
    return (
      <div className={[styles.table, fixed ? styles.tableFixed : ''].join(' ')}>
        {this.createHead()}
        {this.createBody()}
      </div>
    );
  }
  // 是否选中
  isChecked(data: any): boolean {
    return !!this.state.checked.find(check => data === check);
  }
  // 列宽度
  columnWidth(col: IColumn): { width: string } | undefined {
    let defaultWidth = col.width;
    let width = '';
    if (!defaultWidth) return undefined;
    if (typeof defaultWidth === 'number') width = defaultWidth + 'px';
    else width = defaultWidth;
    return { width };
  }
  componentDidMount() {
    document.addEventListener('click', this.onClickBody.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.onClickBody.bind(this));
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    if (this.props.selecting) {
      return (
        <Selecting
          scrollSelector={this.props.scrollSelector || ''}
          selector={`.${styles.tbody} .${styles.tr}`}
          onSelect={this.onSelect}
        >
          {this.createTable()}
          {this.createContextMenu()}
        </Selecting>
      );
    }
    return (
      <>
        {this.createTable()}
        {this.createContextMenu()}
      </>
    );
  }
}
