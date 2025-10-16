import { Dummy_RGP } from "@/dummy/contants";
import { convertIDR } from "@/utils/currency";
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardFooter, Input, Select, SelectItem, useDisclosure } from "@heroui/react";
import { FiMenu, FiMinus, FiPlus, FiSearch, FiTrash } from "react-icons/fi";
import ModalAddProduk from "./ModalAddProduk";
import usePesananBaru from "./usePesananBaru";
import { IProdukInCart } from "@/types/Produk";
import ModalPayment from "./ModalPayment";
import ModalUpdateProduk from "./ModalUpdateProduk";

const PesananBaru = () => {
  const paymentModal = useDisclosure()
  const addModal = useDisclosure()
  const updateModal = useDisclosure()
  
  const {
    filteredItems,
    selectedCategory,
    setSelectedCategory,
    isSearching,
    setIsSearching,
    selectedId,
    setSelectedID,
    cart,
    filteredCustomers,
    searchPhone,
    onInputChange,
    refetchCart,

    increaseQuantity,
    decreaseQuantity,
    deleteProduct,

    searchedItems,
    searchTerm,
    setSearchTerm,
  } = usePesananBaru();

  console.log("cart", cart)

  return (
      <section className="flex">
          <div className="w-full justify-between">
            <div className="flex">
                <Select
                  selectedKeys={[selectedCategory]}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0];
                    setSelectedCategory(selectedKey.toString());
                  }}
                  size="lg"
                  radius="none"
                  variant="bordered"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {Dummy_RGP.map((item) => (
                    <SelectItem key={item.category} className="py-3">
                      {item.category}
                    </SelectItem>
                  ))}
                </Select>
                <div className="flex justify-center items-center border-b-2 border-r-2 border-t-2 border-secondary/20">
                  <Button isIconOnly className="bg-transparent rounded-none" onPress={() => setIsSearching(!isSearching)}>
                    <FiSearch size={24} />
                  </Button>
                  <Input
                    placeholder="Cari Produk..."
                    className={`border-none focus:ring-0 focus:border-none ${isSearching ? 'w-[500px] opacity-100' : 'w-0 opacity-0'} transition-all duration-300`}
                    radius="none"
                    size="md"
                    variant="underlined"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
            </div>
            <section className="border-r border-secondary/20 h-[calc(100vh-130px)] p-5 overflow-y-scroll">
              <div className="grid grid-cols-4 gap-5">
                {(searchTerm === "" ? filteredItems : searchedItems).map((item) => (
                  <Card key={item.code_produk} 
                    isPressable={true}
                    onPress={() => {
                      addModal.onOpen()
                      setSelectedID(item.code_produk)
                    }}
                    radius="sm">
                    <CardBody className="bg-gradient-to-br from-primary/20 to-primary text-6xl font-bold flex justify-center items-center h-[150px]">
                        GO
                    </CardBody>
                    <CardFooter className="flex-col h-[100px] justify-between items-start gap-2 text-start">
                      <h3>
                        {item.title}
                      </h3>
                      <p className="text-primary text-shadow-black font-medium tracking-wider">{convertIDR(item.price)}</p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
            <ModalAddProduk 
              isOpen={addModal.isOpen} 
              onClose={addModal.onClose} 
              onOpenChange={addModal.onOpenChange} 
              selectedId={selectedId}
              refetchCart={refetchCart}
            />
          </div>
          <div className="w-[600px]">
            <Autocomplete
              variant="bordered"
              radius="none"
              size="sm"
              label="Pilih Pelanggan"
              type="number"
              value={searchPhone}
              onInputChange={onInputChange}
            > 
              {filteredCustomers.map((customer) => (
                <AutocompleteItem key={customer.phone_number} textValue={customer.phone_number} className="p-4">
                  <p>{customer.phone_number}</p>
                  <p>{customer.name}</p>
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <section className="flex-col justify-between">
              <div className="h-[calc(100vh-285px)] overflow-y-scroll flex-col justify-between">
                  {cart.map((item: IProdukInCart, index) => {
                    return (
                      <div onClick={() => {
                        setSelectedID(item.cartItemId)
                        updateModal.onOpen()
                      }} key={index} className="p-5 border-b border-secondary/20 grid gap-5">
                        <div className="flex justify-between">
                          <span>
                            <h4 className="text-lg">
                              {item.title}
                            </h4>
                            <span className=" flex gap-3">
                              <p className="text-primary tracking-wider font-medium">
                                {convertIDR(
                                  Number(
                                    (item.price * item.quantity) -
                                    (item.isPercent
                                      ? (item.price * item.quantity * (item.isDiscount / 100))
                                      : item.isDiscount)
                                  )
                                )}
                              </p>
                              <p>
                                {item.isDiscount > 0
                                  ? `( Diskon ${item.isPercent ? `${item.isDiscount}%` : convertIDR(item.isDiscount)} )`
                                  : ""}
                              </p>                            
                            </span>
                            {item.props !== undefined && (  
                              <span>
                                <p className="text-sm">{item.title}</p>
                                <ul className="text-sm pl-1">
                                  {item.props?.map(prop => {
                                    const {quantity, title} = prop
                                    const text = quantity === 0 ? "" : `${quantity}x ${title}`
                                    return (
                                    <li key={prop.code_produk}>
                                      {text}
                                    </li>
                                  )})}
                                </ul>
                              </span>
                            )}
                          </span>
                          <Button 
                            isIconOnly 
                            radius="full" 
                            className="bg-transparent" 
                            onPress={() => {deleteProduct(item.code_produk)}}
                          >
                              <FiTrash size={24} className="text-danger"/>
                          </Button>
                        </div>
                        <div className="flex justify-end gap-5">
                          <span className="border-2 border-primary flex justify-center items-center px-5 text-xs rounded-full">
                              <p>PCS</p>
                          </span>
                          <Button 
                              isIconOnly 
                              radius="full" 
                              className="border bg-transparent border-secondary"
                              onPress={() => {
                                item.quantity === 1 ? deleteProduct(item.code_produk) : decreaseQuantity(item.code_produk)
                              }}
                          >
                              <FiMinus />
                          </Button>
                          <span className="flex justify-center items-center text-xl">
                              {item.quantity}
                          </span>
                          <Button 
                              isIconOnly 
                              radius="full" 
                              className="bg-primary"
                              onPress={() => {increaseQuantity(item.code_produk)}}
                          >
                              <FiPlus />
                          </Button>
                        </div>
                      </div>
                  )})}
                  <ModalUpdateProduk 
                    isOpen={updateModal.isOpen} 
                    onClose={updateModal.onClose} 
                    onOpenChange={updateModal.onOpenChange} 
                    selectedId={selectedId}
                    refetchCart={refetchCart}
                  />
              </div>
              <div className="w-full border-t border-secondary/20">
                {(() => {
                  const subtotal = cart.reduce((acc, item) => {
                    const total = item.price * item.quantity;
                    const discount = item.isPercent ? total * (item.isDiscount / 100) : item.isDiscount;
                    const totalAfterDiscount = total - discount;
                    return acc + totalAfterDiscount;
                  }, 0);

                  return (
                    <>
                      <div className="flex p-5 justify-between border-b border-secondary/20 bg-white">
                        <h2 className="text-xl font-bold">Subtotal</h2>
                        <p className="font-bold text-primary text-xl">
                          {convertIDR(Number(subtotal))}
                        </p>
                      </div>
                      <div className="p-5 flex gap-2">
                        <Button 
                          className="w-full bg-primary font-medium" 
                          radius="sm" 
                          size="lg"
                          isDisabled={cart.length === 0}
                          onPress={() => {
                            paymentModal.onOpen()
                          }}
                        >
                          Bayar
                        </Button>
                        <Button
                          isIconOnly
                          className="border-primary"
                          radius="sm"
                          size="lg"
                          variant="bordered"
                        >
                          <FiMenu size={24} />
                        </Button>
                      </div>
                      <ModalPayment
                        isOpen={paymentModal.isOpen} 
                        onClose={paymentModal.onClose} 
                        onOpenChange={paymentModal.onOpenChange} 
                        cart={cart}
                        subtotal={subtotal}
                        pelanggan={searchPhone}
                      />
                    </>
                  );
                })()}
              </div>
            </section>
          </div>
      </section>
  );
}

export default PesananBaru