import LegalPage, { type LegalSection, p, h3, ul, ol, details } from './LegalPage';

const SECTIONS: LegalSection[] = [
    {
        id: "introduction",
        heading: "Introduction",
        blocks: [
            p("Welcome to AMZ Automation Solutions. We respect your privacy and are committed to protecting the personal information you share with us when visiting our website, exploring our services, contacting us, or engaging with our business."),
            p("This Privacy Policy explains how we collect, use, store, disclose, and protect your information when you access our website or use our AI automation, business process automation, workflow development, consulting, integration, and related services."),
            p("By accessing or using our website and services, you acknowledge that you have read and understood this Privacy Policy."),
            p("If you do not agree with the practices described in this policy, please discontinue using our website and services."),
        ],
    },
    {
        id: "information-we-collect",
        heading: "Information we collect",
        blocks: [
            p("We may collect different categories of information depending on how you interact with our website and services."),
            h3("A. Personal Information"),
            p("When you contact us, submit an inquiry, request a consultation, or express interest in our services, we may collect:"),
            ul([
                "Full name",
                "Email address",
                "Telephone number",
                "Company or business name",
                "Job title or professional role",
                "Business website or social media links",
                "Information included in messages, inquiries, or consultation requests",
            ]),
            p("We collect this information when you voluntarily provide it through our website, email, or other communication channels."),
            h3("B. Business and Project Information"),
            p("When you engage us for automation services, we may collect information necessary to understand your business requirements and deliver the agreed services."),
            p("This may include:"),
            ul([
                "Business processes and operational information",
                "Workflow requirements and specifications",
                "Customer relationship management (CRM) information",
                "Business documents and files supplied for project development",
                "System configurations and integration requirements",
                "Information relating to existing software, platforms, and applications",
                "Technical information necessary to develop, configure, test, and maintain automation systems",
            ]),
            p("We only request information reasonably necessary for the relevant project or service."),
            h3("C. Automatically Collected Information"),
            p("When you visit our website, certain technical information may be collected automatically, including:"),
            ul([
                "IP address",
                "Browser type and version",
                "Device type and operating system",
                "Pages visited and time spent on the website",
                "Referring website or source",
                "Date and time of access",
                "General website usage and interaction information",
            ]),
            p("This information may be collected through server logs, cookies, analytics technologies, and similar tools, where implemented."),
        ],
    },
    {
        id: "how-we-use-your-information",
        heading: "How we use your information",
        blocks: [
            p("We use collected information for legitimate business and operational purposes, including:"),
            ol([
                "Responding to inquiries and service requests.",
                "Scheduling consultations and communicating with prospective clients.",
                "Understanding business requirements and recommending suitable automation solutions.",
                "Designing, developing, configuring, and maintaining automation workflows.",
                "Integrating third-party applications, APIs, and business platforms as requested.",
                "Providing customer support, troubleshooting, and technical assistance.",
                "Managing client relationships, projects, and service agreements.",
                "Improving website functionality, user experience, and service quality.",
                "Sending relevant service updates, announcements, or business communications.",
            ]),
            p("10. Preventing fraudulent activity, unauthorized access, and misuse of our services."),
            p("11. Complying with applicable legal, regulatory, and contractual obligations."),
            p("We do not intentionally collect personal information for purposes unrelated to our business operations or the services requested."),
        ],
    },
    {
        id: "ai-automation-and-third-party-technology",
        heading: "AI automation and third-party technology",
        blocks: [
            p("Our services may involve artificial intelligence tools, automation platforms, APIs, cloud infrastructure, and third-party software applications."),
            p("Depending on the nature of a project, information may be processed through external services to facilitate:"),
            ul([
                "AI-powered content generation and processing",
                "Automated customer communication",
                "Workflow orchestration and task management",
                "Data synchronization between business applications",
                "CRM and lead management",
                "Customer support automation",
                "Document processing and information extraction",
                "Reporting and business process optimization",
            ]),
            p("These services may include AI providers, hosting companies, automation platforms, database providers, communication services, and other software integrations."),
            p("When third-party technology is required, relevant information may be transmitted to or processed by those providers to perform the requested functionality."),
            p("We seek to use third-party providers appropriately and take reasonable steps to ensure that information is handled in accordance with applicable contractual and privacy requirements."),
            p("However, third-party platforms operate under their own privacy policies and terms of service. We encourage clients to review those policies before authorizing integrations."),
            p("We do not claim ownership of third-party platforms or independently control their data retention, security practices, or processing activities."),
        ],
    },
    {
        id: "how-we-share-information",
        heading: "How we share information",
        blocks: [
            p("We do not sell, rent, or trade personal information to third parties for their independent marketing purposes."),
            p("However, we may share information in the following circumstances:"),
            h3("A. Service Providers"),
            p("We may share relevant information with trusted third-party providers who assist us with website hosting, cloud storage, analytics, communication, AI processing, automation infrastructure, and other business operations."),
            h3("B. Client-Authorized Integrations"),
            p("When developing automation systems, we may transfer information between applications and platforms specifically authorized by the client."),
            p("For example, a client may authorize an automation workflow to transfer information between a website, CRM, email platform, and internal business database."),
            h3("C. Legal Requirements"),
            p("We may disclose information when required by applicable law, court orders, regulatory authorities, or lawful government requests."),
            h3("D. Business Transfers"),
            p("In the event of a merger, acquisition, restructuring, or transfer of business assets, relevant information may be transferred as part of the transaction, subject to applicable privacy obligations."),
        ],
    },
    {
        id: "cookies-and-tracking-technologies",
        heading: "Cookies and tracking technologies",
        blocks: [
            p("Our website may use cookies and similar technologies to improve functionality, understand website usage, and enhance the browsing experience."),
            p("These technologies may help us:"),
            ul([
                "Remember certain website preferences.",
                "Understand visitor interactions.",
                "Monitor website performance.",
                "Identify technical issues.",
                "Improve website navigation and functionality.",
            ]),
            p("You can manage or disable cookies through your browser settings. Please note that disabling certain cookies may affect some website features."),
            p("Where legally required, we will seek consent before using non-essential cookies or similar tracking technologies."),
        ],
    },
    {
        id: "data-security",
        heading: "Data security",
        blocks: [
            p("We take reasonable technical and organizational measures to protect personal and business information against unauthorized access, disclosure, alteration, loss, or destruction."),
            p("Depending on the nature of the information and services involved, these measures may include:"),
            ul([
                "Access restrictions and permission controls.",
                "Secure authentication practices.",
                "Encryption where appropriate and supported.",
                "Secure data transmission practices.",
                "Monitoring and maintenance of systems.",
                "Limiting access to information to authorized individuals and service providers.",
            ]),
            p("Although we make reasonable efforts to protect information, no website, online platform, or electronic transmission method can be guaranteed to be completely secure."),
            p("We therefore cannot guarantee absolute security against every possible cybersecurity threat or unauthorized access incident."),
        ],
    },
    {
        id: "data-retention",
        heading: "Data retention",
        blocks: [
            p("We retain personal and business information only for as long as reasonably necessary to fulfill the purposes described in this Privacy Policy."),
            p("Retention periods may depend on:"),
            ul([
                "The nature of the services provided.",
                "The duration of client relationships.",
                "Contractual and operational requirements.",
                "Applicable legal and regulatory obligations.",
                "Dispute resolution and recordkeeping requirements.",
            ]),
            p("When information is no longer required, we will take reasonable steps to delete, anonymize, or securely dispose of it, subject to applicable retention obligations."),
            p("For client automation projects, information stored within third-party platforms or systems may also be subject to those providers' respective retention and deletion policies."),
        ],
    },
    {
        id: "client-data-and-confidentiality",
        heading: "Client data and confidentiality",
        blocks: [
            p("We recognize that business automation projects may involve confidential commercial information, operational records, customer details, and other sensitive business materials."),
            p("We treat information supplied by clients as confidential and use it only for the purposes of delivering, maintaining, or supporting the services agreed upon."),
            p("Unless authorized by the client or otherwise permitted by law, we do not intentionally use client-provided business information for unrelated purposes."),
            p("Clients are responsible for ensuring that they have the necessary rights, permissions, and lawful authority to provide information to us and to authorize its processing through connected third-party applications."),
            p("Where our role involves processing personal information on behalf of a client, the applicable service agreement or data processing agreement may establish additional responsibilities and requirements."),
        ],
    },
    {
        id: "your-privacy-rights-and-choices",
        heading: "Your privacy rights and choices",
        blocks: [
            p("Depending on your location and applicable privacy laws, you may have certain rights regarding your personal information."),
            p("These may include the right to:"),
            ul([
                "Request access to personal information we hold about you.",
                "Request correction of inaccurate or incomplete information.",
                "Request deletion of personal information, subject to legal exceptions.",
                "Withdraw consent where processing is based on consent.",
                "Object to certain types of information processing.",
                "Request restrictions on certain processing activities.",
                "Request a copy of your information in a commonly used format, where applicable.",
                "Opt out of promotional or marketing communications.",
            ]),
            p("To exercise any applicable privacy rights, please contact us using the details provided in this policy."),
            p("We may need to verify your identity before processing certain requests."),
        ],
    },
    {
        id: "third-party-websites-and-services",
        heading: "Third-party websites and services",
        blocks: [
            p("Our website and automation services may contain links to external websites, software platforms, applications, and other third-party services."),
            p("We are not responsible for the privacy practices, content, security, or data-handling procedures of external websites or platforms that we do not operate."),
            p("Visiting or interacting with third-party websites is subject to their own privacy policies and terms of service."),
            p("We recommend reviewing the relevant policies before submitting personal information to any external service."),
        ],
    },
    {
        id: "marketing-and-communication-preferences",
        heading: "Marketing and communication preferences",
        blocks: [
            p("We may use the contact information you provide to communicate with you regarding inquiries, consultations, ongoing projects, service updates, and relevant business information."),
            p("Where permitted by applicable law, we may also send promotional communications about our services."),
            p("You may opt out of promotional emails at any time by following the unsubscribe instructions included in the communication or contacting us directly."),
            p("Please note that opting out of promotional communications will not prevent us from sending essential service-related, transactional, or administrative messages."),
        ],
    },
    {
        id: "children-s-privacy",
        heading: "Children's privacy",
        blocks: [
            p("Our website and services are intended for businesses, professionals, and individuals capable of entering into legally binding agreements."),
            p("We do not knowingly collect personal information from children under the age of 13."),
            p("If we become aware that personal information has been collected from a child without the required parental consent, we will take reasonable steps to delete that information."),
            p("If you believe a child has provided us with personal information, please contact us."),
        ],
    },
    {
        id: "international-data-transfers",
        heading: "International data transfers",
        blocks: [
            p("Depending on the technology providers and applications used in delivering our services, personal or business information may be processed or stored in countries other than the country in which it was originally collected."),
            p("Where information is transferred internationally, we will take reasonable steps to ensure that the transfer complies with applicable data protection requirements."),
            p("Third-party service providers may also process information in accordance with their own international data handling and storage arrangements."),
        ],
    },
    {
        id: "changes-to-this-privacy-policy",
        heading: "Changes to this privacy policy",
        blocks: [
            p("We reserve the right to update or revise this Privacy Policy from time to time to reflect changes in our business practices, website functionality, technology integrations, or applicable legal requirements."),
            p("Any changes will be published on this page with an updated effective date."),
            p("We encourage visitors and clients to review this policy periodically to remain informed about how their information is handled."),
            p("Continued use of our website or services following publication of an updated policy will be subject to the revised policy, to the extent permitted by applicable law."),
        ],
    },
    {
        id: "contact-us",
        heading: "Contact us",
        blocks: [
            p("If you have questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact us through our official website."),
            details([
                "Website: https://amzautomationsolutions.com",
                "Email: support@amzautomationsolutions.com",
                "Business Name: AMZ Automation Solutions",
            ]),
            p("We will make reasonable efforts to review and respond to privacy-related inquiries within a reasonable timeframe."),
        ],
    },
];

const PrivacyPolicy = () => (
    <LegalPage
        title="Privacy Policy"
        updated="October 31, 2026"
        intro="How we collect, use, share and protect your information when you visit our website or work with us."
        sections={SECTIONS}
    />
);

export default PrivacyPolicy;