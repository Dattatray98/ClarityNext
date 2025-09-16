import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import { fetchUserInfo } from "./UserFetch";

const ProflieBlock = () => {
    const [User, setUserData] = useState<any>(null);
    const [Error, setError] = useState<string | null>(null);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const LoadUserInfo = async () => {
            try {

                const data = await fetchUserInfo();
                setUserData(data)
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        LoadUserInfo();
    }, []);


    if (Loading) return <p>Loading user info...</p>;
    if (Error) return <p className="text-red-500">Error: {Error}</p>;


    return (
        <div className="relative border shadow-sm border-gray-300 rounded-xl">
            <div className="h-[20vh] bg-gradient-to-b from-[#c4fafd] to-gray-100 blue-600 rounded-t-xl">
            </div>
            <div className="h-35 bg-gray-100 rounded-b-xl ">
                <div className="px-65 py-15 h-20 flex justify-center flex-col">
                    <p className="text-2xl font-medium">{User?.data?.user?.FirstName} {User?.data?.user?.LastName}</p>
                    <p className="font-medium text-gray-700">Aspiring Researcher in AI / ML & Data Science | 2nd-Year BE Computer Engineering Student at SKN Sinhgad Institute of Technology & Science</p>
                </div>
            </div>

            <div className="absolute top-30 left-12 shadow-sm bg-gray-300 flex justify-center items-center border-2 border-gray-300 rounded-full h-[20vh] w-[20vh]">
                <FaUser className="h-[10vh] w-[10vh]" />
            </div>
        </div>
    )
}

export default ProflieBlock
