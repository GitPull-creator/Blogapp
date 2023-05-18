import { Alert } from "antd";

function ErrorMessage() {
  const text = "У нас вознкили проблемы;(";

  return <Alert message={text} type="error" style={{ marginBottom: "10px" }} />;
}

export default ErrorMessage;
