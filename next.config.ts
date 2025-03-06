import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'jandebelastingman.nl'
    ],
  },
  async redirects() {
    const redirects = [
      // // Home redirects
      // { source: '/home', destination: '/', permanent: true },
      // { source: '/en/home', destination: '/en', permanent: true },
      
      // // How it works
      // { source: '/hoe-werkt-het', destination: '/hoe-werkt-het', permanent: true },
      // { source: '/en/how-it-works', destination: '/en/how-it-works', permanent: true },
      
      // // Topics
      // { source: '/onderwerpen', destination: '/onderwerpen', permanent: true },
      // { source: '/en/topics', destination: '/en/topics', permanent: true },
      
      // Tax advisor
      { source: '/belastingaangifte-laten-doen', destination: '/onderwerpen/belastingaangifte-laten-doen', permanent: true },
      { source: '/en/tax-advisor', destination: '/en/topics/tax-advisor', permanent: true },
      
      // Income tax return
      { source: '/belastingaangifte', destination: '/onderwerpen/belastingaangifte', permanent: true },
      { source: '/en/income-tax-return', destination: '/en/topics/income-tax-return', permanent: true },
      
      // M form
      { source: '/m-form', destination: '/onderwerpen/m-form', permanent: true },
      { source: '/en/m-form', destination: '/en/topics/m-form', permanent: true },
      
      // Tax credit
      { source: '/aftrekposten-en-kortingen', destination: '/onderwerpen/aftrekposten-en-kortingen', permanent: true },
      { source: '/en/tax-credit', destination: '/en/topics/tax-credit', permanent: true },
      
      // Inheritance tax
      { source: '/erfbelasting', destination: '/onderwerpen/erfbelasting', permanent: true },
      { source: '/en/inheritance-tax', destination: '/en/topics/inheritance-tax', permanent: true },
      
      // Private limited company
      { source: '/besloten-vennootschap', destination: '/onderwerpen/besloten-vennootschap', permanent: true },
      { source: '/en/private-limited-company', destination: '/en/topics/private-limited-company', permanent: true },
      { source: '/en/private-limited-companies', destination: '/en/topics/private-limited-company', permanent: true },
      
      // Self employed professional
      { source: '/zelfstandigen-zonder-personeel', destination: '/onderwerpen/zelfstandigen-zonder-personeel', permanent: true },
      { source: '/en/self-employed-professional', destination: '/en/topics/self-employed-professional', permanent: true },
      { source: '/en/self-employed-professionals', destination: '/en/topics/self-employed-professional', permanent: true },

      // Healthcare allowance
      { source: '/zorgtoeslag', destination: '/onderwerpen/zorgtoeslag', permanent: true },
      { source: '/en/healthcare-allowance', destination: '/en/topics/healthcare-allowance', permanent: true },
      
      // Housing allowance
      { source: '/huurtoeslag', destination: '/onderwerpen/huurtoeslag', permanent: true },
      { source: '/en/housing-allowance', destination: '/en/housing-allowance', permanent: true },
      
      // Childcare allowance
      { source: '/kinderopvangtoeslag', destination: '/onderwerpen/kinderopvangtoeslag', permanent: true },
      { source: '/en/childcare-allowance', destination: '/en/topics/childcare-allowance', permanent: true },
      
      // Child benefit
      { source: '/kinderbijslag', destination: '/onderwerpen/kinderbijslag', permanent: true },
      { source: '/en/child-benefit', destination: '/en/topics/child-benefit', permanent: true },
      
      // AOW pension
      { source: '/aow-pensioen', destination: '/onderwerpen/aow-pensioen', permanent: true },
      { source: '/en/aow-pension', destination: '/en/topics/aow-pension', permanent: true }, 
      { source: '/en/aow-pension-en', destination: '/en/topics/aow-pension', permanent: true },
      
      // Income AOW pension
      { source: '/inkomen-aow-pensioen', destination: '/onderwerpen/inkomen-aow-pensioen', permanent: true },
      { source: '/en/income-aow-pension', destination: '/en/topics/income-aow-pension', permanent: true },
      
      // // Blog
      // { source: '/blog', destination: '/blog', permanent: true },
      // { source: '/en/blog', destination: '/en/blog', permanent: true },
      
      // // About us
      // { source: '/over-ons', destination: '/over-ons', permanent: true },
      // { source: '/en/about-us', destination: '/en/about-us', permanent: true },
      
      // // Find advisor
      // { source: '/vind-een-adviseur', destination: '/vind-een-adviseur', permanent: true },
      // { source: '/en/find-advisor', destination: '/en/find-advisor', permanent: true },

      // // Privacy and disclaimer
      // { source: '/privacy', destination: '/privacy', permanent: true },
      // { source: '/en/privacy', destination: '/en/privacy', permanent: true },
      // { source: '/disclaimer', destination: '/disclaimer', permanent: true },
      // { source: '/en/disclaimer', destination: '/en/disclaimer', permanent: true },

      // Chats
      { source: '/aangifte-inkomstenbelasting', destination: '/chat/belastingaangifte', permanent: true },
      { source: '/en/income-tax-return', destination: '/en/chat/income-tax-return', permanent: true },
      { source: '/besloten-vennootschap-hulp', destination: '/chat/besloten-vennootschap', permanent: true },
      { source: '/en/besloten-vennootschap-assist', destination: '/en/chat/private-limited-company', permanent: true },  //check
      { source: '/ondernemers-zzp', destination: '/chat/ondernemer', permanent: true },
      { source: '/en/entrepreneurs-self-employed', destination: '/en/chat/entrepreneur', permanent: true },
      { source: '/m-form', destination: '/chat/m-form', permanent: true },
      { source: '/en/m-form-assistant', destination: '/en/chat/m-form', permanent: true },
      { source: '/belastingaangifte-checklist', destination: '/chat/belastingaangifte-checklist', permanent: true },
      { source: '/en/tax-return-checklist', destination: '/en/chat/tax-return-checklist', permanent: true },
      { source: '/kindertoeslag', destination: '/chat/kindertoeslag', permanent: true },
      { source: '/en/child-benefit-assistent', destination: '/en/chat/child-benefit', permanent: true },
      { source: '/algemene-vragen', destination: '/chat/algemene-vragen', permanent: true },
      { source: '/en/general-questions', destination: '/en/chat/general-questions', permanent: true },
      { source: '/algemene-ouderdomswe-chat', destination: '/chat/algemene-ouderdomswet', permanent: true },
      { source: '/en/general-old-age-act', destination: '/en/chat/general-old-age-act', permanent: true },
      { source: '/zorgtoeslag-chat', destination: '/chat/zorgtoeslag', permanent: true },
      { source: '/en/health-care-allowance', destination: '/en/chat/healthcare-allowance', permanent: true },
      { source: '/belastingchat', destination: '/chat/belasting', permanent: true },
      { source: '/en/belastingchat', destination: '/en/chat/tax', permanent: true },
      
    
      // // Saas related
      // { source: '/saas', destination: '/saas', permanent: true },
      // { source: '/en/saas', destination: '/en/saas', permanent: true },
      // { source: '/saas/login', destination: '/saas/login', permanent: true },
      // { source: '/saas/register', destination: '/saas/register', permanent: true },
      // { source: '/saas/password-reset/request', destination: '/saas/password-reset/request', permanent: true },

      // Dutch blog posts
      { source: '/child-benefit-2023-all-you-need-to-know', destination: '/blog/child-benefit-2023-all-you-need-to-know', permanent: true },
      { source: '/tax-return-2022-important-things-to-know', destination: '/blog/tax-return-2022-important-things-to-know', permanent: true },
      { source: '/what-to-arrange-financially-when-you-are-pregnant-and-have-a-child', destination: '/blog/what-to-arrange-financially-when-you-are-pregnant-and-have-a-child', permanent: true },
      { source: '/coffee-sticky-bun-culture-tax-and-excise-taxes', destination: '/blog/coffee-sticky-bun-culture-tax-and-excise-taxes', permanent: true },
      { source: '/introduction-who-is-jan-de-belastigman', destination: '/blog/introduction-who-is-jan-de-belastigman', permanent: true },
      { source: '/jan-de-belastingman-vs-de-belastingadviseur', destination: '/blog/jan-de-belastingman-vs-de-belastingadviseur', permanent: true },
      { source: '/a-dive-into-the-deep-end-the-thinking-behind-the-tax-return', destination: '/blog/a-dive-into-the-deep-end-the-thinking-behind-the-tax-return', permanent: true },
      { source: '/a-philosophical-look-at-why-we-actually-pay-taxes-lynn-bijlsma-explains', destination: '/blog/a-philosophical-look-at-why-we-actually-pay-taxes-lynn-bijlsma-explains', permanent: true },
      { source: '/from-japanese-surrogate-mothers-to-ronaldos-transfer-to-juventus-taxes-are-everywhere', destination: '/blog/from-japanese-surrogate-mothers-to-ronaldos-transfer-to-juventus-taxes-are-everywhere', permanent: true },
      { source: '/belasting-eigen-bedrijf', destination: '/blog/belasting-eigen-bedrijf', permanent: true },
      { source: '/good-money-resolutions-for-2021-danique-van-der-molen-explains', destination: '/blog/good-money-resolutions-for-2021-danique-van-der-molen-explains', permanent: true },
      { source: '/am-i-entitled-to-care-benefit', destination: '/blog/am-i-entitled-to-care-benefit', permanent: true },
      { source: '/top-7-crazy-taxes-part-i-even-jan-de-belastingman-is-amazed-by-this', destination: '/blog/top-7-crazy-taxes-part-i-even-jan-de-belastingman-is-amazed-by-this', permanent: true },
      { source: '/not-paying-taxes-on-your-wages-ruben-scherpenisse-explains', destination: '/blog/not-paying-taxes-on-your-wages-ruben-scherpenisse-explains', permanent: true },
      { source: '/saving-money-and-money-as-a-student-lynn-bijlsma-gives-5-tips', destination: '/blog/saving-money-and-money-as-a-student-lynn-bijlsma-gives-5-tips', permanent: true },
      { source: '/de-moderne-geschiedenis-van-de-nederlandse-belasting', destination: '/blog/de-moderne-geschiedenis-van-de-nederlandse-belasting', permanent: true },
      { source: '/income-tax-in-2021-what-will-change-for-you', destination: '/blog/income-tax-in-2021-what-will-change-for-you', permanent: true },
      { source: '/de-geschiedenis-van-de-nederlandse-belasting', destination: '/blog/de-geschiedenis-van-de-nederlandse-belasting', permanent: true },
      { source: '/top-4-most-common-tax-return-mistakes', destination: '/blog/top-4-most-common-tax-return-mistakes', permanent: true },
      { source: '/vraagt-u-zich-af-hoe-u-uw-inkomstenbelastingaangifte-leuker-kunt-maken', destination: '/blog/vraagt-u-zich-af-hoe-u-uw-inkomstenbelastingaangifte-leuker-kunt-maken', permanent: true },
      { source: '/wanneer-belastingaangifte-doen-rik-brem-masterstudent-fiscaal-recht-legt-uit', destination: '/blog/wanneer-belastingaangifte-doen-rik-brem-masterstudent-fiscaal-recht-legt-uit', permanent: true },
      { source: '/vacation-days-what-about-it-jan-de-belastingman-stays-home', destination: '/blog/vacation-days-what-about-it-jan-de-belastingman-stays-home', permanent: true },
      { source: '/jan-de-belastingman-website-2-0', destination: '/blog/jan-de-belastingman-website-2-0', permanent: true },

      // English blog posts
      { source: '/en/what-to-arrange-financially-when-you-are-pregnant-and-have-a-child', destination: '/en/blog/what-to-arrange-financially-when-you-are-pregnant-and-have-a-child', permanent: true },
      { source: '/en/child-benefit-2023-all-you-need-to-know', destination: '/en/blog/child-benefit-2023-all-you-need-to-know', permanent: true },
      { source: '/en/tax-return-2022-important-things-to-know', destination: '/en/blog/tax-return-2022-important-things-to-know', permanent: true },
      { source: '/en/a-dive-into-the-deep-end-the-thinking-behind-the-tax-return', destination: '/en/blog/a-dive-into-the-deep-end-the-thinking-behind-the-tax-return', permanent: true },
      { source: '/en/jan-de-belastingman-vs-de-belastingadviseur', destination: '/en/blog/jan-de-belastingman-vs-de-belastingadviseur', permanent: true },
      { source: '/en/a-philosophical-look-at-why-we-actually-pay-taxes-lynn-bijlsma-explains', destination: '/en/blog/a-philosophical-look-at-why-we-actually-pay-taxes-lynn-bijlsma-explains', permanent: true },
      { source: '/en/coffee-sticky-bun-culture-tax-and-excise-taxes', destination: '/en/blog/coffee-sticky-bun-culture-tax-and-excise-taxes', permanent: true },
      { source: '/en/introduction-who-is-jan-de-belastigman', destination: '/en/blog/introduction-who-is-jan-de-belastigman', permanent: true },
      { source: '/en/belasting-eigen-bedrijf', destination: '/en/blog/belasting-eigen-bedrijf', permanent: true },
      { source: '/en/from-japanese-surrogate-mothers-to-ronaldos-transfer-to-juventus-taxes-are-everywhere', destination: '/en/blog/from-japanese-surrogate-mothers-to-ronaldos-transfer-to-juventus-taxes-are-everywhere', permanent: true },
      { source: '/en/top-7-crazy-taxes-part-i-even-jan-de-belastingman-is-amazed-by-this', destination: '/en/blog/top-7-crazy-taxes-part-i-even-jan-de-belastingman-is-amazed-by-this', permanent: true },
      { source: '/en/not-paying-taxes-on-your-wages-ruben-scherpenisse-explains', destination: '/en/blog/not-paying-taxes-on-your-wages-ruben-scherpenisse-explains', permanent: true },
      { source: '/en/am-i-entitled-to-care-benefit', destination: '/en/blog/am-i-entitled-to-care-benefit', permanent: true },
      { source: '/en/income-tax-in-2021-what-will-change-for-you', destination: '/en/blog/income-tax-in-2021-what-will-change-for-you', permanent: true },
      { source: '/en/good-money-resolutions-for-2021-danique-van-der-molen-explains', destination: '/en/blog/good-money-resolutions-for-2021-danique-van-der-molen-explains', permanent: true },
      { source: '/en/de-geschiedenis-van-de-nederlandse-belasting', destination: '/en/blog/de-geschiedenis-van-de-nederlandse-belasting', permanent: true },
      { source: '/en/de-moderne-geschiedenis-van-de-nederlandse-belasting', destination: '/en/blog/de-moderne-geschiedenis-van-de-nederlandse-belasting', permanent: true },
      { source: '/en/saving-money-and-money-as-a-student-lynn-bijlsma-gives-5-tips', destination: '/en/blog/saving-money-and-money-as-a-student-lynn-bijlsma-gives-5-tips', permanent: true },
      { source: '/en/wanneer-belastingaangifte-doen-rik-brem-masterstudent-fiscaal-recht-legt-uit', destination: '/en/blog/wanneer-belastingaangifte-doen-rik-brem-masterstudent-fiscaal-recht-legt-uit', permanent: true },
      { source: '/en/top-4-most-common-tax-return-mistakes', destination: '/en/blog/top-4-most-common-tax-return-mistakes', permanent: true },
      { source: '/en/wondering-how-you-can-make-your-income-tax-return-more-fun', destination: '/en/blog/wondering-how-you-can-make-your-income-tax-return-more-fun', permanent: true },
      { source: '/en/vacation-days-what-about-it-jan-de-belastingman-stays-home', destination: '/en/blog/vacation-days-what-about-it-jan-de-belastingman-stays-home', permanent: true },
      { source: '/en/jan-de-belastingman-website-2-0', destination: '/en/blog/jan-de-belastingman-website-2-0', permanent: true },
      {
        source: '/en/hoe-werkt-het',
        destination: '/en/how-it-works',
        permanent: true,
      },

      // // Chat domain redirects
      // {
      //   source: '/nl/general-questions',
      //   destination: 'https://jandebelastingman.nl/algemene-vragen',
      //   permanent: true,
      //   has: [
      //     {
      //       type: 'host',
      //       key: 'host',
      //       value: 'chat.jandebelastingman.nl'
      //     }
      //   ]
      // },
      // {
      //   source: '/en/general-questions',
      //   destination: 'https://jandebelastingman.nl/en/general-questions',
      //   permanent: true,
      //   has: [
      //     {
      //       type: 'host',
      //       key: 'host',
      //       value: 'chat.jandebelastingman.nl'
      //     }
      //   ]
      // },
      // {
      //   source: '/nl/aangifte-inkomstenbelasting',
      //   destination: 'https://jandebelastingman.nl/aangifte-inkomstenbelasting',
      //   permanent: true,
      //   has: [
      //     {
      //       type: 'host',
      //       key: 'host',
      //       value: 'chat.jandebelastingman.nl'
      //     }
      //   ]
      // },
      // {
      //   source: '/en/aangifte-inkomstenbelasting',
      //   destination: 'https://jandebelastingman.nl/en/income-tax-return',
      //   permanent: true,
      //   has: [
      //     {
      //       type: 'host',
      //       key: 'host',
      //       value: 'chat.jandebelastingman.nl'
      //     }
      //   ]
      // },
      // {
      //   source: '/nl/m-form-assistant',
      //   destination: 'https://jandebelastingman.nl/m-form',
      //   permanent: true,
      //   has: [
      //     {
      //       type: 'host',
      //       key: 'host',
      //       value: 'chat.jandebelastingman.nl'
      //     }
      //   ]
      // },
      // {
      //   source: '/en/m-form-assistant',
      //   destination: 'https://jandebelastingman.nl/en/m-form-assistant',
      //   permanent: true,
      //   basePath: false as const,
      //   has: [
      //     {
      //       type: 'host',
      //       key: 'host',
      //       value: 'chat.jandebelastingman.nl',
      //     },
      //   ],
      // },
      // {
      //   source: '/nl/bv',
      //   destination: 'https://jandebelastingman.nl/besloten-vennootschap-hulp',
      //   permanent: true,
      //   basePath: false as const,
      //   has: [
      //     {
      //       type: 'host',
      //       key: 'host',
      //       value: 'chat.jandebelastingman.nl',
      //     },
      //   ],
      // },
      // {
      //   source: '/en/bv',
      //   destination: 'https://jandebelastingman.nl/en/besloten-vennootschap-assist',
      //   permanent: true,
      //   basePath: false as const,
      //   has: [
      //     {
      //       type: 'host',
      //       key: 'host',
      //       value: 'chat.jandebelastingman.nl',
      //     },
      //   ],
      // },
      // {
      //   source: '/nl/ondernemers-zzp',
      //   destination: 'https://jandebelastingman.nl/ondernemers-zzp',
      //   permanent: true,
      //   basePath: false as const,
      //   has: [
      //     {
      //       type: 'host',
      //       key: 'host',
      //       value: 'chat.jandebelastingman.nl',
      //     },
      //   ],
      // },
      // {
      //   source: '/en/ondernemers-zzp',
      //   destination: 'https://jandebelastingman.nl/en/entrepreneurs-self-employed',
      //   permanent: true,
      //   basePath: false as const,
      //   has: [
      //     {
      //       type: 'host',
      //       key: 'host',
      //       value: 'chat.jandebelastingman.nl',
      //     },
      //   ],
      // },
    ];
    return redirects;
  },
};

export default nextConfig;
