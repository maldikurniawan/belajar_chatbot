import ChatBot from "react-chatbotify";

export default function App() {
  const helpOptions = ["Panduan Cepat", "Dokumentasi API", "Contoh", "Github", "Discord"];
  const flow = {
    start: {
      message: "Halo, saya ChatBot Riku! Selamat datang di FAQ!",
      transition: { duration: 1000 },
      path: "show_options"
    },
    show_options: {
      message: "Berikut adalah beberapa hal yang mungkin dapat membantu Anda!",
      options: helpOptions,
      path: "process_options"
    },
    prompt_again: {
      message: "Apakah Anda memerlukan bantuan lainnya?",
      options: helpOptions,
      path: "process_options"
    },
    unknown_input: {
      message: "Maaf, saya tidak mengerti pesan Anda!",
      options: helpOptions,
      path: "process_options"
    },
    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        let link = "";
        switch (params.userInput) {
          case "Panduan Cepat":
            link = "https://react-chatbotify.com/docs/introduction/quickstart/";
            break;
          case "Dokumentasi API":
            link = "https://react-chatbotify.com/docs/api/settings";
            break;
          case "Contoh":
            link = "https://react-chatbotify.com/docs/examples/basic_form";
            break;
          case "Github":
            link = "https://github.com/tjtanjin/react-chatbotify/";
            break;
          case "Discord":
            link = "https://discord.gg/6R4DK4G5Zh";
            break;
          default:
            return "unknown_input";
        }
        await params.injectMessage("Tunggu sebentar! Saya akan mengarahkan Anda ke sana!");
        setTimeout(() => {
          window.open(link);
        }, 1000)
        return "repeat"
      },
    },
    repeat: {
      transition: { duration: 3000 },
      path: "prompt_again"
    },
  }
  return (
    <div>
      Halo Dunia
      <ChatBot
        settings={{
          tooltip: { text: false, mode: false },
          general: { showFooter: false },
          notification: { showCount: false },
          header: {title: "Riku"}
        }}
        flow={flow}
      />
    </div>
  );
};