import { useEffect, useState } from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';
import {
  ArrowRight, ArrowUpRight, Building2, Check, ChevronRight, ClipboardCheck,
  Gauge, Globe2, Handshake, Landmark, LockKeyhole, Menu, Network, Scale,
  ShieldCheck, Sparkles, Target, Users, X, Workflow, GraduationCap, HeartPulse, BriefcaseBusiness,
} from 'lucide-react';
import { contactService } from './services/api';

const WHATSAPP_NUMBER = '233243583573'; // Ghana number in international format, no + or leading 0
const WHATSAPP_DEFAULT_MESSAGE = "Hi BillNova AI Partners, I'd like to know more about your services.";

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.697 4.61 1.898 6.478L4 29l7.72-1.865A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3Zm0 21.75a9.7 9.7 0 0 1-4.95-1.356l-.355-.21-4.582 1.107 1.127-4.464-.232-.366A9.69 9.69 0 0 1 5.25 15c0-5.936 4.815-10.75 10.751-10.75S26.75 9.064 26.75 15 21.936 24.75 16.001 24.75Zm5.34-7.354c-.293-.147-1.735-.857-2.005-.955-.269-.098-.465-.147-.66.147-.196.293-.758.955-.93 1.152-.171.196-.343.22-.636.073-.293-.147-1.238-.456-2.358-1.455-.872-.778-1.461-1.739-1.633-2.032-.171-.293-.018-.451.129-.598.132-.132.293-.343.44-.514.147-.171.196-.293.294-.489.098-.196.049-.367-.024-.514-.073-.147-.66-1.591-.905-2.179-.238-.572-.48-.494-.66-.503l-.562-.01c-.196 0-.514.073-.783.367-.269.293-1.026 1.003-1.026 2.446 0 1.443 1.05 2.837 1.196 3.033.147.196 2.067 3.157 5.008 4.428.7.302 1.246.483 1.672.618.702.223 1.34.191 1.845.116.563-.084 1.735-.709 1.98-1.393.244-.685.244-1.271.171-1.393-.073-.122-.269-.196-.562-.343Z" />
    </svg>
  );
}

function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with BillNova AI Partners on WhatsApp"
      data-testid="link-whatsapp-float"
    >
      <WhatsAppIcon />
    </a>
  );
}

const logo = '/billnova-logo.png'; // transparent background (white removed from billnova-logo-compact.png)
const mark = '/billnova-mark.png';

const services = [
  { slug:'ai-governance', index:'01', title:'AI Governance & Responsible AI', short:'Helping organizations adopt AI with confidence.', description:'We help organizations establish the policies, frameworks and controls required to use AI safely and responsibly.', items:['AI Governance Frameworks','Responsible AI Policies and Guidelines','AI Risk Assessment','AI Use-Case Governance','AI Ethics and Responsible Use','Employee AI Usage Guidelines','AI Risk & Control Frameworks','AI Governance Training'], icon:Scale, detail:'Make responsible adoption an operating discipline, not a policy document. We help leaders turn principles into decisions, controls and everyday practice.' },
  { slug:'information-protection', index:'02', title:'Information Protection & AI Risk', short:'Protecting information in an increasingly AI-enabled workplace.', description:'The rapid adoption of AI creates new questions around confidential information, personal data, intellectual property and cybersecurity. We help organizations identify and manage these risks.', items:['AI-related Information Risk Assessment','Data Protection & Privacy Advisory','AI Information Handling Guidelines','Confidentiality & Data Leakage Risk Assessment','AI Security Awareness','Information Protection Frameworks','AI Vendor and Tool Risk Assessment'], icon:LockKeyhole, detail:'Bring clarity to a fast-changing information environment. We help teams understand what can be shared, with whom, through which tools and under what safeguards.' },
  { slug:'ai-audit', index:'03', title:'AI Audit & Business Transformation', short:'Finding where AI can create the greatest value.', description:'Before investing in AI, organizations need to understand where the opportunities actually exist. Our AI Audit examines business processes, workflows and operational challenges to identify practical opportunities for AI and automation.', items:['Business workflows','Repetitive and manual processes','Productivity bottlenecks','Data and information flows','Customer-facing processes','Decision-making processes','Existing technology environment'], icon:ClipboardCheck, detail:'Move from broad enthusiasm to a prioritized opportunity roadmap grounded in how your organization actually works.' },
  { slug:'business-automation', index:'04', title:'AI-Powered Business Automation', short:'Turning repetitive work into intelligent workflows.', description:'We help organizations redesign and automate business processes using AI and emerging technologies.', items:['Document and information processing','Report generation','Customer service workflows','Email and communication automation','Data processing','Knowledge management','Administrative workflows','Approval processes','Business intelligence and reporting','AI-powered productivity solutions'], icon:Workflow, detail:'The best automation is quietly useful: it removes friction, improves quality and gives people more time for work that requires judgment.' },
  { slug:'ai-training', index:'05', title:'AI Training & Capability Development', short:'Building people who are ready for the AI-powered workplace.', description:'Technology adoption succeeds when people understand how to use it effectively and responsibly.', items:['AI for Executives and Managers','Generative AI for the Workplace','AI Productivity Skills','Prompt Engineering','Responsible AI','AI Literacy','AI-Powered Microsoft 365 Productivity','AI for Business Functions','AI Change & Adoption','Customized Corporate AI Programmes'], icon:GraduationCap, detail:'Build confidence at every level, from executive decision-making and responsible use to practical daily productivity.' },
];

const industries = [
  [Landmark,'Banking & Financial Services','Navigate AI adoption while protecting sensitive customer information and managing regulatory and operational risk.'],
  [BriefcaseBusiness,'Insurance','Balance faster, better service with the information, control and workforce considerations AI introduces.'],
  [HeartPulse,'Healthcare','Explore useful AI pathways with care for privacy, clinical context and the people depending on your systems.'],
  [Building2,'Government & Public Sector','Develop transparent, accountable approaches to AI that serve institutions and the public interest.'],
  [Users,'Professional Services','Equip knowledge workers with responsible tools that improve quality, efficiency and client outcomes.'],
  [Target,'SMEs & Growing Enterprises','Focus limited time and resources on practical opportunities with a clear path to adoption.'],
  [Globe2,'Corporate Organizations','Align leaders, functions and safeguards around an AI-enabled way of working.'],
];

function Logo({ footer = false }) {
  return <Link href="/" className={`brand ${footer ? 'footer-brand-logo' : ''}`} data-testid="link-logo"><span className="logo-crop"><img src={logo} alt="BillNova AI Partners Limited logo" /></span></Link>;
}

function TypingTagline({ words, typingSpeed = 70, deletingSpeed = 40, pause = 1500 }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout;
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
    } else {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return <span className="typing-tagline" data-testid="text-typing-tagline">{text}<span className="typing-cursor" aria-hidden="true">|</span></span>;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 16); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  useEffect(() => setOpen(false), [location]);
  return <header>
    <div className="topline"><div className="container topline-inner"><span>Ghana · Advisory for responsible AI adoption</span><a href="tel:0243583573" data-testid="link-phone-top">024 358 3573</a></div></div>
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
      <div className="container nav-inner"><Logo />
        <div className="nav-links">
          <Link href="/" className={location === '/' ? 'active' : ''} data-testid="link-nav-home">Home</Link>
          <Link href="/about" className={location === '/about' ? 'active' : ''} data-testid="link-nav-about">About</Link>
          <Link href="/services" className={location.startsWith('/services') ? 'active' : ''} data-testid="link-nav-services">Services</Link>
          <Link href="/approach" className={location === '/approach' ? 'active' : ''} data-testid="link-nav-approach">Our Approach</Link>
          <Link href="/contact" className={location === '/contact' ? 'active' : ''} data-testid="link-nav-contact">Contact</Link>
        </div>
        <Link href="/contact" className="nav-cta" data-testid="link-nav-consultation">Book a Consultation <ArrowUpRight size={15} /></Link>
        <button className="mobile-toggle" onClick={() => setOpen(value => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="mobile-nav">
        <Link href="/" data-testid="link-mobile-home">Home</Link><Link href="/about" data-testid="link-mobile-about">About</Link><Link href="/services" data-testid="link-mobile-services">Services</Link><Link href="/approach" data-testid="link-mobile-approach">Our Approach</Link><Link href="/contact" className="mobile-cta" data-testid="link-mobile-contact">Book a Consultation</Link>
      </div>}
    </nav>
  </header>;
}

function Footer() {
  return <footer className="footer"><div className="container">
    <div className="footer-grid">
      <div className="footer-brand"><Logo footer /><p>Your Partner in Responsible AI Adoption.<br />Practical advisory for organizations moving from curiosity to confident capability.</p></div>
      <div><h3>Navigate</h3><div className="footer-links"><Link href="/" data-testid="link-footer-home">Home</Link><Link href="/about" data-testid="link-footer-about">About</Link><Link href="/services" data-testid="link-footer-services">Services</Link><Link href="/approach" data-testid="link-footer-approach">Our Approach</Link><Link href="/contact" data-testid="link-footer-contact">Contact</Link></div></div>
      <div><h3>Services</h3><div className="footer-links">{services.map(service => <Link key={service.slug} href={`/services/${service.slug}`} data-testid={`link-footer-${service.slug}`}>{service.title.replace(' & Responsible AI','').replace(' & AI Risk','')}</Link>)}</div></div>
      <div><h3>Contact</h3><div className="footer-links"><a href="tel:0243583573" data-testid="link-footer-phone">024 358 3573</a></div></div>
    </div>
    <div className="footer-bottom"><span>© 2026 BillNova AI Partners Limited. All Rights Reserved.</span><span>Built around trust, governance and meaningful business value.</span><span>Website by <a href="https://portfolio-8jmo.onrender.com/" target="_blank" rel="noopener noreferrer">Abakah Joshua</a></span></div>
  </div></footer>;
}

function Layout({ children }) { return <div className="site-shell"><Header />{children}<Footer /><WhatsAppButton /></div>; }
function ButtonLink({ href, children, secondary = false, testId }) { return <Link href={href} className={secondary ? 'button-secondary' : 'button-primary'} data-testid={testId}>{children}<ArrowRight size={16} /></Link>; }
// The heading carries the section; the old small "eyebrow" label above it is no longer shown.
function SectionHeading({ title, intro, dark = false }) { return <div className={dark ? 'dark-section-heading' : ''}><h2 className="section-title display">{title}</h2>{intro && <p className="section-intro">{intro}</p>}</div>; }

