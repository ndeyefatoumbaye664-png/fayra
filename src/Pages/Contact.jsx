import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiInstagram,
  FiMessageCircle,
  FiSend,
  FiChevronDown,
} from "react-icons/fi";

import { useState } from "react";

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Votre message a bien été envoyé. Merci de contacter FAYRA.");

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const faqs = [
    {
      question: "Comment passer une commande ?",
      answer:
        "Choisissez vos articles, ajoutez-les au panier puis renseignez vos informations de livraison et votre mode de paiement.",
    },
    {
      question: "Quels sont les moyens de paiement ?",
      answer:
        "FAYRA propose actuellement le paiement via Wave ainsi que le paiement à la livraison.",
    },
    {
      question: "Comment fonctionne la livraison ?",
      answer:
        "Après validation de votre commande, notre équipe vous contacte afin de confirmer les informations et organiser la livraison.",
    },
    {
      question: "Puis-je retourner un article ?",
      answer:
        "Pour toute demande concernant un retour ou un échange, contactez notre équipe avant de retourner votre article.",
    },
  ];

  return (
    <main className="bg-white text-gray-900">

      {/* ================= HERO ================= */}

      <section
        className="
          relative
          min-h-[60vh]
          flex
          items-center
          justify-center
          overflow-hidden
          bg-black
          text-white
          px-6
          pt-24
        "
      >

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-black
            via-gray-900
            to-gray-800
          "
        />

        <div
          className="
            relative
            z-10
            text-center
            max-w-4xl
            mx-auto
          "
        >

          {/* GRAND FAYRA */}

          <div
            className="
              text-white
              text-5xl
              md:text-7xl
              font-bold
              tracking-[0.4em]
              mb-8
            "
          >
            FAYRA
          </div>

          {/* TITRE */}

          <h1
            className="
              text-5xl
              md:text-7xl
              font-serif
              font-bold
              mb-6
            "
          >
            Contactez-nous
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              text-gray-300
              text-lg
              md:text-xl
              leading-relaxed
              max-w-3xl
              mx-auto
            "
          >
            Une question concernant une commande, un produit
            ou une livraison ? Notre équipe est là pour vous
            accompagner.
          </p>

        </div>
      </section>


      {/* ================= CONTACT CARDS ================= */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          py-20
        "
      >

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >

          {/* TELEPHONE */}

          <div
            className="
              border
              border-gray-200
              p-8
              text-center
              hover:shadow-xl
              transition
            "
          >

            <div
              className="
                w-14
                h-14
                mx-auto
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                mb-5
              "
            >
              <FiPhone size={22} />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Téléphone
            </h3>

            <p className="text-gray-500">
              Notre équipe est disponible pour vous répondre.
            </p>

            <a
              href="tel:+221000000000"
              className="
                inline-block
                mt-4
                font-semibold
                hover:underline
              "
            >
              +221 76 353 66 78
            </a>

          </div>


          {/* EMAIL */}

          <div
            className="
              border
              border-gray-200
              p-8
              text-center
              hover:shadow-xl
              transition
            "
          >

            <div
              className="
                w-14
                h-14
                mx-auto
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                mb-5
              "
            >
              <FiMail size={22} />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              E-mail
            </h3>

            <p className="text-gray-500">
              Pour toute demande ou question.
            </p>

            <a
              href="mailto:contact@fayra.com"
              className="
                inline-block
                mt-4
                font-semibold
                hover:underline
              "
            >
              contact@fayra.com
            </a>

          </div>


          {/* LIVRAISON */}

          <div
            className="
              border
              border-gray-200
              p-8
              text-center
              hover:shadow-xl
              transition
            "
          >

            <div
              className="
                w-14
                h-14
                mx-auto
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                mb-5
              "
            >
              <FiMapPin size={22} />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Livraison
            </h3>

            <p className="text-gray-500">
              Nous livrons vos commandes au Sénégal.
            </p>

            <span className="inline-block mt-4 font-semibold">
              Sénégal
            </span>

          </div>

        </div>
      </section>


      {/* ================= FORMULAIRE ================= */}

      <section className="bg-gray-50 py-20">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-16
          "
        >

          {/* FORMULAIRE */}

          <div>

            <p
              className="
                text-sm
                uppercase
                tracking-[0.3em]
                text-gray-500
                mb-4
              "
            >
              Parlons-nous
            </p>

            <h2
              className="
                text-4xl
                md:text-5xl
                font-serif
                font-bold
                mb-6
              "
            >
              Envoyez-nous un message
            </h2>

            <p
              className="
                text-gray-500
                leading-relaxed
                mb-10
              "
            >
              Remplissez le formulaire et notre équipe vous
              répondra dans les meilleurs délais.
            </p>


            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-5
                "
              >

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nom complet"
                  required
                  className="
                    w-full
                    bg-white
                    border
                    border-gray-200
                    px-5
                    py-4
                    outline-none
                    focus:border-black
                  "
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Adresse e-mail"
                  required
                  className="
                    w-full
                    bg-white
                    border
                    border-gray-200
                    px-5
                    py-4
                    outline-none
                    focus:border-black
                  "
                />

              </div>


              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Numéro de téléphone"
                className="
                  w-full
                  bg-white
                  border
                  border-gray-200
                  px-5
                  py-4
                  outline-none
                  focus:border-black
                "
              />


              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Sujet"
                required
                className="
                  w-full
                  bg-white
                  border
                  border-gray-200
                  px-5
                  py-4
                  outline-none
                  focus:border-black
                "
              />


              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Votre message..."
                rows="7"
                required
                className="
                  w-full
                  bg-white
                  border
                  border-gray-200
                  px-5
                  py-4
                  outline-none
                  resize-none
                  focus:border-black
                "
              />


              <button
                type="submit"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  bg-black
                  text-white
                  px-8
                  py-4
                  uppercase
                  tracking-widest
                  text-sm
                  hover:bg-gray-800
                  transition
                "
              >
                <FiSend />

                Envoyer le message
              </button>

            </form>

          </div>


          {/* INFORMATIONS */}

          <div
            className="
              bg-black
              text-white
              p-8
              md:p-12
              flex
              flex-col
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  uppercase
                  tracking-[0.3em]
                  text-gray-400
                  mb-5
                "
              >
                FAYRA
              </p>

              <h2
                className="
                  text-4xl
                  font-serif
                  font-bold
                  mb-6
                "
              >
                Nous sommes à votre écoute.
              </h2>

              <p
                className="
                  text-gray-400
                  leading-relaxed
                "
              >
                Votre satisfaction est au cœur de notre
                expérience. N'hésitez pas à nous contacter
                pour toute question concernant nos collections
                ou vos commandes.
              </p>

            </div>


            <div className="mt-12 space-y-7">

              {/* HORAIRES */}

              <div className="flex gap-4 items-start">

                <FiClock
                  size={22}
                  className="mt-1"
                />

                <div>

                  <h4 className="font-semibold">
                    Horaires
                  </h4>

                  <p className="text-gray-400 mt-1">
                    Lundi — Samedi
                  </p>

                  <p className="text-gray-400">
                    09:00 — 19:00
                  </p>

                </div>

              </div>


              {/* LIVRAISON */}

              <div className="flex gap-4 items-start">

                <FiMapPin
                  size={22}
                  className="mt-1"
                />

                <div>

                  <h4 className="font-semibold">
                    Zone de livraison
                  </h4>

                  <p className="text-gray-400 mt-1">
                    Sénégal
                  </p>

                </div>

              </div>

            </div>


            {/* RESEAUX */}

            <div className="mt-12 flex gap-4">

              <a
                href="#"
                className="
                  w-11
                  h-11
                  border
                  border-gray-700
                  flex
                  items-center
                  justify-center
                  hover:bg-white
                  hover:text-black
                  transition
                "
              >
                <FiInstagram />
              </a>


              <a
                href="#"
                className="
                  w-11
                  h-11
                  border
                  border-gray-700
                  flex
                  items-center
                  justify-center
                  hover:bg-white
                  hover:text-black
                  transition
                "
              >
                <FiMessageCircle />
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FAQ ================= */}

      <section
        className="
          max-w-4xl
          mx-auto
          px-6
          py-20
        "
      >

        <div className="text-center mb-12">

          <p
            className="
              text-sm
              uppercase
              tracking-[0.3em]
              text-gray-500
              mb-4
            "
          >
            FAQ
          </p>

          <h2
            className="
              text-4xl
              md:text-5xl
              font-serif
              font-bold
            "
          >
            Questions fréquentes
          </h2>

        </div>


        <div className="divide-y divide-gray-200">

          {faqs.map((faq, index) => (

            <div key={index}>

              <button
                type="button"
                onClick={() =>
                  setOpenFaq(
                    openFaq === index
                      ? null
                      : index
                  )
                }
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  gap-5
                  py-6
                  text-left
                  font-semibold
                "
              >

                <span>
                  {faq.question}
                </span>

                <FiChevronDown
                  className={`
                    shrink-0
                    transition-transform
                    ${
                      openFaq === index
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />

              </button>


              {openFaq === index && (

                <div
                  className="
                    pb-6
                    text-gray-500
                    leading-relaxed
                    pr-8
                  "
                >
                  {faq.answer}
                </div>

              )}

            </div>

          ))}

        </div>

      </section>

    </main>
  );
};

export default Contact;