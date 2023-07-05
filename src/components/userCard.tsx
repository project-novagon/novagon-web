import { guestPFP } from "../firebase-config";

interface userCardProps {
    photoURL: any,
    userName: any,
}

function UserCard({ photoURL, userName}: userCardProps){
    return (
        <>
        <div className="w-[197px] h-[230px] px-5 py-4 bg-zinc-700 rounded-2xl shadow flex-col justify-start items-start gap-1.5 inline-flex">
<div className="justify-start items-center gap-[18px] inline-flex">
<div className="flex-col justify-start items-start gap-0.5 inline-flex">
<div className="inline-flex items-center justify-center gap-2">
<div className="w-[27.88px] h-7 flex-col justify-center items-center inline-flex">
<img className="w-[27.88px] h-7 rounded-[30px]" src="https://via.placeholder.com/28x28" />
</div>
<div className="text-white text-[16px] font-bold">Guest</div>
<div className="text-white text-[12px] font-medium">13.06.23</div>
</div>
<div className="text-white text-[12px] font-medium">Public images</div>
</div>
</div>
<div className="h-[21px] flex-col justify-start items-start gap-0.5 flex">
<div className="self-stretch text-white text-[14px] font-normal">Text</div>
</div>
<div className="w-[157px] h-[100px] rounded-lg"></div>
<div className="justify-start items-center gap-1.5 inline-flex">
<div className="justify-start items-center gap-1.5 flex">
<div className="text-white text-[10px] font-light">181</div>
</div>
<div className="justify-start items-center gap-1.5 flex">
<div className="text-white text-[10px] font-light">10</div>
</div>
<div className="justify-start items-center gap-1.5 flex">
<div className="text-white text-[10px] font-light">Share</div>
</div>
</div>
</div>
        </>
    )
}

export {UserCard};