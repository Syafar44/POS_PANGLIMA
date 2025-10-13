import { convertIDR } from "@/utils/currency";
import { Button, Card, CardBody, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { FiCalendar, FiFileText, FiMoreVertical, FiUser, FiUsers } from "react-icons/fi";
import ModalPayment from "./ModalPayment";

const OpenBill = () => {
  const paymentModal = useDisclosure()
  
  return (
      <section className="p-5 h-[calc(100vh-85px)] overflow-y-scroll">
        <div className="grid gap-5">
          <Card>
            <CardHeader className="flex justify-between items-center p-6 border-b border-secondary/20">
              <div className="flex gap-10">
                <span className="flex gap-3 items-center">
                  <FiFileText size={24} />
                  <p>OPOP185 - Tanpa Nama</p>
                </span>
                <span className="flex gap-3 items-center">
                  <FiUsers size={24} />
                  <p>Tanpa Pelanggan</p>
                </span>
                <span className="flex gap-3 items-center">
                  <FiUser size={24} />
                  <p>Leader</p>
                </span>
                <span className="flex gap-3 items-center">
                  <FiCalendar size={24} />
                  <p>2023-10-10, 12:34</p>
                </span>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly className="bg-transparent">
                    <FiMoreVertical size={24}/>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions">
                    <DropdownItem key="ubah">
                      Ubah
                    </DropdownItem>
                    <DropdownItem key="batalkan">
                      Batalkan
                    </DropdownItem>
                    <DropdownItem key="cetak bill">
                      Cetak Bill
                    </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardHeader>
            <CardBody>
              <div className="flex gap-5">
                <div className="w-full grid gap-2">
                  <p className="text-secondary font-semibold text-lg">
                    Delivery (2)
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-5 items-center">
                      <div className="bg-gradient-to-br from-primary/20 to-primary text-xl w-16 h-16 rounded-lg flex justify-center items-center font-bold">
                        BG
                      </div>
                      <div className="flex flex-col justify-between">
                        <span>
                          <h2 className="font-semibold text-lg">
                            Bolu Gulung
                          </h2>
                          <p className="text-secondary">9 PCS</p>
                        </span>
                        <p className="text-secondary">Diinput Oleh : Leader</p>
                      </div>
                    </div>
                    <span className="font-bold text-lg text-primary flex gap-5">
                      <p className="text-secondary">

                      </p>
                      <h3>
                        {convertIDR(Number(30000))} 
                      </h3>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-5 items-center">
                      <div className="bg-gradient-to-br from-primary/20 to-primary text-xl w-16 h-16 rounded-lg flex justify-center items-center font-bold">
                        BG
                      </div>
                      <div className="flex flex-col justify-between">
                        <span>
                          <h2 className="font-semibold text-lg">
                            Bolu Gulung
                          </h2>
                          <p className="text-secondary">9 PCS</p>
                        </span>
                        <p className="text-secondary">Diinput Oleh : Leader</p>
                      </div>
                    </div>
                    <span className="font-bold text-lg text-primary flex gap-5">
                      <p className="text-secondary">

                      </p>
                      <h3>
                        {convertIDR(Number(30000))} 
                      </h3>
                    </span>
                  </div>
                  <span className="flex justify-between py-3">
                    <p className="text-secondary font-semibold text-lg">
                      Subtotal Delivery
                    </p>
                    <h3 className="font-bold text-lg text-primary">
                      {convertIDR(Number(60000))} 
                    </h3>
                  </span>
                </div>
                <div className="w-3/5 border-l border-secondary/20">
                  <span className="flex justify-between border-b border-secondary/20 p-3">
                    <p className="text-secondary">
                      Subtotal
                    </p>
                    <h3 className="font-bold text-lg">
                      {convertIDR(Number(60000))} 
                    </h3>
                  </span>
                  <div className="flex p-3 justify-between">
                    <span>
                      <p>Total Tagihan</p>
                      <span className="text-primary">
                        {convertIDR(Number(60000))} (2)
                      </span>
                    </span>
                    <Button 
                      size="lg"
                      radius="sm"
                      className="bg-primary"
                      onPress={() => paymentModal.onOpen()}
                    >
                      Bayar
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center p-6 border-b border-secondary/20">
              <div className="flex gap-10">
                <span className="flex gap-3 items-center">
                  <FiFileText size={24} />
                  <p>OPOP185 - Tanpa Nama</p>
                </span>
                <span className="flex gap-3 items-center">
                  <FiUsers size={24} />
                  <p>Tanpa Pelanggan</p>
                </span>
                <span className="flex gap-3 items-center">
                  <FiUser size={24} />
                  <p>Leader</p>
                </span>
                <span className="flex gap-3 items-center">
                  <FiCalendar size={24} />
                  <p>2023-10-10, 12:34</p>
                </span>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly className="bg-transparent">
                    <FiMoreVertical size={24}/>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions">
                    <DropdownItem key="ubah">
                      Ubah
                    </DropdownItem>
                    <DropdownItem key="batalkan">
                      Batalkan
                    </DropdownItem>
                    <DropdownItem key="cetak bill">
                      Cetak Bill
                    </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardHeader>
            <CardBody>
              <div className="flex gap-5">
                <div className="w-full grid gap-2">
                  <p className="text-secondary font-semibold text-lg">
                    Takeaway (2)
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-5 items-center">
                      <div className="bg-gradient-to-br from-primary/20 to-primary text-xl w-16 h-16 rounded-lg flex justify-center items-center font-bold">
                        BG
                      </div>
                      <div className="flex flex-col justify-between">
                        <span>
                          <h2 className="font-semibold text-lg">
                            Bolu Gulung
                          </h2>
                          <p className="text-secondary">9 PCS</p>
                        </span>
                        <p className="text-secondary">Diinput Oleh : Leader</p>
                      </div>
                    </div>
                    <span className="font-bold text-lg text-primary flex gap-5">
                      <p className="text-secondary">

                      </p>
                      <h3>
                        {convertIDR(Number(30000))} 
                      </h3>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-5 items-center">
                      <div className="bg-gradient-to-br from-primary/20 to-primary text-xl w-16 h-16 rounded-lg flex justify-center items-center font-bold">
                        BG
                      </div>
                      <div className="flex flex-col justify-between">
                        <span>
                          <h2 className="font-semibold text-lg">
                            Bolu Gulung
                          </h2>
                          <p className="text-secondary">9 PCS</p>
                        </span>
                        <p className="text-secondary">Diinput Oleh : Leader</p>
                      </div>
                    </div>
                    <span className="font-bold text-lg text-primary flex gap-5">
                      <p className="text-secondary">

                      </p>
                      <h3>
                        {convertIDR(Number(30000))} 
                      </h3>
                    </span>
                  </div>
                  <span className="flex justify-between py-3">
                    <p className="text-secondary font-semibold text-lg">
                      Subtotal Takeaway
                    </p>
                    <h3 className="font-bold text-lg text-primary">
                      {convertIDR(Number(60000))} 
                    </h3>
                  </span>
                </div>
                <div className="w-3/5 border-l border-secondary/20">
                  <span className="flex justify-between border-b border-secondary/20 p-3">
                    <p className="text-secondary">
                      Subtotal
                    </p>
                    <h3 className="font-bold text-lg">
                      {convertIDR(Number(60000))} 
                    </h3>
                  </span>
                  <div className="flex p-3 justify-between">
                    <span>
                      <p>Total Tagihan</p>
                      <span className="text-primary">
                        {convertIDR(Number(60000))} (2)
                      </span>
                    </span>
                    <Button 
                      size="lg"
                      radius="sm"
                      className="bg-primary"
                      onPress={() => paymentModal.onOpen()}
                    >
                      Bayar
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center p-6 border-b border-secondary/20">
              <div className="flex gap-10">
                <span className="flex gap-3 items-center">
                  <FiFileText size={24} />
                  <p>OPOP185 - Tanpa Nama</p>
                </span>
                <span className="flex gap-3 items-center">
                  <FiUsers size={24} />
                  <p>Tanpa Pelanggan</p>
                </span>
                <span className="flex gap-3 items-center">
                  <FiUser size={24} />
                  <p>Leader</p>
                </span>
                <span className="flex gap-3 items-center">
                  <FiCalendar size={24} />
                  <p>2023-10-10, 12:34</p>
                </span>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly className="bg-transparent">
                    <FiMoreVertical size={24}/>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions">
                    <DropdownItem key="ubah">
                      Ubah
                    </DropdownItem>
                    <DropdownItem key="batalkan">
                      Batalkan
                    </DropdownItem>
                    <DropdownItem key="cetak bill">
                      Cetak Bill
                    </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardHeader>
            <CardBody>
              <div className="flex gap-5">
                <div className="w-full grid gap-2">
                  <p className="text-secondary font-semibold text-lg">
                    Delivery (2)
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-5 items-center">
                      <div className="bg-gradient-to-br from-primary/20 to-primary text-xl w-16 h-16 rounded-lg flex justify-center items-center font-bold">
                        BG
                      </div>
                      <div className="flex flex-col justify-between">
                        <span>
                          <h2 className="font-semibold text-lg">
                            Bolu Gulung
                          </h2>
                          <p className="text-secondary">9 PCS</p>
                        </span>
                        <p className="text-secondary">Diinput Oleh : Leader</p>
                      </div>
                    </div>
                    <span className="font-bold text-lg text-primary flex gap-5">
                      <h3>
                        {convertIDR(Number(30000))} 
                      </h3>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-5 items-center">
                      <div className="bg-gradient-to-br from-primary/20 to-primary text-xl w-16 h-16 rounded-lg flex justify-center items-center font-bold">
                        BG
                      </div>
                      <div className="flex flex-col justify-between">
                        <span>
                          <h2 className="font-semibold text-lg">
                            Bolu Gulung
                          </h2>
                          <p className="text-secondary">9 PCS</p>
                        </span>
                        <p className="text-secondary">Diinput Oleh : Leader</p>
                      </div>
                    </div>
                    <span className="font-bold text-lg text-primary flex gap-5">
                      <h3>
                        {convertIDR(Number(30000))} 
                      </h3>
                    </span>
                  </div>
                  <span className="flex justify-between py-3">
                    <p className="text-secondary font-semibold text-lg">
                      Subtotal Delivery
                    </p>
                    <h3 className="font-bold text-lg text-primary">
                      {convertIDR(Number(60000))} 
                    </h3>
                  </span>
                  <p className="text-secondary font-semibold text-lg">
                    Takeaway (2)
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-5 items-center">
                      <div className="bg-gradient-to-br from-primary/20 to-primary text-xl w-16 h-16 rounded-lg flex justify-center items-center font-bold">
                        BG
                      </div>
                      <div className="flex flex-col justify-between">
                        <span>
                          <h2 className="font-semibold text-lg">
                            Bolu Gulung
                          </h2>
                          <p className="text-secondary">9 PCS</p>
                        </span>
                        <p className="text-secondary">Diinput Oleh : Leader</p>
                      </div>
                    </div>
                    <span className="font-bold text-lg text-primary flex gap-5">
                      <p className="text-secondary">

                      </p>
                      <h3>
                        {convertIDR(Number(30000))} 
                      </h3>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-5 items-center">
                      <div className="bg-gradient-to-br from-primary/20 to-primary text-xl w-16 h-16 rounded-lg flex justify-center items-center font-bold">
                        BG
                      </div>
                      <div className="flex flex-col justify-between">
                        <span>
                          <h2 className="font-semibold text-lg">
                            Bolu Gulung
                          </h2>
                          <p className="text-secondary">9 PCS</p>
                        </span>
                        <p className="text-secondary">Diinput Oleh : Leader</p>
                      </div>
                    </div>
                    <span className="font-bold text-lg text-primary flex gap-5">
                      <p className="text-secondary">

                      </p>
                      <h3>
                        {convertIDR(Number(30000))} 
                      </h3>
                    </span>
                  </div>
                  <span className="flex justify-between py-3">
                    <p className="text-secondary font-semibold text-lg">
                      Subtotal Takeaway
                    </p>
                    <h3 className="font-bold text-lg text-primary">
                      {convertIDR(Number(60000))} 
                    </h3>
                  </span>
                </div>
                <div className="w-3/5 border-l border-secondary/20">
                  <span className="flex justify-between border-b border-secondary/20 p-3">
                    <p className="text-secondary">
                      Subtotal
                    </p>
                    <h3 className="font-bold text-lg">
                      {convertIDR(Number(60000))} 
                    </h3>
                  </span>
                  <div className="flex p-3 justify-between">
                    <span>
                      <p>Total Tagihan</p>
                      <span className="text-primary">
                        {convertIDR(Number(60000))} (2)
                      </span>
                    </span>
                    <Button 
                      size="lg"
                      radius="sm"
                      className="bg-primary"
                      onPress={() => paymentModal.onOpen()}
                    >
                      Bayar
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <ModalPayment
          isOpen={paymentModal.isOpen} 
          onClose={paymentModal.onClose} 
          onOpenChange={paymentModal.onOpenChange} 
        />
      </section>
  );
}

export default OpenBill