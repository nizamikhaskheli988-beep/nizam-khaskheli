/* May I Help You? — no API key, no external service, no changes to existing site.
   Language behavior: English -> English; Roman Urdu -> Roman Urdu; Urdu script -> Urdu.
*/
(function(){
  "use strict";
  var root=document.getElementById("nzk-help-widget");
  if(!root) return;
  var fab=root.querySelector(".nzk-help__fab"), panel=root.querySelector(".nzk-help__panel");
  var close=root.querySelector(".nzk-help__close"), messages=root.querySelector("[data-messages]");
  var form=root.querySelector("[data-chat-form]"), input=root.querySelector("[data-chat-input]");
  var quick=root.querySelector("[data-quick]");

  function add(text,who){
    var el=document.createElement("div");
    el.className="nzk-help__msg nzk-help__msg--"+who;
    el.textContent=text;
    messages.appendChild(el); messages.scrollTop=messages.scrollHeight;
  }
  function openChat(){panel.hidden=false;fab.setAttribute("aria-expanded","true");input.focus();}
  function closeChat(){panel.hidden=true;fab.setAttribute("aria-expanded","false");fab.focus();}
  fab.addEventListener("click",function(){panel.hidden?openChat():closeChat()});
  close.addEventListener("click",closeChat);

  function romanUrdu(s){
    s=s.toLowerCase();
    return /\b(kya|kaise|kia|kon|kaun|kahan|kese|kar|karta|karte|hain|hai|mera|meri|nizam|ap|aap|mujhe|chahiye|kr|raha|rahi|kaam|service|services|rabta|contact|maloom|bata|batao|bataen|experience|tajurba|madad|help)\b/.test(s);
  }
  function urduScript(s){return /[\u0600-\u06FF]/.test(s);}

  var en={
    career:"Nizam Khaskheli is a Pakistan-based journalist, strategic communications professional and multimedia storyteller. His background includes broadcast and digital journalism, editorial work, nonprofit communications, marketing, research, advocacy and multimedia storytelling.",
    services:"Nizam's services include journalism and editorial content, strategic communications, SEO and content writing, donor and CSR proposal communications, advocacy communications, brand storytelling, social media marketing, organizational marketing assets, multimedia storytelling, and Wikipedia content and editorial management.",
    journalism:"His journalism background includes reporting, feature and investigative writing, editing and TV and digital news scripting across GTV Network, Pakistan Press Foundation, Asia Net, KTN News, Awaz TV and Royal Karachi News.",
    lcf:"At The Life Changing Foundation (LCF) Pakistan, his communications work includes donor and board-facing presentations, fundraising kits, CSR and donation-in-kind proposals, campaign copy, organizational communications and visual/editorial rebranding.",
    madzine:"At Madzine/Madvertising, he directed digital editorial content, researched and wrote feature articles and trend analyses, and worked on SEO and content strategy for marketing clients.",
    projects:"His academic documentary work includes serving on the core production team for the Charna Island Marine Life Documentary and producing AI & News 2.0 as his Final Year Project.",
    contact:"You can contact Nizam through the contact form on this website or use his published professional links. His LinkedIn and Muck Rack profiles are also available through the website navigation.",
    muck:"Nizam's Muck Rack profile provides an external record of selected journalism work. Use the Muck Rack link in the website navigation to view it.",
    wiki:"He can support Wikipedia-related content and editorial work with a focus on research, structure, reliable sourcing and neutral, policy-conscious language. He does not promise publication or approval.",
    skills:"His core strengths include journalism, research, editorial writing, strategic communications, SEO content, donor communications, advocacy communication, social media marketing, organizational marketing assets, documentary production and multimedia storytelling."
  };
  var ur={
    career:"Nizam Khaskheli Pakistan-based journalist, strategic communications professional aur multimedia storyteller hain. Unka experience broadcast aur digital journalism, editorial work, nonprofit communications, marketing, research, advocacy aur multimedia storytelling mein hai.",
    services:"Nizam ki services mein journalism aur editorial content, strategic communications, SEO aur content writing, donor aur CSR proposal communications, advocacy communications, brand storytelling, social media marketing, organizational marketing assets, multimedia storytelling aur Wikipedia content aur editorial management shamil hain.",
    journalism:"Unka journalism experience reporting, feature aur investigative writing, editing aur TV aur digital news scripting par mabni hai. Unhon ne GTV Network, Pakistan Press Foundation, Asia Net, KTN News, Awaz TV aur Royal Karachi News ke sath kaam kiya hai.",
    lcf:"The Life Changing Foundation (LCF) Pakistan mein unka communications work donor aur board presentations, fundraising kits, CSR aur donation-in-kind proposals, campaign copy, organizational communications aur visual/editorial rebranding par mabni raha hai.",
    madzine:"Madzine/Madvertising mein unhon ne digital editorial content, feature articles aur trend analyses par kaam kiya aur marketing clients ke liye SEO aur content strategy manage ki.",
    projects:"Unke academic documentary projects mein Charna Island Marine Life Documentary ki core production team ka hissa banna aur AI & News 2.0 ko Final Year Project ke taur par produce karna shamil hai.",
    contact:"Aap website ke contact form ke zariye Nizam se rabta kar sakte hain. Website navigation mein unke LinkedIn aur Muck Rack profiles ke links bhi available hain.",
    muck:"Nizam ka Muck Rack profile unke selected journalism work ka external record provide karta hai. Website navigation mein Muck Rack link se profile dekhi ja sakti hai.",
    wiki:"Woh Wikipedia-related content aur editorial work mein research, structure, reliable sourcing aur neutral, policy-conscious language ke sath madad kar sakte hain. Publication ya approval ki guarantee nahi di jati.",
    skills:"Unki core strengths mein journalism, research, editorial writing, strategic communications, SEO content, donor communications, advocacy communication, social media marketing, organizational marketing assets, documentary production aur multimedia storytelling shamil hain."
  };

  function answer(q){
    var s=q.toLowerCase(), d=(urduScript(q)||romanUrdu(q))?ur:en;
    if(/contact|rabta|reach|email|message|connect/.test(s)) return d.contact;
    if(/service|offer|hire|useful|madad|help|kya kar/.test(s)) return d.services;
    if(/career|background|experience|work|profession|tajurba/.test(s)) return d.career;
    if(/journal|report|news|editor|newsroom/.test(s)) return d.journalism;
    if(/lcf|life changing|donor|csr|fundrais/.test(s)) return d.lcf;
    if(/madzine|madvertising/.test(s)) return d.madzine;
    if(/charna|ai.*news|fyp|documentary|project/.test(s)) return d.projects;
    if(/muck|journalism profile/.test(s)) return d.muck;
    if(/wikipedia|wiki/.test(s)) return d.wiki;
    if(/skill|expert|strong|special/.test(s)) return d.skills;
    return d.career+" "+d.services;
  }

  function submit(q){
    q=(q||"").trim(); if(!q) return;
    add(q,"user"); input.value="";
    setTimeout(function(){add(answer(q),"bot")},180);
  }
  form.addEventListener("submit",function(e){e.preventDefault();submit(input.value)});
  quick.addEventListener("click",function(e){
    var b=e.target.closest("[data-q]"); if(b) submit(b.getAttribute("data-q"));
  });
})();
