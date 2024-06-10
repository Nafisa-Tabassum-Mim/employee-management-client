import { BsEarbuds } from "react-icons/bs";
import { FaHeadphones } from "react-icons/fa6";
import { MdLaptopChromebook } from "react-icons/md";

const Services = () => {
    return (
        <div className="mx-8">
             <div className="text-center mx-auto md:w-4/12 my-8">
                <p className="text-5xl uppercase font-serif py-2 text-blue-400 ">Probiz special services </p>
            </div>
            <div className="bg-blue-400 md:h-[200px] md:w-3/4 rounded-lg py-4 px-6 my-6">
                <h3 className="flex items-center text-white gap-2 text-xl"><BsEarbuds className="text-green-700" />Our special gadget</h3>
                <p className="md:text-lg">Probiz Gadget Service has garnered a significant amount of scrutiny and negative feedback from various review platforms. According to Scam Detector, Probiz Gadget Service exhibits multiple red flags, including potential threats, phishing, malware, and spam, which significantly undermine its credibility. The website's trust score is notably low, and users have reported issues such as unsolicited emails and ads, which further contribute to its dubious reputation.</p>
            </div>
            <div className="flex justify-end">
                <div className="bg-green-500 md:h-[200px] md:w-3/4 rounded-lg py-4 px-6 mb-6">
                    <h3 className="flex items-center text-white gap-2 text-xl">
                        <MdLaptopChromebook className="text-blue-500" />
                        Seamless Laptops
                    </h3>
                    <p className="md:text-lg">
                        Probix laptops, known for their reliability and performance, cater to a wide range of users, from business professionals to casual users.Display quality varies across models. The ProBook 650 G2, for example, has a brightness of 355 nits, making it suitable for well-lit environments, though its color accuracy might not be the best compared to competitors.
                    </p>
                </div>
            </div>

            <div className="bg-yellow-500 md:h-[200px] md:w-3/4 rounded-lg py-4 px-6">
                <h3 className="flex items-center text-white gap-2 text-xl"><FaHeadphones className="text-red-500" />Probix Headphones Superior Sound </h3>
                <p className="md:text-lg">One of the standout features of Probix headphones is their long battery life, which ensures extended use without frequent recharging. Additionally, they support Bluetooth connectivity, allowing for a wireless and hassle-free listening experience. Users also highlight the effective noise cancellation, which makes them a good choice for commuting and office environments.</p>
            </div>
        </div>
    );
};

export default Services;