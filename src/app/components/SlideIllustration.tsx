// Simple illustrations for the library slides that have no picture of their own.
// Slide 1 keeps its existing anatomy image; these only fill the other slides.
// Labels inside each picture follow the selected language.
import type { ReactNode } from "react";

type Lang = "en" | "yo";
type Bi = { en: string; yo: string };

const C = {
  teal: "#008080", tealLight: "#e6f4f4", mint: "#9fe29a", rose: "#e07a8f", roseLight: "#fde2e7",
  amber: "#f2b134", amberLight: "#fff4dc", red: "#c0392b", redLight: "#fdecec", ink: "#1e1e1e",
  grey: "#6b7280", line: "#c6c6c6", hair: "#2b1b12",
};
const skins = ["#8d5524", "#6b3f1d", "#a0662f", "#7a4a24", "#5c3317"];
const font = "'Instrument Sans', sans-serif";

function Text({ x, y, lines, size = 11, weight = 500, fill = C.ink, anchor = "middle", strike = false }: {
  x: number; y: number; lines: string | string[]; size?: number; weight?: number; fill?: string; anchor?: "start" | "middle" | "end"; strike?: boolean;
}) {
  const list = Array.isArray(lines) ? lines : [lines];
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} fontFamily={font} textDecoration={strike ? "line-through" : undefined}>
      {list.map((line, i) => <tspan key={i} x={x} dy={i ? size * 1.25 : 0}>{line}</tspan>)}
    </text>
  );
}

function Woman({ x, y, s = 1, skin = skins[0], dress = C.teal, nurse = false }: {
  x: number; y: number; s?: number; skin?: string; dress?: string; nurse?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <line x1={-8} y1={14} x2={-13} y2={34} stroke={skin} strokeWidth={4} strokeLinecap="round" />
      <line x1={8} y1={14} x2={13} y2={34} stroke={skin} strokeWidth={4} strokeLinecap="round" />
      <rect x={-6} y={48} width={4} height={10} rx={2} fill={skin} />
      <rect x={2} y={48} width={4} height={10} rx={2} fill={skin} />
      <path d="M-8 12 Q0 9 8 12 L15 50 Q0 54 -15 50 Z" fill={nurse ? "#ffffff" : dress} stroke={nurse ? C.line : "none"} />
      {nurse && <path d="M-5 12 L0 20 L5 12" fill="none" stroke={C.teal} strokeWidth={2.5} />}
      <rect x={-2.5} y={6} width={5} height={6} fill={skin} />
      <circle cx={0} cy={-2} r={9} fill={C.hair} />
      {!nurse && <circle cx={0} cy={-11} r={4.5} fill={C.hair} />}
      <circle cx={0} cy={1} r={7.5} fill={skin} />
      {nurse && (
        <g>
          <rect x={-7} y={-13} width={14} height={6} rx={1.5} fill="#ffffff" stroke={C.line} />
          <path d="M0 -12 V-8 M-2 -10 H2" stroke={C.red} strokeWidth={1.2} />
        </g>
      )}
    </g>
  );
}

function Tile({ x, label, children }: { x: number; label: string[]; children: ReactNode }) {
  return (
    <g>
      <rect x={x} y={10} width={96} height={86} rx={12} fill="#ffffff" stroke={C.tealLight} strokeWidth={2} />
      <g transform={`translate(${x + 48} 53)`}>{children}</g>
      <Text x={x + 48} y={112} lines={label} weight={600} />
    </g>
  );
}

function Virus({ x, y, r = 12 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <g key={i}>
            <line x1={Math.cos(a) * r} y1={Math.sin(a) * r} x2={Math.cos(a) * (r + 6)} y2={Math.sin(a) * (r + 6)} stroke={C.amber} strokeWidth={2} />
            <circle cx={Math.cos(a) * (r + 7)} cy={Math.sin(a) * (r + 7)} r={2.5} fill={C.amber} />
          </g>
        );
      })}
      <circle r={r} fill={C.amberLight} stroke={C.amber} strokeWidth={2} />
      <circle cx={-3} cy={-2} r={2.2} fill={C.amber} />
      <circle cx={4} cy={3} r={1.8} fill={C.amber} />
    </g>
  );
}

