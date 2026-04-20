"use client";

import { useState } from "react";
import { Loader2, Plane, Calendar, Users, Briefcase } from "lucide-react";

export default function TravelPlanner() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    destination: "",
    dates: "",
    companion: "",
    job: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("생성 실패");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <main className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
        <div className="max-w-2xl w-full space-y-8">
          <header className="border-b border-gray-800 pb-4">
            <h1 className="text-3xl font-bold tracking-tighter">{result.title}</h1>
            <p className="text-gray-400 mt-2 italic">"{result.summary}"</p>
          </header>

          <div className="space-y-6">
            {result.schedule.map((day: any) => (
              <div key={day.day} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <h3 className="text-lg font-semibold mb-4 text-blue-400">Day {day.day}</h3>
                <ul className="space-y-3">
                  {day.activities.map((act: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300">
                      <span className="text-zinc-500">•</span> {act}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button
            onClick={() => setResult(null)}
            className="w-full py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition"
          >
            다시 만들기
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">AI Travel Planner</h1>
          <p className="text-zinc-500">직장인을 위한 최적의 리프레시 경로</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Plane className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />
              <input
                required
                placeholder="어디로 떠나시나요? (예: 도쿄, 제주도)"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />
              <input
                required
                placeholder="여행 일정 (예: 2박 3일)"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
              />
            </div>

            <div className="relative">
              <Users className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />
              <input
                required
                placeholder="동행 (예: 나홀로, 가족, 친구)"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({ ...formData, companion: e.target.value })}
              />
            </div>

            <div className="relative">
              <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />
              <input
                required
                placeholder="현재 직업 (맞춤 코스 반영용)"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({ ...formData, job: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "AI 일정 생성하기"}
          </button>
        </form>
      </div>
    </main>
  );
}