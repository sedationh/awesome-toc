import "antd/dist/antd.css";
import { Card, Form, Switch } from "antd";
import { Typography } from "antd";
import { isAutoLoad } from "@/utils/storage";
import { useAsyncEffect } from "ahooks";

const { Title, Text, Paragraph } = Typography;

type FieldType = {
  isAutoLoad: boolean;
};

const Options = () => {
  const [form] = Form.useForm();

  useAsyncEffect(async () => {
    const isAutoLoadValue = await isAutoLoad.getValue();
    form.setFieldValue("isAutoLoad", isAutoLoadValue);
  }, []);

  return (
    <Card>
      <Title>Awesome TOC Options</Title>
      <Paragraph>
        <blockquote>
          Changes will
          <Text mark>automatically</Text>
          take effect
        </blockquote>
      </Paragraph>
      <Form
        form={form}
        onValuesChange={(_, allValues: FieldType) => {
          isAutoLoad.setValue(allValues.isAutoLoad);
        }}
      >
        <Form.Item<FieldType>
          label="Auto-load Plugin"
          name="isAutoLoad"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Options;
