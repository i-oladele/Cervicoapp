import svgPaths from "./svg-zo5315z5zy";

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

function Frame2() {
  return (
    <div className="absolute h-[543px] left-[24px] overflow-x-clip overflow-y-auto top-[119px] w-[345px]">
      <div className="absolute font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[0] left-0 text-[0px] text-black top-0 tracking-[-0.3px] w-[344px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] mb-0 text-[15px]">This app is part of a research project</p>
        <p className="leading-[normal] mb-0 text-[15px]">&nbsp;</p>
        <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] mb-0 text-[15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Purpose of the Study
        </p>
        <p className="leading-[normal] mb-0 text-[15px]">This study aims to evaluate the effect of a mobile health (mHealth) application on women’s knowledge, perceptions, intentions, and uptake of cervical cancer screening. The study will compare results between an intervention group (who will receive educational counselling through the app) and a control group.</p>
        <p className="leading-[normal] mb-0 text-[15px]">Your participation will help researchers understand whether this application can improve cervical cancer screening outcomes.</p>
        <p className="leading-[normal] mb-0 text-[15px]">&nbsp;</p>
        <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] mb-0 text-[15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Benefits
        </p>
        <p className="leading-[normal] mb-0 text-[15px]">Increased knowledge about cervical cancer screening</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
            <span className="leading-[normal] text-[15px]">Improved awareness of screening importance</span>
          </li>
          <li className="mb-0 ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
            <span className="leading-[normal] text-[15px]">Access to educational counselling materials</span>
          </li>
          <li className="ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
            <span className="leading-[normal] text-[15px]">Contribution to research that may improve future healthcare services</span>
          </li>
        </ul>
        <p className="leading-[normal] mb-0 text-[15px]">However, individual benefits cannot be guaranteed.</p>
        <p className="leading-[normal] mb-0 text-[15px]">&nbsp;</p>
        <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] mb-0 text-[15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Risks and Discomforts
        </p>
        <p className="leading-[normal] mb-0 text-[15px]">There are minimal risks associated with participation.</p>
        <p className="leading-[normal] mb-0 text-[15px]">Possible minor discomforts may include:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
            <span className="leading-[normal] text-[15px]">Spending time completing questionnaires</span>
          </li>
          <li className="ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
            <span className="leading-[normal] text-[15px]">Reflecting on personal health information</span>
          </li>
        </ul>
        <p className="leading-[normal] mb-0 text-[15px]">There are no known physical risks associated with using this application.</p>
        <p className="leading-[normal] mb-0 text-[15px]">&nbsp;</p>
        <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] mb-0 text-[15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Confidentiality
        </p>
        <p className="leading-[normal] mb-0 text-[15px]">Your information will be kept confidential.</p>
        <p className="leading-[normal] mb-0 text-[15px]">Data will be stored securely.</p>
        <p className="leading-[normal] mb-0 text-[15px]">Responses will be coded and anonymized where possible.</p>
        <p className="leading-[normal] mb-0 text-[15px]">Only authorized members of the research team will have access to the data.</p>
        <p className="leading-[normal] mb-0 text-[15px]">Results will be reported in aggregate form (no individual identification).</p>
        <p className="leading-[normal] mb-0 text-[15px]">Your identity will not be included in any published reports.</p>
        <p className="leading-[normal] mb-0 text-[15px]">&nbsp;</p>
        <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] mb-0 text-[15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Voluntary Participation and Withdrawal
        </p>
        <p className="leading-[normal] mb-0 text-[15px]">Participation in this study is completely voluntary.</p>
        <p className="leading-[normal] mb-0 text-[15px]">You may choose not to participate.</p>
        <p className="leading-[normal] mb-0 text-[15px]">You may withdraw at any time without penalty.</p>
        <p className="leading-[normal] mb-0 text-[15px]">Choosing not to participate or withdrawing will not affect any services you receive.</p>
        <p className="leading-[normal] text-[15px]">To withdraw, you may exit the app or contact the research team.</p>
      </div>
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

function CheckSquare() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CheckSquare">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CheckSquare">
          <path d={svgPaths.pf54c400} fill="var(--fill-0, #008080)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-start left-[24px] top-[692px] w-[345px]">
      <CheckSquare />
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#333] text-[15px] tracking-[-0.3px] w-[308px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        I have read and understood the information above.
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#008080] content-stretch flex items-center justify-center left-[26px] p-[16px] rounded-[8px] top-[742px] w-[345px]">
      <p className="font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[24px] text-center text-white tracking-[-1.2px] w-[121px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Continue
      </p>
    </div>
  );
}

export default function IPhone1415Pro() {
  return (
    <div className="bg-[#f8fafc] relative size-full" data-name="iPhone 14 & 15 Pro - 3">
      <HomeBarPro />
      <StatusBarPro />
      <Frame2 />
      <p className="-translate-x-1/2 absolute font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] left-[172px] text-[28px] text-black text-center top-[73px] tracking-[-1.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        What You Need To Know
      </p>
      <Group />
      <Frame1 />
      <Frame />
    </div>
  );
}