import svgPaths from "./svg-k10uck1p0j";
import img3DiconsGirlDynamicColor from "figma:asset/53eaeca147e791fc4d417ebccdc444ef2617f9aa.png";

function HomeBarPro() {
  return (
    <div className="-translate-x-1/2 absolute bottom-0 h-[32px] left-1/2 w-[393px]" data-name="Home bar/Pro">
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

function CaretDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CaretDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CaretDown">
          <path d={svgPaths.p30a2f900} fill="var(--fill-0, #C6C6C6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[12px] relative w-full">
          <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#a6a6a6] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Select Language
          </p>
          <CaretDown />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[24px] top-[649px] w-[345px]">
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#333] text-[14px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Select Language
      </p>
      <Frame1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#008080] content-stretch flex items-center justify-center left-[24px] p-[16px] rounded-[8px] top-[742px] w-[345px]">
      <p className="font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[24px] text-center text-white tracking-[-1.2px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Get Started
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute h-[44px] leading-[normal] left-[24px] text-center top-[73px] w-[280px]">
      <p className="-translate-x-1/2 absolute font-['Instrument_Sans:SemiBold',sans-serif] font-semibold left-[84px] text-[32px] text-black top-[5px] tracking-[-1.6px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Welcome to
      </p>
      <p className="-translate-x-1/2 absolute font-['Alatsi:Regular',sans-serif] h-[38px] left-[calc(50%+84px)] not-italic text-[#008080] text-[36px] top-0 w-[112px] whitespace-pre-wrap">Cervicoapp</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute h-[350px] left-[166px] top-[386px] w-[346.363px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 346.363 350">
        <g id="Group 4" opacity="0.2">
          <path clipRule="evenodd" d={svgPaths.p32356800} fill="var(--fill-0, #9FE29A)" fillRule="evenodd" id="ChatGPT Image Feb 21, 2026, 08_21_23 AM 1 (Traced)" />
          <path clipRule="evenodd" d={svgPaths.pf76f400} fill="var(--fill-0, #008080)" fillRule="evenodd" id="ChatGPT Image Feb 21, 2026, 08_21_23 AM 1 (Traced)_2" />
          <circle cx="173.457" cy="28.2504" fill="var(--fill-0, #9FE29A)" id="Ellipse 4" r="28.2504" />
        </g>
      </svg>
    </div>
  );
}

export default function IPhone1415Pro() {
  return (
    <div className="bg-[#f8fafc] relative size-full" data-name="iPhone 14 & 15 Pro - 2">
      <HomeBarPro />
      <StatusBarPro />
      <Frame3 />
      <Frame />
      <Frame2 />
      <Group />
      <div className="absolute font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] left-[24px] text-[22px] text-black top-[520px] tracking-[-1.1px] w-[344px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">{`Cervical Cancer Screening `}</p>
        <p>Support Tool</p>
      </div>
      <p className="absolute font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[normal] left-[24px] text-[18px] text-black top-[580px] tracking-[-0.36px] w-[344px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Supporting women with reliable information and screening guidance.
      </p>
      <div className="absolute h-[371px] left-[95px] top-[118px] w-[203px]" data-name="3dicons-girl-dynamic-color">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[115.77%] left-[-53.03%] max-w-none top-[-7.67%] w-[211.08%]" src={img3DiconsGirlDynamicColor} />
        </div>
      </div>
    </div>
  );
}