import HeroLogos from "./HeroSectionLogos";
import HeroSectionStats from "./HeroSectionStats";
import HeroSVGCircle from "./HeroSVGCircle";

const HeroSection = (props: any) => {
  const data = props.data || props;
  
  // Get content (default to 'en')
  const getText = (content: any) => content?.en || content?.ar || '';
  
  // Main content
  const subtitle = getText(data?.content?.subtitle);
  const title = getText(data?.content?.title);
  
  // Logos from hero-logos sub_section - pass full media array for filtering
  const logosSection = data?.sub_sections?.find((s: any) => s.type === 'hero-logos');
  const logos = logosSection?.media || [];
  // Stats from hero-stats sub_section
  const statsSection = data?.sub_sections?.find((s: any) => s.type === 'hero-stats');
  const statsTitle = getText(statsSection?.content?.title);
  const stats = statsSection?.sub_sections?.map((stat: any) => {
    const value = getText(stat.content?.title).replace(/[+\-x]/g, '');
    const suffix = getText(stat.content?.title).match(/[+\-x]/)?.[0];
    return {
      label: getText(stat.content?.subtitle),
      value,
      suffix,
    };
  }) || [];
  

  return (
    <div className="home-hero relative bg-primary bg-p min-h-screen">
      <div className="relative pt-24 min-h-screen flex flex-col">
        <div className="ml-(--space-x) text-white max-w-360 h-full my-auto">
          <h4 className="hero__heading mb-8">{subtitle}</h4>
          <h1 className="hero__heading perspective-[1000px]">{title}</h1>
        </div>
        <HeroLogos data={logos} />
      </div>
      <div className="text-white space-x">
        <HeroSectionStats data={{ title: statsTitle, stats }} />
      </div>
      <HeroSVGCircle trigger=".home-hero" color="#CF0F69" />
    </div>
  );
};

export default HeroSection;
