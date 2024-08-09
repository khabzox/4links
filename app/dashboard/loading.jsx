import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white opacity-75 z-50">
      <Image src="/logo.svg" alt="Loading" width={100} height={100} />
    </div>
  );
}
