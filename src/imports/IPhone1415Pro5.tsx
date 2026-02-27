import svgPaths from "./svg-oikivsc4xo";
import img3DiconsFileTextDynamicColor from "figma:asset/3b2c1ffa27c5ea87c5bf8baa40559c17cefa558d.png";
import img3DiconsNotebookDynamicColor from "figma:asset/daa3b4e3a939e95bb002892d86e013e60c242b18.png";
import img3DiconsCopyDynamicColor from "figma:asset/15c0a9c33d08ea2f8ec0afb10ad1d88796ddb2e5.png";
import imgIstockphoto1328285201612X6121 from "figma:asset/86dbc51e2c0e72a85706bfbd9962dfd792e02e28.png";
import imgFrame193 from "figma:asset/11e9dc8cfd91c7f92bfa51da10baea8e03cc9379.png";

function House() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="House">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="House">
          <path d={svgPaths.pf1a2200} fill="var(--fill-0, #008080)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[76px]">
      <House />
      <p className="font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#008080] text-[12px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
        Home
      </p>
    </div>
  );
}

function BookBookmark() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="BookBookmark">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="BookBookmark">
          <path d={svgPaths.p36e5e680} fill="var(--fill-0, #A6A6A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[76px]">
      <BookBookmark />
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal h-[15px] leading-[normal] relative shrink-0 text-[#a6a6a6] text-[12px] text-center w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Library
      </p>
    </div>
  );
}

function Hospital() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Hospital">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Hospital">
          <path d={svgPaths.p331db980} fill="var(--fill-0, #A6A6A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[76px]">
      <Hospital />
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal h-[15px] leading-[normal] relative shrink-0 text-[#a6a6a6] text-[12px] text-center w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Screening
      </p>
    </div>
  );
}

function NotePencil() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="NotePencil">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="NotePencil">
          <path d={svgPaths.p22a65b00} fill="var(--fill-0, #A6A6A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[76px]">
      <NotePencil />
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal h-[15px] leading-[normal] relative shrink-0 text-[#a6a6a6] text-[12px] text-center w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Assessment
      </p>
    </div>
  );
}

function BottomNavigation() {
  return (
    <div className="absolute bg-white content-stretch flex h-[105px] items-center justify-between left-0 pb-[32px] pt-[24px] px-[24px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)] top-[747px] w-[393px]" data-name="Bottom Navigation">
      <Frame1 />
      <Frame2 />
      <Frame4 />
      <Frame3 />
    </div>
  );
}

function HomeBarPro() {
  return (
    <div className="-translate-x-1/2 absolute bottom-0 h-[32px] left-[calc(50%+1px)] w-[393px]" data-name="Home bar/Pro">
      <div className="-translate-x-1/2 absolute bg-black bottom-[9px] h-[5px] left-1/2 rounded-[100px] w-[139px]" data-name="Home Indicator" />
    </div>
  );
}

