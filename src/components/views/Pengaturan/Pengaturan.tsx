import { Tab, Tabs } from "@heroui/react";
import Profile from "./Profile";
import Printer from "./Printer";

const Pengaturan = () => {
  
  return (
      <section className="bg-primary/70">
        <Tabs aria-label="Options" size="lg" className="p-5">
          <Tab key="profile-pengguna" title="Profile Pengguna">
            <Profile />
          </Tab>
          <Tab key="printer" title="Printer">
            <Printer />
          </Tab>
        </Tabs>
      </section>
  );
}

export default Pengaturan