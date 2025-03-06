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
    <main className="flex-1 flex flex-col relative">
      <Header dict={dict} />
      <article className="max-w-4xl prose text-gray-500 mx-auto">
        <h2>Privacy Policy</h2>
        <p>
          <br />
        </p>
        <h3>Introduction</h3>
        <p>
          Jan de Belastingman attaches great importance to the careful handling
          of your personal data (data that can be traced back to a natural
          person). Personal data is therefore carefully processed and secured by
          us, in accordance with the requirements set out in the General Data
          Protection Regulation (the AVG).
          <br />
          <br />
          In this privacy policy we explain which personal data we collect and
          what we do with it. Please therefore read this privacy policy
          carefully.
          <br />
          <br />
          This privacy policy is not an agreement and we may update this privacy
          policy.
          <br />
          <br />
        </p>
        <h3>What personal data do we collect?</h3>
        <p>
          Jan de Belastingman collects the following (categories of) personal
          data: name, address, gender, address, telephone number, e-mail
          address. In addition, data is collected that is important to provide
          our advice, such as dates and data from annual statements, expenses
          and deductions, and the chat conversations you have with Jan de
          Belastingman.
          <br />
          <br />
        </p>
        <h3>What do we use your personal data for?</h3>
        <p>
          We use the personal data we collect primarily to provide you with
          appropriate tax advice. In addition, we may use your data for
          commercial and marketing purposes such as promotional purposes
          (personalized advertising and direct marketing) and profiling purposes
          (combining data).
          <br />
          <br />
        </p>
        <h2>Basis</h2>
        <p>We base the processing of your data on the following bases:</p>
        <h3>Carrying out the agreement.</h3>
        <p>
          We use your personal data to be able to give performance to you to
          provide you with advice.
        </p>
        <h3>Legitimate interests.</h3>
        <p>
          The collection and use of data is necessary to fulfil commercial
          interests, such as offering products or services that may be of
          interest to you.
        </p>
        <h3>Consent.</h3>
        <p>
          Before you ask us to provide you with advice via our website and
          website, you give us permission to use your personal data in
          accordance with this privacy policy. You are always free to refuse or
          withdraw your consent. In that case it will not be possible to give
          effect to your request for advice.
        </p>
        <h3>
          Is it obligatory to provide personal data to Jan de Belastingman?
        </h3>
        <p>
          Obviously you are not obliged to provide us with personal data or to
          answer questions. However, it is true that we will not be able to help
          you or provide you with tax advice.
        </p>
        <h3>Who receives your personal data?</h3>
        <p>
          Jan de Belastingman may share the personal data you provide with third
          parties for commercial and promotional purposes.
        </p>
        <p>
          Jan de Belastingman also uses third parties to perform its services,
          such as cloud providers.
        </p>
        <p>
          Your data will not be passed on to third parties outside the European
          Union.
        </p>
        <h3>Automated data collection</h3>
        <p>
          We use cookies when offering our services. A cookie is a simple small
          file that is sent with pages of our website and stored on your
          computer&apos;s hard drive. Among other things, this enables us to
          combine different requests for pages from the website and to analyze
          user behavior.
        </p>
        <p>
          Through our website, cookies are also placed by the U.S. company
          Google, as part of the &quot;Google Analytics&quot; service. We use
          this service to track and receive reports on how visitors use the
          website. Google may provide this information to third parties if
          Google is legally required to do so, or insofar as third parties
          process the information on Google&apos;s behalf.
        </p>
        <p>
          <br />
        </p>
        <h2>What are your rights?</h2>
        <p>
          <br />
        </p>
        <p>
          You have the following rights regarding our processing of your
          personal data:
        </p>
        <ul>
          <li>the right to access the processing of your personal data;</li>
          <li>the right to have that data corrected and/or deleted;</li>
          <li>
            the right to object to the use of data for marketing purposes;
          </li>
          <li>
            the right to object to further processing of your personal data;
          </li>
          <li>
            furthermore, you can request us to transfer your data to another
            party.
          </li>
        </ul>
        <p>
          <br />
        </p>
        <h3>Some of these rights can only be exercised in certain cases.</h3>
        <p>
          We always keep your data as long as necessary for the purposes for
          which the data are processed. We also need to keep your data for the
          purpose of file and duty of care and the position of proof and further
          to comply with laws and regulations. After expiration of the retention
          periods, we will delete your data.
        </p>
        <h3>Security of your data</h3>
        <p>
          Jan de Belastingman strives to protect the personal data it processes
          as well as possible. We therefore take appropriate security measures
          to ensure the safety of your data. If nevertheless a data breach
          should occur, we will deal with it in accordance with the requirements
          of the AVG.
        </p>
        <p>
          <br />
        </p>
        <h2>Contact</h2>
        <p>Jan de Belastingman is a trade name of BDH Solutions.</p>
        <p>
          If you have any questions or comments, or wish to exercise your rights
          described in this privacy statement, please contact us:
        </p>
        <p>Jan de Belastingman</p>
        <p>Tim Gast</p>
        <p>Weena 690</p>
        <p>Help@jandebelastingman.nl</p>
        <h3>Personal Data Authority</h3>
        <p>
          If you have complaints about the processing of your personal data by
          Jan de Belastingman, of course we would like to hear from you.
          Together we will try to find a solution.
        </p>
        <p>
          You also have the right to file a complaint with the Dutch supervisory
          authority, the Authority for Personal Data.
        </p>
      </article>
      <Footer dict={dict} />
    </main>
  );
}