import react from 'react';
import { Parallax } from 'react-parallax';
import TextBox from '../components/TextBox'
import img from '../img/p1.png';
import img2 from '../img/p2.jpg';
import img3 from '../img/p3.jpg';
import img4 from '../img/p4.jpg';

export default function ParallaxView(props) {
    return (
        <div>
            <Parallax className='imagee' blur={0} bgImage={img3} strength={800} bgImageStyle={{ minHeight: "100vh" }}>
                <div className='contentt'>
                    <span className="img-txt">ZooLife</span>
                </div>
            </Parallax>
            <TextBox />
            <Parallax className='imagee' blur={0} bgImage={img4} strength={800} bgImageStyle={{ minHeight: "100vh" }}>
                <div className='contentt'>
                    <span className="img-txt">ZooLife</span>
                </div>
            </Parallax>
            <TextBox />
            <Parallax className='imagee' blur={0} bgImage={img2} strength={800} bgImageStyle={{ minHeight: "100vh" }}>
                <div className='contentt'>
                    <span className="img-txt">ZooLife</span>
                </div>
            </Parallax>
            <TextBox />
            <Parallax className='imagee' blur={0} bgImage={img3} strength={800} bgImageStyle={{ minHeight: "100vh" }}>
                <div className='contentt'>
                    <span className="img-txt">ZooLife</span>
                </div>
            </Parallax>
            <TextBox />
            <Parallax className='imagee' blur={0} bgImage={img4} strength={800} bgImageStyle={{ minHeight: "100vh" }}>
                <div className='contentt'>
                    <span className="img-txt">ZooLife</span>
                </div>
            </Parallax>
            <TextBox />
            <Parallax className='imagee' blur={0} bgImage={img2} strength={800} bgImageStyle={{ minHeight: "100vh" }}>
                <div className='contentt'>
                    <span className="img-txt">ZooLife</span>
                </div>
            </Parallax>
            <TextBox />

            <div className="contentt"></div>
        </div>
    )
}