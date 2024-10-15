import ChatBot from "react-chatbotify";

export default function App() {
  const helpOptions = [
    "Apa itu proxy server?",
    "Apa itu caching proxy?",
    "Apa itu cache hit dan cache miss?",
    "Apa itu bandwidth?",
    "Apa itu aksi cache?",
  ];
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
      message: "Maaf, saya tidak mengerti pesan Anda! Silahkan pilih opsi berikut!",
      options: helpOptions,
      path: "process_options"
    },
    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        let responseMessage = "";
        switch (params.userInput) {
          case "Apa itu proxy server?":
            responseMessage = `<p><strong>Proxy server</strong> adalah perantara antara pengguna dan internet. Proxy server menerima permintaan dari klien (seperti browser), mengirimkan permintaan tersebut ke server tujuan, dan mengembalikan respons ke klien. Proxy server digunakan untuk meningkatkan keamanan, menyaring konten, dan meningkatkan kecepatan akses dengan menyimpan salinan konten yang sering diminta.</p>`;
            break;
          case "Apa itu caching proxy?":
            responseMessage = `<p><strong>Caching</strong> adalah proses menyimpan salinan data yang sering diakses dalam memori atau penyimpanan sementara. Pada proxy server, caching mengurangi waktu akses dan beban bandwidth dengan menyimpan konten seperti gambar, video, dan halaman web. Ketika pengguna meminta konten yang sudah ada di cache, proxy server dapat menyajikannya lebih cepat daripada harus mengunduhnya lagi dari sumbernya.</p>`;
            break;
          case "Apa itu cache hit dan cache miss?":
            responseMessage = `<p><strong>Cache hit</strong> terjadi ketika permintaan pengguna dapat dipenuhi dengan konten yang sudah ada di cache, sehingga mempercepat waktu respon. Sebaliknya, <strong>cache miss</strong> terjadi ketika konten yang diminta tidak ada di cache, sehingga server proxy harus mengambilnya dari sumber asli, yang memerlukan waktu lebih lama dan menggunakan bandwidth lebih banyak.</p>`;
            break;
          case "Apa itu bandwidth?":
            responseMessage = `<p><strong>Bandwidth</strong> adalah kapasitas maksimum data yang dapat ditransfer melalui jaringan dalam periode waktu tertentu, biasanya diukur dalam megabit per detik (Mbps). Bandwidth yang lebih tinggi memungkinkan lebih banyak data untuk ditransfer sekaligus, yang dapat meningkatkan kecepatan akses dan kinerja proxy server. Namun, jika bandwidth terbatas, maka transfer data menjadi lambat, mempengaruhi waktu respon dan pengalaman pengguna.</p>`;
            break;
          case "Apa itu aksi cache?":
            responseMessage = `<p><strong>Aksi cache</strong> adalah tindakan yang dilakukan oleh server proxy untuk mengelola data yang disimpan dalam cache. </p><ul><li><strong>CREATE:</strong> Menyimpan konten baru ke dalam cache saat permintaan pertama kali diterima.</li><li><strong>RELEASE:</strong> Menghapus konten dari cache, biasanya karena sudah tidak diperlukan atau untuk membebaskan ruang.</li><li><strong>SWAPOUT:</strong> Memindahkan konten dari cache ke penyimpanan yang lebih lambat atau tidak aktif untuk memberikan ruang bagi konten baru.</li><li><strong>SWAPIN:</strong> Mengambil konten dari penyimpanan yang lebih lambat dan memasukkannya kembali ke dalam cache untuk digunakan kembali.</li></ul><p>Pemantauan aksi-aksi ini penting untuk mengoptimalkan penggunaan cache dan memastikan kinerja yang efisien.</p>`;
            break;
          default:
            return "unknown_input";
        }
        await params.injectMessage(responseMessage);
        return "repeat";
      },
    },
    repeat: {
      transition: { duration: 2000 },
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
          header: { title: "Riku" },
          botBubble: { dangerouslySetInnerHtml: true }
        }}
        flow={flow}
      />
    </div>
  );
}
