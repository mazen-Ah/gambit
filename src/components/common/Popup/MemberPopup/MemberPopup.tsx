import { ArrowLeft, ArrowRight, CloseIcon, LinkedInIcon, PlayerIcon, TwitterIcon } from '@/src/components/Icons'
import usePopupStore, { TeamMember } from '@/src/app/hooks/usePopupStore'
import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

function MemberPopup() {
  const memberData = usePopupStore((state) => state.member);
  const setMember = usePopupStore((state) => state.setMember);
  const filteredMembers = usePopupStore((state) => state.filteredMembers);
  const currentMemberIndex = usePopupStore((state) => state.currentMemberIndex);
  const setCurrentMemberIndex = usePopupStore((state) => state.setCurrentMemberIndex);
  const sectionData = usePopupStore((state) => state.sectionData);
  
  // Get member data - if it's a TeamMember object, use it; otherwise use default
  const member: TeamMember | null = typeof memberData === 'object' && memberData !== null ? memberData as TeamMember : null;
  
  // Use filteredMembers if available, otherwise fallback to single member
  const membersList = filteredMembers.length > 0 ? filteredMembers : (member ? [member] : []);
  const currentIndex = filteredMembers.length > 0 ? currentMemberIndex : 0;
  const currentMember = membersList[currentIndex] || member;
  
  // Helper function to get text from multilingual object
  const getText = (content: any) => {
    if (typeof content === 'string') return content;
    return content?.en || content?.ar || '';
  };

  // Use current member logos or default data
  const data = useMemo(()=> {
    if (currentMember?.logos && currentMember.logos.length > 0) {
      return currentMember.logos;
    }
    return Array.from({length: 3}, (_, i) => i + 1);
  }, [currentMember]);
  const containerRef = useRef<HTMLDivElement>(null);
  const picsWrapperRef = useRef<HTMLUListElement>(null);
  const [count, setCount] = useState(0);
  
  // Reset count when member changes by using member id as dependency
  const memberId = currentMember?.id || '';
  const prevMemberIdRef = useRef(memberId);
  
  if (memberId !== prevMemberIdRef.current) {
    prevMemberIdRef.current = memberId;
    // Use setTimeout to avoid setState during render
    setTimeout(() => setCount(0), 0);
  }

  const handleChange = (type: 'prev' | 'next') => {
    if(type === 'prev' && currentIndex === 0) return;
    if(type === 'next' && currentIndex === membersList.length - 1) return;
    
    const newIndex = type === 'prev' ? currentIndex - 1 : currentIndex + 1;
    const newMember = membersList[newIndex];
    
    if (!newMember) return;
    
    const tl = gsap.timeline();
    const container = containerRef.current;
    const wrapper = picsWrapperRef.current;
    const query = gsap.utils.selector(container);

    if(!container || !wrapper) return;

    // Update member and index
    setCurrentMemberIndex(newIndex);
    setMember(newMember);
    
    // Reset logo carousel count
    setCount(0);
    
    tl
    .to(query("._eleY"), {
      y: window.innerHeight * -0.03,
      autoAlpha: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power3.in',
    }, 0);
  }

  useEffect(()=> {
    const container = containerRef.current;
    const query = gsap.utils.selector(container);

    if(!container) return;

    gsap.fromTo(query("._eleY"), {
      y: window.innerHeight * 0.03,
      autoAlpha: 0,
    }, {
      y: 0,
      autoAlpha: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power3.out',
    });
  }, [count, currentMember])

  return (
    <section 
      ref={containerRef} 
      className="member max-lg:mt-20 mt-80 lg:mt-0 w-[90%] max-lg:w-[80vw] h-[70vh] lg:w-[75%] flex flex-col lg:flex-row lg:items-stretch gap-2 perspective-[50em]"
    >
      <div className="w-full min-h-[40vh] max-lg:min-h-[40vh] lg:w-[35%] rounded-[8px] overflow-hidden transform-3d _ele">
        <ul ref={picsWrapperRef} className="min-w-full h-full flex">
          {currentMember?.image ? (
            <li className="shrink-0 w-full h-full relative">
              <Image 
                src={currentMember.image} 
                alt={currentMember.name}
                fill
                className="object-cover"
              />
            </li>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <li key={index} className="shrink-0 w-full h-full relative">
                {typeof item === 'string' ? (
                  <Image 
                    src={item} 
                    alt={`${currentMember?.name || 'Member'} logo ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-red-100"></div>
                )}
              </li>
            ))
          ) : (
            <li className="shrink-0 w-full h-full relative bg-gray-200"></li>
          )}
        </ul>
      </div>
      <div className="pb-12 lg:pb-0 h-full w-full lg:w-[65%] flex flex-col gap-2 transform-3d">
        <div className="flex items-center justify-between w-full px-6 py-7.5 bg-white rounded-[8px] transform-3d _ele">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center rounded-full p-3.5 border border-[#3b1a5133]">
              {sectionData?.icon ? (
                <Image 
                  src={sectionData.icon} 
                  alt="Section Icon"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              ) : (
                <span className='color-[#3C1A52]'>
                  <PlayerIcon />
                </span>
              )}
              <div className='pl-2.5 font-bold text-center text-text-primary-100'>
                {sectionData?.name || 'THE PLAYERS'}
              </div>
            </div>
            <div className="rounded-full p-3.5 border border-[#3b1a5133]">
              <span className='font-bold'>
                {currentIndex + 1} / {membersList.length}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div 
              className={`size-13.25 rounded-full flex items-center justify-center border border-[#3b1a5133] cursor-pointer ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => handleChange('prev')}
            >
              <ArrowLeft />
            </div>
            <div 
              className={`size-13.25 rounded-full flex items-center justify-center border border-[#3b1a5133] cursor-pointer ${
                currentIndex === membersList.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => handleChange('next')}
            >
              <ArrowRight />
            </div>
            <div 
              className="size-13.25 rounded-full flex items-center justify-center border bg-[#3b1a51] cursor-pointer"
              onClick={() => setMember(false)}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 px-6 py-15 w-full h-full max-h-[48vh] overflow-auto bg-white rounded-[8px] transform-3d _ele">
          <div className='flex flex-col gap-5 overflow-auto'>
            {currentMember?.bio && (
              <h4 className='_eleY'>{currentMember.bio}</h4>
            )}
            {currentMember?.reach_text && (
              <div 
                className='_eleY prose prose-sm max-w-none h-full '
                dangerouslySetInnerHTML={{ __html: getText(currentMember.reach_text) }}
              />
            )}
           
          </div>
          {currentMember?.logos && currentMember.logos.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {currentMember.logos.map((logo, index) => (
                <li key={index} className='size-21 rounded-[8px] flex items-center justify-center border border-[#3b1a5133] _eleY relative overflow-hidden'>
                  <Image 
                    src={logo} 
                    alt={`${currentMember.name} logo ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </li>
              ))}
            </ul>
          )}
         
        </div>
        <div className="flex items-center justify-between p-6 w-full bg-white rounded-[8px] transform-3d _ele">
          <div>
            <h6 className='text-[#CF0F69] text-[21px] font-bold _eleY'>
              {currentMember?.name || 'Jamal Al Mawed'}
            </h6>
            <p className='text-text-primary-100 text-[1rem] font-medium _eleY'>
              {currentMember?.position || 'Founder and Manging Director'}
            </p>
          </div>
          <div className='flex items-center gap-2.5'>
            {currentMember?.social?.twitter && currentMember.social.twitter !== '#' && (
              <a 
                href={currentMember.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="size-13.25 rounded-full flex items-center justify-center border border-[#3b1a5133] _eleY hover:bg-[#3b1a5133] transition-colors cursor-pointer"
              >
                <TwitterIcon />
              </a>
            )}
            {currentMember?.social?.linkedin && currentMember.social.linkedin !== '#' && (
              <a 
                href={currentMember.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="size-13.25 rounded-full flex items-center justify-center border border-[#3b1a5133] _eleY hover:bg-[#3b1a5133] transition-colors cursor-pointer"
              >
                <LinkedInIcon />
              </a>
            )}
            {!currentMember && (
              <>
                <div className="size-13.25 rounded-full flex items-center justify-center border border-[#3b1a5133] _eleY">
                  <TwitterIcon />
                </div>
                <div className="size-13.25 rounded-full flex items-center justify-center border border-[#3b1a5133] _eleY">
                  <LinkedInIcon />
                </div>
                
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
export default MemberPopup