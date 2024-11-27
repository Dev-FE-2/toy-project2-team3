import { Outlet } from 'react-router-dom';

function Home() {
	return (
		<>
		<h1>메인페이지입니다.</h1>
		<Outlet/>
	</>
	)
}
export default Home;