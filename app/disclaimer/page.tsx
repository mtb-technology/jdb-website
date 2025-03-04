import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getDictionary } from "../dictionaries";


export default async function DisclaimerPage() {
    const dict = await getDictionary('nl');
    return (
    <main className="flex-1 flex flex-col relative">
        <Header />
        <article className="max-w-4xl prose text-gray-500 mx-auto">
            <h2>DISCLAIMER</h2>
            <p>
                Although the content of this website has been compiled with care, jandebelastingman.nl cannot guarantee the accuracy or completeness of the given (legal) information. Jandebelastingman.nl accepts no liability for any damages, of whatever nature, arising in any way from the use of the website and chatbot, including actions, omissions and / or decisions based on such information, as well as the (temporary) inability to use the website.
                <br /><br />
                Jandebelastingman.nl accepts no liability for direct or indirect damage caused by the content of the information on the website and chatbot.
                <br /><br />
                The information on these web pages and in the chatbot may contain technical or typographical errors. This information may be changed or expanded at any time without prior warning. Jandebelastingman.nl is in no way responsible for other web pages that link to the jandebelastingman.nl website.
                <br /><br />
                The content of this website is checked as much as possible for its content and topicality. If errors or inaccuracies would be published we can not be held responsible. The information that the visitor of our website reads can only be used at his own risk and responsibility.
            </p>
        </article>
        <Footer dict={dict} />
    </main>
    );
  }


