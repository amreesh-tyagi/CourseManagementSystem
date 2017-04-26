import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Cascader } from 'antd';
import styles from './UsersNew.css';

const FormItem = Form.Item;

class UsersNew extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'users/add',
          payload: {
            ...values,
            identity: undefined,
            type: values.identity[0],
            grade: values.identity[0] === 'administrator' ? values.identity[1] : undefined,
          },
        });
      }
    });
  };
  handleSelectChange = (value) => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const options = [{
      value: 'student',
      label: '学生',
    }, {
      value: 'teacher',
      label: '教师',
    }, {
      value: 'administrator',
      label: '管理员',
      children: [{
        value: 0,
        label: '普通管理员',
      }, {
        value: 1,
        label: '高级管理员',
      }],
    }];

    return (
      <div className={styles.normal}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="用户昵称"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            {getFieldDecorator('nickName', {
              rules: [{ required: true, message: '请输入用户昵称!' }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            label="用户头像"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            {getFieldDecorator('avatarUrl', {
              initialValue: 'http://om4lyr5bv.bkt.clouddn.com/user.svg',
              rules: [{ required: true, message: '请输入用户头像!' }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            label="用户类型"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            {getFieldDecorator('identity', {
              // initialValue: 'student',
              rules: [{ required: true, message: '请输入用户头像!' }],
            })(
              <Cascader options={options} />,
            )}
          </FormItem>
          <FormItem
            wrapperCol={{ span: 8, offset: 4 }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Form.create()(UsersNew));
