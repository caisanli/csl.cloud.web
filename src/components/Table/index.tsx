import React from 'react';
import Selecting from '@/components/Selecting';
import { Checkbox } from 'antd';
import styles from './index.module.less';
interface IColumn {
  key: string; //
  label: string; // 表头名称
  value: string; // 对应数据的key
  width?: string | number; // 列宽度
  [key: string]: any;
}
interface IProps {
  columns: IColumn[]; // 表格列的配置描述 {key, keyMap}
  dataIndex: string; //
  dataSource: any[]; // 数据数组
  select?: boolean; // 是否有选择框
  selecting?: boolean; // 是否框选
}
interface IState {
  checked: any[];
}
export default class Table extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      checked: [], // 记录选中的数据
    };
    // 绑定this
    this.onClickCheckAllBtn = this.onClickCheckAllBtn.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  // 记录是否全选
  public checkAll = false;
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
      checked,
    });
  }
  onSelect(selected) {
    // console.log(selected)
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
    return (
      <Selecting
        selector={`.${styles.tbody} .${styles.tr}`}
        onSelect={this.onSelect}
      >
        <div className={styles.table}>
          {this.createHead()}
          {this.createBody()}
        </div>
      </Selecting>
    );
  }
}
