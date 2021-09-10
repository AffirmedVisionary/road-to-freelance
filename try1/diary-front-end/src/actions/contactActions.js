import fetch from "isomorphic-fetch";
import { API } from "../config/config";

export async function contactUs(emailMessage) {
  await fetch(`${API}/send`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailMessage),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
};
