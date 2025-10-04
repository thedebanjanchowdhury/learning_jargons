import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const loader = new CheerioWebBaseLoader(
  "https://en.wikipedia.org/wiki/Hemant_Kumar",
  {
    selector: "p",
  }
);

const text_splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 100,
});

const docs = await loader.load();
const text = await text_splitter.splitDocuments(docs);
console.log(text[0].pageContent);
