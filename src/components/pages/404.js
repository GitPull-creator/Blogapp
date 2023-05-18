import { Link } from "react-router-dom";

function Page404() {
  const style = {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "180px",
  };

  return (
    <div style={style}>
      <p>404</p>
      <p style={{ fontWeight: "bold", fontSize: "24px" }}>Страницы не существует</p>
      <Link
        style={{ display: "block", textAlign: "center", fontWeight: "bold", fontSize: "24px", marginTop: "30px" }}
        to="/"
      >
        Вернуться на главную страницу
      </Link>
    </div>
  );
}

export default Page404;
