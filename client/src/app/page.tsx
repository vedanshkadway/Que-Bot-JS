import FileUpload from "./components/FileUpload";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen flex w-screen">
        <div className="w-[35vw] min-h-screen p-4 flex justify-center items-center"><FileUpload/></div>
        <div className="w-[65vw] min-h-screen border-l-2">2</div>

      </div>
    </div>
  );
}
