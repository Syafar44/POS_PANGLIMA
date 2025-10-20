import { Tab, Tabs } from "@heroui/react";
import Penerimaan from "./Penerimaan";
import StockOpname from "./StockOpname";

const Inventory = () => {
  
  return (
      <section>
        <Tabs aria-label="Options" size="lg" className="p-5">
          <Tab key="Penerimaan" title="Penerimaan">
            <Penerimaan />
          </Tab>
          <Tab key="Op name" title="Stock Opname">
            <StockOpname />
          </Tab>
          <Tab key="return" title="Return">
            
          </Tab>
        </Tabs>
      </section>
  );
}

export default Inventory