function AbstractVisual() {
  return <div className="hero-visual" aria-label="A connected framework showing Understand, Govern, Transform and Empower">
    <div className="orbit"><div className="orbit-line" /><div className="orbit-line two" /><div className="core"><strong>AI</strong><small>PARTNERS</small></div>
      <div className="concept one"><b />UNDERSTAND</div><div className="concept two"><b />GOVERN</div><div className="concept three"><b />TRANSFORM</div><div className="concept four"><b />EMPOWER</div>
    </div><span className="visual-caption">A responsible path from insight to impact</span>
  </div>;
}

function Home() {
  return <>
    <main>
      <section className="hero"><div className="container hero-grid">
        <div className="reveal"><span className="hero-mark-spin" aria-hidden="true"><img src={mark} alt="" /></span><h1 className="display">AI that moves with <em>confidence.</em></h1><p className="hero-lead">Your Partner in <TypingTagline words={["Responsible AI Adoption", "AI Governance", "AI Policies", "AI Transformation", "AI Risk & Ethics"]} /></p><p className="hero-copy">Helping organizations understand, govern, transform and scale AI for meaningful business impact.</p><div className="actions"><ButtonLink href="/contact" testId="button-hero-consultation">Book a Consultation</ButtonLink><ButtonLink href="/services" secondary testId="button-hero-services">Explore Our Services</ButtonLink></div><div className="hero-note"><span /> Built for boards, teams and the work between them</div></div>
        <AbstractVisual />
      </div></section>
      <div className="ribbon"><div className="container ribbon-inner"><strong>AI should create value you can stand behind.</strong><span>Understand <i className="dot">·</i> Govern <i className="dot">·</i> Transform <i className="dot">·</i> Empower</span></div></div>
      <section className="section values-section"><div className="container"><div className="split-heading"><SectionHeading eyebrow="The BillNova standard" title="AI that creates real business value" intro="AI should do more than generate excitement. It should improve the way organizations work, make better decisions, protect information and create measurable business value." /></div><div className="value-grid">{[['Responsible',ShieldCheck,'AI adoption built around ethics, risk, privacy and security.'],['Practical',Gauge,'Solutions aligned with real business objectives.'],['Measurable',Target,'Focus on productivity, efficiency, quality and business outcomes.'],['Sustainable',Handshake,'Building organizational capability that lasts beyond the engagement.']].map(([title,Icon,text]) => <article className="value-card" key={title}><div className="icon-box"><Icon size={20} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="section about-band"><div className="container about-grid"><div><SectionHeading eyebrow="Who we are" title="From curiosity to confident adoption." /><div className="about-mark"><p>Business understanding, technology, governance and people development — brought together.</p></div></div><div><p className="about-body"><strong className="brand-emphasis">BillNova AI Partners Limited</strong> is an AI advisory and transformation firm that helps organizations move from curiosity to confident, measurable adoption of AI.</p><p>We work alongside boards, executives and operational teams to identify where AI can create the greatest value, put the right governance and safeguards in place, automate the workflows that matter most, and build the internal capability needed to sustain change.</p><div className="statline"><div><strong>01</strong><span>Business-first<br />thinking</span></div><div><strong>04</strong><span>Connected<br />disciplines</span></div><div><strong>∞</strong><span>Capability that<br />keeps growing</span></div></div><div style={{marginTop:28}}><ButtonLink href="/about" secondary testId="button-home-about">Learn More About Us</ButtonLink></div></div></div></section>
      <section className="section dark-section"><div className="container"><SectionHeading eyebrow="Where we focus" title="The right questions before the next technology." intro="Responsible adoption starts with context. We help organizations see the full picture: value, risk, people and the practical path forward." /><div className="industry-grid" style={{borderColor:'rgba(191,216,239,.22)'}}>{industries.slice(0,4).map(([Icon,title,text]) => <article className="industry" key={title} style={{borderColor:'rgba(191,216,239,.22)'}}><Icon size={22} /><h3 style={{color:'#fff'}}>{title}</h3><p style={{color:'#afc1da'}}>{text}</p></article>)}</div><div style={{marginTop:38}}><ButtonLink href="/approach" secondary testId="button-home-approach">See Our Approach</ButtonLink></div></div></section>
      <CTA />
    </main>
  </>;
}

function About() {
  return <main><PageHero eyebrow="About BillNova" title="A partner for the decisions that make AI matter." intro="BillNova AI Partners helps organizations adopt AI safely, govern it responsibly and scale it for meaningful business impact." /><section className="section about-band"><div className="container about-grid"><div><SectionHeading eyebrow="Our perspective" title="Clarity before complexity." /><div className="about-mark"><p>We do not start with a tool. We start with your context, your people and the outcome that matters.</p></div></div><div><p className="about-body"><strong className="brand-emphasis">BillNova AI Partners Limited</strong> is an AI advisory and transformation firm that helps organizations move from curiosity to confident, measurable adoption of AI.</p><p>We work alongside boards, executives and operational teams to identify where AI can create the greatest value, put the right governance and safeguards in place, automate the workflows that matter most, and build the internal capability needed to sustain change.</p><p style={{marginTop:18}}>Our approach combines business understanding, technology, governance and people development.</p></div></div></section><section className="section dark-section"><div className="container"><SectionHeading eyebrow="Our mission & vision" title="Ambition, with the guardrails to earn trust." /><div className="mission-grid"><div className="mission-card"><span className="label">Our mission</span><p>To assist organizations adopt Artificial Intelligence safely, govern it responsibly and scale it for meaningful business impact, enabling productivity, innovation and long-term competitive advantage.</p></div><div className="mission-card"><span className="label">Our vision</span><p>To be the trusted partner of choice for organizations that want to harness the power of AI without compromising trust, ethics or the integrity of their information.</p></div></div></div></section><Values /><CTA /></main>;
}

function Values() {
  const vals = [['Responsible Innovation',Sparkles,'We believe innovation must go hand in hand with responsibility.'],['Business Value',Target,'Technology is only valuable when it solves a real problem.'],['Trust & Integrity',ShieldCheck,'Trust is fundamental to AI adoption.'],['People First',Users,'AI should empower people, not simply replace processes.'],['Continuous Learning',Network,'AI is evolving rapidly. We remain curious and adaptable.'],['Partnership',Handshake,'We work alongside our clients rather than simply working for them.']];
  return <section className="section values-section"><div className="container"><SectionHeading eyebrow="What guides us" title="Principles that travel with the work." intro="Our values are not wall art. They shape how we listen, recommend, implement and measure." /><div className="why-grid">{vals.map(([title,Icon,text]) => <article className="why" key={title}><Icon size={19} color="#1267c9" style={{marginBottom:16}} /><strong>{title}</strong><span>{text}</span></article>)}</div></div></section>;
}

function PageHero({ eyebrow, title, intro }) { return <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/" data-testid="link-breadcrumb-home">Home</Link><ChevronRight size={13} /><span>{eyebrow}</span></div><h1 className="section-title display">{title}</h1><p className="section-intro">{intro}</p></div></section>; }

function Services() {
  return <main><PageHero eyebrow="Services" title="Practical AI advisory, built around your goals." intro="Practical AI advisory and transformation services designed around your organization's goals, risks and opportunities." /><section className="section"><div className="container"><SectionHeading eyebrow="The service portfolio" title="Five ways to move forward." /><div className="service-grid">{services.map((service, i) => <ServiceCard key={service.slug} service={service} wide={i === 2} />)}</div></div></section><section className="section industries"><div className="container"><SectionHeading eyebrow="Who we serve" title="AI adoption built around your organization." intro="Our work is shaped for the responsibilities, pace and information environments of real institutions." /><div className="industry-grid">{industries.map(([Icon,title,text]) => <article className="industry" key={title}><Icon size={22} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><CTA /></main>;
}

function ServiceCard({ service, wide = false }) {
  const Icon = service.icon;
  return <article className={`service-card ${wide ? 'wide' : ''}`}><span className="service-index">{service.index} / 05</span><div style={{position:'absolute',right:28,top:28,color:'#1267c9'}}><Icon size={24} /></div><h3>{service.title}</h3><p>{service.short} {service.description}</p><div className="service-points">{service.items.slice(0, wide ? 5 : 3).map(item => <span key={item}>{item}</span>)}</div><Link href={`/services/${service.slug}`} className="text-link" data-testid={`link-service-${service.slug}`}>Explore {service.title.split(' & ')[0]} <ArrowRight size={15} /></Link></article>;
}

function ServiceDetail({ service }) {
  return <main><PageHero eyebrow={service.title} title={service.short} intro={service.description} /><section className="service-detail"><div className="container detail-grid"><div className="detail-copy"><h2 className="display">{service.detail}</h2><p>{service.description}</p><ul className="detail-list">{service.items.map(item => <li key={item}>{item}</li>)}</ul><ButtonLink href="/contact" testId={`button-detail-contact-${service.slug}`}>Talk to us about this</ButtonLink></div><DetailVisual service={service} /></div></section><CTA /></main>;
}

function DetailVisual({ service }) {
  if (service.slug === 'ai-audit') return <div className="detail-visual"><h3>AI Opportunity Roadmap</h3><div className="roadmap"><div className="road-line" />{['Assess','Identify','Prioritize','Implement','Measure'].map((step,i) => <div className={`road-step ${i === 2 ? 'active' : ''}`} key={step}><i>{String(i+1).padStart(2,'0')}</i><span>{step}</span></div>)}</div></div>;
  const Icon = service.icon;
  return <div className="detail-visual"><div style={{position:'relative',display:'flex',alignItems:'center',gap:16,marginBottom:58}}><div style={{background:'#00a9e8',color:'#071b3a',width:52,height:52,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:3}}><Icon size={25} /></div><span style={{color:'#9eb6d2',fontSize:11,letterSpacing:'.15em',textTransform:'uppercase'}}>BillNova framework</span></div><h3>{service.title}</h3><p style={{position:'relative',color:'#b1c3da',lineHeight:1.7,fontSize:14,maxWidth:340}}>A considered path from policy and risk to practical adoption — designed to hold up in the real world.</p><div style={{position:'absolute',right:26,bottom:24,color:'#70c9ec',fontSize:11,letterSpacing:'.15em'}}>RESPONSIBLE BY DESIGN</div></div>;
}

function Approach() {
  const steps = [['01','UNDERSTAND','We first understand your business, challenges, workflows and objectives.'],['02','GOVERN','We establish the policies, controls and safeguards necessary for responsible AI adoption.'],['03','TRANSFORM','We identify and implement AI and automation opportunities that improve the way your organization works.'],['04','EMPOWER','We equip your people with the knowledge and skills to confidently use AI and sustain the transformation.']];
  return <main><PageHero eyebrow="Our approach" title="Understand. Govern. Transform. Empower." intro="Our approach brings together business understanding, governance, transformation and people development." /><section className="section dark-section"><div className="container approach-grid"><div><SectionHeading eyebrow="A connected process" title="Progress with the whole system in view." intro="The sequence matters. Insight informs governance. Governance gives transformation a responsible foundation. Empowered people make the change last." /></div><div className="steps">{steps.map(([num,title,text]) => <article className="step" key={num}><span className="step-num">{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section><section className="section"><div className="container"><SectionHeading eyebrow="Why BillNova" title="A calm, practical partner for consequential work." /><div className="why-grid">{[['Business-first AI strategy','Start with the work, not the hype.'],['Responsible AI adoption','Make ethics, risk and safeguards part of the operating model.'],['Information protection','Help people use AI without losing control of what matters.'],['Practical automation','Prioritize improvements teams can actually adopt.'],['People and capability development','Build confidence alongside the technology.'],['Long-term partnership','Leave organizations stronger than we found them.']].map(([title,text]) => <div className="why" key={title}><strong>{title}</strong><span>{text}</span></div>)}</div></div></section><CTA /></main>;
}

function CTA() { return <section className="cta"><div className="container cta-inner"><div><h2>Ready to move from AI curiosity to AI capability?</h2><p>Let's identify where AI can create meaningful value for your organization while keeping trust, governance and people at the center.</p></div><div className="cta-actions"><ButtonLink href="/contact" testId="button-cta-consultation">Book a Consultation</ButtonLink><a className="button-secondary" href="tel:0243583573" data-testid="link-cta-phone">Call 024 358 3573</a></div></div></section>; }

function Contact() {
  const [values, setValues] = useState({name:'',company:'',email:'',phone:'',jobTitle:'',service:'',message:''});
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const [serverError, setServerError] = useState('');
  const update = event => setValues(current => ({...current,[event.target.name]:event.target.value}));
  const submit = async event => {
    event.preventDefault(); const next = {};
    if (!values.name.trim()) next.name = 'Please enter your full name.';
    if (!values.company.trim()) next.company = 'Please enter your company.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Please enter a valid email address.';
    if (!values.message.trim()) next.message = 'Please tell us a little about your enquiry.';
    setErrors(next); if (Object.keys(next).length) return;
    setState('loading'); setServerError('');
    const payload = {
      fullName: values.name,
      email: values.email,
      phone: values.phone,
      subject: values.service ? `${values.service} enquiry` : `Enquiry from ${values.company || values.name}`,
      projectType: values.service,
      message: `Company: ${values.company || '-'}\nJob Title: ${values.jobTitle || '-'}\n\n${values.message}`,
    };
    try { await contactService.submit(payload); setState('success'); setValues({name:'',company:'',email:'',phone:'',jobTitle:'',service:'',message:''}); }
    catch (error) { setState('error'); setServerError(error.message); }
  };
  return <main><PageHero eyebrow="Contact" title="Let's talk about your AI journey." intro="Whether you are exploring AI for the first time or looking to scale existing initiatives, BillNova AI Partners can help you identify practical opportunities and build a responsible path forward." /><section className="contact-section"><div className="container contact-grid"><div className="contact-info"><h2 className="display">Good work starts with a useful question.</h2><p>Share a little about where you are, what you are considering and what you need to understand. We will take it from there.</p><div className="contact-detail"><span>Company</span><strong>BillNova AI Partners Limited</strong></div><div className="contact-detail"><span>Phone</span><a href="tel:0243583573" data-testid="link-contact-phone">024 358 3573</a></div></div><form className="form-card" onSubmit={submit} noValidate>{state === 'success' && <div className="form-status success" role="status" data-testid="status-contact-success"><Check size={16} style={{verticalAlign:'middle',marginRight:8}} />Thank you for contacting BillNova AI Partners. Your enquiry has been received. We will get back to you shortly.</div>}{state === 'error' && <div className="form-status error" role="alert" data-testid="status-contact-error">{serverError || "We couldn't submit your enquiry right now. Please try again or call 024 358 3573."}</div>}<div className="form-grid"><Field label="Full Name" name="name" value={values.name} onChange={update} error={errors.name} required /><Field label="Company" name="company" value={values.company} onChange={update} error={errors.company} required /><Field label="Email" type="email" name="email" value={values.email} onChange={update} error={errors.email} required /><Field label="Phone" name="phone" value={values.phone} onChange={update} /><Field label="Job Title" name="jobTitle" value={values.jobTitle} onChange={update} /><div className="field"><label htmlFor="service">Service Interested In</label><select id="service" name="service" value={values.service} onChange={update} data-testid="select-service"><option value="">Select a service</option>{services.map(item => <option key={item.slug} value={item.title}>{item.title}</option>)}</select></div><Field label="Message" name="message" value={values.message} onChange={update} error={errors.message} required textarea /></div><button className="button-primary form-submit" disabled={state === 'loading'} type="submit" data-testid="button-submit-contact">{state === 'loading' ? 'Sending enquiry…' : 'Send Enquiry'}<ArrowRight size={16} /></button><p className="form-privacy">We use your details only to reply to your enquiry. They are never sold or shared.</p></form></div></section></main>;
}

function Field({label,name,value,onChange,error,type='text',required=false,textarea=false}) { const props = {id:name,name,value,onChange,type,required,'aria-invalid':Boolean(error), 'data-testid':`input-${name}`}; return <div className={`field ${textarea ? 'full' : ''}`}><label htmlFor={name}>{label}{required && ' *'}</label>{textarea ? <textarea {...props} /> : <input {...props} />}{error && <span className="error-text">{error}</span>}</div>; }

function NotFound() { return <main><PageHero eyebrow="Page not found" title="This page is not in the roadmap." intro="The address may have changed. Let's get you back to a useful starting point." /><section className="section"><div className="container"><ButtonLink href="/" testId="button-not-found-home">Return home</ButtonLink></div></section></main>; }

function Router() {
  return <Layout><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/services" component={Services} />{services.map(service => <Route key={service.slug} path={`/services/${service.slug}`}>{() => <ServiceDetail service={service} />}</Route>)}<Route path="/approach" component={Approach} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></Layout>;
}

export default function App() { return <Router />; }


// import { useEffect, useState } from 'react';
// import { Link, Route, Switch, useLocation } from 'wouter';
// import {
//   ArrowRight, ArrowUpRight, Building2, Check, ChevronRight, ClipboardCheck,
//   Gauge, Globe2, Handshake, Landmark, LockKeyhole, Menu, Network, Scale,
//   ShieldCheck, Sparkles, Target, Users, X, Workflow, GraduationCap, HeartPulse, BriefcaseBusiness,
// } from 'lucide-react';
// import { contactService } from './services/api';

// const WHATSAPP_NUMBER = '233243583573'; // Ghana number in international format, no + or leading 0
// const WHATSAPP_DEFAULT_MESSAGE = "Hi BillNova AI Partners, I'd like to know more about your services.";

// function WhatsAppIcon(props) {
//   return (
//     <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
//       <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.697 4.61 1.898 6.478L4 29l7.72-1.865A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3Zm0 21.75a9.7 9.7 0 0 1-4.95-1.356l-.355-.21-4.582 1.107 1.127-4.464-.232-.366A9.69 9.69 0 0 1 5.25 15c0-5.936 4.815-10.75 10.751-10.75S26.75 9.064 26.75 15 21.936 24.75 16.001 24.75Zm5.34-7.354c-.293-.147-1.735-.857-2.005-.955-.269-.098-.465-.147-.66.147-.196.293-.758.955-.93 1.152-.171.196-.343.22-.636.073-.293-.147-1.238-.456-2.358-1.455-.872-.778-1.461-1.739-1.633-2.032-.171-.293-.018-.451.129-.598.132-.132.293-.343.44-.514.147-.171.196-.293.294-.489.098-.196.049-.367-.024-.514-.073-.147-.66-1.591-.905-2.179-.238-.572-.48-.494-.66-.503l-.562-.01c-.196 0-.514.073-.783.367-.269.293-1.026 1.003-1.026 2.446 0 1.443 1.05 2.837 1.196 3.033.147.196 2.067 3.157 5.008 4.428.7.302 1.246.483 1.672.618.702.223 1.34.191 1.845.116.563-.084 1.735-.709 1.98-1.393.244-.685.244-1.271.171-1.393-.073-.122-.269-.196-.562-.343Z" />
//     </svg>
//   );
// }

// function WhatsAppButton() {
//   const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;
//   return (
//     <a
//       href={href}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="whatsapp-float"
//       aria-label="Chat with BillNova AI Partners on WhatsApp"
//       data-testid="link-whatsapp-float"
//     >
//       <WhatsAppIcon />
//     </a>
//   );
// }

// const logo = '/billnova-logo-compact.png';

// const services = [
//   { slug:'ai-governance', index:'01', title:'AI Governance & Responsible AI', short:'Helping organizations adopt AI with confidence.', description:'We help organizations establish the policies, frameworks and controls required to use AI safely and responsibly.', items:['AI Governance Frameworks','Responsible AI Policies and Guidelines','AI Risk Assessment','AI Use-Case Governance','AI Ethics and Responsible Use','Employee AI Usage Guidelines','AI Risk & Control Frameworks','AI Governance Training'], icon:Scale, detail:'Make responsible adoption an operating discipline, not a policy document. We help leaders turn principles into decisions, controls and everyday practice.' },
//   { slug:'information-protection', index:'02', title:'Information Protection & AI Risk', short:'Protecting information in an increasingly AI-enabled workplace.', description:'The rapid adoption of AI creates new questions around confidential information, personal data, intellectual property and cybersecurity. We help organizations identify and manage these risks.', items:['AI-related Information Risk Assessment','Data Protection & Privacy Advisory','AI Information Handling Guidelines','Confidentiality & Data Leakage Risk Assessment','AI Security Awareness','Information Protection Frameworks','AI Vendor and Tool Risk Assessment'], icon:LockKeyhole, detail:'Bring clarity to a fast-changing information environment. We help teams understand what can be shared, with whom, through which tools and under what safeguards.' },
//   { slug:'ai-audit', index:'03', title:'AI Audit & Business Transformation', short:'Finding where AI can create the greatest value.', description:'Before investing in AI, organizations need to understand where the opportunities actually exist. Our AI Audit examines business processes, workflows and operational challenges to identify practical opportunities for AI and automation.', items:['Business workflows','Repetitive and manual processes','Productivity bottlenecks','Data and information flows','Customer-facing processes','Decision-making processes','Existing technology environment'], icon:ClipboardCheck, detail:'Move from broad enthusiasm to a prioritized opportunity roadmap grounded in how your organization actually works.' },
//   { slug:'business-automation', index:'04', title:'AI-Powered Business Automation', short:'Turning repetitive work into intelligent workflows.', description:'We help organizations redesign and automate business processes using AI and emerging technologies.', items:['Document and information processing','Report generation','Customer service workflows','Email and communication automation','Data processing','Knowledge management','Administrative workflows','Approval processes','Business intelligence and reporting','AI-powered productivity solutions'], icon:Workflow, detail:'The best automation is quietly useful: it removes friction, improves quality and gives people more time for work that requires judgment.' },
//   { slug:'ai-training', index:'05', title:'AI Training & Capability Development', short:'Building people who are ready for the AI-powered workplace.', description:'Technology adoption succeeds when people understand how to use it effectively and responsibly.', items:['AI for Executives and Managers','Generative AI for the Workplace','AI Productivity Skills','Prompt Engineering','Responsible AI','AI Literacy','AI-Powered Microsoft 365 Productivity','AI for Business Functions','AI Change & Adoption','Customized Corporate AI Programmes'], icon:GraduationCap, detail:'Build confidence at every level, from executive decision-making and responsible use to practical daily productivity.' },
// ];

// const industries = [
//   [Landmark,'Banking & Financial Services','Navigate AI adoption while protecting sensitive customer information and managing regulatory and operational risk.'],
//   [BriefcaseBusiness,'Insurance','Balance faster, better service with the information, control and workforce considerations AI introduces.'],
//   [HeartPulse,'Healthcare','Explore useful AI pathways with care for privacy, clinical context and the people depending on your systems.'],
//   [Building2,'Government & Public Sector','Develop transparent, accountable approaches to AI that serve institutions and the public interest.'],
//   [Users,'Professional Services','Equip knowledge workers with responsible tools that improve quality, efficiency and client outcomes.'],
//   [Target,'SMEs & Growing Enterprises','Focus limited time and resources on practical opportunities with a clear path to adoption.'],
//   [Globe2,'Corporate Organizations','Align leaders, functions and safeguards around an AI-enabled way of working.'],
// ];

// function Logo({ footer = false }) {
//   return <Link href="/" className={`brand ${footer ? 'footer-brand-logo' : ''}`} data-testid="link-logo"><span className="logo-crop"><img src={logo} alt="BillNova AI Partners Limited logo" /></span></Link>;
// }

// function TypingTagline({ words, typingSpeed = 70, deletingSpeed = 40, pause = 1500 }) {
//   const [index, setIndex] = useState(0);
//   const [text, setText] = useState('');
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     const current = words[index % words.length];
//     let timeout;
//     if (!deleting && text.length < current.length) {
//       timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
//     } else if (!deleting && text.length === current.length) {
//       timeout = setTimeout(() => setDeleting(true), pause);
//     } else if (deleting && text.length > 0) {
//       timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
//     } else {
//       setDeleting(false);
//       setIndex((i) => (i + 1) % words.length);
//     }
//     return () => clearTimeout(timeout);
//   }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

//   return <span className="typing-tagline" data-testid="text-typing-tagline">{text}<span className="typing-cursor" aria-hidden="true">|</span></span>;
// }

// function Header() {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [location] = useLocation();
//   useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 16); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
//   useEffect(() => setOpen(false), [location]);
//   return <header>
//     <div className="topline"><div className="container topline-inner"><span>Ghana · Advisory for responsible AI adoption</span><a href="tel:0243583573" data-testid="link-phone-top">024 358 3573</a></div></div>
//     <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
//       <div className="container nav-inner"><Logo />
//         <div className="nav-links">
//           <Link href="/" className={location === '/' ? 'active' : ''} data-testid="link-nav-home">Home</Link>
//           <Link href="/about" className={location === '/about' ? 'active' : ''} data-testid="link-nav-about">About</Link>
//           <Link href="/services" className={location.startsWith('/services') ? 'active' : ''} data-testid="link-nav-services">Services</Link>
//           <Link href="/approach" className={location === '/approach' ? 'active' : ''} data-testid="link-nav-approach">Our Approach</Link>
//           <Link href="/contact" className={location === '/contact' ? 'active' : ''} data-testid="link-nav-contact">Contact</Link>
//         </div>
//         <Link href="/contact" className="nav-cta" data-testid="link-nav-consultation">Book a Consultation <ArrowUpRight size={15} /></Link>
//         <button className="mobile-toggle" onClick={() => setOpen(value => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
//       </div>
//       {open && <div className="mobile-nav">
//         <Link href="/" data-testid="link-mobile-home">Home</Link><Link href="/about" data-testid="link-mobile-about">About</Link><Link href="/services" data-testid="link-mobile-services">Services</Link><Link href="/approach" data-testid="link-mobile-approach">Our Approach</Link><Link href="/contact" className="mobile-cta" data-testid="link-mobile-contact">Book a Consultation</Link>
//       </div>}
//     </nav>
//   </header>;
// }

// function Footer() {
//   return <footer className="footer"><div className="container">
//     <div className="footer-grid">
//       <div className="footer-brand"><Logo footer /><p>Your Partner in Responsible AI Adoption.<br />Practical advisory for organizations moving from curiosity to confident capability.</p></div>
//       <div><h3>Navigate</h3><div className="footer-links"><Link href="/" data-testid="link-footer-home">Home</Link><Link href="/about" data-testid="link-footer-about">About</Link><Link href="/services" data-testid="link-footer-services">Services</Link><Link href="/approach" data-testid="link-footer-approach">Our Approach</Link><Link href="/contact" data-testid="link-footer-contact">Contact</Link></div></div>
//       <div><h3>Services</h3><div className="footer-links">{services.map(service => <Link key={service.slug} href={`/services/${service.slug}`} data-testid={`link-footer-${service.slug}`}>{service.title.replace(' & Responsible AI','').replace(' & AI Risk','')}</Link>)}</div></div>
//       <div><h3>Contact</h3><div className="footer-links"><a href="tel:0243583573" data-testid="link-footer-phone">024 358 3573</a></div></div>
//     </div>
//     <div className="footer-bottom"><span>© 2026 BillNova AI Partners Limited. All Rights Reserved.</span><span>Built around trust, governance and meaningful business value.</span></div>
//   </div></footer>;
// }

// function Layout({ children }) { return <div className="site-shell"><Header />{children}<Footer /><WhatsAppButton /></div>; }
// function ButtonLink({ href, children, secondary = false, testId }) { return <Link href={href} className={secondary ? 'button-secondary' : 'button-primary'} data-testid={testId}>{children}<ArrowRight size={16} /></Link>; }
// function SectionHeading({ eyebrow, title, intro, dark = false }) { return <div className={dark ? 'dark-section-heading' : ''}><span className="eyebrow">{eyebrow}</span><h2 className="section-title display">{title}</h2>{intro && <p className="section-intro">{intro}</p>}</div>; }

// function AbstractVisual() {
//   return <div className="hero-visual" aria-label="A connected framework showing Understand, Govern, Transform and Empower">
//     <div className="orbit"><div className="orbit-line" /><div className="orbit-line two" /><div className="core"><strong>AI</strong><small>PARTNERS</small></div>
//       <div className="concept one"><b />UNDERSTAND</div><div className="concept two"><b />GOVERN</div><div className="concept three"><b />TRANSFORM</div><div className="concept four"><b />EMPOWER</div>
//     </div><span className="visual-caption">A responsible path from insight to impact</span>
//   </div>;
// }

// function Home() {
//   return <>
//     <main>
//       <section className="hero"><div className="container hero-grid">
//         <div className="reveal"><span className="eyebrow">Responsible AI advisory · Ghana</span><h1 className="display">AI that moves with <em>confidence.</em></h1><p className="hero-lead">Your Partner in <TypingTagline words={["Responsible AI Adoption", "AI Governance", "AI Policies", "AI Transformation", "AI Risk & Ethics"]} /></p><p className="hero-copy">Helping organizations understand, govern, transform and scale AI for meaningful business impact.</p><div className="actions"><ButtonLink href="/contact" testId="button-hero-consultation">Book a Consultation</ButtonLink><ButtonLink href="/services" secondary testId="button-hero-services">Explore Our Services</ButtonLink></div><div className="hero-note"><span /> Built for boards, teams and the work between them</div></div>
//         <AbstractVisual />
//       </div></section>
//       <div className="ribbon"><div className="container ribbon-inner"><strong>AI should create value you can stand behind.</strong><span>Understand <i className="dot">·</i> Govern <i className="dot">·</i> Transform <i className="dot">·</i> Empower</span></div></div>
//       <section className="section values-section"><div className="container"><div className="split-heading"><SectionHeading eyebrow="The BillNova standard" title="AI that creates real business value" intro="AI should do more than generate excitement. It should improve the way organizations work, make better decisions, protect information and create measurable business value." /></div><div className="value-grid">{[['Responsible',ShieldCheck,'AI adoption built around ethics, risk, privacy and security.'],['Practical',Gauge,'Solutions aligned with real business objectives.'],['Measurable',Target,'Focus on productivity, efficiency, quality and business outcomes.'],['Sustainable',Handshake,'Building organizational capability that lasts beyond the engagement.']].map(([title,Icon,text]) => <article className="value-card" key={title}><div className="icon-box"><Icon size={20} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
//       <section className="section about-band"><div className="container about-grid"><div><SectionHeading eyebrow="Who we are" title="From curiosity to confident adoption." /><div className="about-mark"><p>Business understanding, technology, governance and people development — brought together.</p></div></div><div><p className="about-body"><strong className="brand-emphasis">BillNova AI Partners Limited</strong> is an AI advisory and transformation firm that helps organizations move from curiosity to confident, measurable adoption of AI.</p><p>We work alongside boards, executives and operational teams to identify where AI can create the greatest value, put the right governance and safeguards in place, automate the workflows that matter most, and build the internal capability needed to sustain change.</p><div className="statline"><div><strong>01</strong><span>Business-first<br />thinking</span></div><div><strong>04</strong><span>Connected<br />disciplines</span></div><div><strong>∞</strong><span>Capability that<br />keeps growing</span></div></div><div style={{marginTop:28}}><ButtonLink href="/about" secondary testId="button-home-about">Learn More About Us</ButtonLink></div></div></div></section>
//       <section className="section dark-section"><div className="container"><SectionHeading eyebrow="Where we focus" title="The right questions before the next technology." intro="Responsible adoption starts with context. We help organizations see the full picture: value, risk, people and the practical path forward." /><div className="industry-grid" style={{borderColor:'rgba(191,216,239,.22)'}}>{industries.slice(0,4).map(([Icon,title,text]) => <article className="industry" key={title} style={{borderColor:'rgba(191,216,239,.22)'}}><Icon size={22} /><h3 style={{color:'#fff'}}>{title}</h3><p style={{color:'#afc1da'}}>{text}</p></article>)}</div><div style={{marginTop:38}}><ButtonLink href="/approach" secondary testId="button-home-approach">See Our Approach</ButtonLink></div></div></section>
//       <CTA />
//     </main>
//   </>;
// }

// function About() {
//   return <main><PageHero eyebrow="About BillNova" title="A partner for the decisions that make AI matter." intro="BillNova AI Partners helps organizations adopt AI safely, govern it responsibly and scale it for meaningful business impact." /><section className="section about-band"><div className="container about-grid"><div><SectionHeading eyebrow="Our perspective" title="Clarity before complexity." /><div className="about-mark"><p>We do not start with a tool. We start with your context, your people and the outcome that matters.</p></div></div><div><p className="about-body"><strong className="brand-emphasis">BillNova AI Partners Limited</strong> is an AI advisory and transformation firm that helps organizations move from curiosity to confident, measurable adoption of AI.</p><p>We work alongside boards, executives and operational teams to identify where AI can create the greatest value, put the right governance and safeguards in place, automate the workflows that matter most, and build the internal capability needed to sustain change.</p><p style={{marginTop:18}}>Our approach combines business understanding, technology, governance and people development.</p></div></div></section><section className="section dark-section"><div className="container"><SectionHeading eyebrow="Our mission & vision" title="Ambition, with the guardrails to earn trust." /><div className="mission-grid"><div className="mission-card"><span className="label">Our mission</span><p>To assist organizations adopt Artificial Intelligence safely, govern it responsibly and scale it for meaningful business impact, enabling productivity, innovation and long-term competitive advantage.</p></div><div className="mission-card"><span className="label">Our vision</span><p>To be the trusted partner of choice for organizations that want to harness the power of AI without compromising trust, ethics or the integrity of their information.</p></div></div></div></section><Values /><CTA /></main>;
// }

// function Values() {
//   const vals = [['Responsible Innovation',Sparkles,'We believe innovation must go hand in hand with responsibility.'],['Business Value',Target,'Technology is only valuable when it solves a real problem.'],['Trust & Integrity',ShieldCheck,'Trust is fundamental to AI adoption.'],['People First',Users,'AI should empower people, not simply replace processes.'],['Continuous Learning',Network,'AI is evolving rapidly. We remain curious and adaptable.'],['Partnership',Handshake,'We work alongside our clients rather than simply working for them.']];
//   return <section className="section values-section"><div className="container"><SectionHeading eyebrow="What guides us" title="Principles that travel with the work." intro="Our values are not wall art. They shape how we listen, recommend, implement and measure." /><div className="why-grid">{vals.map(([title,Icon,text]) => <article className="why" key={title}><Icon size={19} color="#1267c9" style={{marginBottom:16}} /><strong>{title}</strong><span>{text}</span></article>)}</div></div></section>;
// }

// function PageHero({ eyebrow, title, intro }) { return <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/" data-testid="link-breadcrumb-home">Home</Link><ChevronRight size={13} /><span>{eyebrow}</span></div><span className="eyebrow">{eyebrow}</span><h1 className="section-title display">{title}</h1><p className="section-intro">{intro}</p></div></section>; }

// function Services() {
//   return <main><PageHero eyebrow="Services" title="Practical AI advisory, built around your goals." intro="Practical AI advisory and transformation services designed around your organization's goals, risks and opportunities." /><section className="section"><div className="container"><SectionHeading eyebrow="The service portfolio" title="Five ways to move forward." /><div className="service-grid">{services.map((service, i) => <ServiceCard key={service.slug} service={service} wide={i === 2} />)}</div></div></section><section className="section industries"><div className="container"><SectionHeading eyebrow="Who we serve" title="AI adoption built around your organization." intro="Our work is shaped for the responsibilities, pace and information environments of real institutions." /><div className="industry-grid">{industries.map(([Icon,title,text]) => <article className="industry" key={title}><Icon size={22} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><CTA /></main>;
// }

// function ServiceCard({ service, wide = false }) {
//   const Icon = service.icon;
//   return <article className={`service-card ${wide ? 'wide' : ''}`}><span className="service-index">{service.index} / 05</span><div style={{position:'absolute',right:28,top:28,color:'#1267c9'}}><Icon size={24} /></div><h3>{service.title}</h3><p>{service.short} {service.description}</p><div className="service-points">{service.items.slice(0, wide ? 5 : 3).map(item => <span key={item}>{item}</span>)}</div><Link href={`/services/${service.slug}`} className="text-link" data-testid={`link-service-${service.slug}`}>Explore {service.title.split(' & ')[0]} <ArrowRight size={15} /></Link></article>;
// }

// function ServiceDetail({ service }) {
//   return <main><PageHero eyebrow={service.title} title={service.short} intro={service.description} /><section className="service-detail"><div className="container detail-grid"><div className="detail-copy"><span className="eyebrow">{service.index} / Service area</span><h2 className="display">{service.detail}</h2><p>{service.description}</p><ul className="detail-list">{service.items.map(item => <li key={item}>{item}</li>)}</ul><ButtonLink href="/contact" testId={`button-detail-contact-${service.slug}`}>Talk to us about this</ButtonLink></div><DetailVisual service={service} /></div></section><CTA /></main>;
// }

// function DetailVisual({ service }) {
//   if (service.slug === 'ai-audit') return <div className="detail-visual"><h3>AI Opportunity Roadmap</h3><div className="roadmap"><div className="road-line" />{['Assess','Identify','Prioritize','Implement','Measure'].map((step,i) => <div className={`road-step ${i === 2 ? 'active' : ''}`} key={step}><i>{String(i+1).padStart(2,'0')}</i><span>{step}</span></div>)}</div></div>;
//   const Icon = service.icon;
//   return <div className="detail-visual"><div style={{position:'relative',display:'flex',alignItems:'center',gap:16,marginBottom:58}}><div style={{background:'#00a9e8',color:'#071b3a',width:52,height:52,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:3}}><Icon size={25} /></div><span style={{color:'#9eb6d2',fontSize:11,letterSpacing:'.15em',textTransform:'uppercase'}}>BillNova framework</span></div><h3>{service.title}</h3><p style={{position:'relative',color:'#b1c3da',lineHeight:1.7,fontSize:14,maxWidth:340}}>A considered path from policy and risk to practical adoption — designed to hold up in the real world.</p><div style={{position:'absolute',right:26,bottom:24,color:'#70c9ec',fontSize:11,letterSpacing:'.15em'}}>RESPONSIBLE BY DESIGN</div></div>;
// }

// function Approach() {
//   const steps = [['01','UNDERSTAND','We first understand your business, challenges, workflows and objectives.'],['02','GOVERN','We establish the policies, controls and safeguards necessary for responsible AI adoption.'],['03','TRANSFORM','We identify and implement AI and automation opportunities that improve the way your organization works.'],['04','EMPOWER','We equip your people with the knowledge and skills to confidently use AI and sustain the transformation.']];
//   return <main><PageHero eyebrow="Our approach" title="Understand. Govern. Transform. Empower." intro="Our approach brings together business understanding, governance, transformation and people development." /><section className="section dark-section"><div className="container approach-grid"><div><SectionHeading eyebrow="A connected process" title="Progress with the whole system in view." intro="The sequence matters. Insight informs governance. Governance gives transformation a responsible foundation. Empowered people make the change last." /></div><div className="steps">{steps.map(([num,title,text]) => <article className="step" key={num}><span className="step-num">{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section><section className="section"><div className="container"><SectionHeading eyebrow="Why BillNova" title="A calm, practical partner for consequential work." /><div className="why-grid">{[['Business-first AI strategy','Start with the work, not the hype.'],['Responsible AI adoption','Make ethics, risk and safeguards part of the operating model.'],['Information protection','Help people use AI without losing control of what matters.'],['Practical automation','Prioritize improvements teams can actually adopt.'],['People and capability development','Build confidence alongside the technology.'],['Long-term partnership','Leave organizations stronger than we found them.']].map(([title,text]) => <div className="why" key={title}><strong>{title}</strong><span>{text}</span></div>)}</div></div></section><CTA /></main>;
// }

// function CTA() { return <section className="cta"><div className="container cta-inner"><div><h2>Ready to move from AI curiosity to AI capability?</h2><p>Let's identify where AI can create meaningful value for your organization while keeping trust, governance and people at the center.</p></div><div className="cta-actions"><ButtonLink href="/contact" testId="button-cta-consultation">Book a Consultation</ButtonLink><a className="button-secondary" href="tel:0243583573" data-testid="link-cta-phone">Call 024 358 3573</a></div></div></section>; }

// function Contact() {
//   const [values, setValues] = useState({name:'',company:'',email:'',phone:'',jobTitle:'',service:'',message:''});
//   const [errors, setErrors] = useState({});
//   const [state, setState] = useState('idle');
//   const [serverError, setServerError] = useState('');
//   const update = event => setValues(current => ({...current,[event.target.name]:event.target.value}));
//   const submit = async event => {
//     event.preventDefault(); const next = {};
//     if (!values.name.trim()) next.name = 'Please enter your full name.';
//     if (!values.company.trim()) next.company = 'Please enter your company.';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Please enter a valid email address.';
//     if (!values.message.trim()) next.message = 'Please tell us a little about your enquiry.';
//     setErrors(next); if (Object.keys(next).length) return;
//     setState('loading'); setServerError('');
//     const payload = {
//       fullName: values.name,
//       email: values.email,
//       phone: values.phone,
//       subject: values.service ? `${values.service} enquiry` : `Enquiry from ${values.company || values.name}`,
//       projectType: values.service,
//       message: `Company: ${values.company || '-'}\nJob Title: ${values.jobTitle || '-'}\n\n${values.message}`,
//     };
//     try { await contactService.submit(payload); setState('success'); setValues({name:'',company:'',email:'',phone:'',jobTitle:'',service:'',message:''}); }
//     catch (error) { setState('error'); setServerError(error.message); }
//   };
//   return <main><PageHero eyebrow="Contact" title="Let's talk about your AI journey." intro="Whether you are exploring AI for the first time or looking to scale existing initiatives, BillNova AI Partners can help you identify practical opportunities and build a responsible path forward." /><section className="contact-section"><div className="container contact-grid"><div className="contact-info"><span className="eyebrow">Start a conversation</span><h2 className="display">Good work starts with a useful question.</h2><p>Share a little about where you are, what you are considering and what you need to understand. We will take it from there.</p><div className="contact-detail"><span>Company</span><strong>BillNova AI Partners Limited</strong></div><div className="contact-detail"><span>Phone</span><a href="tel:0243583573" data-testid="link-contact-phone">024 358 3573</a></div></div><form className="form-card" onSubmit={submit} noValidate>{state === 'success' && <div className="form-status success" role="status" data-testid="status-contact-success"><Check size={16} style={{verticalAlign:'middle',marginRight:8}} />Thank you for contacting BillNova AI Partners. Your enquiry has been received. We will get back to you shortly.</div>}{state === 'error' && <div className="form-status error" role="alert" data-testid="status-contact-error">{serverError || "We couldn't submit your enquiry right now. Please try again or call 024 358 3573."}</div>}<div className="form-grid"><Field label="Full Name" name="name" value={values.name} onChange={update} error={errors.name} required /><Field label="Company" name="company" value={values.company} onChange={update} error={errors.company} required /><Field label="Email" type="email" name="email" value={values.email} onChange={update} error={errors.email} required /><Field label="Phone" name="phone" value={values.phone} onChange={update} /><Field label="Job Title" name="jobTitle" value={values.jobTitle} onChange={update} /><div className="field"><label htmlFor="service">Service Interested In</label><select id="service" name="service" value={values.service} onChange={update} data-testid="select-service"><option value="">Select a service</option>{services.map(item => <option key={item.slug} value={item.title}>{item.title}</option>)}</select></div><Field label="Message" name="message" value={values.message} onChange={update} error={errors.message} required textarea /></div><button className="button-primary form-submit" disabled={state === 'loading'} type="submit" data-testid="button-submit-contact">{state === 'loading' ? 'Sending enquiry…' : 'Send Enquiry'}<ArrowRight size={16} /></button></form></div></section></main>;
// }

// function Field({label,name,value,onChange,error,type='text',required=false,textarea=false}) { const props = {id:name,name,value,onChange,type,required,'aria-invalid':Boolean(error), 'data-testid':`input-${name}`}; return <div className={`field ${textarea ? 'full' : ''}`}><label htmlFor={name}>{label}{required && ' *'}</label>{textarea ? <textarea {...props} /> : <input {...props} />}{error && <span className="error-text">{error}</span>}</div>; }

// function NotFound() { return <main><PageHero eyebrow="Page not found" title="This page is not in the roadmap." intro="The address may have changed. Let's get you back to a useful starting point." /><section className="section"><div className="container"><ButtonLink href="/" testId="button-not-found-home">Return home</ButtonLink></div></section></main>; }

// function Router() {
//   return <Layout><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/services" component={Services} />{services.map(service => <Route key={service.slug} path={`/services/${service.slug}`}>{() => <ServiceDetail service={service} />}</Route>)}<Route path="/approach" component={Approach} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></Layout>;
// }

// export default function App() { return <Router />; }







// import { useEffect, useState } from 'react';
// import { Link, Route, Switch, useLocation } from 'wouter';
// import {
//   ArrowRight, ArrowUpRight, Building2, Check, ChevronRight, ClipboardCheck,
//   Gauge, Globe2, Handshake, Landmark, LockKeyhole, Menu, Network, Scale,
//   ShieldCheck, Sparkles, Target, Users, X, Workflow, GraduationCap, HeartPulse, BriefcaseBusiness,
// } from 'lucide-react';
// import { contactService } from './services/api';
// const WHATSAPP_NUMBER = '233243583573'; // Ghana number in international format, no + or leading 0
// const WHATSAPP_DEFAULT_MESSAGE = "Hi BillNova AI Partners, I'd like to know more about your services.";

// function WhatsAppIcon(props) {
//   return (
//     <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
//       <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.697 4.61 1.898 6.478L4 29l7.72-1.865A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3Zm0 21.75a9.7 9.7 0 0 1-4.95-1.356l-.355-.21-4.582 1.107 1.127-4.464-.232-.366A9.69 9.69 0 0 1 5.25 15c0-5.936 4.815-10.75 10.751-10.75S26.75 9.064 26.75 15 21.936 24.75 16.001 24.75Zm5.34-7.354c-.293-.147-1.735-.857-2.005-.955-.269-.098-.465-.147-.66.147-.196.293-.758.955-.93 1.152-.171.196-.343.22-.636.073-.293-.147-1.238-.456-2.358-1.455-.872-.778-1.461-1.739-1.633-2.032-.171-.293-.018-.451.129-.598.132-.132.293-.343.44-.514.147-.171.196-.293.294-.489.098-.196.049-.367-.024-.514-.073-.147-.66-1.591-.905-2.179-.238-.572-.48-.494-.66-.503l-.562-.01c-.196 0-.514.073-.783.367-.269.293-1.026 1.003-1.026 2.446 0 1.443 1.05 2.837 1.196 3.033.147.196 2.067 3.157 5.008 4.428.7.302 1.246.483 1.672.618.702.223 1.34.191 1.845.116.563-.084 1.735-.709 1.98-1.393.244-.685.244-1.271.171-1.393-.073-.122-.269-.196-.562-.343Z" />
//     </svg>
//   );
// }

// function WhatsAppButton() {
//   const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;
//   return (
//     <a href={href} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat with BillNova AI Partners on WhatsApp" data-testid="link-whatsapp-float">
//       <WhatsAppIcon />
//     </a>
//   );
// }

// const logo = '/billnova-logo.jpeg';

// const services = [
//   { slug:'ai-governance', index:'01', title:'AI Governance & Responsible AI', short:'Helping organizations adopt AI with confidence.', description:'We help organizations establish the policies, frameworks and controls required to use AI safely and responsibly.', items:['AI Governance Frameworks','Responsible AI Policies and Guidelines','AI Risk Assessment','AI Use-Case Governance','AI Ethics and Responsible Use','Employee AI Usage Guidelines','AI Risk & Control Frameworks','AI Governance Training'], icon:Scale, detail:'Make responsible adoption an operating discipline, not a policy document. We help leaders turn principles into decisions, controls and everyday practice.' },
//   { slug:'information-protection', index:'02', title:'Information Protection & AI Risk', short:'Protecting information in an increasingly AI-enabled workplace.', description:'The rapid adoption of AI creates new questions around confidential information, personal data, intellectual property and cybersecurity. We help organizations identify and manage these risks.', items:['AI-related Information Risk Assessment','Data Protection & Privacy Advisory','AI Information Handling Guidelines','Confidentiality & Data Leakage Risk Assessment','AI Security Awareness','Information Protection Frameworks','AI Vendor and Tool Risk Assessment'], icon:LockKeyhole, detail:'Bring clarity to a fast-changing information environment. We help teams understand what can be shared, with whom, through which tools and under what safeguards.' },
//   { slug:'ai-audit', index:'03', title:'AI Audit & Business Transformation', short:'Finding where AI can create the greatest value.', description:'Before investing in AI, organizations need to understand where the opportunities actually exist. Our AI Audit examines business processes, workflows and operational challenges to identify practical opportunities for AI and automation.', items:['Business workflows','Repetitive and manual processes','Productivity bottlenecks','Data and information flows','Customer-facing processes','Decision-making processes','Existing technology environment'], icon:ClipboardCheck, detail:'Move from broad enthusiasm to a prioritized opportunity roadmap grounded in how your organization actually works.' },
//   { slug:'business-automation', index:'04', title:'AI-Powered Business Automation', short:'Turning repetitive work into intelligent workflows.', description:'We help organizations redesign and automate business processes using AI and emerging technologies.', items:['Document and information processing','Report generation','Customer service workflows','Email and communication automation','Data processing','Knowledge management','Administrative workflows','Approval processes','Business intelligence and reporting','AI-powered productivity solutions'], icon:Workflow, detail:'The best automation is quietly useful: it removes friction, improves quality and gives people more time for work that requires judgment.' },
//   { slug:'ai-training', index:'05', title:'AI Training & Capability Development', short:'Building people who are ready for the AI-powered workplace.', description:'Technology adoption succeeds when people understand how to use it effectively and responsibly.', items:['AI for Executives and Managers','Generative AI for the Workplace','AI Productivity Skills','Prompt Engineering','Responsible AI','AI Literacy','AI-Powered Microsoft 365 Productivity','AI for Business Functions','AI Change & Adoption','Customized Corporate AI Programmes'], icon:GraduationCap, detail:'Build confidence at every level, from executive decision-making and responsible use to practical daily productivity.' },
// ];

// const industries = [
//   [Landmark,'Banking & Financial Services','Navigate AI adoption while protecting sensitive customer information and managing regulatory and operational risk.'],
//   [BriefcaseBusiness,'Insurance','Balance faster, better service with the information, control and workforce considerations AI introduces.'],
//   [HeartPulse,'Healthcare','Explore useful AI pathways with care for privacy, clinical context and the people depending on your systems.'],
//   [Building2,'Government & Public Sector','Develop transparent, accountable approaches to AI that serve institutions and the public interest.'],
//   [Users,'Professional Services','Equip knowledge workers with responsible tools that improve quality, efficiency and client outcomes.'],
//   [Target,'SMEs & Growing Enterprises','Focus limited time and resources on practical opportunities with a clear path to adoption.'],
//   [Globe2,'Corporate Organizations','Align leaders, functions and safeguards around an AI-enabled way of working.'],
// ];

// function Logo({ footer = false }) {
//   return <Link href="/" className={`brand ${footer ? 'footer-brand-logo' : ''}`} data-testid="link-logo"><span className="logo-crop"><img src={logo} alt="BillNova AI Partners Limited logo" /></span></Link>;
// }

// function Header() {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [location] = useLocation();
//   useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 16); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
//   useEffect(() => setOpen(false), [location]);
//   return <header>
//     <div className="topline"><div className="container topline-inner"><span>Ghana · Advisory for responsible AI adoption</span><a href="tel:0243583573" data-testid="link-phone-top">024 358 3573</a></div></div>
//     <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
//       <div className="container nav-inner"><Logo />
//         <div className="nav-links">
//           <Link href="/" className={location === '/' ? 'active' : ''} data-testid="link-nav-home">Home</Link>
//           <Link href="/about" className={location === '/about' ? 'active' : ''} data-testid="link-nav-about">About</Link>
//           <Link href="/services" className={location.startsWith('/services') ? 'active' : ''} data-testid="link-nav-services">Services</Link>
//           <Link href="/approach" className={location === '/approach' ? 'active' : ''} data-testid="link-nav-approach">Our Approach</Link>
//           <Link href="/contact" className={location === '/contact' ? 'active' : ''} data-testid="link-nav-contact">Contact</Link>
//         </div>
//         <Link href="/contact" className="nav-cta" data-testid="link-nav-consultation">Book a Consultation <ArrowUpRight size={15} /></Link>
//         <button className="mobile-toggle" onClick={() => setOpen(value => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
//       </div>
//       {open && <div className="mobile-nav">
//         <Link href="/" data-testid="link-mobile-home">Home</Link><Link href="/about" data-testid="link-mobile-about">About</Link><Link href="/services" data-testid="link-mobile-services">Services</Link><Link href="/approach" data-testid="link-mobile-approach">Our Approach</Link><Link href="/contact" className="mobile-cta" data-testid="link-mobile-contact">Book a Consultation</Link>
//       </div>}
//     </nav>
//   </header>;
// }

// function Footer() {
//   return <footer className="footer"><div className="container">
//     <div className="footer-grid">
//       <div className="footer-brand"><Logo footer /><p>Your Partner in Responsible AI Adoption.<br />Practical advisory for organizations moving from curiosity to confident capability.</p></div>
//       <div><h3>Navigate</h3><div className="footer-links"><Link href="/" data-testid="link-footer-home">Home</Link><Link href="/about" data-testid="link-footer-about">About</Link><Link href="/services" data-testid="link-footer-services">Services</Link><Link href="/approach" data-testid="link-footer-approach">Our Approach</Link><Link href="/contact" data-testid="link-footer-contact">Contact</Link></div></div>
//       <div><h3>Services</h3><div className="footer-links">{services.map(service => <Link key={service.slug} href={`/services/${service.slug}`} data-testid={`link-footer-${service.slug}`}>{service.title.replace(' & Responsible AI','').replace(' & AI Risk','')}</Link>)}</div></div>
//       <div><h3>Contact</h3><div className="footer-links"><a href="tel:0243583573" data-testid="link-footer-phone">024 358 3573</a><span>William Abakah<br />Principal Contact</span></div></div>
//     </div>
//     <div className="footer-bottom"><span>© 2026 BillNova AI Partners Limited. All Rights Reserved.</span><span>Built around trust, governance and meaningful business value.</span></div>
//   </div></footer>;
// }

// // function Layout({ children }) { return <div className="site-shell"><Header />{children}<Footer /></div>; }
// function Layout({ children }) { return <div className="site-shell"><Header />{children}<Footer /><WhatsAppButton /></div>; }
// function ButtonLink({ href, children, secondary = false, testId }) { return <Link href={href} className={secondary ? 'button-secondary' : 'button-primary'} data-testid={testId}>{children}<ArrowRight size={16} /></Link>; }
// function SectionHeading({ eyebrow, title, intro, dark = false }) { return <div className={dark ? 'dark-section-heading' : ''}><span className="eyebrow">{eyebrow}</span><h2 className="section-title display">{title}</h2>{intro && <p className="section-intro">{intro}</p>}</div>; }

// function AbstractVisual() {
//   return <div className="hero-visual" aria-label="A connected framework showing Understand, Govern, Transform and Empower">
//     <div className="orbit"><div className="orbit-line" /><div className="orbit-line two" /><div className="core"><strong>AI</strong><small>PARTNERS</small></div>
//       <div className="concept one"><b />UNDERSTAND</div><div className="concept two"><b />GOVERN</div><div className="concept three"><b />TRANSFORM</div><div className="concept four"><b />EMPOWER</div>
//     </div><span className="visual-caption">A responsible path from insight to impact</span>
//   </div>;
// }

// function Home() {
//   return <>
//     <main>
//       <section className="hero"><div className="container hero-grid">
//         <div className="reveal"><span className="eyebrow">Responsible AI advisory · Ghana</span><h1 className="display">AI that moves with <em>confidence.</em></h1><p className="hero-lead">Your Partner in Responsible AI Adoption.</p><p className="hero-copy">Helping organizations understand, govern, transform and scale AI for meaningful business impact.</p><div className="actions"><ButtonLink href="/contact" testId="button-hero-consultation">Book a Consultation</ButtonLink><ButtonLink href="/services" secondary testId="button-hero-services">Explore Our Services</ButtonLink></div><div className="hero-note"><span /> Built for boards, teams and the work between them</div></div>
//         <AbstractVisual />
//       </div></section>
//       <div className="ribbon"><div className="container ribbon-inner"><strong>AI should create value you can stand behind.</strong><span>Understand <i className="dot">·</i> Govern <i className="dot">·</i> Transform <i className="dot">·</i> Empower</span></div></div>
//       <section className="section values-section"><div className="container"><div className="split-heading"><SectionHeading eyebrow="The BillNova standard" title="AI that creates real business value" intro="AI should do more than generate excitement. It should improve the way organizations work, make better decisions, protect information and create measurable business value." /></div><div className="value-grid">{[['Responsible',ShieldCheck,'AI adoption built around ethics, risk, privacy and security.'],['Practical',Gauge,'Solutions aligned with real business objectives.'],['Measurable',Target,'Focus on productivity, efficiency, quality and business outcomes.'],['Sustainable',Handshake,'Building organizational capability that lasts beyond the engagement.']].map(([title,Icon,text]) => <article className="value-card" key={title}><div className="icon-box"><Icon size={20} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
//       <section className="section about-band"><div className="container about-grid"><div><SectionHeading eyebrow="Who we are" title="From curiosity to confident adoption." /><div className="about-mark"><p>Business understanding, technology, governance and people development — brought together.</p></div></div><div><p className="about-body">BillNova AI Partners Limited is an AI advisory and transformation firm that helps organizations move from curiosity to confident, measurable adoption of AI.</p><p>We work alongside boards, executives and operational teams to identify where AI can create the greatest value, put the right governance and safeguards in place, automate the workflows that matter most, and build the internal capability needed to sustain change.</p><div className="statline"><div><strong>01</strong><span>Business-first<br />thinking</span></div><div><strong>04</strong><span>Connected<br />disciplines</span></div><div><strong>∞</strong><span>Capability that<br />keeps growing</span></div></div><div style={{marginTop:28}}><ButtonLink href="/about" secondary testId="button-home-about">Learn More About Us</ButtonLink></div></div></div></section>
//       <section className="section dark-section"><div className="container"><SectionHeading eyebrow="Where we focus" title="The right questions before the next technology." intro="Responsible adoption starts with context. We help organizations see the full picture: value, risk, people and the practical path forward." /><div className="industry-grid" style={{borderColor:'rgba(191,216,239,.22)'}}>{industries.slice(0,4).map(([Icon,title,text]) => <article className="industry" key={title} style={{borderColor:'rgba(191,216,239,.22)'}}><Icon size={22} /><h3 style={{color:'#fff'}}>{title}</h3><p style={{color:'#afc1da'}}>{text}</p></article>)}</div><div style={{marginTop:38}}><ButtonLink href="/approach" secondary testId="button-home-approach">See Our Approach</ButtonLink></div></div></section>
//       <CTA />
//     </main>
//   </>;
// }

// function About() {
//   return <main><PageHero eyebrow="About BillNova" title="A partner for the decisions that make AI matter." intro="BillNova AI Partners helps organizations adopt AI safely, govern it responsibly and scale it for meaningful business impact." /><section className="section about-band"><div className="container about-grid"><div><SectionHeading eyebrow="Our perspective" title="Clarity before complexity." /><div className="about-mark"><p>We do not start with a tool. We start with your context, your people and the outcome that matters.</p></div></div><div><p className="about-body">BillNova AI Partners Limited is an AI advisory and transformation firm that helps organizations move from curiosity to confident, measurable adoption of AI.</p><p>We work alongside boards, executives and operational teams to identify where AI can create the greatest value, put the right governance and safeguards in place, automate the workflows that matter most, and build the internal capability needed to sustain change.</p><p style={{marginTop:18}}>Our approach combines business understanding, technology, governance and people development.</p></div></div></section><section className="section dark-section"><div className="container"><SectionHeading eyebrow="Our mission & vision" title="Ambition, with the guardrails to earn trust." /><div className="mission-grid"><div className="mission-card"><span className="label">Our mission</span><p>To assist organizations adopt Artificial Intelligence safely, govern it responsibly and scale it for meaningful business impact, enabling productivity, innovation and long-term competitive advantage.</p></div><div className="mission-card"><span className="label">Our vision</span><p>To be the trusted partner of choice for organizations that want to harness the power of AI without compromising trust, ethics or the integrity of their information.</p></div></div></div></section><Values /><CTA /></main>;
// }

// function Values() {
//   const vals = [['Responsible Innovation',Sparkles,'We believe innovation must go hand in hand with responsibility.'],['Business Value',Target,'Technology is only valuable when it solves a real problem.'],['Trust & Integrity',ShieldCheck,'Trust is fundamental to AI adoption.'],['People First',Users,'AI should empower people, not simply replace processes.'],['Continuous Learning',Network,'AI is evolving rapidly. We remain curious and adaptable.'],['Partnership',Handshake,'We work alongside our clients rather than simply working for them.']];
//   return <section className="section values-section"><div className="container"><SectionHeading eyebrow="What guides us" title="Principles that travel with the work." intro="Our values are not wall art. They shape how we listen, recommend, implement and measure." /><div className="why-grid">{vals.map(([title,Icon,text]) => <article className="why" key={title}><Icon size={19} color="#1267c9" style={{marginBottom:16}} /><strong>{title}</strong><span>{text}</span></article>)}</div></div></section>;
// }

// function PageHero({ eyebrow, title, intro }) { return <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/" data-testid="link-breadcrumb-home">Home</Link><ChevronRight size={13} /><span>{eyebrow}</span></div><span className="eyebrow">{eyebrow}</span><h1 className="section-title display">{title}</h1><p className="section-intro">{intro}</p></div></section>; }

// function Services() {
//   return <main><PageHero eyebrow="Services" title="Practical AI advisory, built around your goals." intro="Practical AI advisory and transformation services designed around your organization's goals, risks and opportunities." /><section className="section"><div className="container"><SectionHeading eyebrow="The service portfolio" title="Five ways to move forward." /><div className="service-grid">{services.map((service, i) => <ServiceCard key={service.slug} service={service} wide={i === 2} />)}</div></div></section><section className="section industries"><div className="container"><SectionHeading eyebrow="Who we serve" title="AI adoption built around your organization." intro="Our work is shaped for the responsibilities, pace and information environments of real institutions." /><div className="industry-grid">{industries.map(([Icon,title,text]) => <article className="industry" key={title}><Icon size={22} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><CTA /></main>;
// }

// function ServiceCard({ service, wide = false }) {
//   const Icon = service.icon;
//   return <article className={`service-card ${wide ? 'wide' : ''}`}><span className="service-index">{service.index} / 05</span><div style={{position:'absolute',right:28,top:28,color:'#1267c9'}}><Icon size={24} /></div><h3>{service.title}</h3><p>{service.short} {service.description}</p><div className="service-points">{service.items.slice(0, wide ? 5 : 3).map(item => <span key={item}>{item}</span>)}</div><Link href={`/services/${service.slug}`} className="text-link" data-testid={`link-service-${service.slug}`}>Explore {service.title.split(' & ')[0]} <ArrowRight size={15} /></Link></article>;
// }

// function ServiceDetail({ service }) {
//   return <main><PageHero eyebrow={service.title} title={service.short} intro={service.description} /><section className="service-detail"><div className="container detail-grid"><div className="detail-copy"><span className="eyebrow">{service.index} / Service area</span><h2 className="display">{service.detail}</h2><p>{service.description}</p><ul className="detail-list">{service.items.map(item => <li key={item}>{item}</li>)}</ul><ButtonLink href="/contact" testId={`button-detail-contact-${service.slug}`}>Talk to us about this</ButtonLink></div><DetailVisual service={service} /></div></section><CTA /></main>;
// }

// function DetailVisual({ service }) {
//   if (service.slug === 'ai-audit') return <div className="detail-visual"><h3>AI Opportunity Roadmap</h3><div className="roadmap"><div className="road-line" />{['Assess','Identify','Prioritize','Implement','Measure'].map((step,i) => <div className={`road-step ${i === 2 ? 'active' : ''}`} key={step}><i>{String(i+1).padStart(2,'0')}</i><span>{step}</span></div>)}</div></div>;
//   const Icon = service.icon;
//   return <div className="detail-visual"><div style={{position:'relative',display:'flex',alignItems:'center',gap:16,marginBottom:58}}><div style={{background:'#00a9e8',color:'#071b3a',width:52,height:52,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:3}}><Icon size={25} /></div><span style={{color:'#9eb6d2',fontSize:11,letterSpacing:'.15em',textTransform:'uppercase'}}>BillNova framework</span></div><h3>{service.title}</h3><p style={{position:'relative',color:'#b1c3da',lineHeight:1.7,fontSize:14,maxWidth:340}}>A considered path from policy and risk to practical adoption — designed to hold up in the real world.</p><div style={{position:'absolute',right:26,bottom:24,color:'#70c9ec',fontSize:11,letterSpacing:'.15em'}}>RESPONSIBLE BY DESIGN</div></div>;
// }

// function Approach() {
//   const steps = [['01','UNDERSTAND','We first understand your business, challenges, workflows and objectives.'],['02','GOVERN','We establish the policies, controls and safeguards necessary for responsible AI adoption.'],['03','TRANSFORM','We identify and implement AI and automation opportunities that improve the way your organization works.'],['04','EMPOWER','We equip your people with the knowledge and skills to confidently use AI and sustain the transformation.']];
//   return <main><PageHero eyebrow="Our approach" title="Understand. Govern. Transform. Empower." intro="Our approach brings together business understanding, governance, transformation and people development." /><section className="section dark-section"><div className="container approach-grid"><div><SectionHeading eyebrow="A connected process" title="Progress with the whole system in view." intro="The sequence matters. Insight informs governance. Governance gives transformation a responsible foundation. Empowered people make the change last." /></div><div className="steps">{steps.map(([num,title,text]) => <article className="step" key={num}><span className="step-num">{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section><section className="section"><div className="container"><SectionHeading eyebrow="Why BillNova" title="A calm, practical partner for consequential work." /><div className="why-grid">{[['Business-first AI strategy','Start with the work, not the hype.'],['Responsible AI adoption','Make ethics, risk and safeguards part of the operating model.'],['Information protection','Help people use AI without losing control of what matters.'],['Practical automation','Prioritize improvements teams can actually adopt.'],['People and capability development','Build confidence alongside the technology.'],['Long-term partnership','Leave organizations stronger than we found them.']].map(([title,text]) => <div className="why" key={title}><strong>{title}</strong><span>{text}</span></div>)}</div></div></section><CTA /></main>;
// }

// function CTA() { return <section className="cta"><div className="container cta-inner"><div><h2>Ready to move from AI curiosity to AI capability?</h2><p>Let's identify where AI can create meaningful value for your organization while keeping trust, governance and people at the center.</p></div><div className="cta-actions"><ButtonLink href="/contact" testId="button-cta-consultation">Book a Consultation</ButtonLink><a className="button-secondary" href="tel:0243583573" data-testid="link-cta-phone">Call 024 358 3573</a></div></div></section>; }

// function Contact() {
//   const [values, setValues] = useState({name:'',company:'',email:'',phone:'',jobTitle:'',service:'',message:''});
//   const [errors, setErrors] = useState({});
//   const [state, setState] = useState('idle');
//   const [serverError, setServerError] = useState('');
//   const update = event => setValues(current => ({...current,[event.target.name]:event.target.value}));
//   const submit = async event => {
//     event.preventDefault(); const next = {};
//     if (!values.name.trim()) next.name = 'Please enter your full name.';
//     if (!values.company.trim()) next.company = 'Please enter your company.';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Please enter a valid email address.';
//     if (!values.message.trim()) next.message = 'Please tell us a little about your enquiry.';
//     setErrors(next); if (Object.keys(next).length) return;
//     setState('loading'); setServerError('');
//        const payload = {
//      fullName: values.name,
//      email: values.email,
//      phone: values.phone,
//      subject: values.service ? `${values.service} enquiry` : `Enquiry from ${values.company || values.name}`,
//      projectType: values.service,
//      message: `Company: ${values.company || '-'}\nJob Title: ${values.jobTitle || '-'}\n\n${values.message}`,
//    };
//    try { await contactService.submit(payload); setState('success'); setValues({name:'',company:'',email:'',phone:'',jobTitle:'',service:'',message:''}); }
//     catch (error) { setState('error'); setServerError(error.message); }
//   };
//   return <main><PageHero eyebrow="Contact" title="Let's talk about your AI journey." intro="Whether you are exploring AI for the first time or looking to scale existing initiatives, BillNova AI Partners can help you identify practical opportunities and build a responsible path forward." /><section className="contact-section"><div className="container contact-grid"><div className="contact-info"><span className="eyebrow">Start a conversation</span><h2 className="display">Good work starts with a useful question.</h2><p>Share a little about where you are, what you are considering and what you need to understand. We will take it from there.</p><div className="contact-detail"><span>BillNova AI Partners Limited</span><strong>William Abakah</strong></div><div className="contact-detail"><span>Phone</span><a href="tel:0243583573" data-testid="link-contact-phone">024 358 3573</a></div></div><form className="form-card" onSubmit={submit} noValidate>{state === 'success' && <div className="form-status success" role="status" data-testid="status-contact-success"><Check size={16} style={{verticalAlign:'middle',marginRight:8}} />Thank you for contacting BillNova AI Partners. Your enquiry has been received. We will get back to you shortly.</div>}{state === 'error' && <div className="form-status error" role="alert" data-testid="status-contact-error">{serverError || "We couldn't submit your enquiry right now. Please try again or call 024 358 3573."}</div>}<div className="form-grid"><Field label="Full Name" name="name" value={values.name} onChange={update} error={errors.name} required /><Field label="Company" name="company" value={values.company} onChange={update} error={errors.company} required /><Field label="Email" type="email" name="email" value={values.email} onChange={update} error={errors.email} required /><Field label="Phone" name="phone" value={values.phone} onChange={update} /><Field label="Job Title" name="jobTitle" value={values.jobTitle} onChange={update} /><div className="field"><label htmlFor="service">Service Interested In</label><select id="service" name="service" value={values.service} onChange={update} data-testid="select-service"><option value="">Select a service</option>{services.map(item => <option key={item.slug} value={item.title}>{item.title}</option>)}</select></div><Field label="Message" name="message" value={values.message} onChange={update} error={errors.message} required textarea /></div><button className="button-primary form-submit" disabled={state === 'loading'} type="submit" data-testid="button-submit-contact">{state === 'loading' ? 'Sending enquiry…' : 'Send Enquiry'}<ArrowRight size={16} /></button></form></div></section></main>;
// }

// function Field({label,name,value,onChange,error,type='text',required=false,textarea=false}) { const props = {id:name,name,value,onChange,type,required,'aria-invalid':Boolean(error), 'data-testid':`input-${name}`}; return <div className={`field ${textarea ? 'full' : ''}`}><label htmlFor={name}>{label}{required && ' *'}</label>{textarea ? <textarea {...props} /> : <input {...props} />}{error && <span className="error-text">{error}</span>}</div>; }

// function NotFound() { return <main><PageHero eyebrow="Page not found" title="This page is not in the roadmap." intro="The address may have changed. Let's get you back to a useful starting point." /><section className="section"><div className="container"><ButtonLink href="/" testId="button-not-found-home">Return home</ButtonLink></div></section></main>; }

// function Router() {
//   return <Layout><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/services" component={Services} />{services.map(service => <Route key={service.slug} path={`/services/${service.slug}`}>{() => <ServiceDetail service={service} />}</Route>)}<Route path="/approach" component={Approach} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></Layout>;
// }

// export default function App() { return <Router />; }