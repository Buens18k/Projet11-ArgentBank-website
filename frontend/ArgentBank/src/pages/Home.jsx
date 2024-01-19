import React from 'react';
import '../styles/pages/_home.scss';

import Main from '../components/Main';
import Hero from '../components/Hero';
import FeatureItems from '../components/FeatureItem';

import Chat from '../assets/icon-chat.png';
import Money from '../assets/icon-money.png';
import Security from '../assets/icon-security.png';

export default function Home() {
  return (
    <Main>
      <Hero />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <FeatureItems
          image={Chat}
          altText="Chat Icon"
          title="You are our #1 priority"
          description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <FeatureItems
          image={Money}
          altText="Chat Icon"
          title="More savings means higher rates"
          description="The more you save with us, the higher your interest rate will be!"
        />
        <FeatureItems
          image={Security}
          altText="Chat Icon"
          title="Security you can trust"
          description="We use top of the line encryption to make sure your data and money is always safe."
        />
      </section>
    </Main>
  );
}
