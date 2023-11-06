"use client";

import { useRef, useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";
import "./searchbar.scss";

export default function Searchbar({
  callback,
}: {
  callback: (resData: IDictionaryData[] | null | undefined) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [lastWord, setLastWord] = useState<undefined | string>(undefined);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value;

    if (
      !inputValue ||
      inputValue.length < 2 ||
      dataLoading ||
      lastWord === inputValue
    )
      return;
    setDataLoading(true);
    inputRef.current.readOnly = true;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
      .then((res) => {
        if (!res.ok) return undefined;
        return res.json();
      })
      .then((data) => {
        callback(data);
        setDataLoading(false);
        setLastWord(inputValue);
      });

    // cooldown
    setTimeout(() => {
      if (inputRef.current) inputRef.current.readOnly = false;
    }, 2000);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="searchbar">
        <input type="text" ref={inputRef} />
        {dataLoading && (
          <span className="data-loading loading">
            <RiLoader5Fill />
          </span>
        )}
      </div>
    </form>
  );
}
