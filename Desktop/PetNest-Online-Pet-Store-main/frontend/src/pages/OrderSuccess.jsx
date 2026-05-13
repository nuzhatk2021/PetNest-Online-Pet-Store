import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16 text-center">
        <div className="bg-[#111] border border-white/5 rounded-2xl p-10">
          <h1 className="text-2xl font-bold">Order placed</h1>
          <p className="text-neutral-500 mt-2">Your order has been placed.</p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/pets"
              className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Browse more pets
            </Link>
            <Link
              to="/"
              className="text-sm border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 px-5 py-3 rounded-full transition-all"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

