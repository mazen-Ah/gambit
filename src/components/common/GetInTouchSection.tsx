"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SectionHeader from "@/src/components/common/SectionHeader";
import { EmailIcon, ChessRookIcon } from "@/src/components/Icons";
import InputText from "./form/InputText";
import Textarea from "./form/Textarea";
import Select from "./form/Select";
import PhoneInput from "./form/PhoneInput";
import SubmitButton from "./form/SubmitButton";
import GeneralAnimation from "./Animation/GeneralAnimation";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  country_code: string;
  company: string;
  project: string;
  message: string;
  has_rich_text: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
  country_code: Yup.string().required(),
  company: Yup.string(),
  project: Yup.string(),
  message: Yup.string().required(),
});

const GetInTouchSection = (props: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Support both direct props and data prop
  const data = props.data || props;
  
  const getText = (content: any) => {
    if (typeof content === 'string') return content;
    return content?.en || content?.ar || '';
  };
  
  // Extract from data prop if available, otherwise use direct props
  const srcImage = data?.media?.find((m: any) => 
    m.collection_name === 'image_desktop' || m.collection_name === 'image'
  )?.url || props.srcImage || "/images/GetInTouchSection-image.png";
  
  const text = getText(data?.content?.title) || props.text || ""; // Swapped: title -> text
  const title = getText(data?.content?.subtitle) || props.title || ""; // Swapped: subtitle -> title
  const description = getText(data?.content?.description) || props.description || "";
  const className = props.className || "";
  
  const iconUrl = data?.media?.find((m: any) => m.collection_name === 'icon')?.url;

  const initialValues: FormValues = {
    name: "",
    email: "",
    phone: "",
    country_code: "971",
    company: "",
    project: "",
    message: "",
    has_rich_text: false,
  };

  const handleSubmit = async (values: FormValues) => {

    setIsSubmitted(true);
  };
  return (
    <section
      ref={containerRef}
      className={`space-x space-y  bg-white/50  ${className}`}
    >
      <GeneralAnimation containerRef={containerRef} type="_eleY">
        <div className="flex max-lg:flex-col gap-[6.44rem] max-sm:gap-[3.75rem]">
          <div className={`_eleY relative w-fit max-lg:w-full! max-lg:max-w-full! lg:min-w-219.25 h-full min-h-160 max-sm:min-h-97 ${className ? className : "lg:min-h-200"}`}>
            <Image
              src={srcImage}
              alt="Gambit Team"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
          <div className="get_in_touch_section flex flex-col justify-start max-w-195! w-[40%]! max-lg:w-full! max-lg:max-w-full!">
            <SectionHeader
              icon={iconUrl ? (
                <Image src={iconUrl} alt="Icon" width={24} height={24} />
              ) : (
                <EmailIcon />
              )}
              text={text}
              title={title}
              description={description}
              showLinkButton={false}
              className="mb-8!"
              titleClassName="text-text-primary-100 lg:max-w-[29.375rem]! max-lg:max-w-full! max-lg:w-full!"
              descriptionClassName="text-text-primary-100 text-[1rem]! tracking-[0.03125rem]! leading-[160%]! font-[400]! mt-[0.62rem]!"
              textClassName="text-text-primary-100"
              BadgeClassName="bg-white/50 border-text-primary-100/15"
            />

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              className="w-[48.75rem]!"
            >
              {({ isSubmitting }) => (
                <Form className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 _eleY relative z-99">
                    <InputText
                      name="name"
                      required
                      placeholder="Name"
                      disabled={isSubmitted || isSubmitting}
                    />
                    <InputText
                      name="email"
                      required
                      placeholder="Email address"
                      disabled={isSubmitted || isSubmitting}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 _eleY relative z-98">
                    <PhoneInput
                      name="phone"
                      countryCodeName="country_code"
                      required
                      placeholder="Phone Number"
                      colorDropdown="bg-[#F6F1F6]!"
                      disabled={isSubmitted || isSubmitting}
                    />
                    <InputText
                      name="company"
                      placeholder="Company"
                      disabled={isSubmitted || isSubmitting}
                    />
                  </div>
                  <div className="_eleY relative z-97">
                    <Select
                      name="project"
                      placeholder="Start a Project"
                      required
                      colorDropdown="!bg-[#F6F1F6] !opacity-100"
                      options={[
                        { value: "pr", label: "Public Relations" },
                        { value: "social", label: "Social Media" },
                        { value: "influencer", label: "Influencer Engagement" },
                        { value: "other", label: "Other" },
                      ]}
                      disabled={isSubmitted || isSubmitting}
                    />
                  </div>
                  <div className="_eleY">
                    <Textarea
                      name="message"
                      required
                      placeholder="Tell us about your project..."
                      rows={6}
                      disabled={isSubmitted || isSubmitting}
                    />
                  </div>
                  <div className="_eleY">
                    <SubmitButton isSubmitted={isSubmitted || isSubmitting} />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </GeneralAnimation>
    </section>
  );
};

export default GetInTouchSection;
