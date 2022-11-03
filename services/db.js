import Ps from "pg";

const client = new Ps.Client({
  user: "saad",
  host: "localhost",
  database: "projectia",
  password: "saju@123",
  port: 5432,
});

export default client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
