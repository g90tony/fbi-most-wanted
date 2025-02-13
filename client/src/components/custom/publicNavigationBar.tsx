import logo from "../../assets/fbi-logo.png";

export default function PublicNavigationBar() {
  return (
    <div className="flex flex-row items-center justify-start w-full h-[100px] px-18">
      <img
        src={logo}
        alt="FBI Logo"
        className="block w-16 h-16 rounded-full object-cover"
      />
    </div>
  );
}
