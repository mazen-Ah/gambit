import React from "react";
import ContactCard from "./ContactCard";
import InfoSection from "./InfoSection";
import SocialButton from "./SocialButton";
import Image from "next/image";
import {
  FacebookIcon,
  LetTalkIcon,
  LinkedInIcon,
  TwitterIcon,
  PhoneIcon,
  EmailIcon,
} from "../../Icons";



const ListCardsContact = (props: any) => {
  const data = props.data || props;
  
  const getText = (content: any) => content?.en || content?.ar || '';
  
  // Extract cards from sub_sections
  const addressCard = data?.sub_sections?.find((s: any) => s.type === 'address-card');
  const emailCard = data?.sub_sections?.find((s: any) => s.type === 'contact-card' && s.name === 'email-card');
  const phoneCard = data?.sub_sections?.find((s: any) => s.type === 'contact-card' && s.name === 'phone-card');
  const socialCard = data?.sub_sections?.find((s: any) => s.type === 'contact-card' && s.name === 'social-card');
  
  // Get icon URLs
  const getIconUrl = (card: any) => card?.media?.find((m: any) => m.collection_name === 'icon')?.url;
  
  // Map social links
  const socialLinks = socialCard?.content?.buttons?.map((button: any) => {
    const url = button.url || '';
    const label = getText(button.label) || '';
    let icon = null;
    
    if (url.includes('linkedin')) {
      icon = <LinkedInIcon />;
    } else if (url.includes('x.com') || url.includes('twitter')) {
      icon = <TwitterIcon />;
    } else if (url.includes('facebook')) {
      icon = <FacebookIcon />;
    }
    
    return { href: url, icon, label };
  }).filter((link: { href: string; icon: React.ReactNode | null; label: string }) => link.icon) || [];

  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 items-center pb-20 space-x space-y  ">
      {/* Address Card */}
      {addressCard && (
        <ContactCard
          icon={<Image src={getIconUrl(addressCard)} alt="Address" width={16} height={16} />}
        >
          <InfoSection
            title={getText(addressCard.content?.title) || "Address"}
            content={getText(addressCard.content?.subtitle) || ""}
            linkText={addressCard.content?.buttons?.[0] ? getText(addressCard.content.buttons[0].label) : undefined}
            useFullOpacity={true}
            href={addressCard.content?.buttons?.[0]?.url}
          />
        </ContactCard>
      )}

      {/* Email Card */}
      {emailCard && emailCard.content?.buttons && (
         <ContactCard
         icon={<Image src={getIconUrl(emailCard)} alt="Address" width={16} height={16} />}
       >
          <div className="flex items-center justify-between w-full">
            {emailCard.content.buttons.map((button: any, index: number) => (
              <React.Fragment key={index}>
                <InfoSection
                  title={getText(button.label) || "General"}
                  content={button.url || ""}
                  href={button.type === 'url' && button.url?.includes('@') ? `mailto:${button.url}` : button.url}
                />
                {index < emailCard.content.buttons.length - 1 && (
                  <div className="w-px h-full bg-text-primary-100/30" />
                )}
              </React.Fragment>
            ))}
          </div>
        </ContactCard>
      )}

      {/* Phone Card */}
      {phoneCard && phoneCard.content?.buttons?.[0] && (
        <ContactCard
        icon={<Image src={getIconUrl(phoneCard)} alt="Address" width={16} height={16} />}
      >
          <InfoSection
            title={getText(phoneCard.content.buttons[0].label) || "Customer Service"}
            content={phoneCard.content.buttons[0].url || ""}
            href={phoneCard.content.buttons[0].type === 'call' ? `tel:${phoneCard.content.buttons[0].url?.replace(/\s/g, '')}` : phoneCard.content.buttons[0].url}
          />
        </ContactCard>
      )}

      {/* Social Media Card */}
      {socialCard && socialLinks.length > 0 && (
        <ContactCard
        icon={<Image src={getIconUrl(socialCard)} alt="Address" width={16} height={16} />}
      >
          <div>
            <div className="font-semibold text-text-primary-100 text-base mb-[0.62rem]">
              Follow us
            </div>
            <div className="flex gap-3 max-lg:justify-start w-full">
              {socialLinks.map((social: { href: string; icon: React.ReactNode; label: string }, index: number) => (
                <SocialButton
                  key={index}
                  href={social.href}
                  icon={social.icon}
                  ariaLabel={social.label}
                />
              ))}
            </div>
          </div>
        </ContactCard>
      )}
    </div>
  );
};

export default ListCardsContact;
