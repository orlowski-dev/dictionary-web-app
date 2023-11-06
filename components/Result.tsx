import PlayButton from "./PlayButton";
import "./result.scss";

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
                        <p>Synonyms</p>
                        <ul>
                          {def.synonyms.map((synonym, index: number) => (
                            <li key={index}>{synonym}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
                {meaning.synonyms?.length !== 0 && (
                  <div className="def-n-exmp">
                    <h4>synonyms</h4>
                    <p>{meaning.synonyms?.toString().replaceAll(",", ", ")}</p>
                  </div>
                )}
                {meaning.antonyms?.length !== 0 && (
                  <div className="def-n-exmp">
                    <h4>antonyms</h4>
                    <p>{meaning.antonyms?.toString().replaceAll(",", ", ")}</p>
                  </div>
                )}
              </div>
            ))}
          </article>
        </section>
      ))}
    </>
  );
}
