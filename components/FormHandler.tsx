'use client'

export const FormHandler = () => {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      alert("Oh, Nice try!");
      return;
    }

    formData.append("access_key", "8f8c1a2e-2b4a-4779-80e4-b33fc37a3fc5");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const result = await response.json();
      if (result.success) {
        console.log(result);
        alert("Message Sent. Thank you for reaching out!");
        document.querySelector("form")?.reset();
      }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="form grid grid-cols-4 gap-4 items-center justify-center text-white dark:bg-transparent" autoComplete="on">
        <input type="text" name="name" placeholder="Name" className="col-span-2 rounded-full p-2" required />
        <input type="email" name="email" placeholder="Email" className="col-span-2 rounded-full p-2" required />
        <textarea name="message" placeholder="Write your thoughts here..." className="col-span-4 rounded-full p-2" required></textarea>
        <div className="col-span-4 flex justify-center">
          <button type="submit" className="text-black dark:text-white">🤝</button>
        </div>
      </form>
    </div>
  );
}
