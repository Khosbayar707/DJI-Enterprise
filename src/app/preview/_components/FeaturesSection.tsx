import { motion } from "framer-motion";

const features = [
  {
    title: "Жижигхэн, авч явахад хялбар",
    description: "Эвхэгддэг тул хадгалахад хялбар",
  },
  {
    title: "Олон спектрийн камер",
    description: "4 × 5MP Ногоон / Улаан / Улаан ирмэг / Хэт улаан туяа (NIR)",
  },
  {
    title: "RGB камер",
    description: "20 MP 4/3 CMOS, механик хаалттай",
  },
  {
    title: "Аюулгүй, тогтвортой нислэг",
    description: "Бүх чиглэлд саадыг мэдрэх систем, 15 км дамжуулах зай",
  },
  {
    title: "Өндөр нарийвчлалтай байршил тогтоолт",
    description:
      "Сантиметрийн нарийвчлалтай RTK, микросекунд түвшний цагийн синхрончлол",
  },
  {
    title: "Үр дүнтэй агаарын зураглал",
    description: "Нэг нислэгээр 200 га хүртэл талбайг хамарна",
  },
];

const drone = {
  name: "DJI MAVIC 3M",
  desc: "Тиймээс Mavic 3 Multispectral нь хоёр төрлийн хараатай. Энэ нь RGB камер болон multispectral (олон спектрийн) камерыг хослуулж, ургамлын өсөлтийг бүрэн тодорхой харах, шинжлэх боломжийг олгодог. Хөдөө аж ахуйн үйлдвэрлэлийн менежмент нь нарийвчлал болон өгөгдөл шаарддаг бөгөөд Mavic 3M хоёуланг нь хангаж өгдөг.",
  imageUrl:
    "https://www-cdn.djiits.com/dps/45196aac8f231fe2ae211c76a473212b.jpg",
  videoUrl1:
    "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/c29db051-38af-4ffc-b264-62e7f46ddb12.mp4",
  videoUrl2:
    "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/1cb03af0-d384-4949-946e-69e561805c21.mp4",
};

export default function FeaturesSection() {
  return (
    <section className="bg-black text-white">
      <div className="relative">
        <p className="text-2xl font-semibold text-white bg-black p-20 flex items-center justify-center text-center">
          {drone.desc}
        </p>
        <img
          className="w-full h-auto"
          src={drone.imageUrl}
          alt="DJI Mavic 3M"
        />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <h2 className="p-5 text-3xl font-bold text-center mb-10">Давуу талууд</h2>
      <div className="grid md:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="p-6 rounded-xl shadow-md text-center bg-black transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              {feature.title}
            </h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative h-[750px] bg-black flex items-center justify-center overflow-hidden mt-14">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute h-full w-full object-cover opacity-60"
        >
          <source src={drone.videoUrl1} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>

        <div className="relative text-center text-white px-6 max-w-3xl z-10">
          <p className="text-blue-400 text-sm uppercase tracking-widest mb-2">
            RTK модуль
          </p>
          <h3 className="text-4xl font-bold mb-6 drop-shadow-md">
            Бүх пикселийг нарийвчлалтайгаар буулгана
          </h3>
          <p className="text-lg text-gray-200 drop-shadow-md py-16">
            Mavic 3M нь RTK модулийн тусламжтайгаар сантиметрийн нарийвчлалтай
            байршил тогтоолт хийж, микросекунд түвшний цагийн синхрончлолыг
            хангадаг. Ингэснээр танд газрын хяналтын цэгүүд шаардлагагүйгээр
            өндөр нарийвчлалтай агаарын судалгаа хийх боломжийг олгоно.
          </p>
        </div>
      </div>
    </section>
  );
}
