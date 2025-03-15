import { getAllUrls } from "./gen-sitemap-xml";
import fs from 'node:fs';

genURlsForLLM_txt()


/**
 * read ./public/llm.txt, find `#all articles` to the next '#**' content, replace it to generated content.(if not find, insert)
 */
function genURlsForLLM_txt(){
  const allUrls=getAllUrls()
  const generatedContent=''+allUrls.join('\n')
  const path = './public/llm.txt';
  const fileContent = fs.readFileSync(path, 'utf-8');
  const startTag = '##all articles';
  const endTag = '\n##';
  
  const startIndex = fileContent.indexOf(startTag);
  const endIndex = fileContent.indexOf(endTag, startIndex);

  let newContent;
  if (startIndex !== -1 && endIndex !== -1) {
    newContent = fileContent.slice(0, startIndex + startTag.length) + '\n' + generatedContent + '\n' + fileContent.slice(endIndex);
  } else if (startIndex !== -1) {
    newContent = fileContent.slice(0, startIndex + startTag.length) + '\n' + generatedContent + '\n' + fileContent.slice(startIndex + startTag.length);
  } else {
    newContent = fileContent + '\n' + startTag + '\n' + generatedContent + '\n';
  }

  fs.writeFileSync(path, newContent, 'utf-8');
}
