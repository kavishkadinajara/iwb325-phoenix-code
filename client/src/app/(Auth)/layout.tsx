

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="hidden bg-[#180d3b]/70 lg:block">
        <img
          src="/images/auth-bg.jpg"
          alt="Auth background"
          className="object-cover w-full h-full"
        />
      
      </div>
      <div className="flex items-center justify-center py-12">{children}</div>
    </div>
  );
}
