import { assetPath } from '../utils/assets';

export type TrackId = 'DGA' | 'DGD' | 'IGD' | 'AFX' | 'DEN';

export interface CharacterCompanion {
  id: TrackId;
  name: string;
  englishName: string;
  roleTitle: string;
  image: string;
  isCircularPortrait?: boolean;
  personality: string;
  signatureQuote: string;
  itemName: string;
}

export interface TrackProfile {
  id: TrackId;
  code: TrackId;
  majorName: string;
  majorThai: string;
  districtName: string;
  districtShort: string;
  personaTitle: string;
  personaSubtitle: string;
  accentHex: string;
  secondaryHex: string;
  summary: string;
  strengths: string[];
  districtTasks: string[];
  careers: string[];
  character: CharacterCompanion;
}

export interface QuizChoice {
  id: string;
  track: TrackId;
  label: string;
  detail: string;
  reactionQuote: string;
  careerFocusKey?: string;
}

export interface StoryScene {
  id: string;
  sceneNumber: number; // 1 to 11
  code: string; // e.g. "1.1", "1.2", ..., "5.2"
  chapterTitle: string;
  chapterIndex: number;
  title: string;
  narrative: string;
  promptQuestion: string;
  featuredTracks: TrackId[]; // Which companion(s) appear on stage
  stageMood: 'monochrome' | 'awakening' | 'district' | 'gate' | 'teamwork' | 'festival';
  choices: QuizChoice[];
  isTieBreaker?: boolean;
}

export const TRACK_ORDER: TrackId[] = ['DGA', 'DGD', 'IGD', 'AFX', 'DEN'];

export const TRACKS: Record<TrackId, TrackProfile> = {
  DGA: {
    id: 'DGA',
    code: 'DGA',
    majorName: 'Digital Arts',
    majorThai: 'สาขาดิจิทัลอาร์ตส์',
    districtName: 'ย่านศิลป์: ตรอกจินตนาการ',
    districtShort: 'ตรอกจินตนาการ',
    personaTitle: 'นักรังสรรค์จินตนาการ',
    personaSubtitle: 'ผู้เสกเรื่องราวและความฝันให้ปรากฏเป็นภาพที่จับต้องได้',
    accentHex: '#8B5CF6',
    secondaryHex: '#C084FC',
    summary:
      'คุณมองโลกผ่านจินตนาการ อารมณ์ความรู้สึก และเส้นสายที่มีชีวิต ถนัดการถ่ายทอดเรื่องราวผ่านตัวละคร ฉากหลัง และภาพวาดที่ชวนให้ผู้คนดำดิ่งลงไปในโลกที่คุณสร้างขึ้น',
    strengths: [
      'สื่อสารอารมณ์และความหมายผ่านภาพวาดและโทนสีได้ลึกซึ้ง',
      'สร้างสรรค์ตัวละครและโลกแฟนตาซีที่มีเอกลักษณ์เฉพาะตัว',
      'เล่าเรื่องเป็นลำดับภาพได้อย่างมีพลัง (Visual Storytelling)',
    ],
    districtTasks: [
      'สร้างตัวละครที่มีเอกลักษณ์และบุคลิกชัดเจน',
      'วาดฉากหลังให้เรื่องเล่ามีชีวิตและบรรยากาศ',
      'เล่าเรื่องผ่าน Webtoon และ Comic ชวนติดตาม',
      'ออกแบบ Art Toy & Sticker คอลเลกชันน่าสะสม',
    ],
    careers: [
      'Illustrator',
      'Concept Artist',
      'Character Designer',
      'Webtoon Artist',
      'Storyboard Artist',
      'Art Toy Designer',
      'Background & Environment Artist',
      'Comic & Manga Creator',
      '2D Game Asset Artist',
      'Visual Development Artist',
    ],
    character: {
      id: 'DGA',
      name: 'น็อกเทีย (Noctia)',
      englishName: 'Noctia · District of Art',
      roleTitle: 'ผู้พิทักษ์ตรอกจินตนาการ',
      image: assetPath('assets/aistudio/20261121_101717_64532e71.png'),
      personality: 'ช่างฝัน ลึกซึ้ง และมองเห็นสีสันที่ซ่อนอยู่ในเงามืด',
      signatureQuote:
        '“แม้เมืองทั้งเมืองจะกลายเป็นสีเทา แต่ทุกเส้นร่างในสมุดสเก็ตช์ยังรอวันที่จะผลิบานอีกครั้งนะ”',
      itemName: 'สมุดสเก็ตช์ไร้หน้าจบ',
    },
  },
  DGD: {
    id: 'DGD',
    code: 'DGD',
    majorName: 'Digital Graphic Design',
    majorThai: 'สาขาการออกแบบกราฟิกดิจิทัล',
    districtName: 'ย่านดีไซน์: ถนนเอกลักษณ์',
    districtShort: 'ถนนเอกลักษณ์',
    personaTitle: 'นักสร้างอัตลักษณ์แห่งธานี',
    personaSubtitle: 'ผู้จัดระเบียบความงามและสลักตัวตนให้ผู้คนจดจำตั้งแต่แรกเห็น',
    accentHex: '#EC4899',
    secondaryHex: '#F472B6',
    summary:
      'คุณมีสายตาเฉียบคมเรื่ององค์ประกอบ ตัวอักษร โลโก้ และระบบภาพลักษณ์ รู้ว่าควรจัดวางสิ่งใดเพื่อให้ผู้คนเข้าใจได้ทันทีและจดจำแบรนด์หรือเรื่องราวได้อย่างแม่นยำ',
    strengths: [
      'จับใจความสำคัญแล้วแปลงเป็นสัญลักษณ์และงานดีไซน์ที่ชัดเจน',
      'เข้าใจจังหวะของ Typography, Layout และระบบสีอย่างมีหลักการ',
      'ออกแบบประสบการณ์ผู้ใช้และสื่อสิ่งพิมพ์/ดิจิทัลให้ลงตัว',
    ],
    districtTasks: [
      'ออกแบบป้ายสัญลักษณ์และโลโก้แบรนด์ประจำเมือง',
      'วางโครงสร้างหน้าจอแอปและเว็บไซต์ (UI Design)',
      'ออกแบบบรรจุภัณฑ์คอลเลกชันพิเศษที่น่าสะสม',
      'สร้างโปสเตอร์ขนาดใหญ่ใจกลางเทศกาลเมือง',
    ],
    careers: [
      'Graphic Designer',
      'Brand Identity Designer',
      'Art Director',
      'UI Designer',
      'Packaging Designer',
      'Motion Graphic Designer',
      'Editorial & Layout Designer',
      'Typography Designer',
      'Visual Communication Strategist',
      'Creative Retoucher & Print Specialist',
    ],
    character: {
      id: 'DGD',
      name: 'ไอริส (Iris)',
      englishName: 'Iris · District of Design',
      roleTitle: 'สถาปนิกภาพลักษณ์แห่งถนนเอกลักษณ์',
      image: assetPath('assets/aistudio/20261121_101705_a6658e53.png'),
      personality: 'มีสไตล์ชัดเจน เฉียบคมเรื่องดีเทล และรักความสมดุลของงานออกแบบ',
      signatureQuote:
        '“ป้ายเมืองที่ชัดเจนกับคู่สีที่ลงตัว จะนำทางผู้คนที่หลงทางให้กลับมาหากันได้เสมอ”',
      itemName: 'ชุดสีและตัวอักษรวิเศษ',
    },
  },
  IGD: {
    id: 'IGD',
    code: 'IGD',
    majorName: 'Interactive and Game Design',
    majorThai: 'สาขาการออกแบบอินเทอร์แอคทีฟและเกม',
    districtName: 'ย่านเกม: สนามแห่งการเล่น',
    districtShort: 'สนามแห่งการเล่น',
    personaTitle: 'นักสร้างเป้าหมายแห่งเกม',
    personaSubtitle: 'ผู้ออกแบบกติกา กลไก และความท้าทายที่ทำให้ทุกการก้าวเดินมีความหมาย',
    accentHex: '#F59E0B',
    secondaryHex: '#FBBF24',
    summary:
      'คุณคิดเป็นระบบ ชอบทดลองกลไก แก้ปริศนา และออกแบบประสบการณ์ที่ผู้เล่นได้ลงมือโต้ตอบจริง คุณเชื่อว่าความสนุกและเป้าหมายที่ท้าทายคือหัวใจของการเรียนรู้',
    strengths: [
      'ออกแบบกติกา ระดับความยากง่าย และกลไกเกมให้สมดุล (Game Loop)',
      'เปลี่ยนปัญหาที่ซับซ้อนให้กลายเป็นด่านที่ชวนทดลองและแก้ได้',
      'เชื่อมโยงงานศิลป์ เทคโนโลยี และความสนุกเข้าด้วยกันเป็นโลกที่เล่นได้จริง',
    ],
    districtTasks: [
      'คิดกติกาและออกแบบระบบด่าน (Level Design)',
      'ออกแบบฉากและตัวละครที่โต้ตอบได้ในเกม',
      'สร้างโลกเสมือนจริงแบบ VR / AR',
      'วางแผนและดูแลทีมผลิตเกมตั้งแต่ต้นจนจบ',
    ],
    careers: [
      'Game Designer',
      'Level Designer',
      'Game Artist',
      'UI/UX for Games',
      'VR/AR Experience Designer',
      'Game Producer',
      'Systems & Economy Designer',
      'Narrative & Quest Designer',
      'Interactive Installation Designer',
      'Playtest & QA Lead',
    ],
    character: {
      id: 'IGD',
      name: 'มิโกะ (Miko)',
      englishName: 'Miko · District of Games',
      roleTitle: 'เกมมาสเตอร์ประจำสนามแห่งการเล่น',
      image: assetPath('assets/aistudio/20261121_101655_6163b959.png'),
      personality: 'คล่องแคล่ว ช่างสังเกต ชอบไขปริศนาและท้าทายทุกกติกาใหม่ๆ',
      signatureQuote:
        '“ทุกอุปสรรคในเมืองนี้ก็เหมือนบอสด่านหนึ่ง—แค่หาแพตเทิร์นของมันให้เจอ เราก็ผ่านไปได้!”',
      itemName: 'ตลับเกมเก่าปริศนา',
    },
  },
  AFX: {
    id: 'AFX',
    code: 'AFX',
    majorName: 'Computer Animation and Visual Effects',
    majorThai: 'สาขาคอมพิวเตอร์แอนิเมชันและวิชวลเอฟเฟกต์',
    districtName: 'ย่านภาพยนตร์: กำแพงเรื่องราว',
    districtShort: 'กำแพงเรื่องราว',
    personaTitle: 'ผู้มอบชีวิตแด่ภาพ',
    personaSubtitle: 'ผู้ปลุกทุกโมเดล แสง เงา และเอฟเฟกต์ให้เคลื่อนไหวราวกับมีลมหายใจ',
    accentHex: '#38BDF8',
    secondaryHex: '#60A5FA',
    summary:
      'คุณหลงใหลในมิติ การเคลื่อนไหว แสงเงา และภาพยนตร์วิชวลเอฟเฟกต์ คุณมีความอดทนและความละเอียดในการปั้น 3D และประกอบภาพจนสิ่งที่ไม่มีอยู่จริงดูสมจริงน่าอัศจรรย์',
    strengths: [
      'เข้าใจจังหวะการเคลื่อนไหว น้ำหนัก และแอ็กชันของตัวละคร 3D',
      'เชี่ยวชาญการสร้างแสง บรรยากาศ และเอฟเฟกต์พิเศษ (VFX)',
      'ผสานหลายเลเยอร์ของภาพเข้าด้วยกันเป็นซีนภาพยนตร์ที่น่าตื่นตา',
    ],
    districtTasks: [
      'ขยับตัวละคร 3D ให้เคลื่อนไหวสมจริงมีชีวิต',
      'ปั้นโมเดล 3 มิติขึ้นมาจากความว่างเปล่า',
      'สร้างเอฟเฟกต์ระเบิด ไฟ น้ำ และควัน (VFX Simulation)',
      'รวมภาพและปรับแสงสีขั้นสูงแบบ Compositing',
    ],
    careers: [
      '3D Animator',
      '3D Modeler',
      'VFX Artist',
      'Compositor',
      'Rigging Artist',
      'Lighting & Texture Artist',
      'FX Simulation Technical Artist',
      'Look Development Artist',
      'Virtual Production Specialist',
      '3D Generalist',
    ],
    character: {
      id: 'AFX',
      name: 'ลูมิน่า (Lumina)',
      englishName: 'Lumina · District of Animation & VFX',
      roleTitle: 'ผู้จุดประกายแสงแห่งกำแพงเรื่องราว',
      image: assetPath('assets/aistudio/20261121_101642_7dc323b1.png'),
      personality: 'สง่างาม ละเอียดอ่อนเรื่องแสงและมิติ และเชื่อในพลังของการเคลื่อนไหว',
      signatureQuote:
        '“แสงเพียงหนึ่งเฟรมสามารถเปลี่ยนความนิ่งงันให้กลายเป็นปาฏิหาริย์ที่เคลื่อนไหวได้”',
      itemName: 'กล้องฟิล์มภาพเคลื่อนไหว',
    },
  },
  DEN: {
    id: 'DEN',
    code: 'DEN',
    majorName: 'Digital Entertainment',
    majorThai: 'สาขาดิจิทัลเอนเตอร์เทนเมนต์',
    districtName: 'ย่านบันเทิง: เวทีแห่งตัวตน',
    districtShort: 'เวทีแห่งตัวตน',
    personaTitle: 'ผู้รวมใจให้เป็นหนึ่ง',
    personaSubtitle: 'ผู้เชื่อมโยงเสียงหัวเราะ คอนเทนต์ และผู้คนทั้งเมืองให้กลับมามีรอยยิ้ม',
    accentHex: '#FB7185',
    secondaryHex: '#F9A8D4',
    summary:
      'คุณมีพลังในการสื่อสาร เข้าใจผู้คน และรู้วิธีสร้างความบันเทิงที่ดึงดูดใจ ไม่ว่าจะเป็นการทำรายการ สตรีมมิง VTuber หรือการจัดเทศกาลที่ทำให้ทุกคนมีส่วนร่วม',
    strengths: [
      'มองเห็นกระแส ความต้องการของผู้ชม และจังหวะการเล่าเรื่องที่สนุก',
      'ประสานงานผู้คนและสร้างคอมมูนิตี้ที่อบอุ่นมีชีวิตชีวา',
      'สร้างสรรค์โชว์ อีเวนต์ และคอนเทนต์ดิจิทัลที่จุดประกายรอยยิ้ม',
    ],
    districtTasks: [
      'คิดรูปแบบรายการและคอนเทนต์ดิจิทัลสุดสร้างสรรค์',
      'ออกแบบงานอีเวนต์และโชว์บนเวทีใหญ่',
      'ทำงานเบื้องหลังสตรีมเมอร์และ VTuber มืออาชีพ',
      'วางกลยุทธ์และสร้างชุมชนแฟนคลับให้เติบโต',
    ],
    careers: [
      'Content Creator',
      'Event / Show Producer',
      'Streaming & VTuber Producer',
      'Entertainment Marketer',
      'Creative Show Director',
      'Community & Fandom Manager',
      'Digital Media Strategist',
      'Live Broadcast Producer',
      'Talent & Creator Manager',
      'Podcast & Audio Showrunner',
    ],
    character: {
      id: 'DEN',
      name: 'ยูเมะ (Yume)',
      englishName: 'Yume · District of Entertainment',
      roleTitle: 'ดาวเด่นประจำเวทีแห่งตัวตน',
      image: assetPath('assets/aistudio/20261121_101627_5da72b21.png'),
      personality: 'ร่าเริง อบอุ่น เข้าถึงง่าย และสามารถชวนทุกคนมารวมพลังกันได้เสมอ',
      signatureQuote:
        '“เวทีที่สว่างที่สุดไม่ได้เกิดจากไฟสปอตไลต์ดวงเดียว แต่เกิดจากเสียงปรบมือของทุกคนต่างหาก!”',
      itemName: 'ไมโครโฟนเสียงก้องทั่วเมือง',
    },
  },
};

