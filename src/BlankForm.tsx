import { Checkbox, Form, Input } from "antd";

const onFinish = (values: Record<string, string | boolean>) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

const BlankForm = () => (
  <>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, marginTop: 40 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Some field"
        name="someField"
        rules={[{ required: true, message: "Please write something!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Some other field"
        name="someOtherField"
        rules={[{ required: false, message: "Please input your password!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Some checkbox</Checkbox>
      </Form.Item>

      {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  </>
);

export default BlankForm;
