"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import { Toaster, toast } from "react-hot-toast";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchableDropdown from "@/components/SearchableDropdown";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  "http://127.0.0.1:8000";

type FormData = {
  name: string;
  email: string;
  mobile_number: string;
  adhaar_number: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
};

type FormErrors = Partial<
  Record<keyof FormData, string>
>;

const initialForm: FormData = {
  name: "",
  email: "",
  mobile_number: "",
  adhaar_number: "",
  state: "",
  city: "",
  pincode: "",
  address: "",
};

export default function RegisterPage() {
  const t = useTranslations("Register");

  // ==========================================
  // FORM STATE
  // ==========================================

  const [form, setForm] =
    useState<FormData>(initialForm);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [status, setStatus] = useState<
    "idle" | "loading"
  >("idle");

  // ==========================================
  // STATE & CITY
  // ==========================================

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [loadingStates, setLoadingStates] =
    useState(false);

  const [loadingCities, setLoadingCities] =
    useState(false);

  // ==========================================
  // FIELD REFS
  // ==========================================

  const nameRef =
    useRef<HTMLInputElement>(null);

  const emailRef =
    useRef<HTMLInputElement>(null);

  const mobileRef =
    useRef<HTMLInputElement>(null);

  const aadhaarRef =
    useRef<HTMLInputElement>(null);

  const stateRef =
    useRef<HTMLDivElement>(null);

  const cityRef =
    useRef<HTMLDivElement>(null);

  const pincodeRef =
    useRef<HTMLInputElement>(null);

  const addressRef =
    useRef<HTMLTextAreaElement>(null);

  // ==========================================
  // FETCH STATES
  // ==========================================

  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);

      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country: "India",
            }),
          }
        );

        const data = await response.json();

        if (!response.ok || data.error) {
          throw new Error(
            "Failed to fetch states"
          );
        }

        const stateNames = data.data.states.map(
          (state: { name: string }) =>
            state.name
        );

        setStates(stateNames);
      } catch (error) {
        console.error(
          "Error fetching states:",
          error
        );

        toast.error(
          "Unable to load states. Please refresh the page."
        );
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Name
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name =
        "Name must be at least 2 characters";
    } else if (
      !/^[A-Za-z\s]+$/.test(
        form.name.trim()
      )
    ) {
      newErrors.name =
        "Name can only contain letters";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
      )
    ) {
      newErrors.email =
        "Please enter a valid email address";
    }

    // Mobile
    if (!form.mobile_number) {
      newErrors.mobile_number =
        "Mobile number is required";
    } else if (
      !/^[6-9]\d{9}$/.test(
        form.mobile_number
      )
    ) {
      newErrors.mobile_number =
        "Mobile number must be 10 digits and start with 6, 7, 8, or 9";
    }

    // Aadhaar
    if (!form.adhaar_number) {
      newErrors.adhaar_number =
        "Aadhaar number is required";
    } else if (
      !/^\d{12}$/.test(
        form.adhaar_number
      )
    ) {
      newErrors.adhaar_number =
        "Aadhaar number must be exactly 12 digits";
    }

    // State
    if (!form.state) {
      newErrors.state =
        "Please select a state";
    }

    // City
    if (!form.city) {
      newErrors.city =
        "Please select a city";
    }

    // Pincode
    if (!form.pincode) {
      newErrors.pincode =
        "Pincode is required";
    } else if (
      !/^\d{6}$/.test(form.pincode)
    ) {
      newErrors.pincode =
        "Pincode must be exactly 6 digits";
    }

    // Address
    if (!form.address.trim()) {
      newErrors.address =
        "Address is required";
    } else if (
      form.address.trim().length < 10
    ) {
      newErrors.address =
        "Address must be at least 10 characters";
    }

    return newErrors;
  };

  // ==========================================
  // FIRST INVALID FIELD
  // AUTO FOCUS + AUTO SCROLL
  // ==========================================

  const focusFirstInvalidField = (
    validationErrors: FormErrors
  ) => {
    const fields: {
      field: keyof FormData;
      ref: React.RefObject<
        HTMLElement | null
      >;
    }[] = [
      {
        field: "name",
        ref: nameRef,
      },
      {
        field: "email",
        ref: emailRef,
      },
      {
        field: "mobile_number",
        ref: mobileRef,
      },
      {
        field: "adhaar_number",
        ref: aadhaarRef,
      },
      {
        field: "state",
        ref: stateRef,
      },
      {
        field: "city",
        ref: cityRef,
      },
      {
        field: "pincode",
        ref: pincodeRef,
      },
      {
        field: "address",
        ref: addressRef,
      },
    ];

    const firstInvalidField =
      fields.find(
        ({ field }) =>
          validationErrors[field]
      );

    if (!firstInvalidField) {
      return;
    }

    const element =
      firstInvalidField.ref.current;

    if (!element) {
      return;
    }

    setTimeout(() => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Normal input / textarea
      if (
        element instanceof
          HTMLInputElement ||
        element instanceof
          HTMLTextAreaElement
      ) {
        element.focus();
        return;
      }

      // Custom searchable dropdown
      const button =
        element.querySelector("button");

      button?.focus();
    }, 100);
  };

  // ==========================================
  // NORMAL INPUT CHANGE
  // ==========================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setStatus("idle");
  };

  // ==========================================
  // STATE CHANGE
  // ==========================================

  const handleStateChange = async (
    selectedState: string
  ) => {
    setForm((prev) => ({
      ...prev,
      state: selectedState,
      city: "",
    }));

    setCities([]);

    setErrors((prev) => ({
      ...prev,
      state: "",
      city: "",
    }));

    setStatus("idle");

    if (!selectedState) {
      return;
    }

    setLoadingCities(true);

    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: "India",
            state: selectedState,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(
          "Failed to fetch cities"
        );
      }

      setCities(data.data || []);
    } catch (error) {
      console.error(
        "Error fetching cities:",
        error
      );

      setErrors((prev) => ({
        ...prev,
        city:
          "Unable to load cities. Please try again.",
      }));

      toast.error(
        "Unable to load cities. Please try again."
      );
    } finally {
      setLoadingCities(false);
    }
  };

  // ==========================================
  // CITY CHANGE
  // ==========================================

  const handleCityChange = (
    selectedCity: string
  ) => {
    setForm((prev) => ({
      ...prev,
      city: selectedCity,
    }));

    setErrors((prev) => ({
      ...prev,
      city: "",
    }));

    setStatus("idle");
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // ========================================
    // FRONTEND VALIDATION
    // ========================================

    const validationErrors =
      validateForm();

    if (
      Object.keys(validationErrors).length >
      0
    ) {
      setErrors(validationErrors);

      // Toast
      toast.error(
        "Please fill all required fields correctly."
      );

      // First invalid field
      focusFirstInvalidField(
        validationErrors
      );

      return;
    }

    // ========================================
    // API REQUEST
    // ========================================

    setStatus("loading");

    try {
      const res = await fetch(
        `${BACKEND_URL}/api/v1/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data =
        await res.json().catch(() => ({}));

      const backendMessage =
        data?.detail?.message ||
        data?.message ||
        "";

      // ======================================
      // API ERROR
      // ======================================

      if (
        !res.ok ||
        data?.status === "error" ||
        data?.detail?.status === "error"
      ) {
        const message =
          backendMessage ||
          (res.status === 409
            ? t("errorDuplicate")
            : t("errorGeneral"));

        toast.error(message);

        setStatus("idle");

        return;
      }

      // ======================================
      // SUCCESS
      // ======================================

      toast.success(
        "Registration successful!"
      );

      setStatus("idle");

      setForm(initialForm);

      setCities([]);

      setErrors({});
    } catch (error) {
      // ======================================
      // NETWORK / SERVER ERROR
      // ======================================

      console.error(
        "Registration error:",
        error
      );

      toast.error(
        "Unable to connect to server. Please try again."
      );

      setStatus("idle");
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      {/* ======================================
          TOAST
      ====================================== */}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "14px",
            borderRadius: "8px",
            padding: "12px 16px",
            maxWidth:
              "calc(100vw - 32px)",
          },
          success: {
            duration: 4000,
          },
          error: {
            duration: 5000,
          },
        }}
      />

      <Header />

      <section className="max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* ====================================
            HEADING
        ==================================== */}

        <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">
          {t("title")}
        </h1>

        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          {t("subtitle")}
        </p>

        {/* ====================================
            FORM
        ==================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          noValidate
        >
          {/* ================= NAME ================= */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("name")} *
            </label>

            <input
              ref={nameRef}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-600"
              }`}
            />

            {errors.name && (
              <p className="text-red-600 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* ================= EMAIL ================= */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("email")} *
            </label>

            <input
              ref={emailRef}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-600"
              }`}
            />

            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* ================= MOBILE ================= */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("mobile_number")} *
            </label>

            <input
              ref={mobileRef}
              type="tel"
              name="mobile_number"
              value={form.mobile_number}
              onChange={(e) => {
                const value =
                  e.target.value.replace(
                    /\D/g,
                    ""
                  );

                if (value.length <= 10) {
                  setForm((prev) => ({
                    ...prev,
                    mobile_number: value,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    mobile_number: "",
                  }));

                  setStatus("idle");
                }
              }}
              maxLength={10}
              inputMode="numeric"
              required
              autoComplete="tel"
              placeholder="Enter 10 digit mobile number"
              className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 ${
                errors.mobile_number
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-600"
              }`}
            />

            {errors.mobile_number && (
              <p className="text-red-600 text-sm mt-1">
                {errors.mobile_number}
              </p>
            )}
          </div>

          {/* ================= AADHAAR ================= */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("adhaar_number")} *
            </label>

            <input
              ref={aadhaarRef}
              type="text"
              name="adhaar_number"
              value={form.adhaar_number}
              onChange={(e) => {
                const value =
                  e.target.value.replace(
                    /\D/g,
                    ""
                  );

                if (value.length <= 12) {
                  setForm((prev) => ({
                    ...prev,
                    adhaar_number: value,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    adhaar_number: "",
                  }));

                  setStatus("idle");
                }
              }}
              maxLength={12}
              inputMode="numeric"
              required
              autoComplete="off"
              placeholder="Enter 12 digit Aadhaar number"
              className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 ${
                errors.adhaar_number
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-600"
              }`}
            />

            {errors.adhaar_number && (
              <p className="text-red-600 text-sm mt-1">
                {errors.adhaar_number}
              </p>
            )}
          </div>

          {/* ================= STATE + CITY ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* STATE */}

            <div ref={stateRef}>
              <SearchableDropdown
                label={t("state")}
                value={form.state}
                options={states}
                onChange={handleStateChange}
                placeholder="Select State"
                loading={loadingStates}
                error={errors.state}
              />
            </div>

            {/* CITY */}

            <div ref={cityRef}>
              <SearchableDropdown
                label={t("city")}
                value={form.city}
                options={cities}
                onChange={handleCityChange}
                placeholder={
                  !form.state
                    ? "First Select State"
                    : "Select City"
                }
                disabled={!form.state}
                loading={loadingCities}
                error={errors.city}
              />
            </div>
          </div>

          {/* ================= PINCODE ================= */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("pincode")} *
            </label>

            <input
              ref={pincodeRef}
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={(e) => {
                const value =
                  e.target.value.replace(
                    /\D/g,
                    ""
                  );

                if (value.length <= 6) {
                  setForm((prev) => ({
                    ...prev,
                    pincode: value,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    pincode: "",
                  }));

                  setStatus("idle");
                }
              }}
              maxLength={6}
              inputMode="numeric"
              required
              autoComplete="postal-code"
              placeholder="Enter 6 digit pincode"
              className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 ${
                errors.pincode
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-600"
              }`}
            />

            {errors.pincode && (
              <p className="text-red-600 text-sm mt-1">
                {errors.pincode}
              </p>
            )}
          </div>

          {/* ================= ADDRESS ================= */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("address")} *
            </label>

            <textarea
              ref={addressRef}
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              required
              autoComplete="street-address"
              placeholder="Enter your complete address"
              className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 ${
                errors.address
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-600"
              }`}
            />

            {errors.address && (
              <p className="text-red-600 text-sm mt-1">
                {errors.address}
              </p>
            )}
          </div>

          {/* ================= SUBMIT ================= */}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-green-700 hover:bg-green-800 active:bg-green-900 transition text-white py-3 rounded-md font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading"
              ? t("submitting")
              : t("submit")}
          </button>
        </form>
      </section>

      <Footer />
    </>
  );
}