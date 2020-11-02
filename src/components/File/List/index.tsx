import React from 'react';
import IconList from './icon';
import TableList from './table';
interface IProps {
  style: 'table' | 'icon';
  files: [],
  folders: []
}

export default function(props: IProps) {
  const { style, ...otherProps } = props;
  const List = props.style === 'icon' ? IconList : TableList;
  return <List {...otherProps} />
}
