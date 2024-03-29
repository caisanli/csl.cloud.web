import React from 'react';
import { Form, Input, InputNumber, Checkbox } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { InputProps } from 'antd/lib/input/index';
import { TextAreaProps } from 'antd/lib/input/TextArea';
import { InputNumberProps } from 'antd/lib/input-number/index';
import { PasswordProps } from 'antd/lib/input/Password';
import Button, { ButtonProps } from 'antd/lib/button/index';
import { CheckboxProps, CheckboxGroupProps } from 'antd/lib/checkbox/index';
// import { InputNumber } from '@/utils/_ant';
export interface IDefaultProps extends InputProps {
  customType?: 'default';
}

export interface ITextareaProps extends TextAreaProps {
  customType: 'textarea';
}

export interface INumberProps extends  InputNumberProps {
  customType: 'number';
}

export interface IPasswordProps extends PasswordProps {
  customType: 'password'
}

export interface IButtonProps extends ButtonProps {
  label: string,
  customType: 'button'
}

export interface ICheckbox extends CheckboxProps {
  customType: 'checkbox',
  label: string
}

export interface ICheckboxGroup extends CheckboxGroupProps {
  customType: 'checkboxGroup'
}

type IInputProps = IDefaultProps | ITextareaProps | INumberProps | IPasswordProps | IButtonProps | ICheckboxGroup | ICheckbox;

export interface IFieldProps extends FormItemProps {
  key: string;
  input: IInputProps | (() => JSX.Element);
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
function createInput(input: IInputProps): JSX.Element {
  let CustomInput: any;
  if (input.customType === 'textarea') {
    let { customType, ...otherProps } = input;
    CustomInput = <Input.TextArea {...otherProps} />;
  } else if(input.customType === 'number') {
    let { customType, ...otherProps } = input;
    CustomInput = <InputNumber {...otherProps} />;
  } else if(input.customType === 'password') {
    let { customType, ...otherProps } = input;
    CustomInput = <Input.Password {...otherProps} />;
  } else if(input.customType === 'button') {
    let { customType, label, ...otherProps } = input;
  CustomInput = <Button {...otherProps}>{ label }</Button> ;
  } else if(input.customType === 'checkbox') {
    let { customType, label, ...otherProps } = input;
  CustomInput = (<Checkbox {...otherProps}>{ label }</Checkbox>);
  }else if(input.customType === 'checkboxGroup') {
    let { customType, ...otherProps } = input;
    CustomInput = <Checkbox.Group {...otherProps} />;
  } else {
    let { customType, ...otherProps } = input;
    CustomInput = <Input {...otherProps} />;
  }
  return CustomInput;
}

const IndexPage = React.forwardRef((props: IFormProps, ref: any) => {
  let { fieldData, ...FormProps } = props;
  return (
    <Form ref={ref} labelCol={{ span: 4 }} {...FormProps} validateMessages={validateMessages}>
      {fieldData.map(field => {
        let { key, input, ...otherProps } = field;
        let Input: JSX.Element;
        if(typeof input === 'function') {
          Input = input();
        } else {
          Input = createInput(input);
        }
        return (
          <Form.Item key={key} name={key} {...otherProps}>
            { Input }
          </Form.Item>
        );
      })}
    </Form>
  );
});
export default IndexPage;
