import { getDictionary } from '@/app/dictionaries';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { generatePageMetadata } from '@/lib/metadata';
import { SupportedLocale } from "@/lib/types";
import { Metadata } from "next";

type PageParams = Promise<{
  locale: SupportedLocale;
}>;

type PageProps = {
  params: PageParams;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const resolvedParams = await params;
  return generatePageMetadata({
    params: { ...resolvedParams, locale: "en" },
  });
};

export default async function LocalizedPrivacyPage({
  params,
  searchParams,
}: PageProps) {
  const [resolvedParams] = await Promise.all([params]);
  const dict = await getDictionary("en");
  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header dict={dict} />
      <div className="flex-1 overflow-y-auto">
        <article className="max-w-4xl prose text-gray-500 mx-auto px-6 py-12">
          <h1>Privacy Policy</h1>
          <p className="text-sm">Last updated: March, 2025</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to Jan de Belastingman, a trade name of MTB Technology B.V. (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, share, and protect your information when you use our services, including our website, AI-based chat functionality, and when we forward your inquiries to human advisors.
          </p>
          <p>
            By using our services, you agree to the collection and use of information in accordance with this Privacy Policy. We may update this policy from time to time; we encourage you to review it periodically.
          </p>

          <h2>2. Who We Are</h2>
          <ul>
            <li>Name: Jan de Belastingman (a trade name of MTB Technology B.V.)</li>
            <li>Chamber of Commerce (KvK): 96211350</li>
            <li>Establishment Number: 000061552631</li>
            <li>Registered Address: De Lairessestraat 151, 1075 HK Amsterdam, The Netherlands</li>
            <li>Email: info@jandebelastingman.nl</li>
          </ul>
          <p>
            MTB Technology B.V. develops, implements, and manages software and automation solutions, including platforms that provide automated and human-assisted tax advice.
          </p>

          <h2>3. What Personal Data Do We Collect?</h2>
          <p>We may collect and process the following categories of personal data:</p>
          <ol>
            <li>Identification & Contact Details: name, address, gender, phone number, email address.</li>
            <li>Financial & Tax Information: data from annual statements, expenses, deductions, or other relevant information to provide tax advice.</li>
            <li>Communication Data: chat logs, email correspondence, or any other information you share with us.</li>
            <li>Technical Data: IP address, browser type, operating system, and other technical information collected through cookies and similar technologies (see "Cookies" below).</li>
          </ol>
          <p>
            You are responsible for ensuring the accuracy of the personal data you submit and for not sharing more personal or sensitive information than necessary.
          </p>

          <h2>4. How We Use Your Personal Data</h2>
          <p>We process your personal data for the following purposes:</p>
          <ol>
            <li>
              <strong>Tax Advice & Services</strong>
              <ul>
                <li>To provide tax advice, either automatically (via our AI-based system) or by forwarding your inquiry to a qualified advisor.</li>
              </ul>
            </li>
            <li>
              <strong>AI-Based Responses</strong>
              <ul>
                <li>To generate automated answers using our AI system, which analyzes the information you provide. Please note that AI-generated responses may not always be accurate or comprehensive, and they do not constitute official legal or financial advice.</li>
              </ul>
            </li>
            <li>
              <strong>Forwarding to Advisors</strong>
              <ul>
                <li>If necessary or upon request, we may forward your inquiries, along with your relevant personal data, to our network of human advisors for more detailed or specialized assistance.</li>
              </ul>
            </li>
            <li>
              <strong>Marketing & Communications</strong>
              <ul>
                <li>To send you personalized marketing communications if you have consented to receive them (e.g., newsletters, promotions, or updates about our services).</li>
              </ul>
            </li>
            <li>
              <strong>Profiling & Analytics</strong>
              <ul>
                <li>To analyze how you interact with our platform, improve user experience, and tailor our services to your needs.</li>
              </ul>
            </li>
          </ol>

          <h2>5. Legal Basis for Processing</h2>
          <p>We process your personal data under one or more of the following legal bases:</p>
          <ol>
            <li>
              <strong>Performance of a Contract</strong>
              <ul>
                <li>We need your information to provide you with our tax advice services.</li>
              </ul>
            </li>
            <li>
              <strong>Legitimate Interests</strong>
              <ul>
                <li>We may process certain data to enhance user experience, improve our platform, or offer relevant services that may be of interest to you.</li>
              </ul>
            </li>
            <li>
              <strong>Consent</strong>
              <ul>
                <li>Where required by law, we will obtain your consent before processing your personal data (e.g., for direct marketing or AI-based assistance). You can withdraw your consent at any time.</li>
              </ul>
            </li>
          </ol>

          <h2>6. Use of AI and Automated Decision-Making</h2>
          <p>
            We use AI-based tools to provide automated responses to your tax-related inquiries. While we strive to ensure the quality of these automated responses, we do not guarantee their accuracy or completeness. Automated responses should be considered informational only and not a substitute for professional advice. We encourage you to verify the information or consult a qualified professional for complex or high-stakes tax matters.
          </p>

          <h2>7. Is It Mandatory to Provide Personal Data?</h2>
          <p>
            You are not legally obligated to provide us with personal data. However, if you choose not to provide certain information, we may be unable to offer our services effectively, such as delivering relevant tax advice or forwarding inquiries to the correct advisor.
          </p>

          <h2>8. Sharing Your Personal Data</h2>
          <ol>
            <li>
              <strong>Third-Party Advisors</strong>
              <ul>
                <li>We may share your data with our network of tax advisors to provide specialized assistance.</li>
              </ul>
            </li>
            <li>
              <strong>Service Providers</strong>
              <ul>
                <li>We use trusted third-party service providers (e.g., cloud hosting, AI service providers, analytics) to help us operate and improve our platform. These providers process your data strictly on our behalf and under confidentiality agreements.</li>
              </ul>
            </li>
            <li>
              <strong>Legal Requirements</strong>
              <ul>
                <li>We may disclose your data if required by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
              </ul>
            </li>
            <li>
              <strong>Transfers Outside the EU</strong>
              <ul>
                <li>In principle, we do not transfer your personal data outside the European Economic Area (EEA). However, certain service providers (e.g., Google Analytics) may process data in the United States or other jurisdictions. Where such transfers occur, we ensure an adequate level of data protection in line with the GDPR (e.g., via Standard Contractual Clauses).</li>
              </ul>
            </li>
          </ol>

          <h2>9. Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar technologies to improve our services, analyze usage, and remember your preferences. A cookie is a small file placed on your device when you visit our website. You may refuse cookies in your browser settings, although this may affect the functionality of our website.
          </p>
          <p>
            We also use third-party tools such as Google Analytics to understand how our website is used. Google may store this information in the United States or other locations. We take steps to ensure these transfers comply with data protection laws.
          </p>

          <h2>10. Retention of Your Data</h2>
          <p>
            We will retain your personal data only as long as necessary to fulfill the purposes for which it was collected, comply with our legal obligations (e.g., tax and accounting requirements), resolve disputes, and enforce our agreements. We regularly review our retention periods to ensure we are not keeping data longer than necessary.
          </p>

          <h2>11. Your Rights</h2>
          <p>Under the General Data Protection Regulation (GDPR), you have certain rights regarding your personal data, including:</p>
          <ol>
            <li>Right of Access &ndash; to request a copy of your personal data.</li>
            <li>Right to Rectification &ndash; to ask us to correct any inaccurate or incomplete data.</li>
            <li>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;) &ndash; to request deletion of your personal data under certain circumstances.</li>
            <li>Right to Object &ndash; to object to certain processing activities (e.g., direct marketing).</li>
            <li>Right to Restrict Processing &ndash; to request limitation of data processing in specific situations.</li>
            <li>Right to Data Portability &ndash; to receive your personal data in a structured, commonly used, and machine-readable format and transfer it to another organization where technically feasible.</li>
          </ol>
          <p>
            To exercise any of these rights, please contact us at help@jandebelastingman.nl. We will respond to your request within the timeframe mandated by applicable law.
          </p>

          <h2>12. Security Measures</h2>
          <p>
            We take appropriate technical and organizational measures to safeguard your personal data from loss, unauthorized access, disclosure, alteration, or destruction. These include, for example, encryption of data in transit (HTTPS), access controls, and regular security assessments.
          </p>
          <p>
            In the event of a security incident or data breach that poses a high risk to your rights and freedoms, we have an internal incident response procedure in place. We will notify the relevant supervisory authority (e.g., the Dutch Data Protection Authority) within 72 hours if required by law and inform you promptly if there is a significant risk to your personal data.
          </p>

          <h2>13. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, our data practices, or if you wish to exercise any of your rights, please contact us:</p>
          <p>
            Jan de Belastingman (MTB Technology B.V.)<br />
            Email: info@jandebelastingman.nl<br />
            Address: De Lairessestraat 151, 1075 HK Amsterdam, The Netherlands
          </p>

          <h2>14. Complaints</h2>
          <p>
            If you believe we have not acted in accordance with applicable data protection laws, we encourage you to contact us first so we can address your concerns. You also have the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) or your local supervisory authority.
          </p>

          <h2>Disclaimer:</h2>
          <ul>
            <li>AI Responses: Any automated (AI-generated) response provided through our service is for informational purposes only and not official tax or legal advice.</li>
            <li>Professional Verification: For complex queries or definitive advice, we recommend consulting a qualified professional.</li>
          </ul>
        </article>
      </div>
      <Footer dict={dict} />
    </main>
  );
}