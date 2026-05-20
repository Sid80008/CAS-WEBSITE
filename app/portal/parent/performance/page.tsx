import React from "react";
import { LucideIcon } from "lucide-react";

export default function Page() {
  return (
    <main>
      

<aside className="h-full w-64 fixed left-0 top-0 overflow-y-auto bg-surface-container-low border-r border-border-default z-50 flex flex-col gap-2 p-4">
<div className="mb-8 px-2">
<h1 className="font-h3 text-h3 font-bold text-primary">Central Academy</h1>
<p className="font-label text-label text-on-surface-variant">Anta Campus</p>
</div>
<nav className="flex flex-col gap-1 flex-1">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-colors group" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-label">Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-colors group" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-label text-label">Academics</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-primary text-on-primary rounded-lg font-bold shadow-sm" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label text-label">Performance</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-colors group" href="#">
<span className="material-symbols-outlined">payments</span>
<span className="font-label text-label">Fee Portal</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-colors group" href="#">
<span className="material-symbols-outlined">calendar_month</span>
<span className="font-label text-label">Calendar</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-colors group" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label text-label">Settings</span>
</a>
</nav>
<div className="mt-auto pt-4 border-t border-border-default flex flex-col gap-2">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined">help_outline</span>
<span className="font-label text-label">Help Support</span>
</a>
<button className="w-full mt-2 py-2 px-4 bg-primary text-on-primary font-label text-label rounded-lg hover:bg-school-blue-dark transition-all">
                Switch Account
            </button>
</div>
</aside>

<header className="fixed top-0 right-0 left-64 h-16 z-40 bg-surface border-b border-border-default flex justify-between items-center px-6">
<div className="flex items-center gap-4">
<h2 className="font-h4 text-h4 font-bold text-primary">Performance &amp; Progress Report</h2>
<span className="bg-teal-light text-teal-dark px-2 py-0.5 rounded-full font-overline text-overline">SESSION 2023-24</span>
</div>
<div className="flex items-center gap-6">
<a className="font-label text-label text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Support</a>
<div className="flex items-center gap-3">
<button className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-all">
<span className="material-symbols-outlined">notifications</span>
</button>
<div className="flex items-center gap-3 pl-4 border-l border-border-default">
<div className="text-right">
<p className="font-label text-label font-bold">Aryan Sharma</p>
<p className="text-[11px] text-on-surface-variant">Class 10-B | Roll No. 24</p>
</div>
<img alt="Profile" className="w-10 h-10 rounded-full border-2 border-primary-fixed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa4zRGTDk62K7asaWPJy9fcAOD9_olL9iRDCmUVPNFkIl6ElnS9Bl4RT0WZza4-0zRHzPN3EpPpPL7d40h06Esh-o2PzdZ4ZY4xB9-H6Rg-DmwX4UPM9XsRXA6xobxlBaKxJfziMZR3Cn2XGK4ycK9wwAM8MlYvmPOlSwq1E1sth1cmc7oo9Y6SFwv7yjX4Rvj09iH9ESpinbRPEE-OrO7CVGg2O56VQzjqXL5MKqRzyYVgrKwNBIvgdLsLSXDvrdNhn-AVkuyC9w9"/>
</div>
</div>
</div>
</header>

<main className="ml-64 pt-24 pb-12 px-page-desktop max-w-container-max mx-auto">

<div className="grid grid-cols-1 md:grid-cols-4 gap-lg mb-8">

<div className="bg-surface-container-lowest p-6 rounded-lg border border-border-default shadow-sm hover:shadow-md transition-all">
<div className="flex justify-between items-start mb-2">
<p className="text-on-surface-variant font-label text-label">Current Aggregate</p>
<span className="text-green font-label text-label flex items-center gap-1">+2.4% <span className="material-symbols-outlined text-[16px]">trending_up</span></span>
</div>
<h3 className="font-h1 text-h1 text-primary">88.5%</h3>
<div className="mt-2 w-full bg-surface-container rounded-full h-1.5">
<div className="bg-primary h-1.5 rounded-full" style={{"width":"88.5%"}}></div>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-lg border-2 border-primary shadow-sm hover:shadow-md transition-all relative overflow-hidden">
<div className="flex justify-between items-start mb-2">
<p className="text-on-surface-variant font-label text-label">Attendance</p>
<span className="material-symbols-outlined text-primary">event_available</span>
</div>
<h3 className="font-h1 text-h1 text-primary">96%</h3>
<p className="text-caption text-green font-medium">Excellent - Regular Student</p>

<div className="absolute -bottom-6 -right-6 opacity-5">
<span className="material-symbols-outlined text-9xl">check_circle</span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-lg border border-border-default shadow-sm hover:shadow-md transition-all">
<div className="flex justify-between items-start mb-2">
<p className="text-on-surface-variant font-label text-label">Class Rank</p>
<span className="material-symbols-outlined text-secondary">leaderboard</span>
</div>
<h3 className="font-h1 text-h1 text-secondary">04<span className="text-h3 font-normal text-on-surface-variant">/42</span></h3>
<p className="text-caption text-secondary font-medium">Top 5% of class</p>
</div>
<div className="bg-surface-container-lowest p-6 rounded-lg border border-border-default shadow-sm hover:shadow-md transition-all">
<div className="flex justify-between items-start mb-2">
<p className="text-on-surface-variant font-label text-label">Active Projects</p>
<span className="material-symbols-outlined text-error">assignment_late</span>
</div>
<h3 className="font-h1 text-h1 text-error">02</h3>
<p className="text-caption text-error font-medium">Due by next Friday</p>
</div>
</div>

<section className="bg-surface-container-lowest p-8 rounded-lg border border-border-default shadow-sm mb-8">
<div className="flex justify-between items-center mb-10">
<div>
<h3 className="font-h3 text-h3 text-primary">Marks Progression Over Term</h3>
<p className="font-body-small text-body-small text-on-surface-variant">Performance across Unit Tests and Mid-Term Exams</p>
</div>
<div className="flex gap-4">
<div className="flex items-center gap-2">
<span className="w-3 h-3 bg-primary rounded-full"></span>
<span className="text-caption font-medium">Student Performance</span>
</div>
</div>
</div>
<div className="relative h-[300px] w-full flex items-end">

<div className="absolute left-0 h-full flex flex-col justify-between text-caption text-on-surface-variant pr-4">
<span>100%</span>
<span>80%</span>
<span>60%</span>
<span>40%</span>
<span>20%</span>
<span>0%</span>
</div>

<div className="ml-12 w-full h-full relative">

<div className="absolute inset-0 border-b border-border-default flex flex-col justify-between">
<div className="border-t border-surface-container-highest w-full h-0"></div>
<div className="border-t border-surface-container-highest w-full h-0"></div>
<div className="border-t border-surface-container-highest w-full h-0"></div>
<div className="border-t border-surface-container-highest w-full h-0"></div>
<div className="border-t border-surface-container-highest w-full h-0"></div>
</div>

<svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
<path d="M0,25 L20,20 L40,15 L60,18 L80,12 L100,10" fill="none" stroke="#1B4F8A" strokeWidth="2" vector-effect="non-scaling-stroke"></path>

<path d="M0,25 L20,20 L40,15 L60,18 L80,12 L100,10 L100,100 L0,100 Z" fill="url(#lineGradient)" opacity="0.1"></path>
<defs>
<linearGradient id="lineGradient" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#1B4F8A"></stop>
<stop offset="100%" stopColor="white"></stop>
</linearGradient>
</defs>
</svg>

<div className="absolute inset-0 w-full flex justify-between items-end">
<div className="flex flex-col items-center group relative h-full justify-between" style={{"width":"16.66%"}}>
<div className="w-3 h-3 bg-primary border-2 border-white rounded-full mt-[23%] z-10 transition-transform group-hover:scale-150"></div>
<span className="text-caption text-on-surface-variant mb-[-24px] whitespace-nowrap">Unit Test 1</span>
</div>
<div className="flex flex-col items-center group relative h-full justify-between" style={{"width":"16.66%"}}>
<div className="w-3 h-3 bg-primary border-2 border-white rounded-full mt-[18%] z-10 transition-transform group-hover:scale-150"></div>
<span className="text-caption text-on-surface-variant mb-[-24px] whitespace-nowrap">Unit Test 2</span>
</div>
<div className="flex flex-col items-center group relative h-full justify-between" style={{"width":"16.66%"}}>
<div className="w-3 h-3 bg-primary border-2 border-white rounded-full mt-[13%] z-10 transition-transform group-hover:scale-150"></div>
<span className="text-caption text-on-surface-variant mb-[-24px] whitespace-nowrap">Monthly Quiz</span>
</div>
<div className="flex flex-col items-center group relative h-full justify-between" style={{"width":"16.66%"}}>
<div className="w-3 h-3 bg-primary border-2 border-white rounded-full mt-[16%] z-10 transition-transform group-hover:scale-150"></div>
<span className="text-caption text-on-surface-variant mb-[-24px] whitespace-nowrap">Unit Test 3</span>
</div>
<div className="flex flex-col items-center group relative h-full justify-between" style={{"width":"16.66%"}}>
<div className="w-3 h-3 bg-primary border-2 border-white rounded-full mt-[10%] z-10 transition-transform group-hover:scale-150"></div>
<span className="text-caption text-on-surface-variant mb-[-24px] whitespace-nowrap">Half Yearly</span>
</div>
<div className="flex flex-col items-center group relative h-full justify-between" style={{"width":"16.66%"}}>
<div className="w-3 h-3 bg-primary border-2 border-white rounded-full mt-[8%] z-10 transition-transform group-hover:scale-150"></div>
<span className="text-caption text-on-surface-variant mb-[-24px] whitespace-nowrap">Unit Test 4</span>
</div>
</div>
</div>
</div>
<div className="mt-12"></div>
</section>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-lg mb-8">

<div className="lg:col-span-2 bg-surface-container-lowest rounded-lg border border-border-default shadow-sm overflow-hidden">
<div className="p-6 border-b border-border-default bg-surface-container-low flex justify-between items-center">
<h3 className="font-h3 text-h3 text-primary">Latest Exam Results</h3>
<div className="flex gap-2">
<span className="bg-primary/10 text-primary px-3 py-1 rounded text-caption font-bold">Term 2 - Dec 2023</span>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container text-on-surface-variant font-label text-label">
<th className="p-4 border-b border-border-default font-semibold">Subject</th>
<th className="p-4 border-b border-border-default font-semibold text-center">Marks (100)</th>
<th className="p-4 border-b border-border-default font-semibold text-center">Class Avg</th>
<th className="p-4 border-b border-border-default font-semibold">Performance</th>
<th className="p-4 border-b border-border-default font-semibold">Grade</th>
</tr>
</thead>
<tbody className="divide-y divide-border-default">
<tr className="hover:bg-school-blue-extra-light transition-colors">
<td className="p-4 font-medium">Mathematics</td>
<td className="p-4 text-center font-bold">92</td>
<td className="p-4 text-center text-on-surface-variant">75</td>
<td className="p-4">
<span className="inline-flex items-center gap-1 text-green text-caption font-bold">
<span className="material-symbols-outlined text-[16px]">trending_up</span> Outstanding
                                    </span>
</td>
<td className="p-4 font-bold text-primary">A1</td>
</tr>
<tr className="hover:bg-school-blue-extra-light transition-colors">
<td className="p-4 font-medium">Physics</td>
<td className="p-4 text-center font-bold">88</td>
<td className="p-4 text-center text-on-surface-variant">70</td>
<td className="p-4">
<span className="inline-flex items-center gap-1 text-green text-caption font-bold">
<span className="material-symbols-outlined text-[16px]">trending_up</span> Advanced
                                    </span>
</td>
<td className="p-4 font-bold text-primary">A2</td>
</tr>
<tr className="hover:bg-school-blue-extra-light transition-colors">
<td className="p-4 font-medium">English Literature</td>
<td className="p-4 text-center font-bold">82</td>
<td className="p-4 text-center text-on-surface-variant">80</td>
<td className="p-4">
<span className="inline-flex items-center gap-1 text-secondary text-caption font-bold">
<span className="material-symbols-outlined text-[16px]">horizontal_rule</span> Average
                                    </span>
</td>
<td className="p-4 font-bold text-primary">B1</td>
</tr>
<tr className="hover:bg-school-blue-extra-light transition-colors">
<td className="p-4 font-medium">History</td>
<td className="p-4 text-center font-bold">95</td>
<td className="p-4 text-center text-on-surface-variant">68</td>
<td className="p-4">
<span className="inline-flex items-center gap-1 text-green text-caption font-bold">
<span className="material-symbols-outlined text-[16px]">trending_up</span> Exemplary
                                    </span>
</td>
<td className="p-4 font-bold text-primary">A1</td>
</tr>
<tr className="hover:bg-school-blue-extra-light transition-colors">
<td className="p-4 font-medium">Computer Science</td>
<td className="p-4 text-center font-bold">98</td>
<td className="p-4 text-center text-on-surface-variant">85</td>
<td className="p-4">
<span className="inline-flex items-center gap-1 text-green text-caption font-bold">
<span className="material-symbols-outlined text-[16px]">trending_up</span> Outstanding
                                    </span>
</td>
<td className="p-4 font-bold text-primary">A1</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="flex flex-col gap-lg">
<div className="bg-surface-container-lowest p-6 rounded-lg border border-border-default shadow-sm">
<h4 className="font-h4 text-h4 text-on-surface mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">download</span>
                        Report Cards
                    </h4>
<div className="flex flex-col gap-3">
<button className="flex items-center justify-between p-3 border border-border-default rounded-lg hover:border-primary hover:bg-school-blue-extra-light transition-all group">
<div className="text-left">
<p className="font-label text-label font-bold text-on-surface">Half Yearly Exam</p>
<p className="text-caption text-on-surface-variant">PDF • 2.4 MB • Released Jan 05</p>
</div>
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">picture_as_pdf</span>
</button>
<button className="flex items-center justify-between p-3 border border-border-default rounded-lg hover:border-primary hover:bg-school-blue-extra-light transition-all group">
<div className="text-left">
<p className="font-label text-label font-bold text-on-surface">Unit Test 3</p>
<p className="text-caption text-on-surface-variant">PDF • 1.1 MB • Released Nov 12</p>
</div>
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">picture_as_pdf</span>
</button>
</div>
</div>
<div className="bg-primary p-6 rounded-lg shadow-lg text-on-primary">
<div className="flex items-center gap-2 mb-3">
<span className="material-symbols-outlined text-secondary">forum</span>
<h4 className="font-h4 text-h4">Connect with Teachers</h4>
</div>
<p className="font-body-small text-body-small opacity-90 mb-4">The upcoming PTM is scheduled for Saturday, Feb 10th. Book your slot now to discuss Aryan's progress.</p>
<button className="w-full py-2.5 bg-secondary text-on-secondary font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
                        Schedule PTM Slot
                    </button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-lg border border-border-default shadow-sm overflow-hidden mb-8">
<div className="p-6 border-b border-border-default bg-surface-container-low flex justify-between items-center">
<div>
<h3 className="font-h3 text-h3 text-primary">Holistic Feedback &amp; Remarks</h3>
<p className="font-body-small text-body-small text-on-surface-variant">Specific feedback from subject teachers for Term 2</p>
</div>
<div className="flex gap-2">
<button className="px-4 py-1.5 bg-surface-container-lowest border border-border-default rounded-lg text-label font-medium hover:border-primary transition-all flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Filter by Sentiment
                    </button>
</div>
</div>
<div className="divide-y divide-border-default">

<div className="p-6 flex flex-col md:flex-row gap-6 hover:bg-school-blue-extra-light/30 transition-colors">
<div className="w-full md:w-56 shrink-0">
<div className="flex items-center gap-3 mb-3">
<img className="w-12 h-12 rounded-full object-cover border-2 border-teal-light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3tCErCCY2U2-Sxa9JdRWNfJ0hQhgdBJPGf-VL8GSanRLAb78BnN9TNHFcB4ZZ__6WO6Uh93VK-RlFGamcICd4yup3BdE3jtdIKoBIeH4pvFURFfjgIIYkoi_ZXPo1mXIwTS_7iDyIHYzTH-CYW4hESHSeUFCAON1--KBIAAo_JqpjpjAVDoCUDQPFzVwMlT5cA0RkCHOWSfzjJPZOH5XGjtQNg69P-Im2FTAZd6qXnEU8KYo1CRKDB_A5plLJemg4KiR7QFu4H_fK"/>
<div>
<p className="font-label text-label font-bold text-primary">Mrs. Sunita Rao</p>
<p className="text-caption text-on-surface-variant">Mathematics</p>
</div>
</div>
<div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-light text-teal-dark rounded-full text-caption font-bold">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>sentiment_very_satisfied</span>
                            POSITIVE FEEDBACK
                        </div>
</div>
<div className="flex-1 bg-surface-container-low/30 p-4 rounded-xl border border-border-default/50">
<p className="font-body text-body text-on-surface mb-3 leading-relaxed">
                            "Aryan has shown exceptional growth in Euclidean Geometry this term. His problem-solving approach has become much more structured. He is consistently among the first to solve complex equations in class and often helps peers who are struggling. His logical reasoning is a major asset."
                        </p>
<p className="text-caption text-on-surface-variant font-medium flex items-center gap-2">
<span className="material-symbols-outlined text-[14px]">calendar_today</span>
                            Posted Jan 14, 2024
                        </p>
</div>
</div>

<div className="p-6 flex flex-col md:flex-row gap-6 hover:bg-amber-light/20 transition-colors">
<div className="w-full md:w-56 shrink-0">
<div className="flex items-center gap-3 mb-3">
<img className="w-12 h-12 rounded-full object-cover border-2 border-amber-light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyrdR_w2IrxGD9FCWmFBfkX0v7dP94M0I_RvqHSlY_F5ZcYG4WcpmTLrmPurG9I-2an6nYEImEuif9qyLsBDbc9EhcsEk-VRY2uq7R8ht_LOC5UWuDeQiJb45Zbp-lGDh5tkHeHUWGM0xPijgNq0EQ_JqknlOih2f5ZwuTDtb41Xbd2WL-_IjHIeJPUKrFsws100QmlkjDl_tAJ290S6bcHgmWEKNpgERJ_c0vYU-UzPIupJ9H64VM6yXVq-Ixw6Cgb_iVE8zTyjUd"/>
<div>
<p className="font-label text-label font-bold text-primary">Dr. Alok Verma</p>
<p className="text-caption text-on-surface-variant">Physics</p>
</div>
</div>
<div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-light text-amber-dark rounded-full text-caption font-bold">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>emoji_objects</span>
                            ENCOURAGING
                        </div>
</div>
<div className="flex-1 bg-amber-light/10 p-4 rounded-xl border border-amber-light/30">
<p className="font-body text-body text-on-surface mb-3 leading-relaxed">
                            "Great enthusiasm during lab practicals. While his theoretical understanding is strong, I would encourage Aryan to spend more time on numerical practice related to Thermodynamics. His recent project on solar cells was highly commendable and showed great research depth."
                        </p>
<p className="text-caption text-on-surface-variant font-medium flex items-center gap-2">
<span className="material-symbols-outlined text-[14px]">calendar_today</span>
                            Posted Jan 10, 2024
                        </p>
</div>
</div>

<div className="p-6 flex flex-col md:flex-row gap-6 hover:bg-coral-light/20 transition-colors border-l-4 border-coral">
<div className="w-full md:w-56 shrink-0">
<div className="flex items-center gap-3 mb-3">
<img className="w-12 h-12 rounded-full object-cover border-2 border-coral-light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ45Lb2RfyzKU-dGf3nI4USIJHlFhjLUfQBz_bgWPfVJ3eiIq18LlpyKVDKv0oYME3CUmzzCaI17MV0SiuwDOP3aDJe3_615sS1kCpsO4sDv-A2dwkB3H8PNTZj-gf1OK69tAn0PIBtrzPXcvBn_GPWb-DurYFdjd_zLXJ2wC6sHpGv16fRp7SKO3pub092cnref8a06qIEBPjgTElanpBzkF-cMj4gjE3uMgU1rlqjiWEx7HFjVt4u5r3GJc5mYviLIyjrQMJaUdE"/>
<div>
<p className="font-label text-label font-bold text-primary">Mr. David Smith</p>
<p className="text-caption text-on-surface-variant">English Lit.</p>
</div>
</div>
<div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coral-light text-coral rounded-full text-caption font-bold">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>error</span>
                            NEEDS FOCUS
                        </div>
</div>
<div className="flex-1 bg-coral-light/10 p-4 rounded-xl border border-coral-light/30">
<p className="font-body text-body text-on-surface mb-3 leading-relaxed">
                            "Aryan's creative writing skills are impressive, but there's a noticeable trend of late submissions this month. We need to work on time management to ensure his work reflects his full potential. Grammar accuracy in long-form essays also needs regular review and more focus during revisions."
                        </p>
<p className="text-caption text-on-surface-variant font-medium flex items-center gap-2">
<span className="material-symbols-outlined text-[14px]">calendar_today</span>
                            Posted Jan 05, 2024
                        </p>
</div>
</div>
</div>
</div>
</main>

<button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 group" id="fab-contact">
<span className="material-symbols-outlined">message</span>
<span className="absolute right-16 bg-on-surface text-surface px-4 py-2 rounded-lg text-caption opacity-0 group-hover:opacity-100 transition-opacity shadow-xl whitespace-nowrap pointer-events-none font-bold">
            Chat with Class Teacher
        </span>
</button>


    </main>
  );
}