function Cervix({ x, y, r = 22, patch = false }: { x: number; y: number; r?: number; patch?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#f4a6b6" stroke={C.rose} strokeWidth={2} />
      <ellipse rx={r * 0.22} ry={r * 0.12} fill="#9e3a4f" />
      {patch && <ellipse cx={r * 0.42} cy={-r * 0.3} rx={r * 0.32} ry={r * 0.22} fill="#ffffff" stroke={C.grey} strokeDasharray="2 2" />}
    </g>
  );
}

const Arrow = ({ x1, x2, y }: { x1: number; x2: number; y: number }) => (
  <g stroke={C.teal} strokeWidth={2} fill="none" strokeLinecap="round">
    <line x1={x1} y1={y} x2={x2} y2={y} />
    <path d={`M${x2 - 5} ${y - 4} L${x2} ${y} L${x2 - 5} ${y + 4}`} />
  </g>
);

const Check = ({ x, y, color = C.teal }: { x: number; y: number; color?: string }) => (
  <path d={`M${x - 6} ${y} L${x - 2} ${y + 4} L${x + 6} ${y - 5}`} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
);

type Illustration = { alt: Bi; draw: (l: (b: Bi) => string, lines: (en: string[], yo: string[]) => string[]) => ReactNode };

const illustrations: Record<string, Illustration> = {
  nigeria: {
    alt: { en: "Ranking: breast cancer is first and cervical cancer second among Nigerian women; about 13,700 women diagnosed in 2022.", yo: "Ìtòlẹ́sẹẹsẹ: jẹjẹrẹ ọmú ni àkọ́kọ́, jẹjẹrẹ ọrùn ilé-ọmọ ni èkejì láàárín obìnrin Nàìjíríà; nǹkan bí 13,700 obìnrin ní 2022." },
    draw: (l) => (
      <g>
        <Text x={16} y={22} anchor="start" size={11} fill={C.grey} lines={l({ en: "Most common cancers in Nigerian women", yo: "Jẹjẹrẹ tó wọ́pọ̀ jù lọ láàárín obìnrin Nàìjíríà" })} />
        <circle cx={32} cy={52} r={13} fill="#e5e7eb" />
        <Text x={32} y={57} lines="1" size={14} weight={700} fill={C.grey} />
        <Text x={54} y={56} anchor="start" size={13} lines={l({ en: "Breast cancer", yo: "Jẹjẹrẹ ọmú" })} />
        <circle cx={32} cy={90} r={13} fill={C.teal} />
        <Text x={32} y={95} lines="2" size={14} weight={700} fill="#ffffff" />
        <Text x={54} y={94} anchor="start" size={13} weight={700} fill={C.teal} lines={l({ en: "Cervical cancer", yo: "Jẹjẹrẹ ọrùn ilé-ọmọ" })} />
        <Text x={16} y={134} anchor="start" size={11} lines={l({ en: "≈ 13,700 women diagnosed in 2022", yo: "Nǹkan bí 13,700 obìnrin ní ọdún 2022" })} />
        <Woman x={244} y={56} s={0.9} skin={skins[1]} dress={C.rose} />
        <Woman x={276} y={50} s={1} skin={skins[0]} dress={C.teal} />
        <Woman x={306} y={56} s={0.9} skin={skins[2]} dress={C.amber} />
      </g>
    ),
  },
  cause: {
    alt: { en: "HPV infection slowly changes normal cervical cells into changed cells and then cancer, usually over many years.", yo: "Àkóràn HPV máa ń yí sẹ́ẹ̀lì déédé padà díẹ̀díẹ̀ di sẹ́ẹ̀lì tó yí padà, lẹ́yìn náà di jẹjẹrẹ, fún ọ̀pọ̀ ọdún." },
    draw: (l, lines) => (
      <g>
        <Virus x={36} y={52} />
        <Text x={36} y={95} lines="HPV" weight={700} fill="#9a6b00" />
        <Arrow x1={62} x2={84} y={52} />
        <g transform="translate(112 52)">
          <circle r={20} fill={C.roseLight} stroke={C.rose} strokeWidth={2} />
          <circle r={6} fill={C.rose} />
        </g>
        <Arrow x1={140} x2={162} y={52} />
        <g transform="translate(192 52)">
          <path d="M-20 -4 Q-18 -20 -2 -19 Q14 -22 19 -6 Q24 10 8 18 Q-8 24 -17 12 Q-24 4 -20 -4 Z" fill="#f7c6a3" stroke="#d98c5f" strokeWidth={2} />
          <circle cx={-5} cy={-2} r={5} fill="#d98c5f" />
          <circle cx={7} cy={5} r={4} fill="#d98c5f" />
        </g>
        <Arrow x1={220} x2={242} y={52} />
        <g transform="translate(276 52)">
          <circle cx={-10} cy={-8} r={12} fill="#d1495b" />
          <circle cx={9} cy={-6} r={11} fill="#b83246" />
          <circle cx={0} cy={10} r={12} fill="#c43c52" />
        </g>
        <Text x={112} y={92} lines={lines(["Normal", "cells"], ["Sẹ́ẹ̀lì", "déédé"])} />
        <Text x={192} y={92} lines={lines(["Changed", "cells"], ["Sẹ́ẹ̀lì tó", "yí padà"])} />
        <Text x={276} y={92} lines={l({ en: "Cancer", yo: "Jẹjẹrẹ" })} weight={700} fill={C.red} />
        <line x1={96} y1={124} x2={296} y2={124} stroke={C.line} strokeWidth={2} strokeDasharray="4 4" />
        <path d="M290 119 L297 124 L290 129" fill="none" stroke={C.line} strokeWidth={2} />
        <Text x={196} y={142} lines={l({ en: "Usually over many years", yo: "Ó sábà máa ń gba ọ̀pọ̀ ọdún" })} fill={C.grey} />
      </g>
    ),
  },
  risk: {
    alt: { en: "Five different women: any woman who has ever had sex can be at risk.", yo: "Obìnrin márùn-ún: obìnrin èyíkéyìí tó ti ní ìbálòpọ̀ rí lè wà nínú ewu." },
    draw: (l) => (
      <g>
        {[C.teal, C.rose, C.amber, "#7b5ea7", C.mint].map((dress, i) => (
          <Woman key={i} x={40 + i * 60} y={34} s={1.05} skin={skins[i]} dress={dress} />
        ))}
        <Text x={160} y={132} lines={l({ en: "Any woman who has had sex can be at risk", yo: "Obìnrin èyíkéyìí tó ti ní ìbálòpọ̀ lè wà nínú ewu" })} weight={600} />
      </g>
    ),
  },
  myths: {
    alt: { en: "Myth: witchcraft causes cervical cancer — crossed out. Fact: HPV infection causes it.", yo: "Àròsọ: àjẹ́ ló ń fa jẹjẹrẹ ọrùn ilé-ọmọ — a ti fagi lé e. Òtítọ́: àkóràn HPV ló ń fà á." },
    draw: (l) => (
      <g>
        <rect x={10} y={12} width={144} height={126} rx={14} fill={C.redLight} stroke="#e5a3a3" strokeWidth={2} />
        <path d="M24 26 L36 38 M36 26 L24 38" stroke={C.red} strokeWidth={3} strokeLinecap="round" />
        <Text x={44} y={37} anchor="start" size={13} weight={700} fill={C.red} lines={l({ en: "MYTH", yo: "ÀRÒSỌ" })} />
        <path d="M86 56 A24 24 0 1 0 86 104 A30 30 0 0 1 86 56 Z" fill="#9ca3af" />
        {[[104, 62, 3], [112, 80, 2], [100, 94, 2.5]].map(([cx, cy, r]) => <circle key={cx * cy} cx={cx} cy={cy} r={r} fill="#9ca3af" />)}
        <Text x={82} y={126} size={12} weight={600} fill={C.red} strike lines={l({ en: "Witchcraft", yo: "Àjẹ́" })} />
        <rect x={166} y={12} width={144} height={126} rx={14} fill={C.tealLight} stroke={C.teal} strokeWidth={2} />
        <Check x={186} y={32} />
        <Text x={198} y={37} anchor="start" size={13} weight={700} fill={C.teal} lines={l({ en: "FACT", yo: "ÒTÍTỌ́" })} />
        <Virus x={238} y={80} r={14} />
        <Text x={238} y={126} size={12} weight={600} fill={C.teal} lines={l({ en: "HPV infection", yo: "Àkóràn HPV" })} />
      </g>
    ),
  },
  symptoms: {
    alt: { en: "Three warning signs: unusual bleeding, bad-smelling discharge and lower belly pain. Early on there are often no signs.", yo: "Àmì mẹ́ta: ẹ̀jẹ̀ àìdéédé, omi olóòórùn burúkú àti ìrora ìsàlẹ̀ ikùn. Ní ìbẹ̀rẹ̀, kò sábà sí àmì." },
    draw: (l, lines) => (
      <g>
        <Tile x={8} label={lines(["Unusual", "bleeding"], ["Ẹ̀jẹ̀", "àìdéédé"])}>
          <path d="M0 -24 Q16 -2 14 10 A14 14 0 0 1 -14 10 Q-16 -2 0 -24 Z" fill={C.red} />
        </Tile>
        <Tile x={112} label={lines(["Bad-smelling", "discharge"], ["Omi olóòórùn", "burúkú"])}>
          <path d="M-4 -6 Q8 8 6 16 A10 10 0 0 1 -14 16 Q-16 8 -4 -6 Z" fill="#cbd5a3" />
          {[-2, 6, 14].map((dx) => <path key={dx} d={`M${dx} -10 q4 -5 0 -10 q-4 -5 0 -10`} fill="none" stroke={C.grey} strokeWidth={1.8} />)}
        </Tile>
        <Tile x={216} label={lines(["Lower belly", "pain"], ["Ìrora ìsàlẹ̀", "ikùn"])}>
          <ellipse rx={24} ry={18} fill={C.roseLight} stroke={C.rose} strokeWidth={2} />
          <path d="M3 -16 L-7 2 L1 2 L-4 16 L9 -3 L1 -3 Z" fill={C.amber} stroke="#9a6b00" strokeWidth={1} />
        </Tile>
        <Text x={160} y={146} size={11} fill={C.grey} lines={l({ en: "Early on there are often no signs — get screened", yo: "Ní ìbẹ̀rẹ̀, kò sábà sí àmì — ṣe àyẹ̀wò" })} />
      </g>
    ),
  },
  prevention: {
    alt: { en: "Three ways to prevent cervical cancer: HPV vaccine for girls 9–14, regular screening, and not smoking.", yo: "Ọ̀nà mẹ́ta láti dènà jẹjẹrẹ ọrùn ilé-ọmọ: àjẹsára HPV fún ọmọbìnrin 9–14, àyẹ̀wò déédé àti yíyẹra fún sìgá." },
    draw: (_l, lines) => (
      <g>
        <Tile x={8} label={lines(["HPV vaccine", "(girls 9–14)"], ["Àjẹsára HPV", "(ọmọbìnrin 9–14)"])}>
          <g transform="rotate(-35)">
            <rect x={-6} y={-20} width={12} height={30} rx={2} fill={C.tealLight} stroke={C.teal} strokeWidth={2} />
            <rect x={-6} y={-6} width={12} height={16} fill={C.mint} />
            <rect x={-9} y={-24} width={18} height={4} rx={1} fill={C.teal} />
            <rect x={-1.5} y={-32} width={3} height={8} fill={C.teal} />
            <line x1={0} y1={10} x2={0} y2={24} stroke={C.grey} strokeWidth={1.5} />
          </g>
        </Tile>
        <Tile x={112} label={lines(["Regular", "screening"], ["Àyẹ̀wò", "déédé"])}>
          <Cervix x={-4} y={-2} r={16} />
          <circle cx={6} cy={4} r={13} fill="none" stroke={C.teal} strokeWidth={3} />
          <line x1={15} y1={13} x2={25} y2={23} stroke={C.teal} strokeWidth={4} strokeLinecap="round" />
        </Tile>
        <Tile x={216} label={lines(["No", "smoking"], ["Má mu", "sìgá"])}>
          <rect x={-18} y={-4} width={30} height={8} rx={1} fill="#f5f5f5" stroke={C.grey} />
          <rect x={12} y={-4} width={7} height={8} fill={C.amber} />
          <circle r={24} fill="none" stroke={C.red} strokeWidth={4} />
          <line x1={-17} y1={-17} x2={17} y2={17} stroke={C.red} strokeWidth={4} />
        </Tile>
      </g>
    ),
  },
  "who-when": {
    alt: { en: "Age scale: the main screening ages are 30 to 49. Women living with HIV start at 25.", yo: "Ìwọ̀n ọjọ́ orí: ọjọ́ orí àyẹ̀wò pàtàkì jẹ́ 30 sí 49. Àwọn obìnrin tó ń gbé pẹ̀lú HIV bẹ̀rẹ̀ ní 25." },
    draw: (l) => {
      const x = (age: number) => 24 + ((age - 20) * 272) / 45;
      return (
        <g>
          <Woman x={(x(30) + x(49)) / 2} y={16} s={0.75} skin={skins[0]} dress={C.teal} />
          <Text x={(x(30) + x(49)) / 2} y={74} size={12} weight={700} fill={C.teal} lines={l({ en: "Main screening ages: 30–49", yo: "Ọjọ́ orí àyẹ̀wò pàtàkì: 30–49" })} />
          <line x1={x(20)} y1={92} x2={x(65)} y2={92} stroke={C.line} strokeWidth={6} strokeLinecap="round" />
          <line x1={x(30)} y1={92} x2={x(49)} y2={92} stroke={C.teal} strokeWidth={10} strokeLinecap="round" />
          {[20, 30, 49, 65].map((a) => <Text key={a} x={x(a)} y={112} lines={String(a)} weight={a === 30 || a === 49 ? 700 : 500} fill={a === 30 || a === 49 ? C.teal : C.grey} />)}
          <path d={`M${x(25)} 100 l-5 -10 h10 z`} fill="#7b5ea7" />
          <circle cx={x(25)} cy={86} r={6} fill="#7b5ea7" />
          <Text x={x(25)} y={132} size={11} weight={600} fill="#7b5ea7" anchor="start" lines={l({ en: "Living with HIV: start at 25", yo: "Pẹ̀lú HIV: bẹ̀rẹ̀ ní 25" })} />
          <Text x={x(65)} y={146} size={10} anchor="end" fill={C.grey} lines={l({ en: "Age in years", yo: "Ọjọ́ orí (ọdún)" })} />
        </g>
      );
    },
  },
  "via-vili": {
    alt: { en: "Three steps of VIA: the health worker looks at the cervix, applies vinegar, then looks for white areas. The result is ready the same day.", yo: "Ìgbésẹ̀ mẹ́ta VIA: òṣìṣẹ́ ìlera wo ọrùn ilé-ọmọ, ó fi ọtí kíkan sí i, ó sì wá ibi tó funfun. Àbájáde wà ní ọjọ́ kan náà." },
    draw: (l, lines) => (
      <g>
        {[55, 160, 265].map((cx, i) => (
          <g key={cx}>
            <circle cx={cx - 34} cy={18} r={9} fill={C.teal} />
            <Text x={cx - 34} y={22} lines={String(i + 1)} weight={700} fill="#ffffff" />
          </g>
        ))}
        <Cervix x={55} y={58} />
        <Arrow x1={86} x2={122} y={58} />
        <Cervix x={160} y={62} />
        <g transform="translate(160 14)">
          <rect x={-4} y={0} width={8} height={18} rx={2} fill="#ffffff" stroke={C.grey} strokeWidth={1.5} />
          <rect x={-6} y={-8} width={12} height={9} rx={4} fill={C.teal} />
          <path d="M0 22 q4 6 0 9 q-4 -3 0 -9" fill="#bfe3e3" stroke={C.teal} strokeWidth={1} />
        </g>
        <Arrow x1={192} x2={228} y={58} />
        <Cervix x={265} y={58} patch />
        <circle cx={281} cy={46} r={13} fill="none" stroke={C.teal} strokeWidth={2.5} />
        <line x1={290} y1={55} x2={298} y2={63} stroke={C.teal} strokeWidth={3.5} strokeLinecap="round" />
        <Text x={55} y={100} lines={lines(["See the", "cervix"], ["Wo ọrùn", "ilé-ọmọ"])} />
        <Text x={160} y={100} lines={lines(["Apply", "vinegar"], ["Fi ọtí kíkan", "sí i"])} />
        <Text x={265} y={100} lines={lines(["Look for", "white areas"], ["Wá ibi", "tó funfun"])} />
        <Text x={160} y={144} size={11} weight={600} fill={C.teal} lines={l({ en: "Result usually the same day", yo: "Àbájáde sábà máa ń wà ní ọjọ́ kan náà" })} />
      </g>
    ),
  },
  "hpv-pap": {
    alt: { en: "Two tests: an HPV test checks a sample for HPV in a laboratory; a Pap smear checks cells under a microscope.", yo: "Ìdánwò méjì: ìdánwò HPV ń wá HPV nínú àpẹẹrẹ ní ilé ìwádìí; Pap smear ń wo sẹ́ẹ̀lì lábẹ́ maikirosikóòpù." },
    draw: (l, lines) => (
      <g>
        <rect x={8} y={10} width={148} height={132} rx={14} fill="#ffffff" stroke={C.tealLight} strokeWidth={2} />
        <g transform="translate(82 56)">
          <rect x={-10} y={-30} width={20} height={52} rx={10} fill={C.tealLight} stroke={C.teal} strokeWidth={2} />
          <rect x={-10} y={-2} width={20} height={24} rx={10} fill={C.mint} />
          <rect x={-13} y={-34} width={26} height={7} rx={2} fill={C.teal} />
          <Virus x={30} y={-8} r={8} />
        </g>
        <Text x={82} y={102} size={13} weight={700} fill={C.teal} lines={l({ en: "HPV test", yo: "Ìdánwò HPV" })} />
        <Text x={82} y={119} size={10.5} fill={C.grey} lines={lines(["Lab checks the", "sample for HPV"], ["Ilé ìwádìí ń wá", "HPV nínú àpẹẹrẹ"])} />
        <rect x={164} y={10} width={148} height={132} rx={14} fill="#ffffff" stroke={C.tealLight} strokeWidth={2} />
        <g transform="translate(238 56)" stroke={C.ink} strokeWidth={2} fill="none" strokeLinecap="round">
          <rect x={-20} y={22} width={40} height={6} rx={2} fill={C.grey} stroke="none" />
          <path d="M8 22 V4 Q8 -6 -2 -12" />
          <rect x={-12} y={-30} width={10} height={24} rx={2} transform="rotate(-25 -7 -18)" fill={C.teal} stroke="none" />
          <rect x={-16} y={6} width={22} height={4} rx={1} fill={C.grey} stroke="none" />
          <rect x={-12} y={2} width={14} height={4} fill={C.roseLight} stroke={C.rose} strokeWidth={1} />
        </g>
        <Text x={238} y={102} size={13} weight={700} fill={C.teal} lines="Pap smear" />
        <Text x={238} y={119} size={10.5} fill={C.grey} lines={lines(["Cells checked under", "a microscope"], ["A wo sẹ́ẹ̀lì lábẹ́", "maikirosikóòpù"])} />
      </g>
    ),
  },
  prepare: {
    alt: { en: "Before screening: ask how to prepare, you can ask for privacy, and the test takes only a few minutes.", yo: "Ṣáájú àyẹ̀wò: béèrè bí o ṣe máa múra, o lè béèrè fún àṣírí, ìdánwò náà sì máa ń gba ìṣẹ́jú díẹ̀ péré." },
    draw: (_l, lines) => (
      <g>
        <Tile x={8} label={lines(["Ask how", "to prepare"], ["Béèrè bí o ṣe", "máa múra"])}>
          <rect x={-16} y={-24} width={32} height={44} rx={4} fill="#ffffff" stroke={C.teal} strokeWidth={2} />
          <rect x={-7} y={-28} width={14} height={7} rx={2} fill={C.teal} />
          {[-10, 0, 10].map((dy) => (
            <g key={dy}>
              <Check x={-7} y={dy} />
              <line x1={2} y1={dy} x2={11} y2={dy} stroke={C.line} strokeWidth={2} />
            </g>
          ))}
        </Tile>
        <Tile x={112} label={lines(["You can ask", "for privacy"], ["O lè béèrè", "fún àṣírí"])}>
          <rect x={-22} y={-22} width={44} height={40} rx={3} fill={C.tealLight} />
          <path d="M-22 -22 h14 v40 h-14 z M8 -22 h14 v40 h-14 z" fill={C.teal} opacity={0.8} />
          <line x1={-26} y1={-24} x2={26} y2={-24} stroke={C.grey} strokeWidth={3} strokeLinecap="round" />
        </Tile>
        <Tile x={216} label={lines(["Only a few", "minutes"], ["Ìṣẹ́jú díẹ̀", "péré"])}>
          <circle r={22} fill="#ffffff" stroke={C.teal} strokeWidth={3} />
          <line x1={0} y1={0} x2={0} y2={-13} stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
          <line x1={0} y1={0} x2={9} y2={4} stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
          <path d="M0 -22 A22 22 0 0 1 19 -11 L0 0 Z" fill={C.mint} opacity={0.8} />
        </Tile>
      </g>
    ),
  },
  after: {
    alt: { en: "Two kinds of result: normal means screen again later; abnormal usually means early changes that can be treated.", yo: "Àbájáde méjì: déédé túmọ̀ sí pé kí o tún ṣe àyẹ̀wò lẹ́yìn ìgbà díẹ̀; àìdéédé sábà jẹ́ àyípadà ìbẹ̀rẹ̀ tí a lè tọ́jú." },
    draw: (l, lines) => (
      <g>
        <rect x={10} y={12} width={144} height={126} rx={14} fill={C.tealLight} stroke={C.teal} strokeWidth={2} />
        <circle cx={82} cy={50} r={20} fill={C.teal} />
        <Check x={82} y={50} color="#ffffff" />
        <Text x={82} y={92} size={14} weight={700} fill={C.teal} lines={l({ en: "Normal", yo: "Déédé" })} />
        <Text x={82} y={110} size={11} lines={lines(["Screen again", "when advised"], ["Tún ṣe àyẹ̀wò", "nígbà tí a bá sọ"])} />
        <rect x={166} y={12} width={144} height={126} rx={14} fill={C.amberLight} stroke={C.amber} strokeWidth={2} />
        <circle cx={238} cy={50} r={20} fill={C.amber} />
        <Text x={238} y={57} size={20} weight={700} fill="#ffffff" lines="!" />
        <Text x={238} y={92} size={14} weight={700} fill="#9a6b00" lines={l({ en: "Abnormal", yo: "Àìdéédé" })} />
        <Text x={238} y={110} size={11} lines={lines(["Not cancer in most cases;", "can be treated"], ["Kì í sábà jẹ́ jẹjẹrẹ;", "a lè tọ́jú rẹ̀"])} />
      </g>
    ),
  },
  barriers: {
    alt: { en: "A woman talking with a caring nurse: health workers are trained to help you.", yo: "Obìnrin kan ń bá nọ́ọ̀sì olùtọ́jú sọ̀rọ̀: àwọn òṣìṣẹ́ ìlera ti kọ́ṣẹ́ láti ràn ọ́ lọ́wọ́." },
    draw: (l) => (
      <g>
        <Woman x={112} y={42} s={1.1} skin={skins[1]} dress={C.rose} />
        <Woman x={208} y={42} s={1.1} skin={skins[3]} nurse />
        <path d="M228 6 h58 a8 8 0 0 1 8 8 v22 a8 8 0 0 1 -8 8 h-40 l-10 8 v-8 h-8 a8 8 0 0 1 -8 -8 v-22 a8 8 0 0 1 8 -8 z" fill={C.tealLight} stroke={C.teal} strokeWidth={1.5} />
        <path d="M257 32 l-9 -9 a5.5 5.5 0 0 1 9 -6 a5.5 5.5 0 0 1 9 6 z" fill={C.rose} />
        <Text x={160} y={136} weight={600} lines={l({ en: "Health workers are trained to help you", yo: "Òṣìṣẹ́ ìlera ti kọ́ṣẹ́ láti ràn ọ́ lọ́wọ́" })} />
      </g>
    ),
  },
  motivation: {
    alt: { en: "A mother with her two children under a heart: your health matters to your family.", yo: "Ìyá kan pẹ̀lú ọmọ rẹ̀ méjì lábẹ́ ọkàn: ìlera rẹ ṣe pàtàkì fún ìdílé rẹ." },
    draw: (l) => (
      <g>
        <path d="M160 34 l-14 -14 a9 9 0 0 1 14 -10 a9 9 0 0 1 14 10 z" fill={C.rose} />
        <Woman x={160} y={50} s={1.05} skin={skins[0]} dress={C.teal} />
        <Woman x={118} y={74} s={0.62} skin={skins[0]} dress={C.amber} />
        <Woman x={202} y={74} s={0.62} skin={skins[0]} dress={C.mint} />
        <Text x={160} y={138} weight={600} lines={l({ en: "Your health matters to your family", yo: "Ìlera rẹ ṣe pàtàkì fún ìdílé rẹ" })} />
      </g>
    ),
  },
  where: {
    alt: { en: "Map sketch of Osun State with the two study hospitals: Asubiaro in Osogbo and Oke-Ogbo in Ile-Ife.", yo: "Àwòrán máàpù Ìpínlẹ̀ Ọ̀ṣun pẹ̀lú ilé ìwòsàn ìwádìí méjèèjì: Asubiaro ní Òṣogbo àti Oke-Ogbo ní Ile-Ife." },
    draw: (l) => (
      <g>
        <rect x={8} y={8} width={304} height={136} rx={14} fill={C.tealLight} />
        <Text x={20} y={26} anchor="start" size={11} fill={C.grey} weight={600} lines={l({ en: "Osun State", yo: "Ìpínlẹ̀ Ọ̀ṣun" })} />
        <path d="M84 62 C130 70 150 110 226 104" fill="none" stroke="#ffffff" strokeWidth={8} strokeLinecap="round" />
        <path d="M84 62 C130 70 150 110 226 104" fill="none" stroke={C.line} strokeWidth={2} strokeDasharray="6 5" />
        {[[84, 62], [226, 104]].map(([px, py]) => (
          <g key={px} transform={`translate(${px} ${py})`}>
            <path d="M0 0 C-14 -16 -14 -32 0 -32 C14 -32 14 -16 0 0 Z" fill={C.teal} />
            <path d="M0 -26 V-14 M-6 -20 H6" stroke="#ffffff" strokeWidth={3} />
          </g>
        ))}
        <Text x={84} y={80} size={12} weight={700} lines="Asubiaro" />
        <Text x={84} y={94} size={11} fill={C.grey} lines="Osogbo" />
        <Text x={226} y={122} size={12} weight={700} lines="Oke-Ogbo" />
        <Text x={226} y={136} size={11} fill={C.grey} lines="Ile-Ife" />
      </g>
    ),
  },
  "call-to-action": {
    alt: { en: "A calendar with a screening date circled and a reminder bell.", yo: "Kàlẹ́ńdà kan pẹ̀lú ọjọ́ àyẹ̀wò tí a yí ká àti agogo ìránnilétí." },
    draw: (l) => (
      <g>
        <rect x={96} y={14} width={128} height={104} rx={10} fill="#ffffff" stroke={C.teal} strokeWidth={2} />
        <rect x={96} y={14} width={128} height={24} rx={10} fill={C.teal} />
        <rect x={96} y={28} width={128} height={10} fill={C.teal} />
        {[118, 202].map((rx) => <rect key={rx} x={rx - 3} y={8} width={6} height={14} rx={3} fill={C.ink} />)}
        {Array.from({ length: 15 }, (_, i) => {
          const cx = 114 + (i % 5) * 23, cy = 54 + Math.floor(i / 5) * 22;
          return i === 8 ? (
            <g key={i}>
              <circle cx={cx} cy={cy} r={10} fill={C.mint} stroke={C.teal} strokeWidth={2} />
              <Check x={cx} y={cy} />
            </g>
          ) : <circle key={i} cx={cx} cy={cy} r={3} fill={C.line} />;
        })}
        <g transform="translate(262 52)">
          <path d="M-14 10 Q-14 -14 0 -14 Q14 -14 14 10 L18 14 H-18 Z" fill={C.amber} />
          <circle cy={18} r={4} fill={C.amber} />
          <path d="M20 -12 q6 6 0 14 M-20 -12 q-6 6 0 14" fill="none" stroke={C.amber} strokeWidth={2} strokeLinecap="round" />
        </g>
        <Text x={160} y={140} size={13} weight={700} fill={C.teal} lines={l({ en: "Choose your screening date", yo: "Yan ọjọ́ àyẹ̀wò rẹ" })} />
      </g>
    ),
  },
};

export const illustratedSlides = Object.keys(illustrations);

export function SlideIllustration({ id, language }: { id: string; language: Lang }) {
  const item = illustrations[id];
  if (!item) return null;
  const l = (b: Bi) => b[language];
  const lines = (en: string[], yo: string[]) => (language === "yo" ? yo : en);
  return (
    <svg
      viewBox="0 0 320 150"
      role="img"
      aria-label={item.alt[language]}
      className="block w-full h-auto mt-[12px] rounded-[10px] bg-[#f6fbfb]"
    >
      {item.draw(l, lines)}
    </svg>
  );
}
