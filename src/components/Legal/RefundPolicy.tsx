import LegalPage, { type LegalSection, p, h3, ul, ol, details } from './LegalPage';

const SECTIONS: LegalSection[] = [
    {
        id: "introduction",
        heading: "Introduction",
        blocks: [
            p("This Refund and Cancellation Policy (\"Policy\") governs refund requests, project cancellations, payment disputes, and related financial matters arising from the purchase of services offered by AMZ Automation Solutions (\"Company,\" \"we,\" \"our,\" or \"us\")."),
            p("Our services may include AI-powered business automation, workflow development, CRM integrations, chatbot development, business process automation, custom software configurations, consulting, technical implementation, and other related services."),
            p("Due to the customized and service-based nature of our work, each project may involve dedicated resources, technical planning, development time, configuration, third-party software costs, and personnel allocation."),
            p("This Policy is intended to establish clear and transparent expectations regarding cancellations and refunds while protecting both the Client's rights and the Company's legitimate business interests."),
            p("By purchasing our services or entering into a project agreement with us, the Client acknowledges and agrees to the terms outlined in this Policy, subject to applicable laws and any overriding provisions of a separate written agreement."),
        ],
    },
    {
        id: "change-of-mind-cancellation-and-refund-terms",
        heading: "Change-of-mind cancellation and refund terms",
        blocks: [
            h3("2.1. Definition of Change-of-Mind Cancellation"),
            p("A change-of-mind cancellation refers to a Client's voluntary decision to discontinue a project for personal reasons or circumstances unrelated to a failure by the Company to perform its contractual obligations."),
            p("Such circumstances may include, but are not limited to:"),
            ul([
                "A change in the Client's business priorities.",
                "A decision to postpone or abandon the project.",
                "A change in budget or financial circumstances.",
                "A decision to use another service provider.",
                "A change in personal or business requirements.",
                "A voluntary decision not to proceed with the originally agreed services.",
            ]),
            h3("2.2. Conditions Governing Change-of-Mind Cancellation Requests"),
            p("The following conditions shall govern change-of-mind cancellation requests:"),
            h3("2.2.1. Cancellation Within Twenty-Four (24) Hours of Project Onboarding"),
            p("Where the Client submits a written cancellation request within twenty-four (24) hours from the official project onboarding date and time, the Client shall be eligible for a refund equivalent to thirty percent (30%) of the total amount received by the Company for the relevant project."),
            p("The remaining seventy percent (70%) shall be retained by the Company as a cancellation charge, subject to applicable law and the terms of the service agreement."),
            p("Any applicable taxes, statutory deductions, or legally required adjustments shall be deducted from the refundable amount before disbursement, where permitted by law."),
            h3("2.2.2. Cancellation After Twenty-Four (24) Hours of Project Onboarding"),
            p("Where the Client submits a change-of-mind cancellation request after the expiration of the initial twenty-four (24)-hour period, the project shall be considered non-refundable on the grounds of change of mind alone."),
            p("Accordingly, the Company shall have no contractual obligation to issue a refund solely because the Client elects to discontinue the project after the expiration of this period, subject to applicable consumer-protection laws, statutory refund rights, and the Company's obligations under the applicable service agreement."),
            h3("2.3. Commencement of the Twenty-Four (24)-Hour Period"),
            p("For the purposes of this Section, the twenty-four (24)-hour period shall commence from the official project onboarding date and time recorded or communicated by the Company."),
            p("The onboarding date and time may be established through written confirmation, an official onboarding communication, project initiation documentation, or another verifiable record maintained by the Company."),
            h3("2.4. Exceptions to Change-of-Mind Restrictions"),
            p("The provisions of this Section shall not restrict any refund entitlement arising from the Company's material breach, failure to deliver agreed services, or any other circumstance in which a refund is required by applicable law."),
        ],
    },
    {
        id: "project-onboarding-and-commencement-of-services",
        heading: "Project onboarding and commencement of services",
        blocks: [
            p("Project onboarding represents the formal commencement of the Client's project with the Company."),
            p("Depending on the nature of the engagement, onboarding may include:"),
            ul([
                "Initial project consultation and requirement assessment.",
                "Collection and review of project specifications.",
                "Assignment of project personnel or technical resources.",
                "Workflow planning and automation architecture.",
                "Technical feasibility assessments.",
                "Account and integration requirement reviews.",
                "Initial research, preparation, and development planning.",
                "Project scheduling and resource allocation.",
            ]),
            p("Once onboarding has officially commenced, the Company may begin allocating time, personnel, resources, and operational capacity to the project."),
            p("Accordingly, the applicable cancellation and refund conditions shall be determined by reference to the official onboarding date and time rather than solely by the date on which the Client made the payment."),
        ],
    },
    {
        id: "refunds-arising-from-company-related-service-failures",
        heading: "Refunds arising from company-related service failures",
        blocks: [
            p("The Company is committed to providing services in accordance with the agreed project scope, deliverables, and applicable service agreement."),
            p("A refund request arising from a Company-related service failure shall be evaluated separately from a change-of-mind cancellation."),
            p("Where the Company materially fails to perform its agreed contractual obligations, the Client may submit a written complaint or refund request for review."),
            p("Depending on the circumstances, the Company may consider:"),
            ol([
                "Correcting or resolving the identified service issue.",
                "Providing additional work necessary to fulfill the agreed scope.",
                "Extending the delivery timeline where reasonably appropriate.",
                "Issuing a partial refund for the affected portion of the services.",
                "Issuing a full refund where warranted by the circumstances or required by applicable law.",
            ]),
            p("Any refund determination shall take into account the nature of the failure, the work already completed, the applicable service agreement, and the remedies available under applicable law."),
            p("The Company shall not use the change-of-mind cancellation provisions to avoid responsibility for a material failure to deliver services as contractually agreed."),
        ],
    },
    {
        id: "non-refundable-services-and-expenses",
        heading: "Non-refundable services and expenses",
        blocks: [
            p("Subject to applicable law and any specific written agreement, the following may be considered non-refundable once incurred, purchased, or performed:"),
            h3("5.1. Completed Professional Services"),
            p("Professional services that have already been performed, including consultations, technical assessments, research, workflow planning, configuration, development, implementation, and other completed project activities."),
            h3("5.2. Third-Party Software and Subscription Costs"),
            p("Payments made to external software providers, AI platforms, hosting services, automation applications, API providers, plugins, or other third-party platforms on behalf of the Client."),
            p("These expenses may be non-refundable where the third-party provider does not permit refunds or where the applicable purchase or subscription has already been activated or consumed."),
            h3("5.3. Custom Development and Implementation"),
            p("Custom-developed automation workflows, scripts, integrations, system configurations, and other project-specific deliverables that have already been completed or substantially developed."),
            h3("5.4. External Transaction and Processing Charges"),
            p("Payment processing fees, banking charges, currency conversion costs, and other transaction-related expenses may be deducted from eligible refunds where permitted by applicable law and where such costs are non-recoverable."),
            p("The Company will not apply non-refundable classifications to amounts where a refund is legally required."),
        ],
    },
    {
        id: "project-deliverables-and-client-satisfaction",
        heading: "Project deliverables and client satisfaction",
        blocks: [
            p("Our automation services are developed according to the requirements, specifications, and objectives agreed upon with the Client."),
            p("A Client's subjective change in preference, business direction, or expectations beyond the originally agreed scope shall not automatically constitute grounds for a refund."),
            p("Similarly, a request for additional functionality, new integrations, significant modifications, or expanded deliverables shall be treated as additional work unless included in the original agreement."),
            p("Where a deliverable does not reasonably conform to the agreed specifications, the Client should notify the Company in writing so that the matter can be reviewed and, where appropriate, corrected."),
            p("The Company will make reasonable efforts to address legitimate concerns relating to the agreed deliverables."),
        ],
    },
    {
        id: "third-party-services-and-external-dependencies",
        heading: "Third-party services and external dependencies",
        blocks: [
            p("Certain automation projects depend on external technology providers, including AI platforms, CRM systems, cloud hosting services, APIs, communication tools, and third-party applications."),
            p("The availability, pricing, functionality, and refund arrangements of these services are controlled by their respective providers."),
            p("The Company cannot guarantee refunds for third-party subscriptions, software licenses, usage credits, or services that have already been purchased, activated, or consumed."),
            p("Where a third-party service becomes unavailable, changes its functionality, or discontinues an integration, the Company will assess the available alternatives and communicate any potential impact on the Client's project."),
            p("Additional development or replacement integrations may require separate approval and payment."),
            p("Nothing in this section excludes the Company's responsibility for its own contractual obligations."),
        ],
    },
    {
        id: "subscription-based-and-recurring-services",
        heading: "Subscription-based and recurring services",
        blocks: [
            p("Where the Company offers ongoing maintenance, automation management, monitoring, hosting, support, or other recurring services, the applicable subscription terms will be communicated separately."),
            p("Unless otherwise stated in a written agreement:"),
            ul([
                "Clients may request cancellation of future recurring services by providing written notice.",
                "Cancellation will generally take effect at the end of the applicable paid billing period.",
                "Payments for completed billing periods are not automatically refundable.",
                "Partial-period refunds are not guaranteed and will be considered according to the applicable agreement and law.",
                "Any outstanding fees or charges incurred before cancellation remain payable.",
            ]),
            p("Cancellation of a recurring service does not automatically cancel separate project obligations, outstanding invoices, or third-party subscriptions maintained independently by the Client."),
        ],
    },
    {
        id: "how-to-request-a-cancellation-or-refund",
        heading: "How to request a cancellation or refund",
        blocks: [
            p("All cancellation and refund requests must be submitted in writing through the Company's official communication channel."),
            p("The request should include:"),
            ul([
                "Client's full name.",
                "Registered email address or contact information.",
                "Project or invoice reference number.",
                "Date of payment.",
                "Official project onboarding date, where applicable.",
                "Reason for requesting cancellation or a refund.",
                "Relevant supporting information or documentation.",
            ]),
            p("The Company may request additional information where necessary to verify the request and assess eligibility."),
            p("A cancellation request will be considered submitted when it is received through an official communication channel and can reasonably be verified by the Company."),
            p("Verbal requests, informal discussions, or messages sent through unauthorized channels may not constitute sufficient formal notice."),
        ],
    },
    {
        id: "review-and-processing-of-refunds",
        heading: "Review and processing of refunds",
        blocks: [
            p("Upon receiving a valid refund request, the Company will review the relevant project records, payment information, onboarding date, work completed, and applicable contractual obligations."),
            p("The Client will be informed of the outcome following the review."),
            p("Where a refund is approved, it will ordinarily be processed through the original payment method, where supported by the payment provider."),
            p("Refund processing may take approximately seven (7) to fourteen (14) business days after approval, depending on the payment processor, banking institution, and transaction method."),
            p("This timeframe is an estimated processing period and does not override any shorter deadline imposed by applicable law."),
            p("The Company is not responsible for additional delays caused by banks, payment processors, or other financial institutions after a refund has been properly initiated."),
        ],
    },
    {
        id: "payment-disputes-and-chargebacks",
        heading: "Payment disputes and chargebacks",
        blocks: [
            p("Clients are encouraged to contact the Company directly before initiating a payment dispute or chargeback with their bank or payment provider."),
            p("We will make reasonable efforts to review and resolve legitimate payment concerns through direct communication."),
            p("If a payment dispute or chargeback is initiated, the Company reserves the right to provide relevant documentation to the payment processor or financial institution, including:"),
            ul([
                "Payment records and invoices.",
                "Project agreements and approved quotations.",
                "Onboarding confirmations.",
                "Project communications.",
                "Records of work performed and deliverables supplied.",
                "Evidence of the Client's approval or authorization.",
            ]),
            p("Submitting a chargeback does not automatically establish entitlement to a refund."),
            p("Nothing in this section limits a Client's lawful right to dispute an unauthorized or incorrectly processed transaction."),
        ],
    },
    {
        id: "fraudulent-or-unauthorized-transactions",
        heading: "Fraudulent or unauthorized transactions",
        blocks: [
            p("If the Company identifies reasonable evidence of fraudulent payments, unauthorized transactions, misuse of payment methods, or deliberate misrepresentation, it may suspend the relevant services while the matter is investigated."),
            p("Where necessary, the Company may cooperate with payment processors, financial institutions, and relevant authorities."),
            p("Refunds involving unauthorized or fraudulent transactions will be handled in accordance with applicable law and the relevant payment provider's procedures."),
        ],
    },
    {
        id: "cancellation-by-the-company",
        heading: "Cancellation by the company",
        blocks: [
            p("The Company reserves the right to discontinue or terminate a project under circumstances including:"),
            ul([
                "The Client's material breach of the service agreement.",
                "Failure to provide essential information or resources required to proceed.",
                "Repeated nonpayment or failure to meet agreed financial obligations.",
                "Requests involving unlawful, fraudulent, or prohibited activities.",
                "Circumstances that make the agreed services technically or legally impracticable.",
            ]),
            p("Where the Company terminates a project for reasons attributable to the Client's breach or failure to fulfill contractual responsibilities, outstanding payments and any applicable cancellation charges will be assessed according to the service agreement and applicable law."),
            p("Where the Company voluntarily discontinues a project without a contractual basis attributable to the Client, the Company will assess the unperformed portion of the agreed services and provide any refund or other remedy required under the service agreement or applicable law."),
        ],
    },
    {
        id: "policy-exceptions-and-legal-rights",
        heading: "Policy exceptions and legal rights",
        blocks: [
            p("The Company recognizes that certain jurisdictions provide mandatory consumer protection, cancellation, and refund rights."),
            p("Nothing in this Policy is intended to exclude, restrict, or override any statutory rights or remedies that cannot legally be waived or limited."),
            p("Where applicable law provides a Client with a greater refund entitlement or a mandatory cancellation right, the relevant legal requirement shall prevail over any conflicting provision of this Policy."),
            p("The Company may also consider exceptional circumstances on a case-by-case basis where appropriate."),
            p("Any discretionary exception granted in one instance shall not automatically establish an entitlement to the same exception in future cases."),
        ],
    },
    {
        id: "amendments-to-this-policy",
        heading: "Amendments to this policy",
        blocks: [
            p("The Company reserves the right to revise, update, or modify this Refund and Cancellation Policy from time to time to reflect changes in its business operations, service offerings, payment procedures, or applicable legal requirements."),
            p("Any revised version will be published on the Company's website with an updated effective date."),
            p("Changes will not retroactively eliminate refund rights or contractual obligations that have already accrued."),
            p("Clients are encouraged to review this Policy periodically."),
        ],
    },
    {
        id: "contact-information",
        heading: "Contact information",
        blocks: [
            p("For questions, cancellation requests, refund inquiries, or concerns regarding this Policy, please contact the Company through its official website or designated business communication channel."),
            details([
                "Business Name: AMZ Automation Solutions",
                "Website: https://amzautomationsolutions.com",
                "Email: support@amzautomationsolutions.com",
            ]),
            p("All refund and cancellation requests should include the relevant project or invoice reference to facilitate review."),
        ],
    },
];

const RefundPolicy = () => (
    <LegalPage
        title="Refund & Cancellation Policy"
        updated="October 31, 2026"
        intro="When cancellations and refunds apply, what is non-refundable, and how to submit a request."
        sections={SECTIONS}
    />
);

export default RefundPolicy;