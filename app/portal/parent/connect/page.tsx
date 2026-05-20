import React from "react";
import { LucideIcon } from "lucide-react";

export default function Page() {
  return (
    <main>
      

<header className="bg-surface dark:bg-surface-dim border-b border-border-default dark:border-outline-variant shadow-sm docked full-width top-0 z-50">
<div className="flex justify-between items-center w-full px-page-desktop max-w-container-max mx-auto h-16">
<div className="flex items-center gap-md">
<span className="text-h3 font-h3 font-bold text-school-blue-dark dark:text-primary-fixed">Central Academy</span>
<span className="hidden md:inline-block h-6 w-[1px] bg-border-default mx-2"></span>
<span className="hidden md:inline-block font-label text-label text-text-secondary">Parent-Teacher Portal</span>
</div>
<nav className="hidden md:flex items-center gap-xl font-h4 text-h4 font-display">
<a className="text-school-blue-dark dark:text-primary-fixed font-bold border-b-2 border-school-blue-dark pb-1" href="#">Messages</a>
<a className="text-text-secondary dark:text-on-surface-variant hover:text-school-blue-dark transition-colors" href="#">Meetings</a>
<a className="text-text-secondary dark:text-on-surface-variant hover:text-school-blue-dark transition-colors" href="#">Students</a>
<a className="text-text-secondary dark:text-on-surface-variant hover:text-school-blue-dark transition-colors" href="#">Calendar</a>
</nav>
<div className="flex items-center gap-md">
<button className="hidden lg:flex items-center gap-sm bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label text-label hover:bg-school-blue-dark transition-all Active:scale-95 duration-150 shadow-sm" >
<span className="material-symbols-outlined text-[20px]">event_available</span>
                    Schedule PTM
                </button>
<div className="flex items-center gap-sm">
<button className="p-2 rounded-full hover:bg-bg-secondary transition-colors">
<span className="material-symbols-outlined text-text-secondary" data-icon="notifications">notifications</span>
</button>
<button className="p-2 rounded-full hover:bg-bg-secondary transition-colors">
<span className="material-symbols-outlined text-text-secondary" data-icon="help">help</span>
</button>
<div className="w-10 h-10 rounded-full border border-border-default overflow-hidden bg-surface-container ml-2">
<img alt="Parent Profile Avatar" data-alt="A professional and friendly portrait of a middle-aged female parent with a warm smile, wearing a professional navy blue blazer. The background is a softly blurred modern office interior with warm wooden accents and soft lighting, reflecting a corporate modernism aesthetic that aligns with the school's professional yet approachable brand identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdyGVHH1rCr5pHYdxgCpcIl2xC8IN2dZ7CWvwahlDtgO3opGzxN8b-UMnxbRxani5QaYSjvpRitbJ4C0avSIp963PY_rJJemTg6y_n48uXsY2zpTdea6Q8E01Dhwn5ACxf75YeWWJlPbC7nzdco2bJnF5Q0BgyqAt8eja0VMQVTuTftaYBBnIBW_UgPnrrbGlWBmH4CWkAQ49l2hiX2i2ZpRYFX3RM2MRgGP6_jpUfdRnxPbDYMoXGMOv5WZ_lg0em7H81ijryZAVw"/>
</div>
</div>
</div>
</div>
</header>
<main className="flex h-[calc(100vh-64px)] max-w-[1440px] mx-auto overflow-hidden">

<aside className="hidden md:flex flex-col border-r border-border-default dark:border-outline h-full w-80 bg-surface-container-low dark:bg-inverse-surface">
<div className="p-6">
<div className="flex items-center justify-between mb-6">
<h2 className="font-h3 text-h3 font-bold text-school-blue-dark">Inbox</h2>
<span className="bg-school-blue-light text-school-blue-dark text-caption font-bold px-2 py-0.5 rounded-full">3 New</span>
</div>
<div className="relative group">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[20px]">search</span>
<input className="w-full pl-10 pr-4 py-2 bg-surface border border-border-default rounded-lg text-body-small focus:ring-2 focus:ring-school-blue-dark/20 focus:border-school-blue-dark outline-none transition-all" placeholder="Search teachers..." type="text"/>
</div>
</div>
<div className="flex-1 overflow-y-auto space-y-1 px-3">

<button className="w-full flex items-center gap-md bg-school-blue-light dark:bg-primary-container text-school-blue-dark dark:text-on-primary-container rounded-lg px-4 py-4 transition-all Active:translate-x-1 duration-200 shadow-sm border-l-4 border-school-blue-dark text-left">
<div className="relative flex-shrink-0">
<img alt="Teacher" className="w-12 h-12 rounded-full object-cover border-2 border-white" data-alt="A close-up portrait of a senior female teacher with grey hair and glasses, projecting wisdom and authority. She is wearing a dark green sweater. The lighting is soft and natural, suggesting a classroom environment with a blackboard slightly out of focus in the background, maintaining a professional and academic tone." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOB1Mt_mG-_BcT5kfZfiz9e2z4-Hx8_oQgGqgCC5QXzyV-0VyAokgVnj5NvwTZK_lI7WyxrUm3PjAGYBD3zbBCjGj0jnsWSUwuBxUULKNFmFND-wpu38wayhB9vQpoS-6Ox-k__8GFNJO9mMNKH2lxDVaRtnNzpD8cxoaTIhnUtUPB1g12pFI9Cpu87PtL-tX0PM3xjJMU1kwBiXB1whP3I1_Avs1pxoPdIP5dhIrbHcdZrTrg5iHM8T0fGsjGujUBb7dQhTBvUBmY"/>
<span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green border-2 border-white rounded-full"></span>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-1">
<span className="font-bold text-body truncate">Ms. Sarah Jenkins</span>
<span className="text-caption text-text-secondary whitespace-nowrap">2m ago</span>
</div>
<p className="text-caption text-school-blue-dark/70 font-semibold mb-0.5">Mathematics</p>
<p className="text-caption text-text-secondary truncate italic">"The progress reports for Unit 3..."</p>
</div>
</button>

<button className="w-full flex items-center gap-md text-on-surface-variant dark:text-surface-variant px-4 py-4 hover:bg-bg-tertiary rounded-lg transition-all text-left">
<div className="relative flex-shrink-0">
<img alt="Teacher" className="w-12 h-12 rounded-full object-cover grayscale" data-alt="A portrait of a male history teacher with a beard and a tweed blazer, holding a book. The style is classic and academic, with warm indoor lighting and a bookshelf in the background. The mood is intellectual and calm, reflecting the stability and tradition of a legacy institution." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD19IB8h3HM8Ot30jYe7j7guM_snnrm0dIcaYILeg7IxggRMlZAFy6Cb45Rxc7LjTx9OE8Oo5xHlYCW1OTkRVELGD7BY8528WK5VWFbF3xht8BCXO6wJB19YeA_o5NvYKB0U75Gy7LWTeVY9j-BBlpr5GVq2pm6_9Por2nz7OvdvAJwp9qRcTRxk8JWxL-bGEsfhlpRrBHumBLwdfN0O5jNtyLaRL6SAv7C6-hy_rttf903zy5bfKptrkZzn1PLfrlGcZBg9TlOatJ6"/>
<span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-text-tertiary border-2 border-white rounded-full"></span>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-1">
<span className="font-semibold text-body truncate text-on-surface">Mr. David Wilson</span>
<span className="text-caption text-text-secondary whitespace-nowrap">1h ago</span>
</div>
<p className="text-caption text-text-secondary mb-0.5">History &amp; Civics</p>
<p className="text-caption text-text-secondary truncate">"Regarding the upcoming field trip..."</p>
</div>
</button>

<button className="w-full flex items-center gap-md text-on-surface-variant dark:text-surface-variant px-4 py-4 hover:bg-bg-tertiary rounded-lg transition-all text-left">
<div className="relative flex-shrink-0">
<img alt="Teacher" className="w-12 h-12 rounded-full object-cover" data-alt="A portrait of a young female science teacher in a laboratory setting. She is wearing a white lab coat and has a friendly, encouraging expression. The lighting is bright and clean, with laboratory equipment visible in the blurred background, emphasizing modern academic rigor and professional warmth." src="https://lh3.googleusercontent.com/aida-public/AB6AXuACkU39gzo-pgXvkC2t64stNcvXpgjKe2sV6T0MmgGWPxTcAO6ZvUfl3SLxrazbsT0M5AC7wElOInBNFJqg8mgrLNhTgdo9SCZx0_6RBVSisQSJK_-oPTbTpkLXT8DfPhhngwWUC1gLksA62I9NAoCT1y4Q6fViajEqwQfCqjS6VtnQdpUpS0yvvWKMLyMZlQQHVCXzEWkURTwj_TypyX6Fe1WnG8iRAAY4vrOhFBq_oKvheI7X8HRMOOznj479gB-PGg3fVu5bXnBw"/>
<span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green border-2 border-white rounded-full"></span>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-1">
<span className="font-semibold text-body truncate text-on-surface">Dr. Emily Chen</span>
<span className="text-caption text-text-secondary whitespace-nowrap">4h ago</span>
</div>
<p className="text-caption text-text-secondary mb-0.5">Physics</p>
<p className="text-caption text-text-secondary truncate">"Aarav's project submission was excellent."</p>
</div>
</button>
</div>
<div className="p-4 bg-surface-container border-t border-border-default">
<button className="w-full py-3 flex items-center justify-center gap-sm bg-bg-secondary border border-dashed border-border-hover rounded-lg text-text-secondary font-label text-label hover:border-school-blue-dark hover:text-school-blue-dark transition-all">
<span className="material-symbols-outlined text-[20px]">add_circle</span>
                    Message New Teacher
                </button>
</div>
</aside>

<section className="flex-1 flex flex-col bg-surface-container-lowest relative">

<div className="h-20 flex items-center justify-between px-8 bg-surface border-b border-border-default z-10 shadow-sm">
<div className="flex items-center gap-md">
<div className="w-12 h-12 rounded-full bg-school-blue-light flex items-center justify-center border border-school-blue-dark/10">
<img alt="Sarah Jenkins" className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLvxQFTAwf--68jyRGeXwWYaKsfM8TXQ1zAS7g690N2xwW312lwx6Y5ScUMqO8-4QWnCSdsi339B_h-Fx_ztZDodwZfTXDXH4T79KXVWirbbwmqs1PoV6-8_m3Xy3MLSPJej3leoWDV_vnS62bb4GrOzCfj31tPp4iFvlvT9GCViFrjuAplP11FvZThP5D6DbB75AGcwizD4kEYFjzwAV_nIiDCb-wLmhk4YtI27Vp3yO2Bu9kXP3Lze9JhtMw-YMdKg-2X14zsaC3"/>
</div>
<div>
<h3 className="font-h4 text-h4 font-bold text-on-surface">Ms. Sarah Jenkins</h3>
<div className="flex items-center gap-sm">
<span className="w-2 h-2 rounded-full bg-green animate-pulse"></span>
<p className="text-caption text-text-secondary">Active Now | Mathematics Coordinator</p>
</div>
</div>
</div>
<div className="flex items-center gap-sm">
<button className="p-2.5 rounded-full hover:bg-bg-secondary text-text-secondary transition-all" title="Call">
<span className="material-symbols-outlined">call</span>
</button>
<button className="p-2.5 rounded-full hover:bg-bg-secondary text-text-secondary transition-all" title="Video Call">
<span className="material-symbols-outlined">videocam</span>
</button>
<button className="p-2.5 rounded-full hover:bg-bg-secondary text-text-secondary transition-all" title="More Info">
<span className="material-symbols-outlined">info</span>
</button>
<button className="ml-2 px-5 py-2 bg-amber-light text-amber-dark border border-amber-dark/20 rounded-full font-label text-label hover:bg-secondary-container/20 transition-all flex items-center gap-2" >
<span className="material-symbols-outlined text-[18px]">calendar_month</span>
                        Request PTM
                    </button>
</div>
</div>

<div className="flex-1 overflow-y-auto p-8 space-y-6 bg-school-blue-extra-light/30">
<div className="flex justify-center">
<span className="bg-surface-container px-4 py-1.5 rounded-full text-overline text-text-tertiary uppercase tracking-widest">Monday, October 23</span>
</div>

<div className="flex items-end gap-3 max-w-[80%]">
<img alt="Sarah" className="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD08XL_N_UpqZwVPomhiDLefuQpe3sJr_UgIwftQscOYt3uBW2bRx7qlRP-dzy3SAFZ2zgzOrkHpFm8Ovy-CbM-xu-S8b2PbXifsSMNm9SauOOiAUBrRUt0I2MebRWPF7C8FJNfYoq7vKQ4Dsj4DKAd6SXRuNj0D8ItW-P8eyNNjy53HuQw5Yg5yrzO76vzzeFdVIM0x7E9q5ZnSajXzLZhTJDtCQQZUthlIicZwjH6r2c6HVccMSMkW3SvuM2n9BpaWndX0hn1H12N"/>
<div>
<div className="bg-white p-4 shadow-sm border border-border-default message-bubble-in text-body text-on-surface leading-relaxed">
                            Good afternoon! I wanted to share the recent unit test results for Mathematics. Aarav has shown significant improvement in Geometry.
                        </div>
<span className="text-caption text-text-secondary mt-1 ml-1">1:45 PM</span>
</div>
</div>

<div className="flex flex-row-reverse items-end gap-3 ml-auto max-w-[80%]">
<div className="w-8 h-8 rounded-full bg-school-blue-dark flex items-center justify-center text-white text-[10px] font-bold">PT</div>
<div className="flex flex-col items-end">
<div className="bg-school-blue-dark text-white p-4 shadow-lift message-bubble-out text-body leading-relaxed">
                            That's wonderful news, Ms. Jenkins! Thank you for the update. We've been working on those extra practice sheets you sent last week.
                        </div>
<div className="flex items-center gap-1 mt-1 mr-1">
<span className="text-caption text-text-secondary">1:48 PM</span>
<span className="material-symbols-outlined text-green text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>done_all</span>
</div>
</div>
</div>

<div className="flex items-end gap-3 max-w-[80%]">
<img alt="Sarah" className="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-fvJIdYtGIifEWB7E9h5sEe5S7KfnP_D9G_yUaiiiijdOCM2PASa96wDbCuuv15VbDZIQZYAEZnFpmvegDKle-uH1O7HBlVteJptI5Q9VX_voEXqbLhtzz5HJfex3zoaIjzjaFhCjmd8kL6L0d09_emjYjB4mpb34XTxXy86U2DyHESJfd1axXbIpLHYrHQEF4vlCR0Hi0Z5nt4EUvLre3cYNPZYKzlIoTWKi5ypC3Z-vt-T3Kniw1XiRd1Io907p-HjmsbNvOIE1"/>
<div>
<div className="bg-white p-4 shadow-sm border border-border-default message-bubble-in space-y-3">
<p className="text-body text-on-surface">I've attached the detailed breakdown of the class averages for your reference.</p>
<div className="bg-bg-secondary rounded-lg p-3 flex items-center gap-md border border-border-default hover:border-school-blue-dark cursor-pointer transition-colors group">
<div className="w-10 h-10 bg-coral-light flex items-center justify-center rounded-lg text-coral">
<span className="material-symbols-outlined">picture_as_pdf</span>
</div>
<div className="flex-1 overflow-hidden">
<p className="text-body-small font-semibold text-on-surface truncate">Math_Unit3_Report.pdf</p>
<p className="text-caption text-text-secondary">1.2 MB • PDF Document</p>
</div>
<span className="material-symbols-outlined text-text-secondary group-hover:text-school-blue-dark">download</span>
</div>
</div>
<span className="text-caption text-text-secondary mt-1 ml-1">1:52 PM</span>
</div>
</div>

<div className="flex justify-center">
<div className="bg-amber-light border-l-4 border-amber-dark px-4 py-2 rounded-r-lg flex items-center gap-md shadow-sm">
<span className="material-symbols-outlined text-amber-dark">warning</span>
<p className="text-caption text-amber-dark font-medium">The term break starts next Friday. All assignments must be submitted by Thursday.</p>
</div>
</div>
</div>

<div className="p-6 bg-surface border-t border-border-default">
<div className="flex items-end gap-md glass-panel p-2 rounded-xl border border-border-default shadow-sm ring-1 ring-black/5">
<div className="flex items-center pb-1.5 pl-2">
<button className="p-2 text-text-secondary hover:text-school-blue-dark hover:bg-school-blue-light rounded-lg transition-all" title="Emoji">
<span className="material-symbols-outlined">sentiment_satisfied</span>
</button>
<button className="p-2 text-text-secondary hover:text-school-blue-dark hover:bg-school-blue-light rounded-lg transition-all" title="Attach">
<span className="material-symbols-outlined">attach_file</span>
</button>
</div>
<textarea className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 px-2 text-body max-h-32 overflow-y-auto" oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'" placeholder="Write a message to Ms. Jenkins..." rows="1"></textarea>
<button className="bg-school-blue-dark text-white h-11 w-11 flex items-center justify-center rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 group">
<span className="material-symbols-outlined group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">send</span>
</button>
</div>
<p className="text-center text-[11px] text-text-tertiary mt-4 uppercase tracking-[0.1em] font-semibold">Message history is archived for quality assurance</p>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 md:hidden bg-surface dark:bg-inverse-surface shadow-strong border-t border-border-default rounded-t-xl">
<button className="flex flex-col items-center justify-center bg-school-blue-light dark:bg-primary-container text-school-blue-dark dark:text-on-primary-container rounded-full p-2 w-16 h-12 scale-90 transition-transform">
<span className="material-symbols-outlined" data-icon="chat" style={{"fontVariationSettings":"'FILL' 1"}}>chat</span>
<span className="font-caption text-caption">Chat</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant p-2 hover:opacity-80">
<span className="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
<span className="font-caption text-caption">Meetings</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant p-2 hover:opacity-80">
<span className="material-symbols-outlined" data-icon="groups">groups</span>
<span className="font-caption text-caption">Staff</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant p-2 hover:opacity-80">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span className="font-caption text-caption">Profile</span>
</button>
</nav>

<div aria-labelledby="modal-title" aria-modal="true" className="fixed inset-0 z-[60] hidden overflow-y-auto" id="ptmModal" role="dialog">
<div className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0">
<div className="fixed inset-0 transition-opacity bg-black/50 backdrop-blur-sm" ></div>
<span aria-hidden="true" className="hidden sm:inline-block sm:align-middle sm:h-screen">​</span>
<div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-strong transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
<div className="bg-surface px-6 py-4 border-b border-border-default flex items-center justify-between">
<h3 className="font-h3 text-h3 font-bold text-school-blue-dark" id="modal-title">Schedule PTM</h3>
<button className="text-text-secondary hover:text-on-surface" >
<span className="material-symbols-outlined">close</span>
</button>
</div>
<div className="px-8 py-6">
<div className="space-y-6">
<div className="flex items-center gap-md p-4 bg-school-blue-extra-light rounded-lg">
<img alt="Sarah" className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc1cpcMgZgL7fVECdLrVhae9QuLz2cEhA2gm58PB10HWZAXHokLSHsVWQN_WWA0TSf2EITW5vaHRakwA3Xjug4A-LQEiP2MzK9DoPE1GRkK9Yph3CWun6X2jMsPqR0BSO2R4inMzykVHwubbbB8Q6ImQh1-WFyaKeF52T3DfYLIpikvLSwjhgngBtByoG9v1WKkhE8tY9aoa5Rnm6eXNsUGqX6-XS_-XJlgQwemWCYpiNkKy46E8axlcXNQSonVfucnP1mSCHtbbsG"/>
<div>
<p className="text-body font-bold text-on-surface">Ms. Sarah Jenkins</p>
<p className="text-caption text-text-secondary">Next available: Tomorrow, 3:30 PM</p>
</div>
</div>
<div>
<label className="block font-label text-label text-on-surface mb-2">Select Date</label>
<div className="grid grid-cols-4 gap-sm">
<button className="p-2 text-center rounded-lg border-2 border-school-blue-dark bg-school-blue-light text-school-blue-dark font-semibold">
<p className="text-overline">OCT</p>
<p className="text-h4">24</p>
</button>
<button className="p-2 text-center rounded-lg border border-border-default hover:border-school-blue-dark transition-all">
<p className="text-overline">OCT</p>
<p className="text-h4">25</p>
</button>
<button className="p-2 text-center rounded-lg border border-border-default hover:border-school-blue-dark transition-all">
<p className="text-overline">OCT</p>
<p className="text-h4">26</p>
</button>
<button className="p-2 text-center rounded-lg border border-border-default opacity-50 cursor-not-allowed bg-bg-secondary">
<p className="text-overline text-coral">FULL</p>
<p className="text-h4">27</p>
</button>
</div>
</div>
<div>
<label className="block font-label text-label text-on-surface mb-2">Available Time Slots</label>
<div className="flex flex-wrap gap-2">
<button className="px-4 py-2 rounded-full border border-border-default text-body-small hover:bg-school-blue-light hover:border-school-blue-dark transition-all">03:30 PM</button>
<button className="px-4 py-2 rounded-full border border-school-blue-dark bg-school-blue-dark text-white text-body-small">04:00 PM</button>
<button className="px-4 py-2 rounded-full border border-border-default text-body-small hover:bg-school-blue-light hover:border-school-blue-dark transition-all">04:30 PM</button>
<button className="px-4 py-2 rounded-full border border-border-default text-body-small hover:bg-school-blue-light hover:border-school-blue-dark transition-all">05:00 PM</button>
</div>
</div>
<div>
<label className="block font-label text-label text-on-surface mb-2">Reason for Meeting</label>
<textarea className="w-full p-4 bg-surface border border-border-default rounded-lg text-body-small focus:ring-2 focus:ring-school-blue-dark/20 focus:border-school-blue-dark outline-none" placeholder="Briefly describe what you'd like to discuss..." rows="3"></textarea>
</div>
</div>
</div>
<div className="bg-bg-secondary px-8 py-4 flex flex-row-reverse gap-3">
<button className="bg-primary text-white px-8 py-2.5 rounded-lg font-label text-label hover:bg-school-blue-dark transition-all shadow-sm" type="button">
                        Confirm Appointment
                    </button>
<button className="text-text-secondary font-label text-label px-4 py-2.5 hover:text-on-surface"  type="button">
                        Cancel
                    </button>
</div>
</div>
</div>
</div>


    </main>
  );
}
