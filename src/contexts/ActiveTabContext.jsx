import React, { useState } from "react";

export const TabContext = React.createContext();

export default function TabProvider(props) {
  const [activeTab, setActiveTab] = useState("1");
  const [auditorActiveTab, setAuditorActiveTab] = useState("1");
  const [tcRequestActiveTab, setTcRequestActiveTab] = useState("1");
  const [click, setClick] = useState(false);
  return (
    <TabContext.Provider
      value={{
        activeTab,
        setActiveTab,
        auditorActiveTab,
        setAuditorActiveTab,
        tcRequestActiveTab,
        setTcRequestActiveTab,
        click,
        setClick,
      }}
    >
      {props.children}
    </TabContext.Provider>
  );
}
