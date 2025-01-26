import * as Elements from '@/app/components/elements/index';
// import * as Blog from '@/features/blog/index';

const Home = () => {
  	return (
		<>
			<Elements.LeftContainer />
			<Elements.CenterContainer>
				<h1 className='text-center'>トップページ</h1>
				<h1 className="flex justify-center">Hello, My IT Blog!</h1>
				<p>ブログ記事中に紹介したソースコードは私のGitHubリポジトリにあります。是非確認してみてください。→<a href="https://github.com/tomoki013/tech-blog-source-code" target="_blank" rel="noopener noreferrer">GitHubリポジトリ</a></p>
				<p>また完成ページを公開しているので是非参考にしてみてください。→<a href="https://tomoki013.github.io/tech-blog-source-code/" target="_blank" rel="noopener noreferrer">完成ページ</a></p>
				{/* <Blog.DisplayPosts displayCount={4} limitedTitle={100} limitedDescription={100} /> */}
			</Elements.CenterContainer>
			<Elements.RightContainer />
		</>
  	);
}

export default Home;
