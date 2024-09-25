import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import styles from './index.module.css';

import { Socials } from '@site/src/components/Socials';
import React from 'react';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        {/* <canvas width="300" height="300" style={{ borderRadius: '50%' }} /> */}
        <h1 className="hero__title"> {'Elisha Reece'}</h1>
        <Box sx={{ display: 'flex' }}>
            <Box m="auto">
                <Avatar
                    alt="Elisha Reece"
                    src={useBaseUrl('/img/cramminion.png')}
                    sx={{ width: 300, height: 300, m: 2 }}
                />
            </Box>
        </Box>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons} style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <Link className="button button--secondary button--lg" to="/docs/Welcome" style={{width: '150px'}}>
                Blog
            </Link>
            <Link className="button button--secondary button--lg" href={require('/static/resume.pdf').default} target="_blank" rel="noopener noreferrer" style={{width: '150px'}}>
                Resume
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/contact" style={{width: '150px'}}>
                Contact
            </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
