import * as Elements from '@/app/components/elements/index';
import * as Contact from '@/features/contact/components/index';

const ContactPage = () => {
    return (
        <>
            <Elements.LeftContainer />
            <Elements.CenterContainer>
                <h1 className="text-center">お問い合わせ</h1>
                <p><a href="https://travelblog-phi.vercel.app/contact" target="_blank" className="underline text-blue-700">ともきちの旅行ブログ</a>と同じものが運営しています。</p>
                <p>当面の間、お問い合わせはこちらまでお願いします。</p>
                <hr />
                <Contact.SiteRule />
            </Elements.CenterContainer>
            <Elements.RightContainer />
        </>
    );
}

export default ContactPage;
