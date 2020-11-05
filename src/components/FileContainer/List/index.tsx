import React, { useState } from 'react';
import Scroll from '@/components/Scroll';
import IconList from './icon';
import TableList from './table';
import styles from './index.module.less';
interface IProps {
  style: 'table' | 'icon';
  data: any[];
}

export default function(props: IProps) {
  const { style, ...otherProps } = props;
  const List = props.style === 'icon' ? IconList : TableList;
  const [elem, setElem] = useState();
  function onRef(elem) {
    setElem(elem)
  }
  return (
    <div className={ styles.list } id="list">
      <Scroll onRef={ onRef }>
        <List {...otherProps} scrollSelector={ elem } />
      </Scroll>
    </div>
    );
}
