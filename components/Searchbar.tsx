"use client";

import { useEffect, useRef, useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";
import "./searchbar.scss";
import { redirect, useSearchParams } from "next/navigation";

export default function Searchbar({
  callback,
}: {
  callback: (resData: IDictionaryData[] | null | undefined) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [lastWord, setLastWord] = useState<undefined | string>(undefined);
  const serachParams = useSearchParams().get("word");
  const [redirectTo, setRedirectTo] = useState<null | string>(null);

  useEffect(() => {
    if (!serachParams || serachParams.length === 0) return;

    setDataLoading(true);
    callback(null);

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${serachParams}`)
      .then((res) => {
        if (!res.ok) return undefined;
        return res.json();
      })
      .then((data) => {
        callback(data);
        setDataLoading(false);
        setLastWord(serachParams);
      });
  }, [serachParams, callback]);

  if (redirectTo) redirect(redirectTo);

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

    // cooldown
    setTimeout(() => {
      if (inputRef.current) inputRef.current.readOnly = false;
    }, 2000);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="searchbar">
        <input
          type="text"
          ref={inputRef}
          defaultValue={serachParams || undefined}
        />
        {dataLoading && (
          <span className="data-loading loading">
            <RiLoader5Fill />
          </span>
        )}
      </div>
    </form>
  );
}
