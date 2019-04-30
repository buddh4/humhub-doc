/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const translate = require('../../server/translate.js').translate;

const MarkdownBlock = CompLibrary.MarkdownBlock;
/* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
    render() {
        const {siteConfig, language = ''} = this.props;
        const {baseUrl, docsUrl} = siteConfig;
        const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
        const langPart = `${language ? `${language}/` : ''}`;
        const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

        const SplashContainer = props => (
            <div className="homeContainer">
                <div className="homeSplashFade">
                    <div className="wrapper homeWrapper">{props.children}</div>
                </div>
            </div>
        );

        const PromoSection = props => (
            <div className="section promoSection">
                <div className="promoRow">
                    <div className="pluginRowBlock">{props.children}</div>
                </div>
            </div>
        );

        const Button = props => (
            <div className="pluginWrapper buttonWrapper">
                <a className="button" href={props.href} target={props.target}>
                    {props.children}
                </a>
            </div>
        );

        return (
            <SplashContainer>
                <div className="inner">
                    <img class="title-image" src={`${baseUrl}img/undraw_File_bundle_xl7g.svg`} alt="Index Logo" />
                    <h1 className="projectTitle">
                        Welcome to the HumHub Docs
                        <small>Your source of information all around the Open Source social network HumHub.</small>
                    </h1>
                    <PromoSection>
                        <Button href="#try">Get Started</Button>
                        <Button href={docUrl('doc1.html')}>Contribute</Button>
                        <Button href={docUrl('doc2.html')}>Community</Button>
                    </PromoSection>
                </div>
            </SplashContainer>
        );
    }
}

class Index extends React.Component {
    render() {
        const {config: siteConfig, language = ''} = this.props;
        const {baseUrl} = siteConfig;

        const Block = props => (
            <Container
                padding={['bottom', 'top']}
                id={props.id}
                background={props.background}>
                <GridBlock
                    align="center"
                    contents={props.children}
                    layout={props.layout}
                />
            </Container>
        );

        const FeatureCallout = () => (
            <div
                className="productShowcaseSection paddingBottom"
                style={{textAlign: 'center'}}>
                <h2>Feature Callout</h2>
                <MarkdownBlock>These are features of this project</MarkdownBlock>
            </div>
        );

        const TryOut = () => (
            <Block id="try">
                {[
                    {
                        content:
                            'To make your landing page more attractive, use illustrations! Check out ' +
                            '[**unDraw**](https://undraw.co/) which provides you with customizable illustrations which are free to use. ' +
                            'The illustrations you see on this page are from unDraw.',
                        image: `${baseUrl}img/undraw_code_review.svg`,
                        imageAlign: 'left',
                        title: 'Wonderful SVG Illustrations',
                    },
                ]}
            </Block>
        );

        const Description = () => (
            <Block background="dark">
                {[
                    {
                        content:
                            'This is another description of how this project is useful',
                        image: `${baseUrl}img/undraw_note_list.svg`,
                        imageAlign: 'right',
                        title: 'Description',
                    },
                ]}
            </Block>
        );

        const LearnHow = () => (
            <Block background="light">
                {[
                    {
                        content:
                            'Each new Docusaurus project has **randomly-generated** theme colors.',
                        image: `${baseUrl}img/undraw_youtube_tutorial.svg`,
                        imageAlign: 'right',
                        title: 'Randomly Generated Theme Colors',
                    },
                ]}
            </Block>
        );

        const Announcement = () => (
            <Block background="dark">
                {[
                    {
                        image: `${baseUrl}img/undraw_youtube_tutorial.svg`,
                        imageAlign: 'center',
                        title: '<div class="announcement">Check out the latest version of the <a href="#">Devtools Module</a> with many new showcases and a module generator!</div>',
                    },
                ]}
            </Block>
        );

        const Features = () => (
            <Block layout="fourColumn">
                {[
                    {
                        content: 'Make your first steps by setting up HumHub. Although the installation of HumHub is quite simple, it offers many configuration options to meet the needs of your network.',
                        image: `${baseUrl}img/undraw_To_the_stars_qhyy.svg`,
                        imageAlign: 'top',
                        title: 'Installation and Administration',
                    },
                    {
                        content: 'Learn more about the different techniques to create your own design. HumHub provides multiple ways of changing the appearance of your network as styling and overwriting views.',
                        image: `${baseUrl}img/undraw_flowers_vx06.svg`,
                        imageAlign: 'top',
                        title: 'Theming Guide',
                    },
                    {
                        content: 'The HumHub core is build to be heavily extensible. This guide holds all information needed for core and module developer in order to extend or alter the feature set of HumHub',
                        image: `${baseUrl}img/undraw_code_review_l1q9.svg`,
                        imageAlign: 'top',
                        title: 'Developement Guide',
                    },
                ]}
            </Block>
        );

        const Showcase = () => {
            if ((siteConfig.users || []).length === 0) {
                return null;
            }

            const showcase = siteConfig.users
                .filter(user => user.pinned)
                .map(user => (
                    <a href={user.infoLink} key={user.infoLink}>
                        <img src={user.image} alt={user.caption} title={user.caption}/>
                    </a>
                ));

            const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

            return (
                <div className="productShowcaseSection paddingBottom">
                    <h2>Who is Using This?</h2>
                    <p>This project is used by all these people</p>
                    <div className="logos">{showcase}</div>
                    <div className="more-users">
                        <a className="button" href={pageUrl('users.html')}>
                            More {siteConfig.title} Users
                        </a>
                    </div>
                </div>
            );
        };

        return (
            <div>
                <HomeSplash siteConfig={siteConfig} language={language}/>
                <div className="mainContainer">
                    <Announcement />
                    <Features/>
                </div>
            </div>
        );
    }
}

module.exports = Index;
