import Banner from './Banner';
import MenuContainer from './MenuContainer';
import Fruits from './fruits';

function Home() {
  return <>
  <Banner />
  <div className="all-content p-10">
  <Fruits />  
  <MenuContainer />
  </div>
  
  </>;
}

export default Home;