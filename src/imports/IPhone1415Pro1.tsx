import svgPaths from "./svg-pvkms74vh5";

function HomeBarPro() {
  return (
    <div className="-translate-x-1/2 absolute bottom-0 h-[32px] left-1/2 w-[393px]" data-name="Home bar/Pro">
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0.5)] bottom-[9px] h-[5px] left-1/2 rounded-[100px] w-[139px]" data-name="Home Indicator" />
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
              <path d={svgPaths.p8bdef00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p12dc6500} fill="var(--fill-0, white)" />
              <path d={svgPaths.p5f0ea00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p189c4440} fill="var(--fill-0, white)" />
            </g>
          </svg>
        </div>
        <div className="h-[12.333px] relative shrink-0 w-[17px]" data-name="Wifi">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 12.3333">
            <path clipRule="evenodd" d={svgPaths.p70af300} fill="var(--fill-0, white)" fillRule="evenodd" id="Wifi" />
          </svg>
        </div>
        <div className="h-[13.667px] relative shrink-0 w-[27.333px]" data-name="Battery/Percentage">
          <div className="-translate-y-1/2 absolute bg-white h-[9px] left-[2px] rounded-[2.667px] top-1/2 w-[10.333px]" data-name="percent" />
          <div className="-translate-y-1/2 absolute h-[13px] left-0 top-1/2 w-[27.333px]" data-name="battery">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.3333 13">
              <g id="battery" opacity="0.4">
                <path clipRule="evenodd" d={svgPaths.p2b410900} fill="var(--fill-0, white)" fillRule="evenodd" />
                <path d={svgPaths.p2c79ba00} fill="var(--fill-0, white)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-black h-[37px] left-1/2 rounded-[18px] top-[11px] w-[125px]" data-name="Dynamic Island" />
      <p className="-translate-x-1/2 absolute font-['SF_Pro_Text:Bold',sans-serif] leading-[normal] left-[72px] not-italic text-[17px] text-center text-white top-[calc(50%-10.6px)] tracking-[-0.4px] w-[54px] whitespace-pre-wrap">9:41</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute h-[132.89px] left-[131px] top-[320px] w-[131.509px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 131.509 132.89">
        <g id="Group 4">
          <path clipRule="evenodd" d={svgPaths.p1a7361c0} fill="var(--fill-0, #9FE29A)" fillRule="evenodd" id="ChatGPT Image Feb 21, 2026, 08_21_23 AM 1 (Traced)" />
          <path clipRule="evenodd" d={svgPaths.p1024cb80} fill="var(--fill-0, #008080)" fillRule="evenodd" id="ChatGPT Image Feb 21, 2026, 08_21_23 AM 1 (Traced)_2" />
          <circle cx="65.8595" cy="10.7263" fill="var(--fill-0, #9FE29A)" id="Ellipse 4" r="10.7263" />
        </g>
      </svg>
    </div>
  );
}

export default function IPhone1415Pro() {
  return (
    <div className="bg-black relative size-full" data-name="iPhone 14 & 15 Pro - 1">
      <HomeBarPro />
      <StatusBarPro />
      <Group />
      <p className="-translate-x-1/2 absolute font-['Alatsi:Regular',sans-serif] h-[38px] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[32px] text-center text-white top-[469px] w-[112px] whitespace-pre-wrap">Cerva</p>
    </div>
  );
}