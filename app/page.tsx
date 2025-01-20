import * as Elements from '@/app/components/elements/index';

const Home = () => {
  	return (
		<>
			<Elements.LeftContainer />
			<Elements.CenterContainer>
				<h1 className="h-[100vh] flex justify-center">Hello, My IT Blog!</h1>
			</Elements.CenterContainer>
			<Elements.RightContainer />
		</>
  	);
}

export default Home;
