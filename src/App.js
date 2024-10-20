import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";

const App = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const botToken = "Bot tokenini qoying";
    const chatId = "chat idsini qo'ying";
    const message = `Sizda yangi xabar bor:\nIsm: ${data.name}\nNumber ${data.number}\nEmail: ${data.email}\nQo'shimcha Ma'lumot: ${data.description}`;

    try {
      const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message,
      });
      console.log("Xabar yuborildi:", response.data);
      reset();
    } catch (error) {
      console.error("Xabar yuborishda xatolik bor!:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Ism</label>
        <input type="text" {...register("name", { required: "Ism kiritish majburiy" })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Raqam</label>
        <input typr="text" {...register("number", { required: "Raqam kiritilishi majburiy" })} />
        {errors.name && <p>{errors.number.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register("email", { required: "Email kiritish majburiy" })} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Qo'shimcha Ma'lumot</label>
        <textarea {...register("description")} placeholder="Qo'shimcha ma'lumot kiriting"></textarea>
      </div>

      <button type="submit">Yuborish</button>
    </form>
  );
};

export default App;
