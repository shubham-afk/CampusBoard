import bgImage from "../Logo/about-bg.jpg";

export default function AllNotices() {
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-hidden">
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover filter blur-sm scale-110"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />
      {/* Foreground content */}
      <div className="relative bg-white bg-opacity-95 p-8 rounded shadow text-xl font-bold">
        Welcome to Campus
      </div>
    </div>
  );
}
