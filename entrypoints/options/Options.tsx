import "antd/dist/antd.css";
import { Card, Form, Switch } from "antd";
import { Typography } from "antd";
import { isAutoLoadStorage, isFixedExpandedAllStorage } from "@/utils/storage";
import { useAsyncEffect } from "ahooks";

const { Title, Text, Paragraph } = Typography;

type FieldType = {
  isAutoLoad: boolean;
  isFixedExpandedAll: boolean;
};

const Options = () => {
  const [form] = Form.useForm();

  useAsyncEffect(async () => {
    const isAutoLoadValue = await isAutoLoadStorage.getValue();
    const isFixedExpandedAllValue = await isFixedExpandedAllStorage.getValue();
    form.setFieldValue("isAutoLoad", isAutoLoadValue);
    form.setFieldValue("isFixedExpandedAll", isFixedExpandedAllValue);
  }, []);

  return (
    <Card>
      <Title>Awesome TOC Options</Title>
      <Paragraph>
        <blockquote>
          Changes will
          <Text
            style={{
              margin: "0 4px",
            }}
            mark
          >
            automatically
          </Text>
          take effect
        </blockquote>
      </Paragraph>
      <Form
        form={form}
        onValuesChange={(_, allValues: FieldType) => {
          isAutoLoadStorage.setValue(allValues.isAutoLoad);
          isFixedExpandedAllStorage.setValue(allValues.isFixedExpandedAll);
        }}
      >
        <Form.Item<FieldType>
          label="Auto-load Plugin"
          name="isAutoLoad"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item<FieldType>
          label="Fixed Expand All"
          name="isFixedExpandedAll"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Options;
