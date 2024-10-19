import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="relative hidden lg:block bg-gradient-to-t from-[#180d3b]/90 to-[#180d3b]/70">
        <Image
          width={2000}
          height={2000}
          src="/images/login.png"
          alt="Auth background"
          className="object-cover flex justify-center items-center w-[550px] h-[550px] relative left-28 top-28 shadow-2xl shadow-black-100 rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 custom-bounce"
        />
        {/* Optional overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
      <div className="flex items-center justify-center py-12">{children}</div>
    </div>
  );
}
