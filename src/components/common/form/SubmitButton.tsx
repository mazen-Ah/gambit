import React from "react";
import { CustomButton } from "../CustomButton";

type Props = {
  isSubmitted?: boolean;
  text?: string;
};

const SubmitButton = ({ isSubmitted = false, text = "LET'S PLAY" }: Props) => {
  return (
    <div>
      <CustomButton
        type="submit"
        variant="primary"
        text={isSubmitted ? "MESSAGE SENT!" : text}
        customClass={
          isSubmitted
            ? "!bg-[#44A444] hover:!bg-[#44A444] opacity-100!"
            : "pe-6!"
        }
        disabled={isSubmitted}
        icon={
          isSubmitted ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.774 10.1333C16.1237 9.70582 16.0607 9.0758 15.6332 8.72607C15.2058 8.37635 14.5758 8.43935 14.226 8.86679L10.4258 13.5116L9.20711 12.2929C8.81658 11.9024 8.18342 11.9024 7.79289 12.2929C7.40237 12.6834 7.40237 13.3166 7.79289 13.7071L9.79289 15.7071C9.99267 15.9069 10.2676 16.0129 10.5498 15.9988C10.832 15.9847 11.095 15.8519 11.274 15.6333L15.774 10.1333Z"
                fill="#44A444"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary!"
            >
              <mask
                id="mask0_508_2114"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <path d="M0 0H24V24H0V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_508_2114)">
                <path
                  d="M17.6265 4.6875C17.6265 5.72302 16.787 6.5625 15.7515 6.5625H8.25146C7.21595 6.5625 6.37646 5.72302 6.37646 4.6875V0V2.8125H10.1265V0.9375H13.8765V2.8125H17.6265V0V4.6875Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
                <path
                  d="M13.8774 6.5625V12.5287C13.8774 13.2389 14.2787 13.8881 14.9139 14.2057L16.591 15.0443C17.2261 15.3619 17.6274 16.0111 17.6274 16.7213V19.3125"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
                <path
                  d="M6.37646 19.3125V16.7213C6.37646 16.0111 6.77771 15.3619 7.41292 15.0443L9.09001 14.2057C9.72522 13.8881 10.1265 13.2389 10.1265 12.5287V6.5625"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
                <path
                  d="M19.5024 23.0625H4.50244V21.1875C4.50244 20.152 5.34193 19.3125 6.37744 19.3125H17.6274C18.663 19.3125 19.5024 20.152 19.5024 21.1875V23.0625Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
              </g>
            </svg>
          )
        }
      />
    </div>
  );
};

export default SubmitButton;
