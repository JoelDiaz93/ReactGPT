import { useState } from "react";
import { TextMessageBoxSelect } from "../../components/chat-input-boxes/TextMessageBoxSelect";
import {
  MyMessage,
  GptMessage,
  TypingLoader,
  TextMessageBox,
  TextMessageBoxFile,
  GptOrthographyMessage,
} from "../../components";
import { OrthographyUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlerPost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, message, userScore, errors } = await OrthographyUseCase(text);

    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: "No se pudo realizar la correcion", isGpt: true },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          isGpt: true,
          info: {
            errors: errors,
            message: message,
            userScore: userScore,
          },
        },
      ]);
    }

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
              <GptOrthographyMessage
                key={index}
                // errors={message.info!.errors}
                // message={message.info!.message}
                // userScore={message.info!.userScore}
                {...message.info!}
              />
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
      Text
      <TextMessageBox
        onSendMessage={handlerPost}
        placeholder="Escribe aqui lo que deseeas"
        disableCorrections
      />
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