export const SCENES: StoryScene[] = [
  {
    id: 'scene-1-1',
    sceneNumber: 1,
    code: '1.1',
    chapterIndex: 1,
    chapterTitle: 'บทที่ 1: ก้าวแรกในเมืองไร้สี',
    title: 'ทางแยก 5 สายหน้าจัตุรัสเมือง',
    narrative:
      'เที่ยงคืนตรงใน Imagine City สีสันบนท้องฟ้าค่อย ๆ เลือนหายไปเหลือเพียงโทนขาวดำ มีเพียงดวงไฟนำทางดวงเล็กกลางจัตุรัสที่กะพริบแสงพาสเทลอ่อน ๆ ส่องไปยังทางแยก 5 สายตรงหน้า เพื่อนร่วมทางทั้ง 5 กำลังรอฟังว่าสายตาของคุณถูกดึงดูดไปยังถนนสายใดก่อนเป็นอันดับแรก',
    promptQuestion: 'แสงแรกจากดวงไฟนำทางดึงดูดให้คุณก้าวไปที่ถนนสายไหน?',
    featuredTracks: ['DGA', 'DGD', 'IGD', 'AFX', 'DEN'],
    stageMood: 'monochrome',
    choices: [
      {
        id: '1-1-dga',
        track: 'DGA',
        label: 'ถนนภาพวาดที่ผนังตึกยังมีรอยฝีแปรงเรืองแสง',
        detail: 'น็อกเทียชี้ให้ดูภาพสเก็ตช์ตัวละครที่กำลังรอสีสันกลับมา',
        reactionQuote: 'น็อกเทีย: “ลายเส้นบนกำแพงนั่น... เหมือนมันกำลังเรียกชื่อเธออยู่เลย”',
      },
      {
        id: '1-1-dgd',
        track: 'DGD',
        label: 'ถนนป้ายโลโก้และโปสเตอร์นีออนที่ตัวอักษรยังสว่างจาง ๆ',
        detail: 'ไอริสกำลังจัดเรียงป้ายบอกทางที่กระจัดกระจายให้กลับมาอ่านง่าย',
        reactionQuote: 'ไอริส: “ถ้าป้ายสัญลักษณ์กลับมาชัดเจน ทั้งเมืองก็จะรู้ทิศทางอีกครั้ง”',
      },
      {
        id: '1-1-igd',
        track: 'IGD',
        label: 'ถนนแสงไฟเกมที่มีแท่นปริศนาและจุดเช็กพอยต์กะพริบอยู่',
        detail: 'มิโกะกำลังสำรวจแผงควบคุมกลไกที่ซ่อนอยู่ใต้พื้นถนน',
        reactionQuote: 'มิโกะ: “ดูสิ! บนพื้นมีรหัสลับซ่อนอยู่ น่าสนุกชะมัด!”',
      },
      {
        id: '1-1-afx',
        track: 'AFX',
        label: 'ถนนเครื่องฉายหนังที่ละอองแสง 3 มิติลอยฟุ้งกลางอากาศ',
        detail: 'ลูมิน่ามองไปยังฟิล์มแสงที่หยุดนิ่งกลางท้องฟ้า',
        reactionQuote: 'ลูมิน่า: “ถ้าเราจุดประกายแสงให้เฟรมแรกขยับได้ เมืองนี้ก็จะกลับมามีชีวิต”',
      },
      {
        id: '1-1-den',
        track: 'DEN',
        label: 'ถนนเสียงดนตรีที่มีเวทีกลางแจ้งและเสียงฮัมเพลงเบา ๆ',
        detail: 'ยูเมะกำลังทดสอบไมโครโฟนที่ยังส่งคลื่นเสียงออกไปได้ไกล',
        reactionQuote: 'ยูเมะ: “ได้ยินไหม? ชาวเมืองยังรอฟังเสียงประกาศเริ่มงานเทศกาลอยู่นะ!”',
      },
    ],
  },
  {
    id: 'scene-1-2',
    sceneNumber: 2,
    code: '1.2',
    chapterIndex: 1,
    chapterTitle: 'บทที่ 1: ก้าวแรกในเมืองไร้สี',
    title: 'ของติดตัวก่อนออกเดินทาง',
    narrative:
      'ก่อนก้าวออกจากจัตุรัสกลางเมือง ดวงไฟนำทางมอบอุปกรณ์คู่ใจให้คุณเลือกพกติดตัวได้เพียง 1 ชิ้น เพื่อใช้กู้คืนสีสันตลอดคืนนี้ ของสิ่งนี้จะกลายเป็นอาวุธหลักในการเดินทางของคุณ',
    promptQuestion: 'คุณจะเลือกพกสิ่งใดติดตัวไปตลอดคืนนี้?',
    featuredTracks: ['DGA', 'DGD', 'IGD', 'AFX', 'DEN'],
    stageMood: 'monochrome',
    choices: [
      {
        id: '1-2-dga',
        track: 'DGA',
        label: 'สมุดสเก็ตช์ไร้หน้าจบ',
        detail: 'ทุกสิ่งที่วาดลงไปจะส่องประกายนำทางในความมืด',
        reactionQuote: 'น็อกเทีย: “ตราบใดที่หน้ากระดาษยังไม่หมด จินตนาการของเธอก็ไม่มีวันสิ้นสุด”',
      },
      {
        id: '1-2-dgd',
        track: 'DGD',
        label: 'ชุดสีและตัวอักษรวิเศษ',
        detail: 'สามารถจัดวางโลโก้ ป้าย และคู่สีให้โลกมองเห็นได้ชัดเจน',
        reactionQuote: 'ไอริส: “เลือกได้ดี! คู่สีที่ใช่เพียงไม่กี่สีก็เปลี่ยนอารมณ์ทั้งเมืองได้แล้ว”',
      },
      {
        id: '1-2-igd',
        track: 'IGD',
        label: 'ตลับเกมเก่าปริศนา',
        detail: 'บรรจุกลไกและด่านลับที่ช่วยไขทางตันทุกรูปแบบ',
        reactionQuote: 'มิโกะ: “ตลับนี้แหละที่จะเปิดประตูกลไกของเมืองได้!”',
      },
      {
        id: '1-2-afx',
        track: 'AFX',
        label: 'กล้องฟิล์มภาพเคลื่อนไหว',
        detail: 'บันทึกมิติ แสงเงา และปลุกภาพนิ่งให้เคลื่อนไหวได้จริง',
        reactionQuote: 'ลูมิน่า: “ผ่านเลนส์นี้ เธอจะมองเห็นจังหวะการเคลื่อนไหวที่คนอื่นมองข้าม”',
      },
      {
        id: '1-2-den',
        track: 'DEN',
        label: 'ไมโครโฟนเสียงก้องทั่วเมือง',
        detail: 'ส่งต่อเสียง เรื่องเล่า และพลังใจไปยังชาวเมืองทุกคนพร้อมกัน',
        reactionQuote: 'ยูเมะ: “แค่เธอพูดคำแรก ทุกคนในเมืองก็พร้อมจะหันมามองแล้วล่ะ!”',
      },
    ],
  },
  {
    id: 'scene-2-1',
    sceneNumber: 3,
    code: '2.1',
    chapterIndex: 2,
    chapterTitle: 'บทที่ 2: เสียงเรียกจากชาวเมือง',
    title: 'สะพานข้ามแม่น้ำที่พังครึ่งทาง',
    narrative:
      'เมื่อเดินมาถึงริมแม่น้ำสายหลักที่กั้นระหว่างจัตุรัสกับเขตเมืองชั้นใน คุณพบว่าสะพานข้ามแม่น้ำพังทลายไปครึ่งหนึ่ง ชาวเมืองที่ยืนรออยู่ฝั่งตรงข้ามเริ่มหมดหวัง หากข้ามไปไม่ได้ เทศกาลคืนนี้คงไม่อาจเกิดขึ้นได้',
    promptQuestion: 'คุณจะใช้วิธีไหนในการพากลุ่มเดินทางและชาวเมืองข้ามฝั่งแม่น้ำ?',
    featuredTracks: ['DGA', 'DGD', 'IGD', 'AFX', 'DEN'],
    stageMood: 'awakening',
    choices: [
      {
        id: '2-1-dga',
        track: 'DGA',
        label: 'วาดสะพานใหม่ด้วยเส้นและสีสันที่พาดผ่านกลางอากาศ',
        detail: 'ใช้จินตนาการสร้างโครงสร้างศิลป์ที่แข็งแรงและงดงาม',
        reactionQuote: 'น็อกเทีย: “สะพานสีม่วงทองที่เธอวาดขึ้นมาสวยจนแม่น้ำสะท้อนแสงเลย!”',
      },
      {
        id: '2-1-dgd',
        track: 'DGD',
        label: 'ทำป้ายเตือน จุดนำทาง และแผนผังทางอ้อมที่ชัดเจนที่สุด',
        detail: 'จัดระเบียบการเดินทัพให้ทุกคนข้ามจุดปลอดภัยได้โดยไม่สับสน',
        reactionQuote: 'ไอริส: “ป้ายสะท้อนแสงที่วางเป็นระบบช่วยให้ทุกคนเดินต่อได้อย่างมั่นใจ”',
      },
      {
        id: '2-1-igd',
        track: 'IGD',
        label: 'ไขกลไกฟันเฟืองใต้ตอม่อสะพานให้กลับมาทำงานอีกครั้ง',
        detail: 'วิเคราะห์ลำดับการเชื่อมต่อของสะพานเหมือนการแก้พัซเซิล',
        reactionQuote: 'มิโกะ: “คลิก! เชื่อมกลไกครบสามจุด สะพานเลื่อนกลับมาพอดีเป๊ะ!”',
      },
      {
        id: '2-1-afx',
        track: 'AFX',
        label: 'สร้างภาพสะพาน 3 มิติที่ประกอบชิ้นส่วนเข้าหากันกลางอากาศ',
        detail: 'จำลองแรงโน้มถ่วงและประกอบโครงสร้างจากอนุภาคแสง',
        reactionQuote: 'ลูมิน่า: “เศษหินที่ลอยกลับมารวมตัวกันช้า ๆ ดูราวกับฉากไคลแมกซ์ในหนังเลย”',
      },
      {
        id: '2-1-den',
        track: 'DEN',
        label: 'ชวนชาวเมืองสองฝั่งมาร่วมแรงซ่อมและเปิดเพลงฉลองไปด้วยกัน',
        detail: 'เปลี่ยนวิกฤตให้เป็นกิจกรรมรวมพลังที่สนุกและอบอุ่น',
        reactionQuote: 'ยูเมะ: “พอทุกคนร้องเพลงนับจังหวะพร้อมกัน งานใหญ่แค่ไหนก็เสร็จไวทันตา!”',
      },
    ],
  },
  {
    id: 'scene-2-2',
    sceneNumber: 4,
    code: '2.2',
    chapterIndex: 2,
    chapterTitle: 'บทที่ 2: เสียงเรียกจากชาวเมือง',
    title: 'เด็กน้อยร้องไห้เพราะตัวการ์ตูนที่รักหายไป',
    narrative:
      'พ้นจากสะพานมาไม่ไกล คุณได้ยินเสียงสะอื้นของเด็กน้อยหน้าหอนาฬิกาเก่า ความไร้สีสันทำให้ตัวการ์ตูนตัวโปรดในหนังสือภาพของน้องเลือนหายไป เด็กน้อยกอดหน้ากระดาษว่างเปล่าไว้แน่นด้วยความเสียใจ',
    promptQuestion: 'คุณจะปลอบใจและช่วยคืนรอยยิ้มให้เด็กน้อยคนนี้ด้วยวิธีใด?',
    featuredTracks: ['DGA', 'DGD', 'IGD', 'AFX', 'DEN'],
    stageMood: 'awakening',
    choices: [
      {
        id: '2-2-dga',
        track: 'DGA',
        label: 'วาดตัวการ์ตูนตัวนั้นขึ้นมาใหม่ให้มีชีวิตชีวายิ่งกว่าเดิม',
        detail: 'เติมแววตา รอยยิ้ม และรายละเอียดชุดที่เด็กน้อยจำได้แม่น',
        reactionQuote: 'น็อกเทีย: “ดูสิ แววตาของเด็กน้อยสว่างขึ้นพร้อมกับลายเส้นของเธอเลย”',
      },
      {
        id: '2-2-dgd',
        track: 'DGD',
        label: 'ทำชุดสติกเกอร์และโปสเตอร์ที่ระลึกของตัวการ์ตูนให้เก็บสะสม',
        detail: 'ออกแบบแพ็กเกจสวยหรูพร้อมโลโก้ชื่อตัวละครให้เป็นของขวัญ',
        reactionQuote: 'ไอริส: “โปสเตอร์นี้จัดวางสวยจนเด็กน้อยยิ้มแก้มปริไม่ยอมวางเลยนะ”',
      },
      {
        id: '2-2-igd',
        track: 'IGD',
        label: 'สร้างมินิเกมเล็ก ๆ ให้เด็กน้อยได้บังคับตัวละครกระโดดเล่นด้วยกัน',
        detail: 'เปลี่ยนความเศร้าให้เป็นการผจญภัยสั้น ๆ ที่โต้ตอบได้ทันที',
        reactionQuote: 'มิโกะ: “พอได้กดปุ่มกระโดดเก็บดาว เด็กน้อยก็หัวเราะออกมาทันทีเลย!”',
      },
      {
        id: '2-2-afx',
        track: 'AFX',
        label: 'เสกให้ตัวการ์ตูนก้าวออกมาจากกระดาษ เดิน โบกมือ และพูดคุยได้',
        detail: 'ใส่แอนิเมชันและแสงเงาให้ตัวละครขยับได้จริงตรงหน้า',
        reactionQuote: 'ลูมิน่า: “แค่ขยับมือทักทายได้หนึ่งครั้ง เวทมนตร์แห่งภาพก็เกิดขึ้นแล้ว”',
      },
      {
        id: '2-2-den',
        track: 'DEN',
        label: 'ชวนเด็ก ๆ แถวนั้นมานั่งล้อมวงฟังเรื่องเล่าการผจญภัยของตัวการ์ตูน',
        detail: 'สร้างบรรยากาศโชว์เล่านิทานที่มีเสียงเอฟเฟกต์และเสียงหัวเราะ',
        reactionQuote: 'ยูเมะ: “จากเด็กคนเดียว กลายเป็นวงเล่านิทานแสนอบอุ่นทั้งซอยเลย!”',
      },
    ],
  },
  {
    id: 'scene-2-3',
    sceneNumber: 5,
    code: '2.3',
    chapterIndex: 2,
    chapterTitle: 'บทที่ 2: เสียงเรียกจากชาวเมือง',
    title: 'ประตูเมืองชั้นในและหอคอยเข็มทิศ',
    narrative:
      'แสงสีแรกจากรอยยิ้มของชาวเมืองเริ่มไหลมารวมที่หอคอยเข็มทิศใจกลางเมือง ประตูสู่ 5 ย่านสร้างสรรค์ของ Imagine City กำลังหมุนปรับทิศทางเพื่อเปิดรับตัวตนที่ชัดเจนที่สุดในตัวคุณตอนนี้',
    promptQuestion: 'ก่อนประตูย่านจะเปิดออก อะไรคือสิ่งที่คุณอยากลงมือสร้างมากที่สุดเมื่อมีพลังคืนสีสันอยู่ในมือ?',
    featuredTracks: ['DGA', 'DGD', 'IGD', 'AFX', 'DEN'],
    stageMood: 'awakening',
    choices: [
      {
        id: '2-3-dga',
        track: 'DGA',
        label: 'สร้างโลกและตัวละครที่ไม่มีใครเคยเห็นมาก่อนด้วยมือตัวเอง',
        detail: 'อยากเห็นภาพในหัวกลายเป็นผลงานศิลปะที่คนดูหลงรัก',
        reactionQuote: 'น็อกเทีย: “ประตูตรอกจินตนาการกำลังสั่นสะเทือนรับเสียงหัวใจของเธอแล้ว”',
      },
      {
        id: '2-3-dgd',
        track: 'DGD',
        label: 'พลิกโฉมภาพลักษณ์และงานดีไซน์ทั้งเมืองให้ทันสมัยและน่าจดจำ',
        detail: 'อยากให้ทุกสายตาหยุดมองและเข้าใจสารที่ต้องการสื่อในวินาทีเดียว',
        reactionQuote: 'ไอริส: “ถนนเอกลักษณ์เปิดไฟต้อนรับสไตล์ที่ชัดเจนของเธอแล้วล่ะ”',
      },
      {
        id: '2-3-igd',
        track: 'IGD',
        label: 'ออกแบบระบบความสนุกและด่านท้าทายให้ทุกคนได้เข้ามาร่วมเล่น',
        detail: 'อยากเห็นผู้คนตื่นเต้นกับการค้นหาความลับและผ่านด่านไปด้วยกัน',
        reactionQuote: 'มิโกะ: “สนามแห่งการเล่นพร้อมโหลดด่านใหม่สำหรับเธอแล้ว!”',
      },
      {
        id: '2-3-afx',
        track: 'AFX',
        label: 'เนรมิตฉากภาพยนตร์ 3D และวิชวลเอฟเฟกต์ที่สะกดทุกสายตา',
        detail: 'อยากปลุกภาพนิ่งให้เคลื่อนไหวและตระการตาเกินจินตนาการ',
        reactionQuote: 'ลูมิน่า: “กำแพงเรื่องราวกำลังฉายแสงสีฟ้าต้อนรับเธอแล้วนะ”',
      },
      {
        id: '2-3-den',
        track: 'DEN',
        label: 'รันเวทีและสร้างคอนเทนต์แห่งความสุขที่เชื่อมคนทั้งเมืองเข้าด้วยกัน',
        detail: 'อยากเป็นพลังบวกเบื้องหน้าและเบื้องหลังที่ทำให้ทุกคนสนุกไปด้วยกัน',
        reactionQuote: 'ยูเมะ: “เสียงเชียร์จากเวทีแห่งตัวตนดังขึ้นเพื่อรอเธออยู่ตรงนั้น!”',
      },
    ],
  },
  // Scene 3.1 (Scene 6) is dynamically generated per unlocked district(s)!
  // Scene 3.2 (Scene 7) is the Rock Gate Trial (ด่านทดสอบหน้าประตูหินผา)!
  {
    id: 'scene-3-2',
    sceneNumber: 7,
    code: '3.2',
    chapterIndex: 3,
    chapterTitle: 'บทที่ 3: สำรวจย่านที่สะท้อนตัวตน',
    title: 'ด่านทดสอบหน้าประตูหินผา',
    narrative:
      'ที่ปลายสุดของย่านสร้างสรรค์ มี “ประตูหินผา” บานมหึมาขวางทางก่อนเข้าสู่เขตรวมพลของนักเดินทางทั้ง 5 ประตูนี้จะเปิดออกเฉพาะผู้ที่มีความมุ่งมั่นและทักษะที่พร้อมจะฝึกฝนซ้ำแล้วซ้ำเล่าทุกวัน',
    promptQuestion: 'ทักษะใดที่คุณเต็มใจจะฝึกฝนและขัดเกลาอย่างไม่รู้จักเหน็ดเหนื่อยเพื่อเปิดประตูบานนี้?',
    featuredTracks: ['DGA', 'DGD', 'IGD', 'AFX', 'DEN'],
    stageMood: 'gate',
    choices: [
      {
        id: '3-2-dga',
        track: 'DGA',
        label: 'ฝึกวาดโครงสร้าง แสงเงา และเล่าเรื่องผ่านภาพในสมุดสเก็ตช์ทุกวัน',
        detail: 'พัฒนาฝีแปรงและการออกแบบคาแรกเตอร์ให้เฉียบคมยิ่งขึ้น',
        reactionQuote: 'น็อกเทีย: “ความสม่ำเสมอในทุกลายเส้นคือเวทมนตร์ที่แท้จริงของศิลปิน”',
      },
      {
        id: '3-2-dgd',
        track: 'DGD',
        label: 'ฝึกจัดวางเลย์เอาต์ ทดลองคู่สี และวิเคราะห์งานออกแบบระดับโลก',
        detail: 'ขัดเกลาสายตาและเหตุผลเบื้องหลังทุกองค์ประกอบกราฟิก',
        reactionQuote: 'ไอริส: “ดีไซเนอร์ที่เก่งไม่ได้แค่วางสวย แต่รู้ว่าวางไว้เพื่ออะไร”',
      },
      {
        id: '3-2-igd',
        track: 'IGD',
        label: 'ฝึกออกแบบกลไกเกม ปรับบาลานซ์ และทดสอบเล่นซ้ำจนลงตัว',
        detail: 'ไม่กลัวบั๊กหรือความล้มเหลว เพราะทุกครั้งที่แก้คือการอัปเลเวล',
        reactionQuote: 'มิโกะ: “คนที่ยอมเทสต์เกมซ้ำเป็นร้อยรอบคือคนที่สร้างเกมระดับตำนานได้!”',
      },
      {
        id: '3-2-afx',
        track: 'AFX',
        label: 'ฝึกปั้นโมเดล จับจังหวะคีย์เฟรม และเรนเดอร์แสงทีละเฟรมอย่างประณีต',
        detail: 'ใส่ใจรายละเอียดเล็กที่สุดเพื่อให้ภาพเคลื่อนไหวสมบูรณ์แบบ',
        reactionQuote: 'ลูมิน่า: “ความอดทนทีละเฟรมจะรวมกันเป็นความอัศจรรย์บนจอใหญ่”',
      },
      {
        id: '3-2-den',
        track: 'DEN',
        label: 'ฝึกคิดไอเดียรายการ สื่อสารหน้ากล้อง และบริหารทีมงานโชว์ทุกวัน',
        detail: 'เรียนรู้เทรนด์ใหม่ ๆ เพื่อเข้าถึงหัวใจของผู้ชมทุกกลุ่ม',
        reactionQuote: 'ยูเมะ: “ความเข้าใจผู้คนบวกกับพลังสร้างสรรค์จะเปิดทุกประตูให้เธอเลย!”',
      },
    ],
  },
  {
    id: 'scene-4-1',
    sceneNumber: 8,
    code: '4.1',
    chapterIndex: 4,
    chapterTitle: 'บทที่ 4: เพื่อนร่วมทาง',
    title: 'ห้าพลังรวมตัวหลังประตูหินผา',
    narrative:
      'ประตูหินผาเปิดออกเผยให้เห็นลานเตรียมงานของเทศกาล Imagine Design Event น็อกเทีย ไอริส มิโกะ ลูมิน่า และยูเมะ มายืนเคียงข้างกันพร้อมกับคุณ ทุกคนต่างมีหน้าที่สำคัญในการเนรมิตเวทีใหญ่ให้คืนชีพก่อนรุ่งสาง',
    promptQuestion: 'เมื่อต้องรับบทบาทหลักในทีมนักเดินทางทั้ง 5 คุณอยากจับงานส่วนไหนเป็นอันดับแรก?',
    featuredTracks: ['DGA', 'DGD', 'IGD', 'AFX', 'DEN'],
    stageMood: 'teamwork',
    choices: [
      {
        id: '4-1-dga',
        track: 'DGA',
        label: 'วางภาพคอนเซปต์อาร์ตหลักและดีไซน์มาสคอตประจำเทศกาล',
        detail: 'กำหนดโทนภาพและอารมณ์ของโลกแฟนตาซีให้ทีมเดินตาม',
        reactionQuote: 'น็อกเทีย: “ถ้างั้นเรามาช่วยกันร่างภาพหลักของเวทีนี้เลยนะ!”',
      },
      {
        id: '4-1-dgd',
        track: 'DGD',
        label: 'ออกแบบโลโก้เทศกาล ป้ายเวที และอินเทอร์เฟซตารางงานทั้งหมด',
        detail: 'สร้างระบบภาพลักษณ์ให้ทุกจุดในงานดูเป็นอันหนึ่งอันเดียวกัน',
        reactionQuote: 'ไอริส: “แบรนด์ดิ้งของเทศกาลจะโดดเด่นที่สุดก็คราวนี้แหละ”',
      },
      {
        id: '4-1-igd',
        track: 'IGD',
        label: 'ออกแบบโซนกิจกรรมอินเทอร์แอคทีฟและระบบภารกิจให้ผู้ร่วมงานเล่น',
        detail: 'เชื่อมเวทีกับผู้ชมให้ทุกคนได้ร่วมเล่นและปลดล็อกสีสัน',
        reactionQuote: 'มิโกะ: “เดี๋ยวฉันช่วยวางระบบจุดเช็กพอยต์รอบจัตุรัสเอง!”',
      },
      {
        id: '4-1-afx',
        track: 'AFX',
        label: 'ควบคุมจอโปรเจกชัน 3D และวิชวลเอฟเฟกต์แสงสีกลางเวทีใหญ่',
        detail: 'เตรียมซีนเปิดตัวสุดตระการตาที่จะฉายขึ้นบนท้องฟ้า',
        reactionQuote: 'ลูมิน่า: “พร้อมเรนเดอร์แสงดาวและเอฟเฟกต์ประกายไฟขึ้นสู่ท้องฟ้าแล้ว”',
      },
      {
        id: '4-1-den',
        track: 'DEN',
        label: 'จัดลำดับสคริปต์โชว์ ดูแลบรรยากาศ และไลฟ์สตรีมส่งต่อให้คนทั้งเมือง',
        detail: 'ทำให้ทุกคนทั้งในลานและทางบ้านรู้สึกเป็นส่วนหนึ่งของเทศกาล',
        reactionQuote: 'ยูเมะ: “กล้องพร้อม ไมค์พร้อม! คืนนี้เราจะทำให้คนทั้งเมืองยิ้มไม่หุบเลย!”',
      },
    ],
  },
  {
    id: 'scene-4-2',
    sceneNumber: 9,
    code: '4.2',
    chapterIndex: 4,
    chapterTitle: 'บทที่ 4: เพื่อนร่วมทาง',
    title: 'เมื่อความคิดเห็นในทีมไม่ตรงกัน',
    narrative:
      'เหลือเวลาอีกไม่ถึงชั่วโมงก่อนเทศกาลจะเริ่ม เพื่อนร่วมทางทั้ง 5 กลับเห็นไม่ตรงกันว่าควรเล่าเรื่องโชว์เปิดงานออกมาในทิศทางไหน เสียงถกเถียงเริ่มดังขึ้นท่ามกลางความกดดัน',
    promptQuestion: 'ในฐานะศูนย์กลางของทีม คุณจะคลี่คลายความเห็นต่างครั้งนี้ด้วยวิธีใด?',
    featuredTracks: ['DGA', 'DGD', 'IGD', 'AFX', 'DEN'],
    stageMood: 'teamwork',
    choices: [
      {
        id: '4-2-dga',
        track: 'DGA',
        label: 'วาดแผนที่ภาพรวม (Visual Mind Map) ให้ทุกคนเห็นภาพเดียวกันบนกระดาน',
        detail: 'แปลงไอเดียที่กระจัดกระจายของเพื่อนแต่ละคนให้กลายเป็นภาพที่เชื่อมโยงกัน',
        reactionQuote: 'น็อกเทีย: “พอเห็นเป็นภาพรวมแบบนี้ จุดที่ทุกคนอยากสื่อก็ต่อกันติดทันทีเลย”',
      },
      {
        id: '4-2-dgd',
        track: 'DGD',
        label: 'ทำตารางเปรียบเทียบจุดเด่น–จุดเชื่อมโยงอย่างเป็นระบบ',
        detail: 'จัดหมวดหมู่ข้อดีของแต่ละไอเดียเพื่อคัดสรรโครงสร้างที่คมชัดที่สุด',
        reactionQuote: 'ไอริส: “ชัดเจนและยุติธรรมมาก พอเทียบเป็นระบบแล้วตัดสินใจง่ายขึ้นเยอะ”',
      },
      {
        id: '4-2-igd',
        track: 'IGD',
        label: 'ชวนทุกคนทดลองทำต้นแบบสั้น ๆ (Rapid Prototype) แล้วเทสต์จริงทันที',
        detail: 'ให้ผลลัพธ์จากการทดลองเป็นตัวตัดสินแทนการเถียงกันด้วยคำพูด',
        reactionQuote: 'มิโกะ: “ใช่เลย! ลองทำเดโม 5 นาทีก็รู้แล้วว่าอันไหนเวิร์กที่สุด”',
      },
      {
        id: '4-2-afx',
        track: 'AFX',
        label: 'สร้างภาพจำลองปลายทาง (Pre-vis Simulation) ให้เห็นฉากจบก่อนลงมือทำ',
        detail: 'ให้เพื่อน ๆ มองเห็นอารมณ์และความสมจริงของผลลัพธ์สุดท้ายร่วมกัน',
        reactionQuote: 'ลูมิน่า: “พอเห็นภาพจำลองปลายทางแล้ว ทุกคนก็รู้ทันทีว่าต้องเดินไปทางไหน”',
      },
      {
        id: '4-2-den',
        track: 'DEN',
        label: 'เปิดวงรับฟังความคิดเห็นของแต่ละคนอย่างตั้งใจเพื่อหาจุดร่วมตรงกลาง',
        detail: 'เชื่อมใจทีมให้กลับมาเป็นหนึ่งเดียวก่อนก้าวขึ้นเวทีด้วยกัน',
        reactionQuote: 'ยูเมะ: “ขอบคุณที่รับฟังทุกคนนะ ตอนนี้พลังทีมกลับมาเต็มร้อยแล้ว!”',
      },
    ],
  },
  {
    id: 'scene-5-1',
    sceneNumber: 10,
    code: '5.1',
    chapterIndex: 5,
    chapterTitle: 'บทที่ 5: คืนเทศกาล Imagine Design Event',
    title: 'ช่วงเวลาไฮไลต์บนเวทีใหญ่กลางเมือง',
    narrative:
      'แสงไฟสปอตไลต์ส่องสว่างขึ้นกลางจัตุรัส ชาวเมืองนับพันมารวมตัวกันด้วยความหวัง เหลือเพียงช่วงเวลาไฮไลต์สุดท้ายบนเวทีใหญ่ที่คุณและเพื่อนร่วมทางทั้ง 5 จะปล่อยพลังสร้างสรรค์เพื่อปลุกท้องฟ้าของ Imagine City ให้กลับมามีสีสันตระการตา',
    promptQuestion: 'ผลงานไฮไลต์แบบไหนที่คุณเลือกขึ้นแสดงเป็นซีนปิดท้ายบนเวทีใหญ่?',
    featuredTracks: ['DGA', 'DGD', 'IGD', 'AFX', 'DEN'],
    stageMood: 'festival',
    choices: [
      {
        id: '5-1-dga',
        track: 'DGA',
        label: 'เปิดตัวภาพจิตรกรรมดิจิทัลและตัวละครแห่งความฝันขนาดมหึมากลางม่านฟ้า',
        detail: 'วาดเส้นแสงสด ๆ บนจอพาโนรามาจนเกิดเป็นโลกศิลปะที่สะกดใจคนทั้งเมือง',
        reactionQuote: 'น็อกเทีย: “สีสันจากปลายพู่กันของเธอกำลังระบายท้องฟ้าให้สว่างไสวแล้ว!”',
      },
      {
        id: '5-1-dgd',
        track: 'DGD',
        label: 'ฉายงาน Motion Typography & Visual Identity ที่เปลี่ยนตึกทั้งเมืองให้เรืองแสง',
        detail: 'ประสานสัญลักษณ์และตัวอักษรขนาดยักษ์เข้ากับสถาปัตยกรรมรอบจัตุรัส',
        reactionQuote: 'ไอริส: “ตึกทุกหลังส่องประกายอัตลักษณ์ของ Imagine City พร้อมกันแล้ว!”',
      },
      {
        id: '5-1-igd',
        track: 'IGD',
        label: 'เปิดเกม Interactive ขนาดยักษ์ให้ชาวเมืองทุกคนเล่นร่วมกันแบบเรียลไทม์',
        detail: 'เปลี่ยนลานจัตุรัสเป็นสนามแห่งการเล่นที่ทุกการขยับตัวปลุกสีสันได้จริง',
        reactionQuote: 'มิโกะ: “ทุกคนกำลังเคลียร์ด่านสุดท้ายพร้อมกัน! สีสันพุ่งขึ้นเต็มเกจแล้ว!”',
      },
      {
        id: '5-1-afx',
        track: 'AFX',
        label: 'ปล่อยโชว์แอนิเมชัน 3 มิติและวิชวลเอฟเฟกต์พายุแสงสีลอยทะลุจอสู่ท้องฟ้า',
        detail: 'ผสานโมเดล 3D และเอฟเฟกต์อนุภาคสุดสมจริงจนเหมือนสัมผัสได้',
        reactionQuote: 'ลูมิน่า: “ดูกลุ่มแสง 3 มิติที่พุ่งขึ้นไปบนเมฆนั่นสิ สวยจนลืมหายใจเลย!”',
      },
      {
        id: '5-1-den',
        track: 'DEN',
        label: 'จัดคอนเสิร์ตโชว์ผสม VTuber และเวทีทอล์กสุดอบอุ่นที่ทุกคนร้องตามได้',
        detail: 'ปลุกเสียงปรบมือ รอยยิ้ม และพลังใจให้ดังก้องไปทั่วทั้งเมือง',
        reactionQuote: 'ยูเมะ: “ทุกคนยกมือขึ้น! เสียงหัวเราะและรอยยิ้มกลับมาเต็มเมืองแล้ว!”',
      },
    ],
  },
  {
    id: 'scene-5-2',
    sceneNumber: 11,
    code: '5.2',
    chapterIndex: 5,
    chapterTitle: 'บทที่ 5: คืนเทศกาล Imagine Design Event',
    title: 'นิยามตัวตนที่อยากให้ชาวเมืองจดจำ',
    narrative:
      'ท้องฟ้าของ Imagine City กลับมาเปล่งประกายด้วยสีชมพูนีออน ฟ้าสว่าง และม่วงพาสเทลอย่างสมบูรณ์ เสียงโห่ร้องยินดีดังขึ้นทั่วจัตุรัส ก่อนที่ค่ำคืนนี้จะถูกจารึกไว้ในประวัติศาสตร์เมือง ดวงไฟนำทางถามคุณเป็นคำถามสุดท้าย',
    promptQuestion: 'เมื่อเทศกาลจบลง คุณอยากให้ชาวเมืองจดจำคุณในฐานะนักเดินทางแบบไหน?',
    featuredTracks: ['DGA', 'DGD', 'IGD', 'AFX', 'DEN'],
    stageMood: 'festival',
    isTieBreaker: true,
    choices: [
      {
        id: '5-2-dga',
        track: 'DGA',
        label: 'ผู้สร้างโลกและจินตนาการที่เปลี่ยนความฝันให้เป็นภาพที่จับต้องได้',
        detail: 'จารึกชื่อในฐานะศิลปินผู้ให้กำเนิดตัวละครและเรื่องราว',
        reactionQuote: 'น็อกเทีย: “เรื่องราวและลายเส้นของเธอจะอยู่ในใจชาวเมืองตลอดไป”',
      },
      {
        id: '5-2-dgd',
        track: 'DGD',
        label: 'ผู้ออกแบบอัตลักษณ์และสื่อสารความหมายได้อย่างงดงามน่าจดจำ',
        detail: 'จารึกชื่อในฐานะนักออกแบบผู้สร้างภาพลักษณ์อันเป็นเอกลักษณ์',
        reactionQuote: 'ไอริส: “ทุกป้ายและงานดีไซน์ในเมืองนี้จะมีลายเซ็นความคมชัดของเธออยู่เสมอ”',
      },
      {
        id: '5-2-igd',
        track: 'IGD',
        label: 'นักสร้างประสบการณ์และเกมที่ทำให้ทุกก้าวเต็มไปด้วยความท้าทายและสนุก',
        detail: 'จารึกชื่อในฐานะผู้เปลี่ยนโลกให้เป็นพื้นที่แห่งการโต้ตอบ',
        reactionQuote: 'มิโกะ: “สำหรับพวกเรา เธอคือ Player อันดับหนึ่งของ Imagine City เลย!”',
      },
      {
        id: '5-2-afx',
        track: 'AFX',
        label: 'ผู้มอบชีวิต แสงเงา และวิชวลสุดตระการตาให้ภาพเคลื่อนไหวสมจริง',
        detail: 'จารึกชื่อในฐานะผู้เนรมิตความมหัศจรรย์บนจอภาพ',
        reactionQuote: 'ลูมิน่า: “แสงที่เธอจุดขึ้นคืนนี้จะส่องสว่างในทุกเฟรมต่อจากนี้ไป”',
      },
      {
        id: '5-2-den',
        track: 'DEN',
        label: 'ผู้จุดประกายความบันเทิงและเชื่อมหัวใจของทุกคนเข้าไว้ด้วยกัน',
        detail: 'จารึกชื่อในฐานะผู้สร้างรอยยิ้มและคอมมูนิตี้ที่อบอุ่น',
        reactionQuote: 'ยูเมะ: “ขอบคุณที่ทำให้เวทีของพวกเรากลับมามีเสียงหัวเราะอีกครั้งนะ!”',
      },
    ],
  },
];

