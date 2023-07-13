import React, { useEffect, useRef, useState } from "react";

import { UserOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import { Modal as AModal } from "antd";

const CommandPalette: React.FC = ({ options, callbacks, closeSearch }) => {
  const [searchText, setSearchText] = useState<string>();
  const ref = useRef(null);
  const onSearch = (text: string) => console.log(text) || setSearchText(text);

  useEffect(() => {
    console.log("ref.current => ", ref.current);
    // if (ref.current) ref.current?.focus();
    setTimeout(() => ref.current?.focus(), 10);
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
        onSelect={(val) => {
          callbacks[val]?.();
          closeSearch();
        }}
        placeholder="Cmd / to search"
      ></AutoComplete>
    </AModal>
  );
};

export default CommandPalette;
