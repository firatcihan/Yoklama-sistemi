import {PacmanLoader} from "react-spinners";

export default function Loader({size = 50, color = "#fff50e"}: {size?: number, color?: string}) {
    return (
        <div className=" flex-col w-full h-full fixed top-0 left-0 bg-zinc-50 text-pink-600 flex items-center justify-center text-2xl">
            <PacmanLoader size={size} color={color}/>
            <h6 className="mt-10 text-[35px] text-black">Loading...</h6>
        </div>
    )
}