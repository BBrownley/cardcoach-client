import React, { useState } from "react";

export default function ImportTermsTextArea(props) {
  const [termsInput, setTermsInput] = useState("");

  /**
   * Parses the textarea input whenever its value changes
   * @param e - The source of the event, where the text will be taken from to parse into flashcard objects
   */

  const handleSetTerms = e => {
    const value = e.target.value;
    const regex = /\((.*?)\)\s*\[(.*?)\]/g; // matches strings in ()[] format into one object w/ two properties

    // match every other string separated by double spaces, ignoring single spaces and new lines
    const matches = [...value.matchAll(regex)]; // find all matches in the value

    const terms = matches.map(match => ({
      term: match[1],
      def: match[2]
    })); // create an array of objects with term and def properties from the matches

    props.setTermsToImport(terms); // proposed term objects to be imported
    setTermsInput(value); // update state to match textarea
  };

  return (
    <div>
      <textarea
        id="set-import"
        value={termsInput}
        onChange={handleSetTerms}
        placeholder="separate terms and definitions using parenthesis and square brackets&#013;&#013;example:&#013;&#013;(termA)  [definitionA]&#013;(termB)  [definitionB]"
      />
    </div>
  );
}
