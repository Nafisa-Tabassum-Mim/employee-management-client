import { useLoaderData, useParams } from "react-router-dom";

const EmployeeChart = () => {
    const { name, email, photo, account, salary, isVerified, designation } = useLoaderData()

    console.log(name, email)
    return (
        <div>
            <h3 className="text-5xl text-center font-serif m-8">Employee details</h3>
            <div className="flex justify-center gap-8">
                <div className="bg-red-200">
                    <div className="avatar">
                        <div className="w-44 rounded">
                            <img src={photo} />
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-4xl">{name}</h3>
                    <p className="text-xl">{designation}</p>
                </div>
            </div>

            <div>
                
            </div>
        </div>
    );
};

export default EmployeeChart;