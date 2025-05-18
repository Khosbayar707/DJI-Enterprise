"use client";
import { motion } from "framer-motion";

export default function DetailSection() {
  const droneDetails = [
    {
      link: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/1cb03af0-d384-4949-946e-69e561805c21.mp4",
      title: "Удаан нислэг, өндөр үр ашиг",
      highlights: [
        {
          stat: "43 минут",
          label: "Тогтмол нислэгийн хугацаа",
        },
        {
          stat: "200 га",
          label: "Нэг нислэгээр зураглал хийх талбай",
        },
      ],
    },
    {
      link: "https://www-cdn.djiits.com/dps/09d051de6f793363e331422963aabf1b.jpg",
      title: "Хурдан цэнэглэлт",
      highlights: [
        {
          stat: "100W цэнэглэгч хаб",
          label: "Өндөр үр ашигтай хурдан цэнэглэлт",
        },
        {
          stat: "88W",
          label: "Нэг батарейг 1.5 цагийн дотор цэнэглэнэ",
        },
      ],
    },
  ];

  const items = [
    {
      text: "O3 дамжуулалт нь хоёр дамжуулах, дөрвөн хүлээн авах дохиог нэгтгэснээр 15 км-ийн маш хол зайн дамжуулалтыг дэмждэг.",
      video:
        "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/92501ffa-a51c-4081-b921-c5c0ce26d7d7.mp4",
      reverse: false,
    },
    {
      text: "DJI-ийн нэмэлт Cellular модуль [5]-ийг ашигласнаар 4G сайжруулсан дамжуулалт болон O3 дамжуулалтын аж үйлдвэрийн хувилбар зэрэг ажиллаж, уул эсвэл барилга дохиог хаасан ч дохионы тогтвортой байдлыг хангаж илүү аюулгүй нислэгийг бий болгодог.",
      video:
        "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/9290fd05-da7b-4c39-af63-98b2cea3887d.mp4",
      reverse: true,
    },
  ];

  return (
    <section className="py-16 px-6 bg-black text-white">
      <h1 className="text-center text-4xl font-bold p-16">
        Сайжруулсан, үр ашигтай баттерей
      </h1>
      <div className="max-w-7xl mx-auto space-y-24">
        {droneDetails.map((item, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                !isEven ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className={isEven ? "" : "order-last md:order-first"}>
                {item.link.endsWith(".mp4") ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="rounded-xl w-full object-cover"
                  >
                    <source src={item.link} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={item.link}
                    alt={item.title}
                    className="rounded-xl w-full object-cover"
                  />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-6">{item.title}</h2>
                {item.highlights.map((h, i) => (
                  <div key={i} className="mb-4">
                    <p className="text-3xl font-bold mb-1">{h.stat}</p>
                    <p className="text-gray-400">{h.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <h1 className="text-center text-4xl font-bold py-16">
        Тогтвортой дохио, тасралтгүй дүрс дамжуулалт
      </h1>

      <div className="bg-black text-white px-6 md:px-20 py-24 space-y-32 max-w-7xl mx-auto">
        {items.map(({ text, video, reverse }, index) => (
          <motion.div
            key={index}
            className={`flex flex-col md:flex-row ${
              reverse ? "md:flex-row-reverse" : ""
            } items-center justify-center gap-12 text-center md:text-left`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="md:w-1/2 text-lg leading-relaxed">{text}</div>
            <div className="md:w-1/2">
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="rounded-xl w-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
