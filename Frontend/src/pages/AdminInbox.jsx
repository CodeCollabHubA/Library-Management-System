import Top from "../layout/inbox//top";
import Middile from "../layout/inbox/middile";
import Bottom from "../layout/inbox/bottom";
import InboxSidebar from "../layout/inbox/inboxSidebar";


const Inbox = () => {
    return (
        <div>
            <h1 className="text-5xl font-semibold">Inbox</h1>
            <div className="mt-12   rounded-md bg-slate-100 shadow-lg w-full">
                <div className="flex h-[29rem]">
                    <div className="w-1/5 p-2 border-r-2 border-slate-50">
                        <InboxSidebar />
                    </div>
                    <div className="w-full">
                        <Top />
                        <Middile />
                        <Bottom />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inbox;

