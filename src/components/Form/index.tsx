import React from 'react';
import { Form, Input } from 'antd';
import { IFormInstance } from '@/types/front';
import { FormProps } from 'antd/lib/form/Form';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { InputProps } from 'antd/lib/input/index';
import { TextAreaProps } from 'antd/lib/input/TextArea';
export interface IInputProps extends InputProps {
  customType?: 'default';
}
export interface ITextareaProps extends TextAreaProps {
  customType: 'textarea';
}

export interface IFieldProps extends FormItemProps {
  key: string;
  input: IInputProps | ITextareaProps;
}
export interface IFormProps extends FormProps {
  fieldData: IFieldProps[];
}
const typeTemplate = '${label}不是有效的${type}';
const validateMessages = {
  default: '${label}格式有误',
  required: '${label}为必填项',
  enum: '${label}必须是其中一项：[${enum}]',
  whitespace: '${label}不能为空',
  date: {
    format: '${label}格式时间无效',
    parse: '${label}不能解析成时间',
    invalid: '${label}是无效时间',
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: '${label}必须是${len}个字符',
    min: '${label}不能小于${min}个字符',
    max: '${label}不能大于${max}个字符',
    range: '${label}长度必须在${min}和${max}之间',
  },
  number: {
    len: '${label}必须等于${len}',
    min: '${label}不能比${min}小',
    max: '${label}不能比${max}大',
    range: '${label}必须在${min}和${max}之间',
  },
  array: {
    len: '${label}的长度必须等于${len}',
    min: '${label}的长度不能小于${min}',
    max: '${label}的长度不能大于${max}',
    range: '${label}的长度在${min}和${max}之间',
  },
  pattern: {
    mismatch: '${label}格式有误：${pattern}',
  },
};

// 生成Input
function createInput(input: IInputProps | ITextareaProps): JSX.Element {
  let CustomInput: any;
  if (input.customType === 'textarea') {
    let { customType, ...otherProps } = input;
    CustomInput = <Input.TextArea {...otherProps} />;
  } else {
    let { customType, ...otherProps } = input;
    CustomInput = <Input {...otherProps} />;
  }
  return CustomInput;
}

const IndexPage = React.forwardRef((props: IFormProps, ref: any) => {
  let { fieldData, ...FormProps } = props;
  return (
    <Form ref={ref} {...FormProps} validateMessages={validateMessages}>
      {fieldData.map(field => {
        let { key, input, ...otherProps } = field;
        return (
          <Form.Item key={key} name={key} {...otherProps}>
            {createInput(input)}
          </Form.Item>
        );
      })}
    </Form>
  );
});
export default IndexPage;