function StatusBarPro() {
  return (
    <div className="absolute h-[56px] left-0 right-0 top-0" data-name="Status Bar/Pro">
      <div className="-translate-y-1/2 absolute content-stretch flex gap-[7.33px] items-center right-[32.67px] top-[calc(50%-0.5px)]" data-name="Status/Pro">
        <div className="h-[12.333px] relative shrink-0 w-[19.333px]" data-name="Cellular">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.3333 12.3333">
            <g id="Cellular">
              <path d={svgPaths.p8bdef00} fill="var(--fill-0, black)" />
              <path d={svgPaths.p12dc6500} fill="var(--fill-0, black)" />
              <path d={svgPaths.p5f0ea00} fill="var(--fill-0, black)" />
              <path d={svgPaths.p189c4440} fill="var(--fill-0, black)" />
            </g>
          </svg>
        </div>
        <div className="h-[12.333px] relative shrink-0 w-[17px]" data-name="Wifi">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 12.3333">
            <path clipRule="evenodd" d={svgPaths.p70af300} fill="var(--fill-0, black)" fillRule="evenodd" id="Wifi" />
          </svg>
        </div>
        <div className="h-[13.667px] relative shrink-0 w-[27.333px]" data-name="Battery/Percentage">
          <div className="-translate-y-1/2 absolute bg-black h-[9px] left-[2px] rounded-[2.667px] top-1/2 w-[10.333px]" data-name="percent" />
          <div className="-translate-y-1/2 absolute h-[13px] left-0 top-1/2 w-[27.333px]" data-name="battery">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.3333 13">
              <g id="battery" opacity="0.4">
                <path clipRule="evenodd" d={svgPaths.p2b410900} fill="var(--fill-0, black)" fillRule="evenodd" />
                <path d={svgPaths.p2c79ba00} fill="var(--fill-0, black)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-black h-[37px] left-1/2 rounded-[18px] top-[11px] w-[125px]" data-name="Dynamic Island" />
      <p className="-translate-x-1/2 absolute font-['SF_Pro_Text:Bold',sans-serif] leading-[normal] left-[72px] not-italic text-[17px] text-black text-center top-[calc(50%-10.6px)] tracking-[-0.4px] w-[54px] whitespace-pre-wrap">9:41</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute h-[350px] left-[166px] top-[386px] w-[346.363px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 346.363 350">
        <g id="Group 4" opacity="0.2">
          <path clipRule="evenodd" d={svgPaths.p3df51c70} fill="var(--fill-0, #9FE29A)" fillRule="evenodd" id="ChatGPT Image Feb 21, 2026, 08_21_23 AM 1 (Traced)" />
          <path clipRule="evenodd" d={svgPaths.p1fc2e200} fill="var(--fill-0, #008080)" fillRule="evenodd" id="ChatGPT Image Feb 21, 2026, 08_21_23 AM 1 (Traced)_2" />
          <circle cx="173.457" cy="28.2504" fill="var(--fill-0, #9FE29A)" id="Ellipse 4" r="28.2504" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-black content-stretch flex flex-col h-[6px] items-start relative rounded-[12px] shrink-0 w-[291px]">
      <div className="bg-[#9fe29a] h-[6px] rounded-[12px] shrink-0 w-[101px]" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Frame5 />
      <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#008080] text-[16px] text-center tracking-[-0.48px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        33%
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[24px] top-[159px] w-[342px]">
      <p className="font-['Instrument_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-black tracking-[-0.48px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Your Progress
      </p>
      <Frame6 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="3dicons-file-text-dynamic-color">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[113.64%] left-[-5.47%] max-w-none top-[-6.25%] w-[112.2%]" src={img3DiconsFileTextDynamicColor} />
        </div>
      </div>
      <p className="font-['Instrument_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-black text-center tracking-[-0.48px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Baseline Assessment
      </p>
    </div>
  );
}

function CheckCircle() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="CheckCircle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="CheckCircle">
          <path d={svgPaths.p30520d40} fill="var(--fill-0, #008080)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-between left-[24px] p-[16px] rounded-[8px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] top-[217px] w-[342px]">
      <Frame9 />
      <CheckCircle />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="h-[27px] relative shrink-0 w-[24px]" data-name="3dicons-notebook-dynamic-color">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img3DiconsNotebookDynamicColor} />
      </div>
      <p className="font-['Instrument_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-black text-center tracking-[-0.48px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Complete Knowledge Modules
      </p>
    </div>
  );
}

function CheckCircle1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="CheckCircle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="CheckCircle">
          <circle cx="9" cy="9" id="Ellipse 5" r="6.815" stroke="var(--stroke-0, #008080)" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-between left-[24px] p-[16px] rounded-[8px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] top-[281px] w-[342px]">
      <Frame11 />
      <CheckCircle1 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="h-[30px] relative shrink-0 w-[24px]" data-name="3dicons-copy-dynamic-color">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[112.52%] left-[-23.37%] max-w-none top-[-6.05%] w-[140.6%]" src={img3DiconsCopyDynamicColor} />
        </div>
      </div>
      <p className="font-['Instrument_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-black text-center tracking-[-0.48px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Endline Assessment
      </p>
    </div>
  );
}

