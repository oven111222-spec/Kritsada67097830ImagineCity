import { QuizOutcome, TRACK_ORDER, TRACKS } from '../data/imagineCityData';
import { assetPath } from './assets';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export async function generateShareCardPng(
  outcome: QuizOutcome,
  nickname: string
): Promise<string> {
  const width = 1080;
  const height = 1920;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  // Deep Navy Background
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, width, height);

  // Subtle Ambient Radial Glows
  const glowPink = ctx.createRadialGradient(860, 320, 20, 860, 320, 600);
  glowPink.addColorStop(0, 'rgba(236, 72, 153, 0.28)');
  glowPink.addColorStop(1, 'rgba(15, 23, 42, 0)');
  ctx.fillStyle = glowPink;
  ctx.fillRect(0, 0, width, height);

  const glowSky = ctx.createRadialGradient(220, 1480, 20, 220, 1480, 620);
  glowSky.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
  glowSky.addColorStop(1, 'rgba(15, 23, 42, 0)');
  ctx.fillStyle = glowSky;
  ctx.fillRect(0, 0, width, height);

  // Outer Frame Border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 2;
  roundRect(ctx, 44, 44, width - 88, height - 88, 36);
  ctx.stroke();

  // Header + Official Logo Mark
  try {
    const logoImg = await loadImage(assetPath('assets/aistudio/1795186101507_24a9f1d0.jpg'));
    ctx.save();
    roundRect(ctx, width - 296, 86, 200, 125, 16);
    ctx.clip();
    ctx.drawImage(logoImg, width - 310, 68, 228, 170);
    ctx.restore();
  } catch {
    // Graceful fallback if logo fails to load
  }

  ctx.fillStyle = '#38BDF8';
  ctx.font = '600 26px "Outfit", "IBM Plex Sans Thai", sans-serif';
  ctx.fillText('IMAGINE CITY · SCHOOL OF DIGITAL MEDIA', 96, 130);

  const explorerName = nickname.trim() ? nickname.trim() : 'นักเดินทางแห่งแสงสี';
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 30px "IBM Plex Sans Thai", sans-serif';
  ctx.fillText(`บัตรผลลัพธ์ของ ${explorerName}`, 96, 184);

  // Persona Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 62px "IBM Plex Sans Thai", "Outfit", sans-serif';
  ctx.fillText(outcome.primaryTrack.personaTitle, 96, 278);

  if (outcome.isHybrid && outcome.secondaryTrack) {
    ctx.fillStyle = '#F472B6';
    ctx.font = '600 34px "IBM Plex Sans Thai", sans-serif';
    ctx.fillText(`สายผสม: ผสานพลังกับ ${outcome.secondaryTrack.personaTitle}`, 96, 336);
  } else {
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '500 32px "IBM Plex Sans Thai", sans-serif';
    ctx.fillText(outcome.primaryTrack.districtName, 96, 336);
  }

  // Character Studio Frame (Clean Circular Medallion)
  const centerX = width / 2;
  const portraitY = 665;
  const radius = 250;

  // Accent Ring
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, portraitY, radius + 14, 0, Math.PI * 2);
  ctx.strokeStyle = outcome.primaryTrack.accentHex;
  ctx.lineWidth = 5;
  ctx.stroke();

  // Luminous Twilight Backdrop inside circle for transparent cutout
  ctx.beginPath();
  ctx.arc(centerX, portraitY, radius, 0, Math.PI * 2);
  const portraitGrad = ctx.createRadialGradient(
    centerX,
    portraitY - 25,
    20,
    centerX,
    portraitY,
    radius
  );
  portraitGrad.addColorStop(0, 'rgba(248, 250, 252, 0.28)');
  portraitGrad.addColorStop(0.58, `${outcome.primaryTrack.accentHex}44`);
  portraitGrad.addColorStop(1, '#0B1120');
  ctx.fillStyle = portraitGrad;
  ctx.fill();
  ctx.clip();

  try {
    const charImg = await loadImage(outcome.primaryTrack.character.image);
    const drawSize = radius * 2.05;
    ctx.drawImage(
      charImg,
      centerX - drawSize / 2,
      portraitY - drawSize / 2 + 10,
      drawSize,
      drawSize
    );
  } catch {
    // Graceful fallback if image cannot load into canvas
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(centerX - radius, portraitY - radius, radius * 2, radius * 2);
  }
  ctx.restore();

  // Character Companion Label
  ctx.textAlign = 'center';
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 30px "IBM Plex Sans Thai", sans-serif';
  ctx.fillText(
    `เพื่อนร่วมทางประจำตัว: ${outcome.primaryTrack.character.name}`,
    centerX,
    975
  );
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 26px "Outfit", "IBM Plex Sans Thai", sans-serif';
  ctx.fillText(
    `${outcome.primaryTrack.majorName} (${outcome.primaryTrack.code})`,
    centerX,
    1020
  );
  ctx.textAlign = 'left';

  // Affinity Bars Panel
  ctx.fillStyle = 'rgba(30, 41, 59, 0.72)';
  roundRect(ctx, 88, 1070, width - 176, 355, 24);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 28px "IBM Plex Sans Thai", sans-serif';
  ctx.fillText('สัดส่วนพลังความถนัดทั้ง 5 ด้าน (11 ฉาก)', 124, 1126);

  const maxScore = Math.max(1, ...Object.values(outcome.scores));
  TRACK_ORDER.forEach((id, index) => {
    const y = 1178 + index * 48;
    const t = TRACKS[id];
    const score = outcome.scores[id];
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '600 24px "JetBrains Mono", "IBM Plex Sans Thai", sans-serif';
    ctx.fillText(`${id} · ${t.districtShort}`, 124, y);

    const barX = 460;
    const barW = 410;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    roundRect(ctx, barX, y - 20, barW, 22, 11);
    ctx.fill();

    const fillW = Math.max(16, (score / Math.max(5, maxScore)) * barW);
    ctx.fillStyle = t.accentHex;
    roundRect(ctx, barX, y - 20, fillW, 22, 11);
    ctx.fill();

    ctx.fillStyle = '#F8FAFC';
    ctx.font = '600 24px "JetBrains Mono", monospace';
    ctx.fillText(`${score} pt`, barX + barW + 24, y);
  });

  // Top Careers Box
  ctx.fillStyle = 'rgba(30, 41, 59, 0.72)';
  roundRect(ctx, 88, 1455, width - 176, 290, 24);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.stroke();

  ctx.fillStyle = '#38BDF8';
  ctx.font = '600 28px "IBM Plex Sans Thai", sans-serif';
  ctx.fillText('เส้นทางอาชีพแนะนำที่ตรงกับคุณ', 124, 1510);

  const topCareers = outcome.orderedCareers.slice(0, 6);
  topCareers.forEach((career, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cx = 124 + col * 430;
    const cy = 1568 + row * 54;
    ctx.fillStyle = '#F1F5F9';
    ctx.font = '500 26px "Outfit", "IBM Plex Sans Thai", sans-serif';
    ctx.fillText(`0${idx + 1}. ${career}`, cx, cy);
  });

  // Footer
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 24px "IBM Plex Sans Thai", sans-serif';
  ctx.fillText('Imagine Design Event · ค้นหาสาขาที่ใช่ ณ School of Digital Media', 96, 1828);

  return canvas.toDataURL('image/png');
}
