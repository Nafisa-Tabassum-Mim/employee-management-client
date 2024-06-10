import Bannner from './Bannner';
import Section1 from './Section1';
import Section2 from './Section2';
import Services from './Services';
import Testimonial from './Testimonial';

const Home = () => {
    return (
        <div>
            <Bannner></Bannner>
            <Services></Services>
            <Testimonial></Testimonial>
            <Section1></Section1>
            <Section2></Section2>
        </div>
    );
};

export default Home;