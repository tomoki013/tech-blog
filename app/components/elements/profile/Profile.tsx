import Image from 'next/image';
import * as Elements from '@/app/components/elements/index';

const Profile: React.FC = () => {
    return (
        <Elements.UnitContainer>
            <h2>Profile</h2><hr />
            <Image
                src='/images/'
                alt='プロフィール写真'
                width={70}
                height={70}
                className='my-2 mx-auto rounded-[50%]'
            />
            <p>京都の普通の大学3年生。</p>
            <p>プログラミングに興味を持ちHTML,CSSから学び始めました。</p>
            <p>その後JavaScriptの勉強をし現在はReact,Next.js,TypeScriptを勉強中です。</p>
            <p>このブログは現在学んでいることのアウトプットとしてNext.jsで作成し始めました。</p>
            <p>自分が勉強したことやつまずいたことなどをアウトプットのために書いていくので何かのお役に立てると幸いです。</p>
        </Elements.UnitContainer>
    );
}

export default Profile;
