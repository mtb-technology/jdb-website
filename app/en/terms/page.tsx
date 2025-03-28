import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { generatePageMetadata } from "@/lib/metadata";
import { SupportedLocale } from "@/lib/types";
import { Metadata } from "next";
import { getDictionary } from "../../dictionaries";

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

export default async function TermsPage({ params, searchParams }: PageProps) {
  const [resolvedParams] = await Promise.all([params]);
  const dict = await getDictionary("en");

  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header dict={dict} />
      <div className="flex-1 overflow-y-auto">
        <article className="max-w-4xl prose text-gray-500 mx-auto px-6 py-12">
          <h1>Terms of Use</h1>
          <p className="text-sm">Last updated: March, 2025</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to Jan de Belastingman, a trade name of MTB Technology B.V. (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using our website, chatbot, and related services (collectively, the &ldquo;Services&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use (&ldquo;Terms&rdquo;). If you do not agree, you should refrain from using our Services.
          </p>

          <h2>2. Services Description</h2>
          <h3>2.1 AI-Based Assistance</h3>
          <p>
            Our AI agent and website may offer automated, AI-generated responses to tax or financial inquiries. These AI responses are for informational purposes only and do not constitute official tax, legal, or financial advice. No rights can be derived from such AI-generated information, and we do not warrant its completeness or accuracy.
          </p>

          <h3>2.2 Referral to Third-Party Advisors</h3>
          <p>
            We may forward your inquiries or provide links to third-party tax advisors or professionals (&ldquo;Advisors&rdquo;). While we strive to connect you with reputable Advisors, we do not endorse or guarantee their services. Any arrangement, contract, or communication between you and these Advisors is strictly between you and them.
          </p>

          <h2>3. Disclaimer of Liability</h2>
          <h3>3.1 No Legal or Financial Advice</h3>
          <p>
            The information provided through our Services&mdash;whether generated by AI, compiled by us, or provided by third-party Advisors&mdash;should not be construed as a substitute for professional advice. You remain solely responsible for your decisions and actions.
          </p>

          <h3>3.2 Third-Party Advisors</h3>
          <p>
            Even if you pay us directly for access to or use of our Services, any final advice or service you receive from an Advisor is the sole responsibility of that Advisor. We are not a party to the agreement between you and the Advisor and shall have no liability for any actions, omissions, or outcomes resulting from the Advisor&apos;s services.
          </p>

          <h3>3.3 General Liability Exclusion</h3>
          <p>
            To the fullest extent permitted by law, we disclaim all liability for any direct, indirect, incidental, consequential, or special damages arising out of or in any way related to:
          </p>
          <ul>
            <li>Your use of (or inability to use) our AI-based chatbot.</li>
            <li>Reliance on any AI-generated content or other information provided via our Services.</li>
            <li>Actions or omissions by any third-party Advisors to whom you were introduced or referred.</li>
            <li>Any errors or inaccuracies in our Services, or temporary unavailability of the Services.</li>
          </ul>

          <h3>3.4 No Guarantees</h3>
          <p>
            We do not guarantee that the Services will be uninterrupted, error-free, or secure. You acknowledge that use of our Services is at your own risk.
          </p>

          <h2>4. User Obligations</h2>
          <h3>4.1 Accurate Information</h3>
          <p>
            When you interact with our chatbot or advisors, you agree to provide accurate, complete, and up-to-date information. We are not responsible for the consequences of any inaccurate or incomplete information you provide.
          </p>

          <h3>4.2 Lawful Use</h3>
          <p>
            You agree not to use the Services for any unlawful or prohibited activities, including but not limited to violating intellectual property rights, transmitting harmful software, or engaging in fraudulent behavior.
          </p>

          <h2>5. Intellectual Property</h2>
          <h3>5.1 Ownership</h3>
          <p>
            All content, features, and functionality of the Services (including but not limited to text, graphics, logos, icons, images, and software) is owned by or licensed to us, unless otherwise noted.
          </p>

          <h3>5.2 Limited License</h3>
          <p>
            We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your personal or internal business use. You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any part of the Services without our prior written permission.
          </p>

          <h2>6. Third-Party Links and Content</h2>
          <h3>6.1 Links</h3>
          <p>
            Our Services may include links to third-party websites or resources. We have no control over these sites and are not responsible for their content or availability. Accessing linked websites is at your own risk.
          </p>

          <h3>6.2 No Endorsement</h3>
          <p>
            The inclusion of any link does not imply endorsement by us. We disclaim all liability for any damages resulting from the use of such third-party resources.
          </p>

          <h2>7. Modifications to the Services and Terms</h2>
          <h3>7.1 Service Changes</h3>
          <p>
            We reserve the right to modify, suspend, or discontinue any part of the Services, temporarily or permanently, with or without notice.
          </p>

          <h3>7.2 Term Changes</h3>
          <p>
            We may update or revise these Terms at any time. Changes become effective upon posting the updated Terms. If you continue to use the Services after changes are posted, you accept the revised Terms.
          </p>

          <h2>8. Governing Law and Dispute Resolution</h2>
          <h3>8.1 Governing Law</h3>
          <p>
            These Terms and any dispute arising out of or related to them shall be governed by and construed in accordance with the laws of The Netherlands, without regard to its conflict of law provisions.
          </p>

          <h3>8.2 Jurisdiction</h3>
          <p>
            All disputes arising out of or relating to these Terms shall be submitted to the exclusive jurisdiction of the competent courts in Amsterdam, The Netherlands, unless otherwise required by applicable law.
          </p>

          <h2>9. Limitation of Liability</h2>
          <h3>9.1 Maximum Liability</h3>
          <p>
            To the extent not prohibited by law, our total cumulative liability to you for any claims arising out of or relating to the use of our Services is limited to the total amount (if any) you paid to us for the specific Services giving rise to the claim in the 12 months preceding the event.
          </p>

          <h3>9.2 Exceptions</h3>
          <p>
            Some jurisdictions do not allow certain liability exclusions or limitations. In such jurisdictions, our liability shall be limited to the greatest extent permitted by law.
          </p>

          <h2>10. Severability</h2>
          <p>
            If any provision of these Terms is held by a court of competent jurisdiction to be unenforceable, that provision shall be enforced to the maximum extent permissible, and the remaining provisions shall remain in full force and effect.
          </p>

          <h2>11. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy and any additional legal notices or agreements published by us on the Services, constitute the entire agreement between you and us regarding the use of our Services and supersede all prior agreements, whether written or oral.
          </p>

          <h2>12. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us:</p>
          <ul>
            <li>Email: info@jandebelastingman.nl</li>
            <li>Address: De Lairessestraat 151, 1075 HK Amsterdam, The Netherlands</li>
          </ul>
        </article>
      </div>
      <Footer dict={dict} />
    </main>
  );
}
