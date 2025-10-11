import { Input } from "@heroui/react";
import { FiSearch } from "react-icons/fi";

const Pelanggan = () => {
  
  return (
      <section className="flex">
        <div className="w-[600px] border-r border-secondary/40">
          <Input
            placeholder="Cari Penjualan..."
            radius="none"
            variant="bordered"
            type="text"
            size="lg"
            startContent={<FiSearch size={24} />}
            onChange={() => {}}
          />
          <div className="h-[calc(100vh-130px)] overflow-y-scroll flex flex-col gap-4">
            <div className="flex gap-5 items-center bg-primary/30 px-5 py-3">
              <div className="bg-gradient-to-br from-green-300/20 to-green-300 text-2xl font-bold flex justify-center items-center p-3 rounded-full">
                WI
              </div>
              <span>
                <h4 className="text-xl">Wildan</h4>
                <p className="text-sm text-primary/80">081234567890</p>
              </span>
            </div>
            <div className="flex gap-5 items-center px-5 py-3">
              <div className="bg-gradient-to-br from-blue-400/20 to-blue-400 text-2xl font-bold flex justify-center items-center p-3 rounded-full">
                AD
              </div>
              <span>
                <h4 className="text-xl">Ahmad</h4>
                <p className="text-sm text-primary/80">081234567890</p>
              </span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex gap-5 items-center border-b border-secondary/20 p-5">
              <div className="bg-gradient-to-br from-green-300/20 to-green-300 text-2xl font-bold flex justify-center items-center p-3 rounded-full">
                WI
              </div>
              <span>
                <h4 className="text-xl">Wildan</h4>
                <p className="text-sm text-primary/80">081234567890</p>
              </span>
            </div>
        </div>
      </section>
  );
}

export default Pelanggan