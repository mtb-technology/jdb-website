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
      
      // Self employed professional
      { source: '/zelfstandigen-zonder-personeel', destination: '/onderwerpen/zelfstandigen-zonder-personeel', permanent: true },
      { source: '/en/self-employed-professional', destination: '/en/topics/self-employed-professional', permanent: true },
      
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
    ];
    return redirects;
  },
};

export default nextConfig;
