import { ReactNode, useEffect, useRef, useState } from "react";
import BlankForm from "./BlankForm";
import Modal from "./Modal";
import CommandPalette from "./CommandPalette";
import Table from "./Table";

import "./App.css";

const renderTitle = (title: string) => <span>{title}</span>;

const renderItem = (title: string) => ({
  value: title,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {title}
    </div>
  ),
});

const options = [
  {
    label: renderTitle("Students"),
    options: [renderItem("Add student")],
  },
  {
    label: renderTitle("Classes"),
    options: [renderItem("Add class")],
  },
  {
    label: renderTitle("Curriculum"),
    options: [renderItem("Add curriculum plan"), renderItem("Add project")],
  },
];

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  console.log("searchRef => ", searchRef);

  const [modals, setModals] = useState<ReactNode[]>([]);
  console.log("modals => ", modals);

  const addModal = (modal: ReactNode) => {
    setModals([...modals, modal]);
  };

  // const removeModal = (modal: ReactNode) => {
  //   setModals(modals.filter((el) => modal !== el));
  // };

  const callbacks = {
    ["Add student"]: () => {
      console.log("Add student => ");
      addModal(
        // Can probably make this a standalone component with a ref that it passes into removeModal()
        <Modal title="student" content={<BlankForm title="student" />} />
      );
    },
    ["Add class"]: () => {
      console.log("Add class => ");
      addModal(<Modal title="class" content={<BlankForm title="class" />} />);
    },
    ["Add curriculum plan"]: () => {
      console.log("Add curriculum plan => ");
      addModal(
        <Modal
          title="curriculum plan"
          content={<BlankForm title="curriculum plan" />}
        />
      );
    },
    ["Add project"]: () => {
      console.log("Add project => ");
      addModal(
        <Modal title="project" content={<BlankForm title="project" />} />
      );
    },
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      console.log("e.code => ", e.code);
      console.log("e.ctrlKey => ", e.ctrlKey);
      const meta = e.getModifierState("Meta");
      if (e.code === "Slash" && meta) setIsSearchOpen(true);
    };
    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, []);

  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "flex-start",
        height: "100vh",
        marginTop: 60,
      }}
    >
      <h2>App</h2>
      <Table />
      {isSearchOpen && (
        <CommandPalette
          options={options}
          callbacks={callbacks}
          closeSearch={() => setIsSearchOpen(false)}
        />
      )}
      {modals.map((modal) => modal)}
    </div>
  );
}

export default App;
