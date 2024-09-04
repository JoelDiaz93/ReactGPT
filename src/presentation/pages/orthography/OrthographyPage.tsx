import { useState } from "react";
import { TextMessageBoxSelect } from "../../components/chat-input-boxes/TextMessageBoxSelect";
import {
  MyMessage,
  GptMessage,
  TypingLoader,
  TextMessageBox,
  TextMessageBoxFile,
} from "../../components";

interface Message {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlerPost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    //TODO UseCase

    setIsLoading(false);

    //TODO anadir el mensaje de isGpt
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Soy tu IA profesional, te ayudo con las correcciones" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader className="fade-in" />
            </div>
          )}
        </div>
      </div>

      {/* <TextMessageBox
        onSendMessage={handlerPost}
        placeholder="Escribe aqui lo que deseeas"
        disableCorrections
      /> */}
      {/* <TextMessageBoxFile
        onSendMessage={handlerPost}
        placeholder="Escribe aqui lo que deseeas"
      /> */}
      {/* <TextMessageBoxSelect
        onSendMessage={console.log}
        options={[
          { id: "1", text: "Hola mundo" },
          { id: "2", text: "Bienvenidos" },
        ]}
      /> */}
    </div>
  );
};
