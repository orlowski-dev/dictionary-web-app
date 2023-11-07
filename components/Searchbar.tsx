"use client";

import { useEffect, useRef, useState } from "react";
import { RiLoader5Fill, RiSearchLine } from "react-icons/ri";
import "./searchbar.scss";
import { redirect, useSearchParams } from "next/navigation";

export default function Searchbar({
  callback,
}: {
  callback: (resData: IDictionaryData[] | null | undefined) => void;
}) {
  const searchParams = useSearchParams().get("word");
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(searchParams || "");
  const [dataLoading, setDataLoading] = useState(false);
  const [lastWord, setLastWord] = useState<undefined | string>(undefined);
  const [redirectTo, setRedirectTo] = useState<null | string>(null);

  useEffect(() => {
    if (
      !window ||
      !searchParams ||
      searchParams.length === 0 ||
      !RegExp(/^[a-zA-Z]+$/).test(searchParams)
    )
      return;

    setDataLoading(true);
    callback(null);

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchParams}`)
      .then((res) => {
        if (!res.ok) return undefined;
        return res.json();
      })
      .then((data) => {
        callback(data);
        setDataLoading(false);
        setLastWord(searchParams);
      });
  }, [searchParams, callback]);

  if (redirectTo) redirect(redirectTo);

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    if (value.length < 2 || !RegExp(/^[a-zA-Z]+$/).test(value)) {
      inputRef.current?.classList.add("invalid");
    } else {
      inputRef.current?.classList.remove("invalid");
    }
  };

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

    inputRef.current.readOnly = true;
    // getData(inputValue);
    setRedirectTo(`/?word=${inputValue}`);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="searchbar">
        <input
          type="text"
          ref={inputRef}
          defaultValue={inputValue}
          onChange={handleOnInputChange}
          placeholder="Enter a word.."
        />
        {dataLoading && (
          <span className="data-loading loading">
            <RiLoader5Fill />
          </span>
        )}
        {!dataLoading && (
          <span className="search-icon">
            <RiSearchLine />
          </span>
        )}
      </div>
    </form>
  );
}