function CheckCircle2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="CheckCircle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="CheckCircle">
          <circle cx="9" cy="9" id="Ellipse 5" r="6.815" stroke="var(--stroke-0, #008080)" />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-between left-[24px] p-[16px] rounded-[8px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] top-[348px] w-[342px]">
      <Frame13 />
      <CheckCircle2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#008080] content-stretch flex items-center justify-center left-[24px] p-[16px] rounded-[8px] top-[422px] w-[342px]">
      <p className="font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#8ffc86] text-[18px] text-center tracking-[-0.9px] w-[121px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Continue
      </p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-[#9fe29a] content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0">
      <p className="font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[15px] text-black text-center w-[84px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Book Now
      </p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[216px]">
      <p className="font-['Instrument_Sans:Medium',sans-serif] font-medium leading-[normal] min-w-full relative shrink-0 text-[16px] text-black tracking-[-0.48px] w-[min-content] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`You have not booked a cervical cancer screening `}</p>
      <Frame16 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute bg-[#f6f6f6] content-stretch flex gap-px items-center left-[24px] p-[16px] rounded-[8px] top-[496px] w-[342px]">
      <Frame15 />
      <div className="relative shrink-0 size-[102px]" data-name="istockphoto-1328285201-612x612 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIstockphoto1328285201612X6121} />
      </div>
    </div>
  );
}

function PlayCircle() {
  return (
    <div className="relative shrink-0 size-[101px]" data-name="PlayCircle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101 101">
        <g id="PlayCircle">
          <path d={svgPaths.p2fce58f0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div className="h-[192px] relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
        <div className="absolute bg-[#d9d9d9] inset-0 rounded-[8px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[8px] size-full" src={imgFrame193} />
      </div>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[115px] py-[36px] relative size-full">
          <PlayCircle />
        </div>
      </div>
    </div>
  );
}

function PlayCircle1() {
  return (
    <div className="relative shrink-0 size-[101px]" data-name="PlayCircle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101 101">
        <g id="PlayCircle">
          <path d={svgPaths.p2fce58f0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame19() {
  return (
    <div className="h-[192px] relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
        <div className="absolute bg-[#d9d9d9] inset-0 rounded-[8px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[8px] size-full" src={imgFrame193} />
      </div>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[119px] py-[39px] relative size-full">
          <PlayCircle1 />
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-[#008080] relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative w-full">
          <p className="font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#8ffc86] text-[18px] text-center tracking-[-0.9px] w-[121px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Learn More
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[28px] items-start left-0 top-0 w-[345px]">
      <Frame18 />
      <Frame19 />
      <Frame17 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute h-[628px] left-[24px] top-[684px] w-[345px]">
      <Frame20 />
    </div>
  );
}

export default function IPhone1415Pro() {
  return (
    <div className="bg-[#f8fafc] relative size-full" data-name="iPhone 14 & 15 Pro - 5">
      <BottomNavigation />
      <HomeBarPro />
      <StatusBarPro />
      <Group />
      <p className="-translate-x-1/2 absolute font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] left-[86px] text-[#008080] text-[28px] text-center top-[72px] tracking-[-1.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Welcome,
      </p>
      <p className="-translate-x-1/2 absolute font-['Instrument_Sans:Medium',sans-serif] font-medium leading-[normal] left-[108px] text-[24px] text-black text-center top-[113px] tracking-[-1.2px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Let’s get started!
      </p>
      <p className="-translate-x-1/2 absolute font-['Instrument_Sans:Medium',sans-serif] font-medium leading-[normal] left-[144px] text-[20px] text-black text-center top-[645px] tracking-[-0.6px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Learn about cervical cancer
      </p>
      <Frame7 />
      <Frame8 />
      <Frame10 />
      <Frame12 />
      <Frame />
      <Frame14 />
      <Frame21 />
    </div>
  );
}