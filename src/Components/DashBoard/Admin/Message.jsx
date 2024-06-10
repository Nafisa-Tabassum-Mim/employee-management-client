import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Message = () => {
    const axiosPublic = useAxiosPublic();
    const { data: messages = [] } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/message`);
            return res.data;
        },
    });

    console.log(messages);
    return (
        <div>
              <h3 className="text-4xl text-center text-white m-12">
                <span className="bg-gray-700 px-2 rounded-xl font-mono">Messages for admin</span>
            </h3>
            {
                messages.map((message) => (
                    <div key={message._id} className=" p-4 my-2 rounded-md bg-black text-white">
                        <h3 className="text-xl">Email - {message.email}</h3>
                        <p className="text-lg">{message.message}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default Message;
