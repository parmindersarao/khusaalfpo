"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:8000";

export default function RegisterPage() {
  const t = useTranslations("Register");
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile_number: "",
    adhaar_number: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      const backendMessage = data?.detail?.message || data?.message || "";

      if (!res.ok || data?.status === "error" || data?.detail?.status === "error") {
        setErrorMsg(
          backendMessage || (res.status === 409 ? t("errorDuplicate") : t("errorGeneral"))
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        mobile_number: "",
        adhaar_number: "",
        state: "",
        city: "",
        pincode: "",
        address: "",
      });
    } catch (err) {
      setErrorMsg(t("errorGeneral"));
      setStatus("error");
    }
  };

  return (
    <>
      <Header />
      <section className="max-w-xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-green-800 mb-2">{t("title")}</h1>
        <p className="text-gray-600 mb-8">{t("subtitle")}</p>

        {status === "success" && (
          <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6">
            {t("success")}
          </div>
        )}
        {status === "error" && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
            ❌ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("name")} *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("email")} *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("mobile_number")} *
            </label>
            <input
              type="tel"
              name="mobile_number"
              value={form.mobile_number}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("adhaar_number")} *
            </label>
            <input
              type="text"
              name="adhaar_number"
              value={form.adhaar_number}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("state")} *
              </label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("city")} *
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("pincode")} *
            </label>
            <input
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("address")} *
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-green-700 hover:bg-green-800 transition text-white py-3 rounded-md font-semibold disabled:opacity-60"
          >
            {status === "loading" ? t("submitting") : t("submit")}
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}