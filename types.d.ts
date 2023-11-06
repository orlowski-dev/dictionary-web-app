type IDictionaryData = {
  word: string;
  phonetic?: string;
  phonetics: {
    audio: string;
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      synonyms: string[];
      antonyms: string[];
      example?: string;
    }[];
    synonyms?: string[];
    antonyms?: string[];
  }[];
};
