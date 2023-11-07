import Link from "next/link";
import PlayButton from "./PlayButton";
import "./result.scss";

const arrToStr = (arr: string[]) =>
  arr.map((elem, index: number) => (
    <Link key={index} href={`/?word=${elem}`}>
      {elem}
    </Link>
  ));

export default function Result({ data }: { data: IDictionaryData[] }) {
  return (
    <>
      {data.map((elem, index: number) => (
        <section key={index} className="result-container animate">
          <article className="word-section">
            <div>
              <h2>{elem.word}</h2>
              <p>{elem.phonetic}</p>
            </div>
            <div>
              <PlayButton audioArr={elem.phonetics} />
            </div>
          </article>
          <article className="meanings">
            {elem.meanings.map((meaning, index: number) => (
              <div key={index} className="meaning">
                <h3>{meaning.partOfSpeech}</h3>
                {meaning.definitions.map((def, index: number) => (
                  <div key={index} className="def-n-exmp">
                    <p>
                      {index + 1}. {def.definition}
                    </p>
                    {def.example && (
                      <p>
                        <i>&#8212; {def.example}</i>
                      </p>
                    )}
                    {def.synonyms[0] && (
                      <div className="syn-ant">
                        <h4>synonyms</h4>
                        <p>{arrToStr(def.synonyms)}</p>
                      </div>
                    )}
                    {def.antonyms[0] && (
                      <div className="syn-ant">
                        <h4>antonyms</h4>
                        <p>{arrToStr(def.antonyms)}</p>
                      </div>
                    )}
                  </div>
                ))}
                {meaning.synonyms?.length !== 0 && (
                  <div className="def-n-exmp syn-ant">
                    <h4>synonyms</h4>
                    <p>{meaning.synonyms && arrToStr(meaning.synonyms)}</p>
                  </div>
                )}
                {meaning.antonyms?.length !== 0 && (
                  <div className="def-n-exmp syn-ant">
                    <h4>antonyms</h4>
                    <p>{meaning.antonyms && arrToStr(meaning.antonyms)}</p>
                  </div>
                )}
              </div>
            ))}
          </article>
          <article style={{ padding: 10 }}>
            <div className="def-n-exmp">
              <h4>license and sources</h4>
              <p className="links">
                <span>license</span>
                <Link href={elem.license?.url} target="_blank">
                  {elem.license?.name}
                </Link>
              </p>
              <p className="links">
                <span>source list</span>
                {elem.sourceUrls.map((link, index: number) => (
                  <Link key={index} href={link} target="_blank">
                    {elem.sourceUrls}
                  </Link>
                ))}
              </p>
            </div>
          </article>
        </section>
      ))}
    </>
  );
}
