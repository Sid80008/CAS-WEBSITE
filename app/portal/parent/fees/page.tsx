import React from "react";
import { LucideIcon } from "lucide-react";

export default function Page() {
  return (
    <main>
      

<aside className="fixed left-0 top-0 h-full w-64 hidden md:flex flex-col py-xl bg-surface-container-low border-r border-outline-variant z-50">
<div className="px-md mb-xl">
<h1 className="font-h4 text-h4 font-bold text-primary">Fee Portal</h1>
<p className="font-body-small text-body-small text-text-secondary">Parent Access</p>
</div>
<nav className="flex-1 px-sm space-y-1">
<a className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all duration-200" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-label text-label">Dashboard</span>
</a>
<a className="flex items-center gap-md px-md py-sm rounded-lg text-primary bg-school-blue-light font-bold border-r-4 border-primary transition-all duration-200" href="#">
<span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
<span className="font-label text-label">Fee Structure</span>
</a>
<a className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all duration-200" href="#">
<span className="material-symbols-outlined" data-icon="history">history</span>
<span className="font-label text-label">Transactions</span>
</a>
<a className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all duration-200" href="#">
<span className="material-symbols-outlined" data-icon="contact_support">contact_support</span>
<span className="font-label text-label">Support</span>
</a>
</nav>
<div className="mt-auto px-md pt-xl border-t border-outline-variant">
<button className="w-full bg-primary text-on-primary font-label text-label py-md rounded-lg shadow-sm hover:bg-school-blue-dark transition-all transform active:scale-95">
                Pay Now
            </button>
</div>
</aside>

<main className="md:ml-64 min-h-screen flex flex-col">

<header className="fixed top-0 right-0 left-0 md:left-64 z-40 flex justify-between items-center px-page-mobile md:px-page-desktop h-16 bg-surface shadow-sm">
<div className="flex items-center gap-md">
<button className="md:hidden text-primary">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="hidden md:block">
<span className="text-h3 font-h3 font-bold text-primary">Central Academy antah</span>
</div>
</div>
<div className="flex items-center gap-lg">
<div className="hidden sm:flex items-center gap-sm bg-school-blue-extra-light px-md py-xs rounded-full border border-school-blue-light">
<img alt="Student Avatar" className="w-8 h-8 rounded-full border border-primary/20" data-alt="A clean, professional headshot of a young Indian male student with short dark hair, wearing a crisp white school uniform shirt. The lighting is bright and even, against a soft neutral studio background, reflecting a high-quality academic institution's portrait style. The overall mood is serious yet positive." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEJGwjmEvMFuft-0iSp-j1T1OJbu1GPfufaUWHxShzDIKDozkjCJ_E30vQ0gVpJz0zW1d36hG9c_OOWOOPnVAQN_m3WTvEj_XrbAnpwMHbGt9vDD17twpGAY7wIJ6ANq7be7P5aZaVK8vj-_YlBwf5B1KYFsaVAN5p2qg6YsGu2MLx6fMLkqK4_UiHklkdzLBuOxZFSRixW16cP9VOwKAwIL-QdTs1mSNUiKGSz7Bqd2_6Q0v8mG7KupTX7rM-2qseGN11JzSLoJr"/>
<div className="text-left">
<p className="font-label text-label leading-none text-primary">Aarav Sharma</p>
<p className="font-caption text-caption text-text-secondary">Class X-C</p>
</div>
</div>
<div className="flex gap-md">
<button className="text-on-surface-variant hover:bg-school-blue-extra-light p-sm rounded-full transition-colors relative">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
<span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
</button>
<button className="text-on-surface-variant hover:bg-school-blue-extra-light p-sm rounded-full transition-colors">
<span className="material-symbols-outlined" data-icon="help_outline">help_outline</span>
</button>
</div>
</div>
</header>

<div className="mt-16 p-page-mobile md:p-page-desktop space-y-section max-w-container-max mx-auto w-full">

<section className="relative overflow-hidden rounded-xl bg-primary text-on-primary p-xl md:p-8 flex flex-col md:flex-row justify-between items-center gap-xl shadow-lg">
<div className="relative z-10 space-y-base text-center md:text-left">
<p className="font-label text-label opacity-90 uppercase tracking-wider">Total Outstanding Balance</p>
<h2 className="font-display text-display leading-tight">₹14,500</h2>
<div className="flex items-center justify-center md:justify-start gap-sm mt-md">
<span className="material-symbols-outlined text-secondary-container" data-icon="event">event</span>
<p className="font-body text-body">Next Deadline: <span className="font-bold">Jan 15, 2024</span></p>
</div>
</div>
<div className="relative z-10 flex flex-col sm:flex-row gap-md w-full md:w-auto">
<button className="px-xl py-md bg-secondary-container text-on-secondary-container font-h4 rounded-lg shadow-md hover:bg-secondary transition-all hover:scale-[1.02] active:scale-95">
                        Pay All Dues
                    </button>
<button className="px-xl py-md border-2 border-on-primary/30 text-on-primary font-h4 rounded-lg hover:bg-white/10 transition-all">
                        View Schedule
                    </button>
</div>

<div className="absolute -right-16 -bottom-16 w-64 h-64 bg-primary-container rounded-full opacity-50 blur-3xl"></div>
<div className="absolute -left-16 -top-16 w-48 h-48 bg-school-blue-dark rounded-full opacity-30 blur-2xl"></div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">

<div className="lg:col-span-2 space-y-lg">
<div className="flex items-center justify-between">
<h3 className="font-h3 text-h3 text-primary">Fee Structure Breakdown</h3>
<span className="font-label text-label text-secondary font-bold">Session 2023-24</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-lg">

<div className="bg-surface border border-outline-variant p-lg rounded-xl shadow-sm hover:border-primary transition-all group">
<div className="flex items-center gap-md mb-md">
<div className="w-12 h-12 bg-school-blue-light rounded-lg flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-h3" data-icon="school">school</span>
</div>
<div>
<p className="font-h4 text-h4">Tuition Fees</p>
<p className="font-caption text-caption text-text-tertiary">Academic Year Coverage</p>
</div>
</div>
<div className="space-y-sm">
<div className="flex justify-between text-body-small">
<span>Total Annual</span>
<span className="font-bold">₹48,000</span>
</div>
<div className="w-full bg-bg-tertiary h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-3/4"></div>
</div>
<p className="font-caption text-caption text-text-secondary text-right">75% Paid (₹36,000)</p>
</div>
</div>

<div className="bg-surface border border-outline-variant p-lg rounded-xl shadow-sm hover:border-primary transition-all group">
<div className="flex items-center gap-md mb-md">
<div className="w-12 h-12 bg-amber-light rounded-lg flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-h3" data-icon="directions_bus">directions_bus</span>
</div>
<div>
<p className="font-h4 text-h4">Transportation Fees</p>
<p className="font-caption text-caption text-text-tertiary">Bus Route: Sector 4 - antah</p>
</div>
</div>
<div className="space-y-sm">
<div className="flex justify-between text-body-small">
<span>Total Annual</span>
<span className="font-bold">₹12,000</span>
</div>
<div className="w-full bg-bg-tertiary h-2 rounded-full overflow-hidden">
<div className="bg-secondary h-full w-1/2"></div>
</div>
<p className="font-caption text-caption text-text-secondary text-right">50% Paid (₹6,000)</p>
</div>
</div>
</div>
</div>

<div className="space-y-lg">
<h3 className="font-h3 text-h3 text-primary">Upcoming Dues</h3>
<div className="bg-surface-container-low border-l-4 border-secondary rounded-xl p-lg space-y-md">
<div className="flex justify-between items-start">
<div>
<p className="font-label text-label text-secondary font-bold">DUE JAN 10</p>
<p className="font-body-large text-body-large font-bold">Quarter 3 Tuition</p>
<p className="font-caption text-caption text-text-secondary">Academic Session Dues</p>
</div>
<span className="font-h4 text-h4 font-bold text-on-surface">₹12,000</span>
</div>
<div className="pt-md border-t border-outline-variant flex justify-between items-start">
<div>
<p className="font-label text-label text-secondary font-bold">DUE JAN 15</p>
<p className="font-body-large text-body-large font-bold">Monthly Bus Fee</p>
<p className="font-caption text-caption text-text-secondary">January 2024</p>
</div>
<span className="font-h4 text-h4 font-bold text-on-surface">₹2,500</span>
</div>
<button className="w-full mt-md flex items-center justify-center gap-sm text-primary font-label hover:underline">
                            View Detailed Invoice <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</div>

<section className="space-y-lg">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
<h3 className="font-h3 text-h3 text-primary">Recent Transactions</h3>
<button className="text-primary font-label flex items-center gap-xs hover:bg-school-blue-extra-light px-md py-sm rounded-lg transition-all">
<span className="material-symbols-outlined">filter_list</span> Filter History
                    </button>
</div>
<div className="overflow-x-auto bg-surface border border-outline-variant rounded-xl shadow-sm">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-high">
<th className="px-xl py-md font-label text-label text-on-surface-variant">Description</th>
<th className="px-xl py-md font-label text-label text-on-surface-variant">Status</th>
<th className="px-xl py-md font-label text-label text-on-surface-variant">Paid Date</th>
<th className="px-xl py-md font-label text-label text-on-surface-variant">Amount</th>
<th className="px-xl py-md font-label text-label text-on-surface-variant text-right">Receipt</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-bg-secondary transition-colors group">
<td className="px-xl py-md">
<p className="font-body text-body font-semibold">Quarter 2 Tuition</p>
<p className="font-caption text-caption text-text-tertiary">INV-2023-089</p>
</td>
<td className="px-xl py-md">
<span className="inline-flex items-center gap-xs px-md py-xs bg-teal-light text-teal-dark font-label text-caption rounded-full">
<span className="material-symbols-outlined text-sm filled-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span> Paid
                                    </span>
</td>
<td className="px-xl py-md font-body text-body">Dec 05, 2023</td>
<td className="px-xl py-md font-body text-body font-bold text-primary">₹12,000</td>
<td className="px-xl py-md text-right">
<button className="p-sm text-primary hover:bg-school-blue-light rounded-full transition-all" title="Download Receipt">
<span className="material-symbols-outlined" data-icon="download">download</span>
</button>
</td>
</tr>
<tr className="hover:bg-bg-secondary transition-colors group">
<td className="px-xl py-md">
<p className="font-body text-body font-semibold">Annual Sports Fee</p>
<p className="font-caption text-caption text-text-tertiary">INV-2023-042</p>
</td>
<td className="px-xl py-md">
<span className="inline-flex items-center gap-xs px-md py-xs bg-teal-light text-teal-dark font-label text-caption rounded-full">
<span className="material-symbols-outlined text-sm filled-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span> Paid
                                    </span>
</td>
<td className="px-xl py-md font-body text-body">Nov 12, 2023</td>
<td className="px-xl py-md font-body text-body font-bold text-primary">₹3,500</td>
<td className="px-xl py-md text-right">
<button className="p-sm text-primary hover:bg-school-blue-light rounded-full transition-all" title="Download Receipt">
<span className="material-symbols-outlined" data-icon="download">download</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</section>
</div>

<footer className="mt-auto p-page-mobile md:p-page-desktop bg-surface-container-low border-t border-outline-variant">
<div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
<p className="font-caption text-caption text-text-secondary">© 2024 Central Academy antah. All Rights Reserved.</p>
<div className="flex gap-lg">
<a className="font-caption text-caption text-primary hover:underline" href="#">Privacy Policy</a>
<a className="font-caption text-caption text-primary hover:underline" href="#">Terms of Service</a>
<a className="font-caption text-caption text-primary hover:underline" href="#">Fee Policy</a>
</div>
</div>
</footer>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 pb-safe bg-surface border-t border-outline-variant md:hidden">
<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-caption text-caption">Home</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-4 py-1" href="#">
<span className="material-symbols-outlined filled-icon" data-icon="payments" style={{"fontVariationSettings":"'FILL' 1"}}>payments</span>
<span className="font-caption text-caption">Fees</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1" href="#">
<span className="material-symbols-outlined" data-icon="receipt">receipt</span>
<span className="font-caption text-caption">History</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-caption text-caption">Profile</span>
</a>
</nav>


    </main>
  );
}
