import * as Elements from '@/app/components/elements/index';
import * as Blog from '@/features/blog/index';
import { getAllPosts } from "@/lib/post";

const Home = () => {
	const posts = getAllPosts();
  	return (
		<>
			<Elements.LeftContainer />
			<Elements.CenterContainer>
				<h1 className='text-center'>トップページ</h1>
				<h1 className="flex justify-center">Hello, My IT Blog!</h1>
				<Blog.DisplayPosts posts={posts} displayCount={4} sortType='latest' limitedTitle={100} limitedDescription={100} />
			</Elements.CenterContainer>
			<Elements.RightContainer />
		</>
  	);
}

export default Home;
