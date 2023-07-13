import { useEffect, useRef } from "react";

import { AutoComplete } from "antd";
import { Modal as AModal } from "antd";

type Option = {
  label: JSX.Element;
  options: { value: string; label: JSX.Element }[];
};

const CommandPalette = ({
  options,
  // callbacks,
  getCallback,
  closeSearch,
}: {
  options: Option[];
  getCallback: (title: string) => void;
  // callbacks: Record<string, () => void>;
  closeSearch: () => void;
}) => {
  // const [searchText, setSearchText] = useState<string>();
  const ref = useRef<React.ElementRef<typeof AutoComplete>>(null);
  // const onSearch = (text: string) => setSearchText(text);

  useEffect(() => {
    console.log("ref.current => ", ref.current);
    // if (ref.current) ref.current?.focus();
    // eslint-disable-next-line
    setTimeout(() => ref.current?.focus(), 100);
  }, []);

  return (
    <AModal
      open
      footer={[]}
      style={{ top: 20 }}
      onCancel={closeSearch}
      onOk={closeSearch}
    >
      <AutoComplete
        defaultActiveFirstOption
        bordered={false}
        popupClassName="certain-category-search-dropdown"
        style={{ width: 250 }}
        options={options}
        filterOption
        ref={ref}
        autoFocus
        defaultOpen
        onBlur={closeSearch}
        onSelect={(val: string) => {
          getCallback(val);
          closeSearch();
        }}
        placeholder="Cmd / to search"
      ></AutoComplete>
    </AModal>
  );
};

export default CommandPalette;
