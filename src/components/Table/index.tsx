import React, { ReactNode, ReactNodeArray } from 'react';
import Selecting from '@/components/Selecting';
import { Checkbox, Menu } from 'antd';
import styles from './index.module.less';
interface IColumn {
  key: string; // 唯一值
  label: string; // 表头名称
  value: string; // 对应数据的key
  width?: string | number; // 列宽度
  [key: string]: any;
}
interface IContextMenu {
  value: string;
  name: string;
  icon?: ReactNode
}
interface IProps {
  columns: IColumn[]; // 表格列的配置描述 {key, keyMap}
  dataIndex: string; // 唯一值
  dataSource: any[]; // 数据数组
  scrollSelector?: string | HTMLElement | Element; // 滚动区域元素
  select?: boolean; // 是否有选择框
  selecting?: boolean; // 是否框选
  contextMenu?: IContextMenu[] | ((data: any) => IContextMenu[]) // 右键菜单
}
interface IState {
  checked: any[];
  contextMenu: boolean;
  contextMenuLeft: number;
  contextMenuTop: number;
}
export default class Table extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      checked: [], // 记录选中的数据
      contextMenu: false, //
      contextMenuLeft: 0,
      contextMenuTop: 0
    };
    // 绑定this
    this.onClickCheckAllBtn = this.onClickCheckAllBtn.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
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

  // 点击行
  onClickColumn(data: any) {
    let checked = this.state.checked;
    if (this.isChecked(data)) {
      checked = checked.filter(check => check !== data);
    } else {
      checked.push(data);
    }
    this.setState({
      checked
    });
  }
  // 右键菜单
  onContextMenu(data: any, e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const contextMenu = this.props.contextMenu;
    if(!contextMenu)
      return ;
    const { clientX, clientY } = e;
    e.preventDefault();
    this.contextMenuData = data;
    this.setState({
      contextMenu: true
    }, () => {
      const elem = this.contextMenuRef.current;
      this.setState({
        contextMenuLeft: clientX,
        contextMenuTop: clientY
      })
      console.log(this.contextMenuRef.current)
    })
  }
  // 监听框选
  onSelect(selected: any[]) {
    let checked: any[] = [];
    selected.forEach(sel => {
      checked.push(
        this.props.dataSource[sel.index]
      )
    })
    this.setState({
      checked
    })
  }
  // 生成右键菜单
  createContextMenu() {
    const contextMenus = this.props.contextMenu;
    const { contextMenuLeft, contextMenuTop, contextMenu } = this.state;
    if(!contextMenu)
      return null;
    let child;
    let createMenu = (menu: IContextMenu[]) => (
      <Menu>
          {
            menu.map((item: IContextMenu) => {
              return <Menu.Item key={ item.value }>{ item.name }</Menu.Item>
            })
          }
        </Menu>
    )
    if(contextMenus instanceof Array) {
      child = createMenu(contextMenus);
    } else if(typeof contextMenus === 'function') {
      child = createMenu(contextMenus(this.contextMenuData));
    }
    const style = {
      top: contextMenuTop + 'px',
      left: contextMenuLeft + 'px'
    }
    return (
      <div className={styles.contextMenu} ref={ this.contextMenuRef } style={ style }>
        <div className={ styles.contextMenuContent }>
          { child }
        </div>
      </div>
    )
  }
  // 生成表头
  createHead() {
    const { dataSource } = this.props;
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
          {this.props.columns.map(col => {
            return (
              <div
                key={col.key}
                className={styles.th}
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
    return (
      <div className={styles.tbody}>
        {this.props.dataSource.map(data => {
          return (
            <div
              key={data[this.props.dataIndex]}
              className={styles.tr}
              onClick={() => this.onClickColumn(data)}
              onContextMenu={ (e) => this.onContextMenu(data, e) }
            >
              {this.props.select ? (
                <div className={[styles.td, styles.select].join(' ')}>
                  <Checkbox checked={this.isChecked(data)} />
                </div>
              ) : null}
              {this.props.columns.map(col => {
                return (
                  <div key={col.key} className={styles.td}>
                    {data[col.value]}
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
    return (
      <div className={styles.table}>
        {this.createHead()}
        {this.createBody()}
      </div>
    )
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

  render() {
    if(this.props.selecting) {
      return (
        <Selecting
          scrollSelector={ this.props.scrollSelector || '' }
          selector={`.${styles.tbody} .${styles.tr}`}
          onSelect={this.onSelect}
        >
          { this.createTable() }
          { this.createContextMenu() }
        </Selecting>
      );
    }
    return (
      <>
        { this.createTable() }
        { this.createContextMenu() }
      </>
    )
  }
}
