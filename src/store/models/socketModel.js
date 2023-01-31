import { action, thunk } from "easy-peasy";
import { notification } from "antd";

import { over } from "stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export const socketModel = {
  listMessages: [],

  init: thunk(async (actions, _payload) => {
    let sock = new SockJS("http://localhost:8080/ws-socket-register");
    stompClient = over(sock);
    stompClient.connect(
      {},
      () => {
        console.log("Conected!");
        stompClient.subscribe("/topic/greetings", (msg) => {
          const text = JSON.parse(msg.body).content;
          actions.setListMessages([text]);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }),

  sendMessage: thunk((_actions, payload) => {
    stompClient.send("/app/hello", {}, JSON.stringify({ name: payload }));
  }),

  setListMessages: action((state, payload) => {
    state.listMessages = [...state.listMessages, ...payload];
  }),
};
