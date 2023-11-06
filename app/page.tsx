"use client";

import Result from "@/components/Result";
import Searchbar from "@/components/Searchbar";
import { useCallback, useState } from "react";

export default function App() {
  const [data, setData] = useState<IDictionaryData[] | null | undefined>(null);

  const getData = useCallback(
    (resData: IDictionaryData[] | null | undefined) => {
      setData(resData);
    },
    []
  );

  return (
    <main className="container-680 p-4" style={{ paddingTop: 0 }}>
      <section style={{ paddingTop: 0 }}>
        <Searchbar callback={getData} />
      </section>

      {data === undefined ? (
        <section>
          <h1>No Definitions Found</h1>
          <p></p>Sorry pal, we {"couldn't"} find definitions for the word you
          were looking for.
        </section>
      ) : undefined}
      {data && <Result data={data} />}
    </main>
  );
}
