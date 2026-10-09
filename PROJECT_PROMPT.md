# PROJECT_PROMPT — Master Specification

> Dr.Witcha — Portfolio & Activity Gallery

## วัตถุประสงค์
สร้างเว็บสรุปผลงานและประวัติกิจกรรมของ ดร.วิชชา ฉิมพลี มหาวิทยาลัยสวนดุสิต ดึงข้อมูลจาก dusit.ac.th จัดหมวดหมู่ สร้างไทม์ไลน์ มีระบบ AI สแกนใบหน้า

## ขอบเขตงาน
1. **Gallery** — Grid 2 คอลัมน์ (1 คอลัมน์บนมือถือ) แสดงการ์ดกิจกรรมพร้อม Image Carousel, Search real-time, Filter ปี พ.ศ., Modal แก้ไข/ลบ (persist LocalStorage `dr_witcha_activities_v2`)
2. **Stat Badges** — จำนวนกิจกรรม, รูปภาพรวม, ช่วงปี พ.ศ. 2556-2569, ความแม่นยำ 100%
3. **AI Security Scanner** — อัปโหลดใบหน้าเป้าหมาย → สแกนทุกกิจกรรม → วาดวงกลมเรืองแสง (🎯 Target / ⭕ Crowd) + Confidence % + People Counter, Threshold 80-99%, Fallback เมื่อไม่มี Backend
4. **UI** — Glassmorphism Slate-950 + Glow Gradient (Blue-600/Amber-500), ฟอนต์ Prompt, rounded-[36px], Framer Motion
5. **Backend** — FastAPI + InsightFace SCRFD + ArcFace 512-D + ONNX Runtime, endpoints 5 ตัวตาม README
6. **Data** — `Activity` interface (id, images[], date, year, title, context, what, where, how, sourceUrls) ครอบคลุม พ.ศ. 2556-2569

## Tech Stack
Frontend: React 18 + TS + Vite + Tailwind 3 + Zustand + Framer Motion + Lucide + React Router v7
Backend: FastAPI + Uvicorn + InsightFace + ArcFace + OpenCV + NumPy + ONNX Runtime

## โครงสร้างไฟล์
ดู README.md หัวข้อ Project Structure

## เกณฑ์สำเร็จ
- `npm run dev` → http://localhost:5173
- `npm run build` → tsc + vite build ผ่าน
- `cd backend && python main.py` → http://localhost:8000 (fallback ได้ถ้าไม่รัน)
- Responsive, แก้ไข/ลบ persist, สแกนใบหน้า mock/fallback ใช้งานได้
