import { Link } from 'wouter';

// Owner to confirm before launch: registered office address and a contact email.
// Neither is published anywhere on the site yet, so neither is stated here.
const UPDATED = '26 October 2026';
const PHONE = '024 358 3573';
const CC_BY = 'https://creativecommons.org/licenses/by/2.0/';
const UNSPLASH = 'https://unsplash.com/license';

// Attribution required by CC BY 2.0. Keep this list in step with the home page photos.
const PHOTO_CREDITS = [
  ['Accra Market', 'Francisco Anzola', 'https://www.flickr.com/photos/10345599@N03/3106526668', 'CC BY 2.0', CC_BY],
  ['Osu, Accra', 'Francisco Anzola', 'https://www.flickr.com/photos/10345599@N03/47461354302', 'CC BY 2.0', CC_BY],
  ['Accra', 'Lucian Fratila', 'https://commons.wikimedia.org/w/index.php?curid=40378949', 'CC BY 2.0', CC_BY],
  ['Cape Coast', 'usembassyghana', 'https://www.rawpixel.com/image/8714737/photo-image-public-domain-person-kids', 'CC0', 'https://creativecommons.org/publicdomain/zero/1.0/'],
  ['Team meeting', '#WOCinTech Chat', 'https://unsplash.com/photos/UcZcsHSp8o4', 'Unsplash License', UNSPLASH],
  ['Boardroom session', '#WOCinTech Chat', 'https://unsplash.com/photos/faEfWCdOKIg', 'Unsplash License', UNSPLASH],
  ['Reviewing work together', 'Iwaria Inc.', 'https://unsplash.com/photos/M7ALc3UuX_g', 'Unsplash License', UNSPLASH],
  ['Team collaboration, Lagos', 'Ninthgrid', '', 'Pexels License', 'https://www.pexels.com/license/'],
  ['Businesswomen at work', 'Ninthgrid', '', 'Pexels License', 'https://www.pexels.com/license/'],
];

export const privacyPolicy = {
  eyebrow: 'Privacy',
  title: 'Privacy policy.',
  intro: 'What BillNova AI Partners Limited collects through this website, why, and the choices you have.',
  sections: [
    ['Who we are', <p key="p">This website is run by BillNova AI Partners Limited, an AI advisory firm in Ghana. We are responsible for the personal data you send us through it. You can reach us on <a href={`tel:${PHONE.replaceAll(' ', '')}`}>{PHONE}</a>.</p>],
    ['What we collect', <>
      <p>We only collect what you choose to send through the contact form:</p>
      <ul>
        <li>your full name, company and email address;</li>
        <li>your phone number and job title, if you add them;</li>
        <li>the service you are interested in and your message.</li>
      </ul>
      <p>The site does not use analytics, advertising trackers or session recording, and it does not set cookies of its own. Our fonts are hosted on our own server, so loading a page does not send your details to a font provider.</p>
    </>],
    ['How we use it', <p key="p">We use your details to reply to your enquiry, to arrange and hold any consultation you ask for, and to keep a record of our correspondence with you. We do not sell your details, use them for marketing you have not asked for, or share them with other organizations except the service providers that host our website and email, who act on our instructions.</p>],
    ['How long we keep it', <p key="p">We keep enquiry details for as long as we need them to respond to you and to keep a reasonable record of our dealings with you. When we no longer need them, we delete them.</p>],
    ['WhatsApp and outside links', <p key="p">If you contact us with the WhatsApp button, your message goes through WhatsApp and is covered by WhatsApp's own privacy policy. Photo credits link to the sites where the photographers published their work; those sites have their own policies.</p>],
    ['Your rights', <p key="p">Under Ghana's Data Protection Act, 2012 (Act 843) you can ask us what personal data we hold about you, ask us to correct it, and ask us to delete it or stop using it. Call us on <a href={`tel:${PHONE.replaceAll(' ', '')}`}>{PHONE}</a> to make a request. If you are not satisfied with our response, you can complain to the Data Protection Commission of Ghana.</p>],
    ['Changes', <p key="p">If we change how we handle your data, we will update this page and the date below.</p>],
  ],
};

export const termsOfUse = {
  eyebrow: 'Terms',
  title: 'Terms of use.',
  intro: 'The terms that apply when you use the BillNova AI Partners website.',
  sections: [
    ['About these terms', <p key="p">This website is run by BillNova AI Partners Limited. By using it you accept these terms. If you do not accept them, please do not use the site.</p>],
    ['Information, not advice', <p key="p">The content on this site describes our services in general terms. It is not legal, regulatory, security or professional advice for your organization, and you should not rely on it as such. Advice is given only under a written engagement with us.</p>],
    ['Our content', <p key="p">The text, logo and design of this site belong to BillNova AI Partners Limited. You may view, print and share pages for your own reference, but you may not copy them for commercial use without our permission.</p>],
    ['Photo credits', <>
      <p>The photographs on this website belong to their photographers and are used under the licences below.</p>
      <ul>
        {PHOTO_CREDITS.map(([place, author, source, licence, licenceUrl]) => <li key={place}>{place}: photo by {source ? <a href={source} target="_blank" rel="noopener noreferrer">{author}</a> : author}, <a href={licenceUrl} target="_blank" rel="noopener noreferrer">{licence}</a>.</li>)}
      </ul>
    </>],
    ['Using the contact form', <p key="p">Please send accurate information and do not send confidential material until we have agreed how it will be handled. How we treat what you send is explained in our <Link href="/privacy">privacy policy</Link>.</p>],
    ['Availability and liability', <p key="p">We work to keep the site accurate and available, but we cannot promise it will always be error-free or online. To the extent the law allows, we are not liable for loss that results from using the site or relying on its content.</p>],
    ['Governing law', <p key="p">These terms are governed by the laws of the Republic of Ghana.</p>],
  ],
};

export function LegalDocument({ doc }) {
  return <section className="section legal-section"><div className="container legal">
    {doc.sections.map(([heading, body]) => <section className="legal-block" key={heading}><h2>{heading}</h2>{body}</section>)}
    <p className="legal-updated">Last updated {UPDATED}.</p>
  </div></section>;
}
