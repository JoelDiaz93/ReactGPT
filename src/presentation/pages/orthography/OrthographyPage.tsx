import {
  MyMessage,
  GptMessage,
  TypingLoader,
  TextMessageBox,
} from "../../components";

export const OrthographyPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Soy tu IA profesional, te ayudo con las correcciones" />

          <MyMessage text="Hola, mundo!" />

          <TypingLoader className="fade-in" />
        </div>
      </div>

      <TextMessageBox
        onSendMessage={(message) => console.log(message)}
        placeholder="Escribe aqui lo que deseeas"
        disableCorrections
      />
    </div>
  );
};
