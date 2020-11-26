import React from 'react';
import { Form } from 'antd';
import { IFormInstance } from '@/types/front';
import { FormProps } from 'antd/lib/form/Form';
import { FormItemProps } from 'antd/lib/form/FormItem';
interface IProps extends FormProps {
  fieldData: FormItemProps[]
}

export default function(props: IProps) {
  let { fieldData, ...FormProps } = props;
  return (
    <Form {...FormProps} >
      {
        fieldData.map(field => (
          <Form.Item></Form.Item>
        ))
      }
    </Form>
  )
}
