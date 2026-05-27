import CodeEditor from "../components/editor/CodeEditor";
import LanguageSelector from "../components/editor/LanguageSelector";
import InputBox from "../components/execution/InputBox";
import OutputBox from "../components/execution/OutputBox";
import Navbar from "../components/Navbar";
import UserList from "../components/room/UserList";
import RunButton from "../components/execution/RunButton";
function Room()
{
     return(
        <div className="bg-[#0a0a0a] min-h-screen overflow-hidden">
            <Navbar/>
          
        <div className="flex h-[calc(100vh-4rem)] gap-4 px-2 py-2">
        <div className="w-[60%] flex flex-col gap-2">
            <LanguageSelector/>
            <CodeEditor/>
        </div>

      <div className="w-[40%] flex flex-col gap-2">
        <RunButton/>
        <InputBox/>
        <OutputBox/>
        <UserList/>

        </div>

        </div>

        </div>
     )
}

export default Room ;