export function buildDistrictScene31(unlockedTracks: TrackId[]): StoryScene {
  const primary = unlockedTracks[0] || 'DGA';
  const secondary = unlockedTracks[1];
  const isDual = unlockedTracks.length >= 2 && secondary !== undefined;

  if (isDual) {
    const pTrack = TRACKS[primary];
    const sTrack = TRACKS[secondary];
    return {
      id: 'scene-3-1',
      sceneNumber: 6,
      code: '3.1',
      chapterIndex: 3,
      chapterTitle: 'บทที่ 3: สำรวจย่านที่สะท้อนตัวตน',
      title: `เปิด 2 ย่านคู่ขนาน: ${pTrack.districtShort} × ${sTrack.districtShort}`,
      narrative: `คะแนนความถนัดของคุณสูสีกันอย่างน่าทึ่ง! หอคอยเข็มทิศจึงเปิดเส้นทางลับให้คุณสำรวจได้ทั้ง “${pTrack.districtName}” และ “${sTrack.districtName}” โดยมี ${pTrack.character.name} และ ${sTrack.character.name} มารอต้อนรับคุณพร้อมกัน`,
      promptQuestion: 'ระหว่างเดินสำรวจทั้ง 2 ย่าน งานบทบาทไหนที่ทำให้หัวใจคุณเต้นแรงที่สุดในตอนนี้?',
      featuredTracks: [primary, secondary],
      stageMood: 'district',
      choices: [
        {
          id: `3-1-${primary.toLowerCase()}-1`,
          track: primary,
          label: `${pTrack.districtTasks[0]} และ ${pTrack.districtTasks[1]}`,
          detail: `เจาะลึกงานสาย ${pTrack.majorName} ร่วมกับ ${pTrack.character.name}`,
          reactionQuote: pTrack.character.signatureQuote,
          careerFocusKey: pTrack.careers[0],
        },
        {
          id: `3-1-${primary.toLowerCase()}-2`,
          track: primary,
          label: `${pTrack.districtTasks[2]} และ ${pTrack.districtTasks[3]}`,
          detail: `ต่อยอดผลงานเฉพาะทางใน ${pTrack.districtShort}`,
          reactionQuote: `${pTrack.character.name}: “สายตาเธอเฉียบมาก นี่คืองานหัวใจของย่านนี้เลย!”`,
          careerFocusKey: pTrack.careers[2],
        },
        {
          id: `3-1-${secondary.toLowerCase()}-1`,
          track: secondary,
          label: `${sTrack.districtTasks[0]} และ ${sTrack.districtTasks[1]}`,
          detail: `เจาะลึกงานสาย ${sTrack.majorName} ร่วมกับ ${sTrack.character.name}`,
          reactionQuote: sTrack.character.signatureQuote,
          careerFocusKey: sTrack.careers[0],
        },
        {
          id: `3-1-${secondary.toLowerCase()}-2`,
          track: secondary,
          label: `${sTrack.districtTasks[2]} และ ${sTrack.districtTasks[3]}`,
          detail: `ต่อยอดผลงานเฉพาะทางใน ${sTrack.districtShort}`,
          reactionQuote: `${sTrack.character.name}: “ไม่แปลกใจเลยที่ย่านนี้ก็เลือกเธอเช่นกัน!”`,
          careerFocusKey: sTrack.careers[2],
        },
        {
          id: '3-1-hybrid',
          track: primary,
          label: `ผสานจุดเด่นของ ${pTrack.majorName} และ ${sTrack.majorName} เข้าด้วยกัน`,
          detail: 'ทดลองสร้างโปรเจกต์ลูกผสมระหว่าง 2 ย่าน',
          reactionQuote: `${pTrack.character.name} & ${sTrack.character.name}: “พลังของสายผสมแบบนี้แหละที่จะสร้างสิ่งใหม่ให้เมือง!”`,
          careerFocusKey: pTrack.careers[1],
        },
      ],
    };
  }

  const t = TRACKS[primary];
  const roleChoicesByTrack: Record<TrackId, QuizChoice[]> = {
    DGA: [
      {
        id: '3-1-dga-char',
        track: 'DGA',
        label: 'สร้างตัวละคร (Character Design) ที่มีเอกลักษณ์และเรื่องราวเบื้องหลัง',
        detail: 'ออกแบบบุคลิก สีหน้า และคอสตูมให้มีชีวิตชีวา',
        reactionQuote: 'น็อกเทีย: “การสร้างตัวละครที่มีจิตวิญญาณคือจุดเริ่มต้นของทุกเรื่องเล่าเลยล่ะ”',
        careerFocusKey: 'Character Designer',
      },
      {
        id: '3-1-dga-bg',
        track: 'DGA',
        label: 'วาดฉากหลัง (Concept & Environment) ให้เรื่องเล่ามีบรรยากาศ',
        detail: 'จัดแสงเงา สถาปัตยกรรม และอารมณ์ของโลกในเรื่อง',
        reactionQuote: 'น็อกเทีย: “ฉากหลังที่ดีจะเล่าเรื่องได้โดยไม่ต้องใช้คำพูดสักคำ”',
        careerFocusKey: 'Concept Artist',
      },
      {
        id: '3-1-dga-webtoon',
        track: 'DGA',
        label: 'เล่าเรื่องผ่าน Webtoon / Comic และ Storyboard',
        detail: 'วางจังหวะช่องภาพและมุมกล้องให้คนอ่านหยุดไม่ได้',
        reactionQuote: 'น็อกเทีย: “จังหวะการเลื่อนจอในแต่ละตอนของเธอช่างน่าติดตามจริง ๆ”',
        careerFocusKey: 'Webtoon Artist',
      },
      {
        id: '3-1-dga-toy',
        track: 'DGA',
        label: 'ออกแบบ Art Toy & Sticker คอลเลกชันน่าสะสม',
        detail: 'เปลี่ยนลายเส้น 2D ให้กลายเป็นคาแรกเตอร์สะสมสุดน่ารัก',
        reactionQuote: 'น็อกเทีย: “ถ้าทำเป็น Art Toy ออกมา ฉันขอจองตัวแรกเลยนะ!”',
        careerFocusKey: 'Art Toy Designer',
      },
      {
        id: '3-1-dga-illus',
        track: 'DGA',
        label: 'วาดภาพประกอบปกหนังสือและโปสเตอร์ศิลปะ (Illustration)',
        detail: 'สื่อสารอารมณ์ทั้งหมดไว้ในภาพเดียวที่ทรงพลัง',
        reactionQuote: 'น็อกเทีย: “แค่ภาพเดียวก็สะกดสายตาคนเดินผ่านตรอกจินตนาการได้หมดแล้ว”',
        careerFocusKey: 'Illustrator',
      },
    ],
    DGD: [
      {
        id: '3-1-dgd-brand',
        track: 'DGD',
        label: 'ออกแบบป้ายและโลโก้แบรนด์ (Brand Identity) ประจำย่าน',
        detail: 'สร้างเครื่องหมายการค้าที่จำง่ายและทรงพลัง',
        reactionQuote: 'ไอริส: “โลโก้ที่แข็งแรงคือหัวใจที่ทำให้ทุกคนจำแบรนด์ได้ในเสี้ยววินาที”',
        careerFocusKey: 'Brand Identity Designer',
      },
      {
        id: '3-1-dgd-ui',
        track: 'DGD',
        label: 'ออกแบบหน้าจอแอปและเว็บไซต์ (UI Design) สำหรับนักเดินทาง',
        detail: 'จัดวางปุ่ม ไอคอน และระบบการใช้งานที่ลื่นไหลสวยงาม',
        reactionQuote: 'ไอริส: “UI ที่ดีต้องทั้งสวยและใช้งานง่ายโดยไม่ต้องเดา”',
        careerFocusKey: 'UI Designer',
      },
      {
        id: '3-1-dgd-pack',
        track: 'DGD',
        label: 'ออกแบบบรรจุภัณฑ์ (Packaging) รุ่นลิมิเต็ดให้น่าสะสม',
        detail: 'คิดโครงสร้างกล่อง วัสดุ และกราฟิกที่หยิบแล้ววางไม่ลง',
        reactionQuote: 'ไอริส: “บรรจุภัณฑ์ที่ดีทำให้ของข้างในดูมีคุณค่าขึ้นอีกสิบเท่า”',
        careerFocusKey: 'Packaging Designer',
      },
      {
        id: '3-1-dgd-poster',
        track: 'DGD',
        label: 'ออกแบบโปสเตอร์ใหญ่กลางเมืองและ Art Direction ของเทศกาล',
        detail: 'กำหนดทิศทางภาพ ตัวอักษร และเลย์เอาต์ระดับบิลบอร์ด',
        reactionQuote: 'ไอริส: “โปสเตอร์นี้ดึงดูดสายตาจากปลายถนนอีกฝั่งได้สบายเลย”',
        careerFocusKey: 'Art Director',
      },
      {
        id: '3-1-dgd-motion',
        track: 'DGD',
        label: 'สร้าง Motion Graphic ให้โลโก้และตัวอักษรขยับตามจังหวะเพลง',
        detail: 'เพิ่มพลังให้กราฟิกนิ่งเคลื่อนไหวอย่างมีจังหวะจะโคน',
        reactionQuote: 'ไอริส: “กราฟิกที่มีจังหวะเคลื่อนไหวนี่แหละ เสน่ห์ของยุคดิจิทัล!”',
        careerFocusKey: 'Motion Graphic Designer',
      },
    ],
    IGD: [
      {
        id: '3-1-igd-level',
        track: 'IGD',
        label: 'คิดกติกาและออกแบบระบบด่าน (Level & Game Design)',
        detail: 'วางจังหวะความท้าทาย รางวัล และจุดพลิกผันของเกม',
        reactionQuote: 'มิโกะ: “ด่านที่วางจังหวะดีจะทำให้ผู้เล่นพูดว่า ‘ขออีกตาเดียว’ ไม่รู้จบ!”',
        careerFocusKey: 'Level Designer',
      },
      {
        id: '3-1-igd-art',
        track: 'IGD',
        label: 'ออกแบบฉาก ตัวละครเกม และ UI/UX ในหน้าจอเล่นเกม',
        detail: 'สร้างสไตล์ภาพของโลกเกมและหน้าจอ HUD ที่เข้าใจง่าย',
        reactionQuote: 'มิโกะ: “ทั้งตัวละคร ทั้งหน้าจอสถานะดูลื่นตาสุด ๆ ไปเลย!”',
        careerFocusKey: 'Game Artist',
      },
      {
        id: '3-1-igd-vrar',
        track: 'IGD',
        label: 'สร้างโลกเสมือนจริงแบบ VR / AR ให้ผู้คนเดินเข้าไปสัมผัสได้',
        detail: 'ผสานโลกจริงและโลกดิจิทัลเข้าเป็นพื้นที่อินเทอร์แอคทีฟ',
        reactionQuote: 'มิโกะ: “ลองสวมแว่นนี้สิ เหมือนเราก้าวเข้าไปอยู่ในเกมจริง ๆ เลย!”',
        careerFocusKey: 'VR/AR Experience Designer',
      },
      {
        id: '3-1-igd-prod',
        track: 'IGD',
        label: 'ดูแลทีมผลิตเกม (Game Producer) และประสานงานทุกฝ่าย',
        detail: 'วางโรดแมป คุมสโคป และผลักดันโปรเจกต์เกมให้เสร็จสมบูรณ์',
        reactionQuote: 'มิโกะ: “มีโปรดิวเซอร์แบบเธออยู่ ทีมเกมของพวกเราไม่มีวันหลงทางแน่นอน”',
        careerFocusKey: 'Game Producer',
      },
      {
        id: '3-1-igd-sys',
        track: 'IGD',
        label: 'ออกแบบระบบเกม (Game Systems) และสกิลตัวละครให้สมดุล',
        detail: 'คำนวณคอมโบ ไอเทม และความสนุกของการวางกลยุทธ์',
        reactionQuote: 'มิโกะ: “คอมโบนี้บาลานซ์ดีมาก เล่นกี่รอบก็ไม่เบื่อ!”',
        careerFocusKey: 'Game Designer',
      },
    ],
    AFX: [
      {
        id: '3-1-afx-anim',
        track: 'AFX',
        label: 'ขยับตัวละคร 3D (3D Animation) ให้มีอารมณ์และจังหวะสมจริง',
        detail: 'ใส่ชีวิต น้ำหนัก และแอ็กชันให้โมเดล 3 มิติขยับได้อย่างเป็นธรรมชาติ',
        reactionQuote: 'ลูมิน่า: “แค่การก้าวเดินหนึ่งก้าว ก็บอกนิสัยของตัวละครได้ทั้งหมดเลยนะ”',
        careerFocusKey: '3D Animator',
      },
      {
        id: '3-1-afx-model',
        track: 'AFX',
        label: 'ปั้นโมเดล 3 มิติ (3D Modeling) ขึ้นมาจากความว่างเปล่า',
        detail: 'ขึ้นรูปตัวละคร ฉาก และพร็อพที่มีสัดส่วนและพื้นผิวละเอียด',
        reactionQuote: 'ลูมิน่า: “จากก้อนโพลิกอนธรรมดา กลายเป็นงานประติมากรรมดิจิทัลที่น่าทึ่งมาก”',
        careerFocusKey: '3D Modeler',
      },
      {
        id: '3-1-afx-vfx',
        track: 'AFX',
        label: 'สร้างเอฟเฟกต์ระเบิด ไฟ น้ำ และควัน (VFX Simulation)',
        detail: 'ควบคุมฟิสิกส์อนุภาคและพลังธรรมชาติในโลกภาพยนตร์',
        reactionQuote: 'ลูมิน่า: “ประกายไฟและเกลียวคลื่นน้ำที่เธอเสกขึ้นมาดูมีพลังมาก!”',
        careerFocusKey: 'VFX Artist',
      },
      {
        id: '3-1-afx-comp',
        track: 'AFX',
        label: 'รวมภาพและปรับแสงขั้นสูงแบบ Compositing',
        detail: 'ผสานฟุตเทจจริงกับงาน 3D และ VFX ให้เนียนสนิทเป็นภาพเดียว',
        reactionQuote: 'ลูมิน่า: “การจัดแสงและคอมโพสิตรวมทุกชั้นเข้าด้วยกันได้อย่างไร้รอยต่อ”',
        careerFocusKey: 'Compositor',
      },
      {
        id: '3-1-afx-light',
        track: 'AFX',
        label: 'จัดแสง พื้นผิว (Lighting & Texture) และ Rigging โครงสร้างกระดูก 3D',
        detail: 'สร้างความสมจริงของวัสดุและกลไกการขยับให้ตัวละคร',
        reactionQuote: 'ลูมิน่า: “แสงตกกระทบผิววัสดุแบบนี้แหละที่ทำให้ภาพดูมีมิติระดับโรงหนัง”',
        careerFocusKey: 'Lighting & Texture Artist',
      },
    ],
    DEN: [
      {
        id: '3-1-den-content',
        track: 'DEN',
        label: 'คิดรูปแบบรายการและคอนเทนต์ไวรัล (Content Creator)',
        detail: 'สร้างเรื่องเล่าและคลิปที่ดึงดูดผู้ชมตั้งแต่ 3 วินาทีแรก',
        reactionQuote: 'ยูเมะ: “ไอเดียรายการนี้ปังแน่! ชาวเมืองต้องแชร์ต่อกันทั้งเมืองชัวร์!”',
        careerFocusKey: 'Content Creator',
      },
      {
        id: '3-1-den-event',
        track: 'DEN',
        label: 'ออกแบบงานอีเวนต์และโชว์สุดอลังการ (Event & Show Producer)',
        detail: 'วางรันดาวน์ แสงเสียง และโมเมนต์เซอร์ไพรส์บนเวที',
        reactionQuote: 'ยูเมะ: “ลำดับโชว์แบบนี้จะทำให้ผู้ชมลุ้นและประทับใจตั้งแต่ต้นจนจบเลย”',
        careerFocusKey: 'Event / Show Producer',
      },
      {
        id: '3-1-den-vtuber',
        track: 'DEN',
        label: 'ดูแลเบื้องหลังสตรีมเมอร์และ VTuber (Streaming & VTuber Producer)',
        detail: 'วางคาแรกเตอร์ ไลฟ์โปรดักชัน และสคริปต์โต้ตอบแฟนคลับ',
        reactionQuote: 'ยูเมะ: “ว้าว! มีโปรดิวเซอร์สาย VTuber มาช่วยดูแลแบบนี้ อุ่นใจสุด ๆ!”',
        careerFocusKey: 'Streaming & VTuber Producer',
      },
      {
        id: '3-1-den-mkt',
        track: 'DEN',
        label: 'วางกลยุทธ์การตลาดความบันเทิง (Entertainment Marketer)',
        detail: 'ปั้นแคมเปญโปรโมตให้เทศกาลเข้าถึงผู้คนวงกว้าง',
        reactionQuote: 'ยูเมะ: “กลยุทธ์นี้จะพาเสียงเพลงของ Imagine City ไปถึงทุกคนแน่นอน!”',
        careerFocusKey: 'Entertainment Marketer',
      },
      {
        id: '3-1-den-comm',
        track: 'DEN',
        label: 'สร้างชุมชนแฟนคลับ (Community Manager) ที่อบอุ่นและมีส่วนร่วม',
        detail: 'เชื่อมความสัมพันธ์ระหว่างครีเอเตอร์กับแฟน ๆ อย่างยั่งยืน',
        reactionQuote: 'ยูเมะ: “แฟนคลับที่รักและซัพพอร์ตกันคือพลังใจที่ดีที่สุดเลย!”',
        careerFocusKey: 'Community & Fandom Manager',
      },
    ],
  };

  return {
    id: 'scene-3-1',
    sceneNumber: 6,
    code: '3.1',
    chapterIndex: 3,
    chapterTitle: 'บทที่ 3: สำรวจย่านที่สะท้อนตัวตน',
    title: `เข้าสู่${t.districtName}`,
    narrative: `เข็มทิศเมืองหมุนหยุดลงที่ “${t.districtName}” ทันที ${t.character.name} ออกมาต้อนรับคุณท่ามกลางแสงสีของย่านที่เริ่มสว่างไสวขึ้น และชวนคุณเลือกบทบาทเฉพาะทางที่อยากลองลงมือทำในย่านนี้`,
    promptQuestion: `ภายใน${t.districtShort} คุณอยากสวมบทบาททำภารกิจไหนมากที่สุด?`,
    featuredTracks: [primary],
    stageMood: 'district',
    choices: roleChoicesByTrack[primary],
  };
}

