const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
}
const validateMessages = {
  required: '${label}不能为空',
  string: {
    range: '${label}字符长度在${min}到${max}'
  }
}
const modalProps = {
  cancelText: "取消",
  okText: "确认"
}
export { formLayout, validateMessages, modalProps }
