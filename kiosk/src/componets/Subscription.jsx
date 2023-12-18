import { useState } from "react";

function Subscription() {
  return <>
  <div class="flex h-screen w-full items-center justify-center bg-slate-200">
  <div class="max-w-md rounded-xl bg-white shadow-lg">
    <div class="p-8">
      <img src="https://i.ibb.co/RgnhN32/undraw-compose-music-ovo2.png" alt="" />
    </div>

    <div class="flex flex-col items-center gap-6 p-8">
      <h3 class="text-2xl font-bold text-slate-800">Order Summary</h3>
      <p class="px-8 text-center text-sm text-slate-600">You can now listen to millions of songs, audiobooks and podcasts on any device anywhere you like!</p>

      <div class="flex w-full items-center gap-3 rounded-lg bg-slate-50 p-4">
        <div class="rounded-full bg-slate-200 p-3">
          <svg class="h-6 w-6 fill-slate-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4v13a3 3 0 1 1-2-2.83V6h-8v13a3 3 0 1 1-2-2.83V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2Z" fill-rule="evenodd" />
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-slate-800">Annual Plan</h4>
          <span class="text-sm text-slate-600">$59.99/year</span>
        </div>

        <button class="ml-auto text-xs font-semibold text-blue-800 underline underline-offset-1 hover:text-blue-700 hover:no-underline focus:text-blue-700 focus:no-underline">Change</button>
      </div>

      <button class="mt-3 w-full rounded-lg bg-blue-700 p-3 text-sm font-semibold text-white shadow-xl shadow-blue-700/30 outline-none transition-transform hover:scale-105 hover:bg-blue-600 focus:scale-105 focus:bg-blue-600 focus:ring-2">Proceed to Payment</button>

      <button class="w-full rounded-lg p-3 text-sm font-semibold text-slate-500 outline-none transition-transform hover:scale-105 hover:text-slate-600 focus:scale-105 focus:ring-2">Cancel Order</button>
    </div>
  </div>
</div>
   </>;
}

export default Subscription;
