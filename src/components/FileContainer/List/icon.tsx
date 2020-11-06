import React from 'react';
import styles from './index.module.less';
import { ITableIconProps } from '@/types';

export default function(props: ITableIconProps) {
  return (
    <div className={ styles.icons }>
      {
        props.dataSource.map(item => {
          return (
            <div key={ item.id } className={ styles.iconItem }>
              <div className={ styles.icon }></div>
              <div className={ styles.name }>
                { item.name }
              </div>
            </div>
          )
        })
      }
    </div>
  );
}