export interface QuizOutcome {
  scores: Record<TrackId, number>;
  primaryTrack: TrackProfile;
  secondaryTrack: TrackProfile | null; // Present when Hybrid (difference <= 1)
  isHybrid: boolean;
  hybridTitle: string | null;
  orderedCareers: string[];
  unlockedDistrictsInCh3: TrackId[];
}

export function getUnlockedDistrictsAfterCh2(scores: Record<TrackId, number>): TrackId[] {
  const sorted = [...TRACK_ORDER].sort((a, b) => scores[b] - scores[a]);
  const top1 = sorted[0];
  const top2 = sorted[1];
  if (scores[top1] - scores[top2] <= 1 && scores[top2] > 0) {
    return [top1, top2];
  }
  return [top1];
}

export function calculateOutcome(
  scores: Record<TrackId, number>,
  tieBreakerTrack: TrackId,
  careerFocusKey: string | null,
  unlockedDistrictsInCh3: TrackId[]
): QuizOutcome {
  // Sort tracks by score descending; if exact tie, Scene 5.2 tieBreaker breaks the tie!
  const sorted = [...TRACK_ORDER].sort((a, b) => {
    if (scores[b] !== scores[a]) {
      return scores[b] - scores[a];
    }
    if (a === tieBreakerTrack) return -1;
    if (b === tieBreakerTrack) return 1;
    return TRACK_ORDER.indexOf(a) - TRACK_ORDER.indexOf(b);
  });

  const primaryId = sorted[0];
  const secondaryId = sorted[1];
  const primaryTrack = TRACKS[primaryId];

  // Hybrid if top 2 tracks differ by at most 1 point (Slide 2 rule)
  const diff = scores[primaryId] - scores[secondaryId];
  const isHybrid = diff <= 1 && scores[secondaryId] > 0;
  const secondaryTrack = isHybrid ? TRACKS[secondaryId] : null;

  const hybridTitle = secondaryTrack
    ? `${primaryTrack.personaTitle} × ${secondaryTrack.personaTitle}`
    : null;

  // Order 10 careers placing the user's Chapter 3 focus first
  let orderedCareers = [...primaryTrack.careers];
  if (careerFocusKey && orderedCareers.includes(careerFocusKey)) {
    orderedCareers = [
      careerFocusKey,
      ...orderedCareers.filter((c) => c !== careerFocusKey),
    ];
  }

  return {
    scores,
    primaryTrack,
    secondaryTrack,
    isHybrid,
    hybridTitle,
    orderedCareers,
    unlockedDistrictsInCh3,
  };
}
