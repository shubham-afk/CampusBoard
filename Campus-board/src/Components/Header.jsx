import logo from "../Logo/Logo.png";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40 w-full">
      <div className="px-6 py-3 flex items-center justify-end">
        <div className="flex items-center gap-7">
          <span className="text-2xl font-bold text-indigo-700">
            CampusTalks
          </span>
          <img
            src={logo}
            alt="CampusTalks Logo"
            className="h-10 w-10 object-contain"
          />
        </div>
      </div>
    </header>
  );
}
