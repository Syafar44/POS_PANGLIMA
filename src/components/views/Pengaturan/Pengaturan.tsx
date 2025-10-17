import { Tab, Tabs } from "@heroui/react";
import Profile from "./Profile";

const Pengaturan = () => {
  
  return (
      <section>
        <Tabs aria-label="Options" size="lg" className="p-5">
          <Tab key="profile-pengguna" title="Profile Pengguna">
            <Profile />
          </Tab>
          <Tab key="printer" title="Printer">
            
          </Tab>
        </Tabs>
      </section>
  );
}

export default Pengaturan