"use client";

import usePopupStore from "@/src/app/hooks/usePopupStore";
import { CloseIcon, ChessRookIcon } from "@/src/components/Icons";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import InputText from "@/src/components/common/form/InputText";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import PhoneInput from "@/src/components/common/form/PhoneInput";
import SubmitButton from "../../form/SubmitButton";
import FileInput from "@/src/components/common/form/FileInput";
import Textarea from "@/src/components/common/form/Textarea";

const WorkWithUsPopup = () => {
  const isWorkWithUsOpen = usePopupStore((state) => state.workWithUs);
  const setWorkWithUs = usePopupStore((state) => state.setWorkWithUs);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const query = gsap.utils.selector(container);
    gsap.fromTo(
      query("._eleY"),
      {
        y: window.innerHeight * 0.03,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
      }
    );
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
  });

  return (
    <section
      ref={containerRef}
      className="max-w-[68.125rem] w-full bg-[#f6f0f6] rounded-[1.25rem] px-20 py-[8.12rem] relative"
    >
      <button
        onClick={() => setWorkWithUs(false)}
        name="close"
        aria-label="Close"
        title="Close"
        className="absolute top-6 right-6 w-[3.3125rem] cursor-pointer h-[3.3125rem] flex items-center justify-center bg-[#3C1A52] rounded-full text-white hover:bg-[#3C1A52]/80 transition-colors"
      >
        <CloseIcon />
      </button>

      <div className="_eleY mb-[2.5rem]">
        <h2 className=" mb-[0.62rem] leading-[117%]! text-[3.125rem]! font-[500]!">
          Work with us
        </h2>
        <p className="text-base! leading-[160%]! font-[400]!">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
      </div>

      <Formik
        key={isWorkWithUsOpen ? "open" : "closed"}
        initialValues={{
          name: "",
          email: "",
          phone: "",
          cv: "",
          creativeIdea: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          (values);
          setIsSubmitted(true);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 _eleY">
              <InputText
                name="name"
                placeholder="Your name"
                required
                disabled={isSubmitted || isSubmitting}
              />
              <InputText
                name="email"
                placeholder="Email address"
                required
                disabled={isSubmitted || isSubmitting}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 _eleY">
              <PhoneInput
                name="phone"
                placeholder="Phone Number"
                required
                colorDropdown="bg-[#f6f0f6]!"
                disabled={isSubmitted || isSubmitting}
              />
              <FileInput
                name="cv"
                required
                disabled={isSubmitted || isSubmitting}
              />
            </div>

            <div className="_eleY">
              <Textarea
                name="creativeIdea"
                label="Make the First Move."
                placeholder="Drop us your craziest campaign idea in 150 words."
                rows={4}
                disabled={isSubmitted || isSubmitting}
              />
            </div>
            <SubmitButton
              text="Submit CV"
              isSubmitted={isSubmitted || isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default WorkWithUsPopup;
