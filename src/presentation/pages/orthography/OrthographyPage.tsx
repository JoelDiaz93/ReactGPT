import { MyMessage, GptMessage } from "../../components";

export const OrthographyPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Soy tu IA profesional, te ayudo con las correcciones" />

          <MyMessage text="Hola, mundo!" />
        </div>
      </div>
    </div>
  );
};
