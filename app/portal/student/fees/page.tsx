import React from "react";
import { LucideIcon } from "lucide-react";

export default function Page() {
  return (
    <main>
      

<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-page-mobile h-16 bg-surface dark:bg-surface-container-highest shadow-sm dark:shadow-none">
<div className="flex items-center gap-4">
<button className="active:scale-95 transition-transform p-2 rounded-full hover:bg-surface-container-high transition-colors duration-200">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">arrow_back</span>
</button>
<h1 className="font-h3 text-h3 font-bold text-primary dark:text-primary-fixed-dim">Circulars &amp; Notices</h1>
</div>
<button className="active:scale-95 transition-transform p-2 rounded-full hover:bg-surface-container-high transition-colors duration-200">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">notifications</span>
</button>
</header>
<main className="pt-20 pb-32 px-page-mobile max-w-lg mx-auto">

<div className="mb-6 flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-school-blue-light flex items-center justify-center border-2 border-primary overflow-hidden">
<img alt="Student Profile" className="w-full h-full object-cover" data-alt="A professional, high-quality headshot of a young Indian male student wearing a crisp white school uniform with a navy blue blazer. The student has a bright, confident smile and is positioned against a soft-focus academic background of a library. The lighting is warm and natural, creating a sense of academic excellence and institutional trust." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxJ4mzd5f7u5PwC01_WTS1Le10WGsQLxsnc2hkpPEyCgD8ofD15F7-v9TWqI76VQb8-yBd-bqxP70K7EpzKpb4bHFxOVLhbzkpTtQDnZ7q-rq4ms0Xjxi_Ykpw2-wQOBYR27q0KNeE1vw820k_5meU6501rRycm3kA22_tfs6FrFsq6Ql66NFBfbvAR7XpTna4TCxjb1Jg-OGXZxJFrKhHqlXXOiAq3WInOuGp7HoDHyP_asBUM-xZsgtOX85uL-BustTH5KG7T3xy"/>
</div>
<div>
<h2 className="font-h4 text-h4 text-primary">Aarav Sharma</h2>
<p className="font-caption text-caption text-on-surface-variant">Class X-C | Roll No: 24</p>
</div>
</div>

<section className="mb-lg">
<div className="relative overflow-hidden rounded-xl bg-primary-container p-6 shadow-lg text-on-primary">

<div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary-container/20 rounded-full blur-2xl"></div>
<div className="relative z-10">
<p className="font-overline text-overline opacity-80 uppercase tracking-widest mb-1">Total Outstanding Balance</p>
<h3 className="text-[32px] font-bold mb-4">₹14,500</h3>
<div className="flex items-center gap-2 mb-6 bg-white/10 w-fit px-3 py-1.5 rounded-lg">
<span className="material-symbols-outlined text-sm">calendar_month</span>
<p className="font-label text-label">Due Date: Jan 31, 2024</p>
</div>
<button className="w-full py-4 bg-secondary text-on-secondary font-bold text-body rounded-lg shadow-strong active:scale-95 transition-transform flex items-center justify-center gap-2">
<span className="material-symbols-outlined">payments</span>
                        Pay Now
                    </button>
</div>
</div>
</section>

<section className="mb-lg">
<div className="flex items-center justify-between mb-4">
<h4 className="font-h4 text-h4 text-primary">Upcoming Dues</h4>
<button className="text-primary font-label text-label flex items-center">View Schedule <span className="material-symbols-outlined text-sm ml-1">chevron_right</span></button>
</div>
<div className="space-y-4">

<div className="bg-white border border-border-default rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-lg bg-school-blue-extra-light flex items-center justify-center">
<span className="material-symbols-outlined text-primary">menu_book</span>
</div>
<div className="flex-1">
<h5 className="font-label text-label font-bold">Quarter 3 Tuition</h5>
<p className="text-caption text-on-surface-variant">Due by Jan 15, 2024</p>
</div>
<div className="text-right">
<p className="font-label text-label font-bold text-primary">₹12,000</p>
<span className="inline-block px-2 py-0.5 bg-coral-light text-coral font-overline text-[10px] rounded uppercase">High Priority</span>
</div>
</div>

<div className="bg-white border border-border-default rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-lg bg-teal-light flex items-center justify-center">
<span className="material-symbols-outlined text-teal-dark">science</span>
</div>
<div className="flex-1">
<h5 className="font-label text-label font-bold">Lab &amp; Activity Fees</h5>
<p className="text-caption text-on-surface-variant">Due by Jan 20, 2024</p>
</div>
<div className="text-right">
<p className="font-label text-label font-bold text-primary">₹2,500</p>
<span className="inline-block px-2 py-0.5 bg-amber-light text-amber-dark font-overline text-[10px] rounded uppercase">Mandatory</span>
</div>
</div>
</div>
</section>

<section className="mb-lg">
<div className="grid grid-cols-2 gap-4">
<div className="bg-surface-container-low p-4 rounded-xl border border-border-default active:scale-95 transition-transform cursor-pointer">
<span className="material-symbols-outlined text-primary mb-2">request_quote</span>
<h5 className="font-label text-label font-bold">Fee Structure</h5>
<p className="text-[11px] text-on-surface-variant">Academic Year 2023-24</p>
</div>
<div className="bg-surface-container-low p-4 rounded-xl border border-border-default active:scale-95 transition-transform cursor-pointer">
<span className="material-symbols-outlined text-secondary mb-2">savings</span>
<h5 className="font-label text-label font-bold">Scholarships</h5>
<p className="text-[11px] text-on-surface-variant">Check your eligibility</p>
</div>
</div>
</section>

<section className="mb-section">
<div className="flex items-center justify-between mb-4">
<h4 className="font-h4 text-h4 text-primary">Recent Transactions</h4>
<button className="text-primary font-label text-label">View History</button>
</div>
<div className="bg-white border border-border-default rounded-xl overflow-hidden shadow-sm">
<div className="divide-y divide-border-default">

<div className="p-4 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center">
<span className="material-symbols-outlined text-green" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div>
<h6 className="font-label text-label font-bold">Quarter 2 Tuition</h6>
<p className="text-caption text-on-surface-variant">Dec 05, 2023 • ID: #TRX9021</p>
</div>
</div>
<div className="flex flex-col items-end gap-1">
<p className="font-label text-label font-bold text-green">₹12,000</p>
<button className="flex items-center text-primary font-label text-[11px] hover:underline">
<span className="material-symbols-outlined text-sm mr-1">download</span>
                                Receipt
                            </button>
</div>
</div>

<div className="p-4 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center">
<span className="material-symbols-outlined text-green" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div>
<h6 className="font-label text-label font-bold">Annual Sports Fee</h6>
<p className="text-caption text-on-surface-variant">Nov 12, 2023 • ID: #TRX8842</p>
</div>
</div>
<div className="flex flex-col items-end gap-1">
<p className="font-label text-label font-bold text-green">₹1,500</p>
<button className="flex items-center text-primary font-label text-[11px] hover:underline">
<span className="material-symbols-outlined text-sm mr-1">download</span>
                                Receipt
                            </button>
</div>
</div>
</div>
</div>
</section>

<section className="mb-4">
<div className="bg-school-blue-extra-light p-4 rounded-xl border border-school-blue-light flex items-center gap-4">
<span className="material-symbols-outlined text-primary text-3xl">help_outline</span>
<div>
<h5 className="font-label text-label font-bold text-school-blue-dark">Need assistance?</h5>
<p className="text-caption text-on-surface-variant">Contact our helpdesk for fee-related queries at support@centralacademy.edu</p>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface dark:bg-surface-container-lowest pb-safe pt-2 px-2 shadow-lg rounded-t-xl border-t border-border-default dark:border-outline-variant">

<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant opacity-70 hover:bg-surface-container-low transition-all active:scale-90 transition-transform duration-150">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-label">Dashboard</span>
</div>

<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant opacity-70 hover:bg-surface-container-low transition-all active:scale-90 transition-transform duration-150">
<span className="material-symbols-outlined">school</span>
<span className="font-label text-label">Academics</span>
</div>

<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant opacity-70 hover:bg-surface-container-low transition-all active:scale-90 transition-transform duration-150">
<span className="material-symbols-outlined">campaign</span>
<span className="font-label text-label">Notices</span>
</div>

<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant opacity-70 hover:bg-surface-container-low transition-all active:scale-90 transition-transform duration-150">
<span className="material-symbols-outlined">calendar_month</span>
<span className="font-label text-label">Calendar</span>
</div>

<div className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-transform duration-150">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>settings</span>
<span className="font-label text-label">Settings</span>
</div>
</nav>

<div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
<div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
<div className="absolute bottom-1/4 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
</div>


    </main>
  );
}
