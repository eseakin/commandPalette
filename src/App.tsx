import { ReactNode, useEffect, useRef, useState } from "react";
import BlankForm from "./BlankForm";
import Modal from "./Modal";
import CommandPalette from "./CommandPalette";
import Table from "./Table";
import { Button } from "antd";

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
    options: [
      renderItem("Add student"),
      renderItem("Add tryout"),
      renderItem("Add makeup"),
    ],
  },
  {
    label: renderTitle("Classes"),
    options: [
      renderItem("Add class"),
      renderItem("Enrollment"),
      renderItem("Attendance"),
    ],
  },
  {
    label: renderTitle("Curriculum"),
    options: [renderItem("Add curriculum plan"), renderItem("Add project")],
  },
  {
    label: renderTitle("Admin"),
    options: [renderItem("Add employee"), renderItem("Run report")],
  },
];

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
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

  const getCallback = (title: string) =>
    addModal(<Modal title={title} content={<BlankForm />} />);

  const callbacks = {
    ["Add student"]: () => {
      console.log("Add student => ");
      addModal(
        // Can probably make this a standalone component with a ref that it passes into removeModal()
        <Modal title="student" content={<BlankForm />} />
      );
    },
    ["Add class"]: () => {
      console.log("Add class => ");
      addModal(<Modal title="class" content={<BlankForm />} />);
    },
    ["Add curriculum plan"]: () => {
      console.log("Add curriculum plan => ");
      addModal(<Modal title="curriculum plan" content={<BlankForm />} />);
    },
    ["Add project"]: () => {
      console.log("Add project => ");
      addModal(<Modal title="project" content={<BlankForm />} />);
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
        fontFamily: "Verdana",
      }}
    >
      <h2>Command Palette Demo</h2>

      <div
        style={{
          width: 600,
          margin: "20px auto",
          textAlign: "left",
          lineHeight: "2rem",
        }}
      >
        <h4>
          The command palette is an easy to use search function that you can
          call up from anywhere in the app.
        </h4>

        <div style={{ textAlign: "center" }}>
          <Button
            style={{ margin: "10px auto" }}
            onClick={() => setShowInstructions((val) => !val)}
            type={showInstructions ? "primary" : "default"}
          >
            {showInstructions ? "Hide instructions" : "Show instructions"}
          </Button>
        </div>

        {showInstructions && (
          <div style={{ gap: 20, display: "flex", flexDirection: "column" }}>
            <div>
              Press{" "}
              <span style={{ backgroundColor: "#ddd", padding: "5px 10px" }}>
                Command + /
              </span>{" "}
              to bring up search. Pick any option, and then press{" "}
              <span style={{ backgroundColor: "#ddd", padding: "5px 10px" }}>
                Command + /
              </span>{" "}
              again to open a new option. Imagine you are working the front desk
              and trying to juggle several tasks. For example, you are adding a
              new employee when a parent asks you to enroll their kid. Another
              kid walks in the door and needs to be checked in. The phone rings
              and it's a parent asking for a tryout.
            </div>
            <div>
              The command palette allows you to jump between all of these tasks
              without losing context on what you were doing before. Everything
              you opened will remain open while you complete your other tasks.
            </div>
          </div>
        )}

        <div></div>
        <div></div>
      </div>
      <Table />
      {isSearchOpen && (
        <CommandPalette
          options={options}
          getCallback={getCallback}
          // callbacks={callbacks}
          closeSearch={() => setIsSearchOpen(false)}
        />
      )}
      {modals.map((modal) => modal)}
    </div>
  );
}

export default App;
