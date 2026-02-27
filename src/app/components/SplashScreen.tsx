import svgPaths from "../../imports/svg-pvkms74vh5";

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  return (
    <div
      className="bg-black size-full flex flex-col items-center justify-center cursor-pointer"
      onClick={onFinish}
    >
      <div className="relative w-[131.509px] h-[132.89px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 131.509 132.89">
          <path clipRule="evenodd" d={svgPaths.p1a7361c0} fill="#9FE29A" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p1024cb80} fill="#008080" fillRule="evenodd" />
          <circle cx="65.8595" cy="10.7263" fill="#9FE29A" r="10.7263" />
        </svg>
      </div>
      <p
        className="mt-[16px] text-[32px] text-center text-white"
        style={{ fontFamily: "'Alatsi', sans-serif" }}
      >
        Cerva
      </p>
    </div>
  );
}
