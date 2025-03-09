"use client";
import { useState } from "react";
import styles from "./applicationForm.module.css";
import Title from "../title/Title";
import SuccessForm from "./SuccessForm";
import { useDispatch } from "react-redux";
import { addLead } from "../../store/leadSlice";

const visaOptions = ["O-1", "EB-1A", "EB-2 NIW", "I don’t know"];

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  linkedin: "",
  visas: [],
  additionalInfo: "",
  resume: null,
};

export const ApplicationForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      visas: prevData.visas.includes(value)
        ? prevData.visas.filter((v) => v !== value)
        : [...prevData.visas, value],
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.linkedin) newErrors.linkedin = "LinkedIn profile is required";
    if (formData.visas.length === 0)
      newErrors.visas = "Select at least one visa";
    if (!formData.additionalInfo)
      newErrors.additionalInfo = "Additional info is required";
    if (!formData.resume) newErrors.resume = "Resume is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    fetch("/api/leads", {
      method: "POST",
      body: formDataToSend,
    })
      .then((res) => res.json())
      .then((resJson) => {
        dispatch(addLead(resJson.data));
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initialize = () => {
    setSubmitted(false);
    setFormData(initialState);
    setErrors({});
  };

  if (submitted) {
    return <SuccessForm onButtonClick={initialize} />;
  }

  return (
    <div className={styles.container}>
      <Title
        iconUrl="/info.webp"
        alt="Info icon"
        title="Want to understand your visa options?"
        description="Submit the form below and our team of experienced attorneys will review
        your information and send a preliminary assessment of your case based on
        your goals."
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className={styles.input}
        />
        {errors.firstName && (
          <span className={styles.error}>{errors.firstName}</span>
        )}

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className={styles.input}
        />
        {errors.lastName && (
          <span className={styles.error}>{errors.lastName}</span>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className={styles.input}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn / Personal Website URL"
          onChange={handleChange}
          className={styles.input}
        />
        {errors.linkedin && (
          <span className={styles.error}>{errors.linkedin}</span>
        )}

        <Title
          iconUrl="/cubic.webp"
          alt="Dice icon"
          title="Visa categories of interest?"
        />

        <div className={styles.checkboxWrapper}>
          {visaOptions.map((visa) => (
            <label key={visa} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={visa}
                onChange={handleCheckboxChange}
                className={styles.checkboxInput}
              />
              {visa}
            </label>
          ))}
        </div>
        {errors.visas && <span className={styles.error}>{errors.visas}</span>}

        <Title
          iconUrl="/heart.webp"
          alt="Heart icon"
          title="How can we help you?"
        />

        <textarea
          name="additionalInfo"
          placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
          onChange={handleChange}
          className={styles.textarea}
        ></textarea>
        {errors.additionalInfo && (
          <span className={styles.error}>{errors.additionalInfo}</span>
        )}

        <input
          className={styles.fileChoose}
          type="file"
          name="resume"
          onChange={handleFileChange}
        />
        {errors.resume && (
          <span className={styles.error}>{errors.resume}</span>
        )}

        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
