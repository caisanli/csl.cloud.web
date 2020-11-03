import React, { ReactNode, ReactElement } from 'react';
import styles from "./index.module.less";

interface IColumn {
  key: string; //
  label: string; // 表头名称
  value: string; // 对应数据的key
  [key: string]: any;
}
interface IProps {
    columns: IColumn[], // 表格列的配置描述 {key, keyMap}
    dataSource: any[], // 数据数组
    select?: boolean, // 是否有选择框
    selecting?: boolean // 是否框选
}
interface IState {

}
export default class Table extends React.Component<IProps, IState> {

    // 生成表头
    createHead() {
      return (
        <div className={ styles.head }>
          <div className={ styles.tr }>
            {
              this.props.columns.map(col => {
                return (
                  <div key={ col.key } className={ styles.th }>
                    { col.label }
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
    // 生成body
    createBody() {
        return (
          <div className={ styles.body }>
            {
              this.props.dataSource.map(data => {
                return (
                  <div key={ data.key } className={ styles.tr }>
                      {
                        this.props.columns.map(col => {
                          return (
                            <div key={ col.key } className={ styles.td }>
                              { data[col.value] }
                            </div>
                          )
                        })
                      }
                  </div>
                )
              })
            }
          </div>
        )
    }
    componentDidMount() {

    }
    render() {
      return (
        <div className={styles.table}>
          { this.createHead() }
          { this.createBody() }
        </div>
      )
    }
}
