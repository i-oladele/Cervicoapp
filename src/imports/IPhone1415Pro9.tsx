import svgPaths from "./svg-9umengidm1";
import img3DiconsFileTextDynamicColor from "figma:asset/3b2c1ffa27c5ea87c5bf8baa40559c17cefa558d.png";
import img3DiconsCopyDynamicColor from "figma:asset/15c0a9c33d08ea2f8ec0afb10ad1d88796ddb2e5.png";

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

function House() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="House">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="House">
          <path d={svgPaths.p2d56cd00} fill="var(--fill-0, #A6A6A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[76px]">
      <House />
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#a6a6a6] text-[12px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
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

function Frame3() {
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
          <path d={svgPaths.p18600900} fill="var(--fill-0, #008080)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[76px]">
      <NotePencil />
      <p className="font-['Instrument_Sans:SemiBold',sans-serif] font-semibold h-[15px] leading-[normal] relative shrink-0 text-[#008080] text-[12px] text-center w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Assessment
      </p>
    </div>
  );
}

function BottomNavigation() {
  return (
    <div className="absolute bg-white content-stretch flex h-[105px] items-center justify-between left-0 pb-[32px] pt-[24px] px-[24px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)] top-[747px] w-[393px]" data-name="Bottom Navigation">
      <Frame />
      <Frame2 />
      <Frame3 />
      <Frame1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="3dicons-file-text-dynamic-color">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[113.64%] left-[-5.47%] max-w-none top-[-6.25%] w-[112.2%]" src={img3DiconsFileTextDynamicColor} />
        </div>
      </div>
      <p className="font-['Instrument_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-black text-center tracking-[-0.48px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Take Baseline Assessment
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

function Frame4() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-between left-[24px] p-[16px] rounded-[8px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] top-[187px] w-[342px]">
      <Frame5 />
      <CheckCircle />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="h-[30px] relative shrink-0 w-[24px]" data-name="3dicons-copy-dynamic-color">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[112.52%] left-[-23.37%] max-w-none top-[-6.05%] w-[140.6%]" src={img3DiconsCopyDynamicColor} />
        </div>
      </div>
      <p className="font-['Instrument_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-black text-center tracking-[-0.48px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Take Endline Assessment
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

function Frame6() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-between left-[24px] p-[16px] rounded-[8px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] top-[288px] w-[342px]">
      <Frame7 />
      <CheckCircle1 />
    </div>
  );
}

export default function IPhone1415Pro() {
  return (
    <div className="bg-[#f8fafc] relative size-full" data-name="iPhone 14 & 15 Pro - 9">
      <HomeBarPro />
      <StatusBarPro />
      <Group />
      <BottomNavigation />
      <p className="absolute font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] left-[24px] text-[#008080] text-[28px] top-[72px] tracking-[-1.4px] w-[342px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Take the Knowledge Assessment
      </p>
      <Frame4 />
      <Frame6 />
    </div>
  );
}