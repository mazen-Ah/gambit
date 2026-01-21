import React from "react";

type Props = {
  children: React.ReactNode;
  icon: React.ReactNode;
};

const ContactCard = ({ icon, children }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-4 shrink-0 h-67.5 justify-between _hide">
      <div className="w-12 h-12 flex items-center text-black justify-center bg-primary rounded-full">
        {icon}
      </div>
      {children}
    </div>
  );
};

export default ContactCard;
