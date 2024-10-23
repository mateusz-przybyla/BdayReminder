import axios from "axios";

export async function getList() {
  //return fetch("http://localhost:3333/list").then((data) => data.json());

  const response = await axios.get("http://localhost:8080/api/data");
  return response.data.birthdays;
}

export async function setItem(item) {
  const response = await axios.post("http://localhost:8080/api/data", item);
  console.log(response.data);
}
