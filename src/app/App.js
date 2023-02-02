import React, { useState, useEffect } from "react";
import { Image, Button, Card, notification, List, Input } from "antd";
import "./App.css";
import LogoAptools from "../assets/logo.svg";
import { useStoreActions, useStoreState } from "easy-peasy";

function App() {
  const [message, setMessage] = useState("");

  const listMessages = useStoreState((state) => state.socket.listMessages);
  const init = useStoreActions((actions) => actions.socket.init);
  const sendMessageAction = useStoreActions(
    (actions) => actions.socket.sendMessage
  );

  useEffect(() => {
    init();
  }, [init]);

  const sendMessage = async () => {
    try {
      sendMessageAction(message);
      //throw new Error("Ainda não implementado!");
      notification.success({
        message: "Sucesso",
        description: "Mensagem enviada com sucesso!",
      });
    } catch (error) {
      notification.error({
        message: "Erro ao enviar mensagem!",
        description: error.message,
      });
    }
  };

  return (
    <div className="layoutContainer">
      <header className="headerContainer">
        <Image src={LogoAptools} height={50} preview={false} />
      </header>
      <section className="sectionContainer">
        <div className="cardsRow">
          <Card
            style={{
              height: "300px",
              width: "300px",
            }}
          >
            <Input.TextArea
              style={{
                marginBottom: "20px",
              }}
              placeholder={"Digite seu nome! :)"}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <Button
              type="primary"
              style={{
                marginBottom: "20px",
              }}
              onClick={sendMessage}
            >
              Enviar
            </Button>
          </Card>
          <Card
            style={{
              height: "300px",
              width: "300px",
            }}
          >
            <List
              dataSource={listMessages}
              renderItem={(item) => (
                <List.Item key={item.id}>{item.content}</List.Item>
              )}
            />
          </Card>
        </div>
      </section>
      <footer>Feito com 💚 por Steve</footer>
    </div>
  );
}

export default App;
